import * as i0 from '@angular/core';
import { inject, Directive, HostListener, InjectionToken, Injectable, PLATFORM_ID, Component, ViewEncapsulation, Input, NgZone } from '@angular/core';
import { DOCUMENT, Location, AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { isObservable, firstValueFrom, of, Observable, from } from 'rxjs';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import fm from 'front-matter';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

class AnchorNavigationDirective {
    constructor() {
        this.document = inject(DOCUMENT);
        this.location = inject(Location);
        this.router = inject(Router);
    }
    handleNavigation(element) {
        if (element instanceof HTMLAnchorElement &&
            isInternalUrl(element, this.document) &&
            hasTargetSelf(element) &&
            !hasDownloadAttribute(element)) {
            const { pathname, search, hash } = element;
            const url = this.location.normalize(`${pathname}${search}${hash}`);
            this.router.navigateByUrl(url);
            return false;
        }
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnchorNavigationDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.2", type: AnchorNavigationDirective, isStandalone: true, selector: "[analogAnchorNavigation]", host: { listeners: { "click": "handleNavigation($event.target)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnchorNavigationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[analogAnchorNavigation]',
                    standalone: true,
                }]
        }], propDecorators: { handleNavigation: [{
                type: HostListener,
                args: ['click', ['$event.target']]
            }] } });
function hasDownloadAttribute(anchorElement) {
    return anchorElement.getAttribute('download') !== null;
}
function hasTargetSelf(anchorElement) {
    return !anchorElement.target || anchorElement.target === '_self';
}
function isInternalUrl(anchorElement, document) {
    return (anchorElement.host === document.location.host &&
        anchorElement.protocol === document.location.protocol);
}

/**
 * Returns the list of content files by filename with ?analog-content-list=true.
 * We use the query param to transform the return into an array of
 * just front matter attributes.
 *
 * @returns
 */
const getContentFilesList = () => import.meta.glob('/src/content/**/*.md', {
    eager: true,
    import: 'default',
    query: { 'analog-content-list': true },
});
/**
 * Returns the lazy loaded content files for lookups.
 *
 * @returns
 */
const getContentFiles = () => import.meta.glob(['/src/content/**/*.md'], {
    as: 'raw',
});

function getSlug(filename) {
    const parts = filename.match(/^(\\|\/)(.+(\\|\/))*(.+)\.(.+)$/);
    return parts?.length ? parts[4] : '';
}
const CONTENT_FILES_LIST_TOKEN = new InjectionToken('@analogjs/content Content Files List', {
    providedIn: 'root',
    factory() {
        const contentFiles = getContentFilesList();
        return Object.keys(contentFiles).map((filename) => {
            const attributes = contentFiles[filename];
            const slug = attributes['slug'];
            return {
                filename,
                attributes,
                slug: slug ? encodeURI(slug) : encodeURI(getSlug(filename)),
            };
        });
    },
});

const CONTENT_FILES_TOKEN = new InjectionToken('@analogjs/content Content Files', {
    providedIn: 'root',
    factory() {
        const contentFiles = getContentFiles();
        const contentFilesList = inject(CONTENT_FILES_LIST_TOKEN);
        const lookup = {};
        contentFilesList.forEach((item) => {
            const fileParts = item.filename.split('/');
            const filePath = fileParts.slice(0, fileParts.length - 1).join('/');
            lookup[item.filename] = `${filePath}/${item.slug}.md`;
        });
        const objectUsingSlugAttribute = {};
        Object.entries(contentFiles).forEach((entry) => {
            const filename = entry[0];
            const value = entry[1];
            const newFilename = lookup[filename];
            if (newFilename !== undefined) {
                objectUsingSlugAttribute[newFilename] = value;
            }
        });
        return objectUsingSlugAttribute;
    },
});

function parseRawContentFile(rawContentFile) {
    const { body, attributes } = fm(rawContentFile);
    return { content: body, attributes };
}

async function waitFor(prom) {
    if (isObservable(prom)) {
        prom = firstValueFrom(prom);
    }
    const macroTask = Zone.current.scheduleMacroTask(`AnalogContentResolve-${Math.random()}`, () => { }, {}, () => { });
    return prom.then((p) => {
        macroTask.invoke();
        return p;
    });
}

/// <reference types="vite/client" />
function getContentFile(contentFiles, prefix, slug, fallback) {
    const filePath = `/src/content/${prefix}${slug}.md`;
    const contentFile = contentFiles[filePath];
    if (!contentFile) {
        return of({
            filename: filePath,
            attributes: {},
            slug: '',
            content: fallback,
        });
    }
    return new Observable((observer) => {
        const contentResolver = contentFile();
        if (import.meta.env.SSR === true) {
            waitFor(contentResolver).then((content) => {
                observer.next(content);
            });
        }
        else {
            contentResolver.then((content) => {
                observer.next(content);
            });
        }
    }).pipe(map((rawContentFile) => {
        const { content, attributes } = parseRawContentFile(rawContentFile);
        return {
            filename: filePath,
            slug,
            attributes,
            content,
        };
    }));
}
/**
 * Retrieves the static content using the provided param and/or prefix.
 *
 * @param param route parameter (default: 'slug')
 * @param fallback fallback text if content file is not found (default: 'No Content Found')
 */
function injectContent(param = 'slug', fallback = 'No Content Found') {
    const contentFiles = inject(CONTENT_FILES_TOKEN);
    if (typeof param === 'string' || 'param' in param) {
        const prefix = typeof param === 'string' ? '' : `${param.subdirectory}/`;
        const route = inject(ActivatedRoute);
        const paramKey = typeof param === 'string' ? param : param.param;
        return route.paramMap.pipe(map((params) => params.get(paramKey)), switchMap((slug) => {
            if (slug) {
                return getContentFile(contentFiles, prefix, slug, fallback);
            }
            else {
                return of({
                    filename: '',
                    slug: '',
                    attributes: {},
                    content: fallback,
                });
            }
        }));
    }
    else {
        return getContentFile(contentFiles, '', param.customFilename, fallback);
    }
}

class ContentRenderer {
    async render(content) {
        return content;
    }
    // eslint-disable-next-line
    enhance() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ContentRenderer, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ContentRenderer }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: ContentRenderer, decorators: [{
            type: Injectable
        }] });

function injectContentFiles(filterFn) {
    const allContentFiles = inject(CONTENT_FILES_LIST_TOKEN);
    if (filterFn) {
        const filteredContentFiles = allContentFiles.filter(filterFn);
        return filteredContentFiles;
    }
    return allContentFiles;
}

/**
 * Credit goes to Scully for original implementation
 * https://github.com/scullyio/scully/blob/main/libs/scully/src/lib/fileHanderPlugins/markdown.ts
 */
class MarkedSetupService {
    constructor() {
        const renderer = new marked.Renderer();
        renderer.code = (code, lang) => {
            // Let's do a language based detection like on GitHub
            // So we can still have non-interpreted mermaid code
            if (lang === 'mermaid') {
                return '<pre class="mermaid">' + code + '</pre>';
            }
            if (!lang) {
                return '<pre><code>' + code + '</code></pre>';
            }
            const classes = lang.startsWith('diff') && Prism.languages['diff']
                ? `language-${lang} diff-highlight`
                : `language-${lang.replace('diff-', '')}`;
            return `<pre class="${classes}"><code class="${classes}">${code}</code></pre>`;
        };
        marked.use(gfmHeadingId(), markedHighlight({
            async: true,
            highlight: (code, lang) => {
                let diff = lang?.startsWith('diff-');
                lang = diff ? lang.replace('diff-', '') : lang || 'typescript';
                if (diff && !Prism.languages['diff']) {
                    diff = false;
                    console.warn(`Notice:
    ---------------------------------------------------------------------------------------
    The \`diff\` language and plugin are not available in the provided setup.
    To enable it, add the following imports your \`main.ts\`:
      import 'prismjs/components/prism-diff';
      import 'prismjs/plugins/diff-highlight/prism-diff-highlight';
    ---------------------------------------------------------------------------------------
            `);
                }
                if (!Prism.languages[lang]) {
                    if (lang !== 'mermaid') {
                        console.warn(`Notice:
    ---------------------------------------------------------------------------------------
    The requested language '${lang}' is not available in the provided setup.
    To enable it, add the following import your \`main.ts\`:
      import 'prismjs/components/prism-${lang}';
    ---------------------------------------------------------------------------------------
              `);
                    }
                    return code;
                }
                return Prism.highlight(code, diff ? Prism.languages['diff'] : Prism.languages[lang], lang);
            },
        }), {
            renderer,
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            smartypants: false,
            xhtml: false,
            mangle: false,
        });
        this.marked = marked;
    }
    getMarkedInstance() {
        return this.marked;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkedSetupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkedSetupService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkedSetupService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

class MarkdownContentRendererService {
    constructor() {
        this.platformId = inject(PLATFORM_ID);
        this.#marked = inject(MarkedSetupService, { self: true });
    }
    #marked;
    async render(content) {
        return this.#marked.getMarkedInstance().parse(content);
    }
    // eslint-disable-next-line
    enhance() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkdownContentRendererService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkdownContentRendererService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkdownContentRendererService, decorators: [{
            type: Injectable
        }] });
function withMarkdownRenderer(options) {
    return [
        {
            provide: ContentRenderer,
            useFactory: () => new MarkdownContentRendererService(),
            deps: [MarkedSetupService],
        },
        options?.loadMermaid
            ? [
                {
                    provide: MERMAID_IMPORT_TOKEN,
                    useFactory: options.loadMermaid,
                },
            ]
            : [],
    ];
}
function provideContent(...features) {
    return [...features, MarkedSetupService];
}
const MERMAID_IMPORT_TOKEN = new InjectionToken('mermaid_import');

class AnalogMarkdownRouteComponent {
    constructor() {
        this.sanitizer = inject(DomSanitizer);
        this.route = inject(ActivatedRoute);
        this.contentRenderer = inject(ContentRenderer);
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.route.snapshot.data['renderedAnalogContent']);
        this.classes = 'analog-markdown-route';
    }
    ngAfterViewChecked() {
        this.contentRenderer.enhance();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnalogMarkdownRouteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: AnalogMarkdownRouteComponent, isStandalone: true, selector: "analog-markdown-route", inputs: { classes: "classes" }, hostDirectives: [{ directive: AnchorNavigationDirective }], ngImport: i0, template: `<div [innerHTML]="content" [class]="classes"></div>`, isInline: true, encapsulation: i0.ViewEncapsulation.None, preserveWhitespaces: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnalogMarkdownRouteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'analog-markdown-route',
                    standalone: true,
                    imports: [AsyncPipe],
                    hostDirectives: [AnchorNavigationDirective],
                    preserveWhitespaces: true,
                    encapsulation: ViewEncapsulation.None,
                    template: `<div [innerHTML]="content" [class]="classes"></div>`,
                }]
        }], propDecorators: { classes: [{
                type: Input
            }] } });

class AnalogMarkdownComponent {
    constructor() {
        this.sanitizer = inject(DomSanitizer);
        this.route = inject(ActivatedRoute);
        this.zone = inject(NgZone);
        this.platformId = inject(PLATFORM_ID);
        this.mermaidImport = inject(MERMAID_IMPORT_TOKEN, {
            optional: true,
        });
        this.content$ = of('');
        this.classes = 'analog-markdown';
        this.contentRenderer = inject(ContentRenderer);
        if (isPlatformBrowser(this.platformId) && this.mermaidImport) {
            // Mermaid can only be loaded on client side
            this.loadMermaid(this.mermaidImport);
        }
    }
    ngOnInit() {
        this.updateContent();
    }
    ngOnChanges() {
        this.updateContent();
    }
    updateContent() {
        this.content$ = this.route.data.pipe(map((data) => this.content ?? data['_analogContent']), mergeMap((contentString) => this.renderContent(contentString)), map((content) => this.sanitizer.bypassSecurityTrustHtml(content)), catchError((e) => of(`There was an error ${e}`)));
    }
    async renderContent(content) {
        return this.contentRenderer.render(content);
    }
    ngAfterViewChecked() {
        this.contentRenderer.enhance();
        this.zone.runOutsideAngular(() => this.mermaid?.default.run());
    }
    loadMermaid(mermaidImport) {
        this.zone.runOutsideAngular(() => 
        // Wrap into an observable to avoid redundant initialization once
        // the markdown component is destroyed before the promise is resolved.
        from(mermaidImport)
            .pipe(takeUntilDestroyed())
            .subscribe((mermaid) => {
            this.mermaid = mermaid;
            this.mermaid.default.initialize({ startOnLoad: false });
            // Explicitly running mermaid as ngAfterViewChecked
            // has probably already been called
            this.mermaid?.default.run();
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnalogMarkdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: AnalogMarkdownComponent, isStandalone: true, selector: "analog-markdown", inputs: { content: "content", classes: "classes" }, usesOnChanges: true, hostDirectives: [{ directive: AnchorNavigationDirective }], ngImport: i0, template: `<div [innerHTML]="content$ | async" [class]="classes"></div>`, isInline: true, dependencies: [{ kind: "pipe", type: AsyncPipe, name: "async" }], encapsulation: i0.ViewEncapsulation.None, preserveWhitespaces: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnalogMarkdownComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'analog-markdown',
                    standalone: true,
                    imports: [AsyncPipe],
                    hostDirectives: [AnchorNavigationDirective],
                    preserveWhitespaces: true,
                    encapsulation: ViewEncapsulation.None,
                    template: `<div [innerHTML]="content$ | async" [class]="classes"></div>`,
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { content: [{
                type: Input
            }], classes: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { AnchorNavigationDirective, ContentRenderer, AnalogMarkdownComponent as MarkdownComponent, MarkdownContentRendererService, AnalogMarkdownRouteComponent as MarkdownRouteComponent, injectContent, injectContentFiles, parseRawContentFile, provideContent, withMarkdownRenderer };
//# sourceMappingURL=analogjs-content.mjs.map
