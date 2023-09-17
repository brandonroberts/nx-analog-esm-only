import { inject, makeEnvironmentProviders, ENVIRONMENT_INITIALIZER, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, provideRouter } from '@angular/router';
import { filter } from 'rxjs/operators';

const ROUTE_META_TAGS_KEY = Symbol('@analogjs/router Route Meta Tags Key');
const CHARSET_KEY = 'charset';
const HTTP_EQUIV_KEY = 'httpEquiv';
// httpEquiv selector key needs to be in kebab case format
const HTTP_EQUIV_SELECTOR_KEY = 'http-equiv';
const NAME_KEY = 'name';
const PROPERTY_KEY = 'property';
const CONTENT_KEY = 'content';
function updateMetaTagsOnRouteChange() {
    const router = inject(Router);
    const metaService = inject(Meta);
    router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
        const metaTagMap = getMetaTagMap(router.routerState.snapshot.root);
        for (const metaTagSelector in metaTagMap) {
            const metaTag = metaTagMap[metaTagSelector];
            metaService.updateTag(metaTag, metaTagSelector);
        }
    });
}
function getMetaTagMap(route) {
    const metaTagMap = {};
    let currentRoute = route;
    while (currentRoute) {
        const metaTags = currentRoute.data[ROUTE_META_TAGS_KEY] ?? [];
        for (const metaTag of metaTags) {
            metaTagMap[getMetaTagSelector(metaTag)] = metaTag;
        }
        currentRoute = currentRoute.firstChild;
    }
    return metaTagMap;
}
function getMetaTagSelector(metaTag) {
    if (metaTag.name) {
        return `${NAME_KEY}="${metaTag.name}"`;
    }
    if (metaTag.property) {
        return `${PROPERTY_KEY}="${metaTag.property}"`;
    }
    if (metaTag.httpEquiv) {
        return `${HTTP_EQUIV_SELECTOR_KEY}="${metaTag.httpEquiv}"`;
    }
    return CHARSET_KEY;
}

const ANALOG_META_KEY = Symbol('@analogjs/router Analog Route Metadata Key');
const PAGE_ENDPOINTS = import.meta.glob([
    '/src/app/pages/**/*.server.ts',
]);

function toRouteConfig(routeMeta) {
    if (routeMeta && isRedirectRouteMeta(routeMeta)) {
        return routeMeta;
    }
    let { meta, ...routeConfig } = routeMeta ?? {};
    if (Array.isArray(meta)) {
        routeConfig.data = { ...routeConfig.data, [ROUTE_META_TAGS_KEY]: meta };
    }
    else if (typeof meta === 'function') {
        routeConfig.resolve = {
            ...routeConfig.resolve,
            [ROUTE_META_TAGS_KEY]: meta,
        };
    }
    if (!routeConfig) {
        routeConfig = {};
    }
    routeConfig.resolve = {
        ...routeConfig.resolve,
        load: async (route) => {
            const routeConfig = route.routeConfig;
            if (PAGE_ENDPOINTS[routeConfig[ANALOG_META_KEY].endpointKey]) {
                const { queryParams, fragment: hash, params, parent } = route;
                const segment = parent?.url.map((segment) => segment.path).join('/') || '';
                const url = new URL('', import.meta.env['VITE_ANALOG_PUBLIC_BASE_URL']);
                url.pathname = `/api/_analog${routeConfig[ANALOG_META_KEY].endpoint}`;
                url.search = `${new URLSearchParams(queryParams).toString()}`;
                url.hash = hash ?? '';
                Object.keys(params).forEach((param) => {
                    url.pathname = url.pathname.replace(`[${param}]`, params[param]);
                });
                url.pathname = url.pathname.replace('**', segment);
                if (globalThis.$fetch) {
                    return globalThis.$fetch(url.pathname);
                }
                const http = inject(HttpClient);
                return firstValueFrom(http.get(`${url.href}`));
            }
            return {};
        },
    };
    return routeConfig;
}
function isRedirectRouteMeta(routeMeta) {
    return !!routeMeta.redirectTo;
}

// The Zone is currently enabled by default, so we wouldn't need this check.
// However, leaving this open space will be useful if zone.js becomes optional
// in the future. This means we won't have to modify the current code, and it will
// continue to work seamlessly.
const isNgZoneEnabled = typeof Zone !== 'undefined' && !!Zone.root;
function toMarkdownModule(markdownFileFactory) {
    return async () => {
        const createLoader = () => Promise.all([import('@analogjs/content'), markdownFileFactory()]);
        const [{ parseRawContentFile, MarkdownRouteComponent, ContentRenderer }, markdownFile,] = await (isNgZoneEnabled
            ? // We are not able to use `runOutsideAngular` because we are not inside
                // an injection context to retrieve the `NgZone` instance.
                // The `Zone.root.run` is required when the code is running in the
                // browser since asynchronous tasks being scheduled in the current context
                // are a reason for unnecessary change detection cycles.
                Zone.root.run(createLoader)
            : createLoader());
        const { content, attributes } = parseRawContentFile(markdownFile);
        const { title, meta } = attributes;
        return {
            default: MarkdownRouteComponent,
            routeMeta: {
                data: { _analogContent: content },
                title,
                meta,
                resolve: {
                    renderedAnalogContent: async () => {
                        const contentRenderer = inject(ContentRenderer);
                        return contentRenderer.render(content);
                    },
                },
            },
        };
    };
}

const ENDPOINT_EXTENSION = '.server.ts';
const APP_DIR = 'src/app';

/// <reference types="vite/client" />
const FILES = import.meta.glob([
    '/app/routes/**/*.ts',
    '/src/app/routes/**/*.ts',
    '/src/app/pages/**/*.page.ts',
]);
const CONTENT_FILES = import.meta.glob(['/src/app/routes/**/*.md', '/src/app/pages/**/*.md'], { as: 'raw' });
/**
 * A function used to parse list of files and create configuration of routes.
 *
 * @param files
 * @returns Array of routes
 */
function createRoutes(files) {
    const filenames = Object.keys(files);
    if (filenames.length === 0) {
        return [];
    }
    // map filenames to raw routes and group them by level
    const rawRoutesByLevelMap = filenames.reduce((acc, filename) => {
        const rawPath = toRawPath(filename);
        const rawSegments = rawPath.split('/');
        // nesting level starts at 0
        // rawPath: /products => level: 0
        // rawPath: /products/:id => level: 1
        const level = rawSegments.length - 1;
        const rawSegment = rawSegments[level];
        const ancestorRawSegments = rawSegments.slice(0, level);
        return {
            ...acc,
            [level]: {
                ...acc[level],
                [rawPath]: {
                    filename,
                    rawSegment,
                    ancestorRawSegments,
                    segment: toSegment(rawSegment),
                    level,
                    children: [],
                },
            },
        };
    }, {});
    const allLevels = Object.keys(rawRoutesByLevelMap).map(Number);
    const maxLevel = Math.max(...allLevels);
    // add each raw route to its parent's children array
    for (let level = maxLevel; level > 0; level--) {
        const rawRoutesMap = rawRoutesByLevelMap[level];
        const rawPaths = Object.keys(rawRoutesMap);
        for (const rawPath of rawPaths) {
            const rawRoute = rawRoutesMap[rawPath];
            const parentRawPath = rawRoute.ancestorRawSegments.join('/');
            const parentRawSegmentIndex = rawRoute.ancestorRawSegments.length - 1;
            const parentRawSegment = rawRoute.ancestorRawSegments[parentRawSegmentIndex];
            // create the parent level and/or raw route if it does not exist
            // parent route won't exist for nested routes that don't have a layout route
            rawRoutesByLevelMap[level - 1] ||= {};
            rawRoutesByLevelMap[level - 1][parentRawPath] ||= {
                filename: null,
                rawSegment: parentRawSegment,
                ancestorRawSegments: rawRoute.ancestorRawSegments.slice(0, parentRawSegmentIndex),
                segment: toSegment(parentRawSegment),
                level: level - 1,
                children: [],
            };
            rawRoutesByLevelMap[level - 1][parentRawPath].children.push(rawRoute);
        }
    }
    // only take raw routes from the root level
    // since they already contain nested routes as their children
    const rootRawRoutesMap = rawRoutesByLevelMap[0];
    const rawRoutes = Object.keys(rootRawRoutesMap).map((segment) => rootRawRoutesMap[segment]);
    sortRawRoutes(rawRoutes);
    return toRoutes(rawRoutes, files);
}
function toRawPath(filename) {
    return filename
        .replace(
    // convert to relative path and remove file extension
    /^\/(.*?)\/routes\/|^\/(.*?)\/pages\/|\/app\/routes\/|(\.page\.(js|ts)$)|(\.(ts|md)$)/g, '')
        .replace(/\[\.{3}.+\]/, '**') // [...not-found] => **
        .replace(/\[([^\]]+)\]/g, ':$1'); // [id] => :id
}
function toSegment(rawSegment) {
    return rawSegment
        .replace(/index|\(.*?\)/g, '') // replace named empty segments
        .replace(/\.|\/+/g, '/') // replace dots with slashes and remove redundant slashes
        .replace(/^\/+|\/+$/g, ''); // remove trailing slashes
}
function toRoutes(rawRoutes, files) {
    const routes = [];
    for (const rawRoute of rawRoutes) {
        const children = rawRoute.children.length > 0
            ? toRoutes(rawRoute.children, files)
            : undefined;
        let module = undefined;
        let analogMeta = undefined;
        if (rawRoute.filename) {
            const isMarkdownFile = rawRoute.filename.endsWith('.md');
            module = isMarkdownFile
                ? toMarkdownModule(files[rawRoute.filename])
                : files[rawRoute.filename];
            const endpointKey = rawRoute.filename.replace(/\.page\.ts$/, ENDPOINT_EXTENSION);
            // get endpoint path
            const rawEndpoint = rawRoute.filename
                .replace(/\.page\.ts$/, '')
                .replace(/\[\.{3}.+\]/, '**') // [...not-found] => **
                .split(APP_DIR)[1];
            // replace periods, remove (index) paths
            const endpoint = (rawEndpoint || '')
                .replace(/\./g, '/')
                .replace(/\/\((.*?)\)$/, '/-$1-');
            analogMeta = {
                endpoint,
                endpointKey,
            };
        }
        const route = module
            ? {
                path: rawRoute.segment,
                loadChildren: () => module().then((m) => [
                    {
                        path: '',
                        component: m.default,
                        ...toRouteConfig(m.routeMeta),
                        children,
                        [ANALOG_META_KEY]: analogMeta,
                    },
                ]),
            }
            : { path: rawRoute.segment, children };
        routes.push(route);
    }
    return routes;
}
function sortRawRoutes(rawRoutes) {
    rawRoutes.sort((a, b) => {
        let segmentA = deprioritizeSegment(a.segment);
        let segmentB = deprioritizeSegment(b.segment);
        // prioritize routes with fewer children
        if (a.children.length > b.children.length) {
            segmentA = `~${segmentA}`;
        }
        else if (a.children.length < b.children.length) {
            segmentB = `~${segmentB}`;
        }
        return segmentA > segmentB ? 1 : -1;
    });
    for (const rawRoute of rawRoutes) {
        sortRawRoutes(rawRoute.children);
    }
}
function deprioritizeSegment(segment) {
    // deprioritize param and wildcard segments
    return segment.replace(':', '~~').replace('**', '~~~~');
}
const routes = createRoutes({ ...FILES, ...CONTENT_FILES });

/**
 * @deprecated Use `RouteMeta` type instead.
 * For more info see: https://github.com/analogjs/analog/issues/223
 *
 * Defines additional route config metadata. This
 * object is merged into the route config with
 * the predefined file-based route.
 *
 * @usageNotes
 *
 * ```
 * import { Component } from '@angular/core';
 * import { defineRouteMeta } from '@analogjs/router';
 *
 *  export const routeMeta = defineRouteMeta({
 *    title: 'Welcome'
 *  });
 *
 * @Component({
 *   template: `Home`,
 *   standalone: true,
 * })
 * export default class HomeComponent {}
 * ```
 *
 * @param route
 * @returns
 */
const defineRouteMeta = (route) => {
    return route;
};
/**
 * Returns the instance of Angular Router
 *
 * @returns The router
 */
const injectRouter = () => {
    return inject(Router);
};
/**
 * Returns the instance of the Activate Route for the component
 *
 * @returns The activated route
 */
const injectActivatedRoute = () => {
    return inject(ActivatedRoute);
};

/**
 * Sets up providers for the Angular router, and registers
 * file-based routes. Additional features can be provided
 * to further configure the behavior of the router.
 *
 * @param features
 * @returns Providers and features to configure the router with routes
 */
function provideFileRouter(...features) {
    return makeEnvironmentProviders([
        // TODO: remove type casting after Angular >=15.1.1 upgrade
        // https://github.com/angular/angular/pull/48720
        provideRouter(routes, ...features).ɵproviders,
        {
            provide: ENVIRONMENT_INITIALIZER,
            multi: true,
            useValue: () => updateMetaTagsOnRouteChange(),
        },
    ]);
}

function injectLoad(options) {
    const injector = options?.injector ?? inject(Injector);
    const route = injector.get(ActivatedRoute);
    return route.data.pipe(map((data) => data['load']));
}

/**
 * Generated bundle index. Do not edit.
 */

export { defineRouteMeta, injectActivatedRoute, injectLoad, injectRouter, provideFileRouter, routes };
//# sourceMappingURL=analogjs-router.mjs.map
