import { __awaiter } from "tslib";
import { build, createDevServer, createNitro, prepare, } from 'nitropack';
import { toNodeListener } from 'h3';
import { normalizePath } from 'vite';
import * as path from 'path';
import { buildServer } from './build-server.js';
import { buildSSRApp } from './build-ssr.js';
import { pageEndpointsPlugin } from './plugins/page-endpoints.js';
import { getPageHandlers } from './utils/get-page-handlers.js';
import { buildSitemap } from './build-sitemap.js';
import { devServerPlugin } from './plugins/dev-server-plugin.js';
let clientOutputPath = '';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
export function nitro(options, nitroOptions) {
    var _a, _b;
    const workspaceRoot = process.cwd();
    const isTest = process.env['NODE_ENV'] === 'test' || !!process.env['VITEST'];
    const apiPrefix = `/${(_b = (_a = nitroOptions === null || nitroOptions === void 0 ? void 0 : nitroOptions.runtimeConfig) === null || _a === void 0 ? void 0 : _a['apiPrefix']) !== null && _b !== void 0 ? _b : 'api'}`;
    let isBuild = false;
    let isServe = false;
    let ssrBuild = false;
    let config;
    let nitroConfig;
    return [
        ((options === null || options === void 0 ? void 0 : options.ssr)
            ? devServerPlugin({ entryServer: options === null || options === void 0 ? void 0 : options.entryServer })
            : false),
        {
            name: '@analogjs/vite-nitro-plugin',
            config(_config, { command }) {
                var _a, _b, _c, _d, _e, _f;
                return __awaiter(this, void 0, void 0, function* () {
                    isServe = command === 'serve';
                    isBuild = command === 'build';
                    ssrBuild = ((_a = _config.build) === null || _a === void 0 ? void 0 : _a.ssr) === true;
                    config = _config;
                    const rootDir = config.root || '.';
                    const buildPreset = (_b = process.env['BUILD_PRESET']) !== null && _b !== void 0 ? _b : nitroOptions === null || nitroOptions === void 0 ? void 0 : nitroOptions.preset;
                    const pageHandlers = getPageHandlers({ workspaceRoot, rootDir });
                    nitroConfig = {
                        rootDir,
                        preset: buildPreset,
                        logLevel: (nitroOptions === null || nitroOptions === void 0 ? void 0 : nitroOptions.logLevel) || 0,
                        srcDir: normalizePath(`${rootDir}/src/server`),
                        scanDirs: [normalizePath(`${rootDir}/src/server`)],
                        output: Object.assign({ dir: normalizePath(path.resolve(workspaceRoot, 'dist', rootDir, 'analog')), publicDir: normalizePath(path.resolve(workspaceRoot, 'dist', rootDir, 'analog/public')) }, nitroOptions === null || nitroOptions === void 0 ? void 0 : nitroOptions.output),
                        buildDir: normalizePath(path.resolve(workspaceRoot, 'dist', rootDir, '.nitro')),
                        typescript: {
                            generateTsConfig: false,
                        },
                        alias: {
                            '#analog/index': normalizePath(path.resolve(workspaceRoot, 'dist', rootDir, 'client/index.html')),
                            '#analog/ssr': normalizePath(path.resolve(workspaceRoot, 'dist', rootDir, 'ssr/main.server.mjs')),
                        },
                        runtimeConfig: Object.assign({}, nitroOptions === null || nitroOptions === void 0 ? void 0 : nitroOptions.runtimeConfig),
                        rollupConfig: {
                            onwarn(warning) {
                                if (warning.message.includes('empty chunk') &&
                                    warning.message.endsWith('.server')) {
                                    return;
                                }
                            },
                            plugins: [pageEndpointsPlugin()],
                        },
                        handlers: [
                            {
                                handler: normalizePath(`${__dirname}/runtime/api-middleware`),
                                middleware: true,
                            },
                            ...pageHandlers,
                        ],
                    };
                    if (isVercelPreset(buildPreset)) {
                        nitroConfig = withVercelOutputAPI(nitroConfig, workspaceRoot);
                    }
                    if (!ssrBuild && !isTest) {
                        // store the client output path for the SSR build config
                        clientOutputPath = path.resolve(rootDir, ((_c = config.build) === null || _c === void 0 ? void 0 : _c.outDir) || 'dist/client');
                    }
                    nitroConfig.alias = Object.assign({ '#analog/ssr': normalizePath(path.resolve(workspaceRoot, 'dist', rootDir, 'ssr/main.server')), '#analog/index': normalizePath(path.resolve(clientOutputPath, 'index.html')) }, nitroOptions === null || nitroOptions === void 0 ? void 0 : nitroOptions.alias);
                    if (isBuild) {
                        if (isEmptyPrerenderRoutes(options)) {
                            nitroConfig.prerender = {};
                            nitroConfig.prerender.routes = ['/'];
                        }
                        if (options === null || options === void 0 ? void 0 : options.prerender) {
                            nitroConfig.prerender = (_d = nitroConfig.prerender) !== null && _d !== void 0 ? _d : {};
                            nitroConfig.prerender.crawlLinks = (_e = options === null || options === void 0 ? void 0 : options.prerender) === null || _e === void 0 ? void 0 : _e.discover;
                            const prerenderRoutes = (_f = options === null || options === void 0 ? void 0 : options.prerender) === null || _f === void 0 ? void 0 : _f.routes;
                            if (isArrayWithElements(prerenderRoutes)) {
                                nitroConfig.prerender.routes = prerenderRoutes;
                            }
                            else if (typeof prerenderRoutes === 'function') {
                                nitroConfig.prerender.routes = yield prerenderRoutes();
                            }
                        }
                        if (ssrBuild) {
                            nitroConfig = Object.assign(Object.assign({}, nitroConfig), { publicAssets: [{ dir: clientOutputPath }], serverAssets: [
                                    {
                                        baseName: 'public',
                                        dir: clientOutputPath,
                                    },
                                ], externals: {
                                    inline: ['zone.js/node'],
                                    external: ['rxjs', 'node-fetch-native/dist/polyfill', 'destr'],
                                }, moduleSideEffects: ['zone.js/node'], renderer: normalizePath(`${__dirname}/runtime/renderer`), handlers: [
                                    {
                                        handler: normalizePath(`${__dirname}/runtime/api-middleware`),
                                        middleware: true,
                                    },
                                    ...pageHandlers,
                                ] });
                        }
                    }
                    nitroConfig = Object.assign(Object.assign({}, nitroConfig), nitroOptions);
                });
            },
            configureServer(viteServer) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (isServe && !isTest) {
                        const nitro = yield createNitro(Object.assign({ dev: true }, nitroConfig));
                        const server = createDevServer(nitro);
                        yield prepare(nitro);
                        yield build(nitro);
                        viteServer.middlewares.use(apiPrefix, toNodeListener(server.app));
                        console.log(`\n\nThe server endpoints are accessible under the "${apiPrefix}" path.`);
                    }
                });
            },
            closeBundle() {
                var _a, _b;
                return __awaiter(this, void 0, void 0, function* () {
                    if (ssrBuild) {
                        return;
                    }
                    if (isBuild) {
                        if (options === null || options === void 0 ? void 0 : options.ssr) {
                            console.log('Building SSR application...');
                            yield buildSSRApp(config, options);
                        }
                        yield buildServer(options, nitroConfig);
                        if ((_a = options === null || options === void 0 ? void 0 : options.prerender) === null || _a === void 0 ? void 0 : _a.sitemap) {
                            console.log('Building Sitemap...');
                            // sitemap needs to be built after all directories are built
                            yield buildSitemap(config, options.prerender.sitemap, options.prerender.routes, (_b = nitroConfig.output) === null || _b === void 0 ? void 0 : _b.publicDir);
                        }
                        console.log(`\n\nThe '@analogjs/platform' server has been successfully built.`);
                    }
                });
            },
        },
    ];
}
function isEmptyPrerenderRoutes(options) {
    var _a, _b;
    if (!options || isArrayWithElements((_a = options === null || options === void 0 ? void 0 : options.prerender) === null || _a === void 0 ? void 0 : _a.routes)) {
        return false;
    }
    return !((_b = options.prerender) === null || _b === void 0 ? void 0 : _b.routes);
}
function isArrayWithElements(arr) {
    return !!(Array.isArray(arr) && arr.length);
}
const isVercelPreset = (buildPreset) => process.env['VERCEL'] ||
    (buildPreset && buildPreset.toLowerCase().includes('vercel'));
const withVercelOutputAPI = (nitroConfig, workspaceRoot) => (Object.assign(Object.assign({}, nitroConfig), { output: Object.assign(Object.assign({}, nitroConfig === null || nitroConfig === void 0 ? void 0 : nitroConfig.output), { dir: normalizePath(path.resolve(workspaceRoot, '.vercel', 'output')), publicDir: normalizePath(path.resolve(workspaceRoot, '.vercel', 'output/static')) }) }));
//# sourceMappingURL=vite-plugin-nitro.js.map