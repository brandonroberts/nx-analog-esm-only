import { __awaiter } from "tslib";
import { transformAsync } from '@babel/core';
import * as compilerCli from '@angular/compiler-cli';
import * as path from 'node:path';
import { createRequire } from 'node:module';
import { createCompilerPlugin } from './compiler-plugin.js';
import { hasStyleUrls, hasTemplateUrl, StyleUrlsResolver, TemplateUrlsResolver, } from './component-resolvers.js';
import { augmentHostWithResources } from './host.js';
import { jitPlugin } from './angular-jit-plugin.js';
import { buildOptimizerPlugin } from './angular-build-optimizer-plugin.js';
import { angularApplicationPreset, createJitResourceTransformer, SourceFileCache, } from './utils/devkit.js';
const require = createRequire(import.meta.url);
/**
 * TypeScript file extension regex
 * Match .(c or m)ts, .ts extensions with an optional ? for query params
 * Ignore .tsx extensions
 */
const TS_EXT_REGEX = /\.[cm]?ts[^x]?\??/;
export function angular(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    /**
     * Normalize plugin options so defaults
     * are used for values not provided.
     */
    const pluginOptions = {
        tsconfig: (_a = options === null || options === void 0 ? void 0 : options.tsconfig) !== null && _a !== void 0 ? _a : (process.env['NODE_ENV'] === 'test'
            ? './tsconfig.spec.json'
            : './tsconfig.app.json'),
        workspaceRoot: (_b = options === null || options === void 0 ? void 0 : options.workspaceRoot) !== null && _b !== void 0 ? _b : process.cwd(),
        inlineStylesExtension: (_c = options === null || options === void 0 ? void 0 : options.inlineStylesExtension) !== null && _c !== void 0 ? _c : 'css',
        advanced: {
            tsTransformers: {
                before: (_f = (_e = (_d = options === null || options === void 0 ? void 0 : options.advanced) === null || _d === void 0 ? void 0 : _d.tsTransformers) === null || _e === void 0 ? void 0 : _e.before) !== null && _f !== void 0 ? _f : [],
                after: (_j = (_h = (_g = options === null || options === void 0 ? void 0 : options.advanced) === null || _g === void 0 ? void 0 : _g.tsTransformers) === null || _h === void 0 ? void 0 : _h.after) !== null && _j !== void 0 ? _j : [],
                afterDeclarations: (_m = (_l = (_k = options === null || options === void 0 ? void 0 : options.advanced) === null || _k === void 0 ? void 0 : _k.tsTransformers) === null || _l === void 0 ? void 0 : _l.afterDeclarations) !== null && _m !== void 0 ? _m : [],
            },
        },
        supportedBrowsers: (_o = options === null || options === void 0 ? void 0 : options.supportedBrowsers) !== null && _o !== void 0 ? _o : ['safari 15'],
        jit: options === null || options === void 0 ? void 0 : options.jit,
    };
    // The file emitter created during `onStart` that will be used during the build in `onLoad` callbacks for TS files
    let fileEmitter;
    let compilerOptions = {};
    // Temporary deep import for transformer support
    const { mergeTransformers, replaceBootstrap, } = require('@ngtools/webpack/src/ivy/transformation');
    const { augmentProgramWithVersioning, augmentHostWithCaching, } = require('@ngtools/webpack/src/ivy/host');
    const ts = require('typescript');
    let rootNames;
    let host;
    let nextProgram;
    let builderProgram;
    let watchMode = false;
    const sourceFileCache = new SourceFileCache();
    const isProd = process.env['NODE_ENV'] === 'production';
    const isTest = process.env['NODE_ENV'] === 'test' || !!process.env['VITEST'];
    const jit = typeof (pluginOptions === null || pluginOptions === void 0 ? void 0 : pluginOptions.jit) !== 'undefined' ? pluginOptions.jit : isTest;
    let viteServer;
    let cssPlugin;
    let styleTransform;
    const styleUrlsResolver = new StyleUrlsResolver();
    const templateUrlsResolver = new TemplateUrlsResolver();
    function angularPlugin() {
        return {
            name: '@analogjs/vite-plugin-angular',
            config(config, { command }) {
                var _a;
                return __awaiter(this, void 0, void 0, function* () {
                    watchMode = command === 'serve';
                    pluginOptions.tsconfig =
                        (_a = options === null || options === void 0 ? void 0 : options.tsconfig) !== null && _a !== void 0 ? _a : path.resolve(config.root || '.', process.env['NODE_ENV'] === 'test'
                            ? './tsconfig.spec.json'
                            : './tsconfig.app.json');
                    return {
                        optimizeDeps: {
                            include: ['rxjs/operators', 'rxjs'],
                            exclude: ['@angular/platform-server'],
                            esbuildOptions: {
                                plugins: [
                                    createCompilerPlugin({
                                        tsconfig: pluginOptions.tsconfig,
                                        sourcemap: !isProd,
                                        advancedOptimizations: isProd,
                                        jit,
                                    }),
                                ],
                                define: Object.assign({ ngJitMode: 'false', ngI18nClosureMode: 'false' }, (watchMode ? {} : { ngDevMode: 'false' })),
                            },
                        },
                        resolve: {
                            conditions: ['style'],
                        },
                    };
                });
            },
            configureServer(server) {
                viteServer = server;
                server.watcher.on('add', setupCompilation);
                server.watcher.on('unlink', setupCompilation);
            },
            buildStart({ plugins }) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (Array.isArray(plugins)) {
                        cssPlugin = plugins.find((plugin) => plugin.name === 'vite:css');
                    }
                    setupCompilation();
                    // Only store cache if in watch mode
                    if (watchMode) {
                        augmentHostWithCaching(host, sourceFileCache);
                    }
                    yield buildAndAnalyze();
                });
            },
            handleHotUpdate(ctx) {
                return __awaiter(this, void 0, void 0, function* () {
                    // The `handleHotUpdate` hook may be called before the `buildStart`,
                    // which sets the compilation. As a result, the `host` may not be available
                    // yet for use, leading to build errors such as "cannot read properties of undefined"
                    // (because `host` is undefined).
                    if (!host) {
                        return;
                    }
                    if (TS_EXT_REGEX.test(ctx.file)) {
                        sourceFileCache.invalidate([ctx.file.replace(/\?(.*)/, '')]);
                        yield buildAndAnalyze();
                    }
                    if (/\.(html|htm|css|less|sass|scss)$/.test(ctx.file)) {
                        /**
                         * Check to see if this was a direct request
                         * for an external resource (styles, html).
                         */
                        const isDirect = ctx.modules.find((mod) => { var _a; return ctx.file === mod.file && ((_a = mod.id) === null || _a === void 0 ? void 0 : _a.includes('?direct')); });
                        if (isDirect) {
                            return ctx.modules;
                        }
                        const mods = [];
                        ctx.modules.forEach((mod) => {
                            mod.importers.forEach((imp) => {
                                sourceFileCache.invalidate([imp.id]);
                                ctx.server.moduleGraph.invalidateModule(imp);
                                mods.push(imp);
                            });
                        });
                        yield buildAndAnalyze();
                        return mods;
                    }
                    return ctx.modules;
                });
            },
            transform(code, id) {
                var _a, _b, _c;
                return __awaiter(this, void 0, void 0, function* () {
                    // Skip transforming node_modules
                    if (id.includes('node_modules')) {
                        return;
                    }
                    /**
                     * Check for options.transformFilter
                     */
                    if (options === null || options === void 0 ? void 0 : options.transformFilter) {
                        if (!((_a = options === null || options === void 0 ? void 0 : options.transformFilter(code, id)) !== null && _a !== void 0 ? _a : true)) {
                            return;
                        }
                    }
                    /**
                     * Check for .ts extenstions for inline script files being
                     * transformed (Astro).
                     *
                     * Example ID:
                     *
                     * /src/pages/index.astro?astro&type=script&index=0&lang.ts
                     */
                    if (id.includes('type=script')) {
                        return;
                    }
                    if (TS_EXT_REGEX.test(id)) {
                        if (id.includes('.ts?')) {
                            // Strip the query string off the ID
                            // in case of a dynamically loaded file
                            id = id.replace(/\?(.*)/, '');
                        }
                        /**
                         * Re-analyze on each transform
                         * for test(Vitest)
                         */
                        if (isTest) {
                            const tsMod = viteServer === null || viteServer === void 0 ? void 0 : viteServer.moduleGraph.getModuleById(id);
                            if (tsMod) {
                                sourceFileCache.invalidate([id]);
                                yield buildAndAnalyze();
                            }
                        }
                        let templateUrls = [];
                        let styleUrls = [];
                        if (hasTemplateUrl(code)) {
                            templateUrls = templateUrlsResolver.resolve(code, id);
                        }
                        if (hasStyleUrls(code)) {
                            styleUrls = styleUrlsResolver.resolve(code, id);
                        }
                        if (watchMode) {
                            for (const urlSet of [...templateUrls, ...styleUrls]) {
                                // `urlSet` is a string where a relative path is joined with an
                                // absolute path using the `|` symbol.
                                // For example: `./app.component.html|/home/projects/analog/src/app/app.component.html`.
                                const [, absoluteFileUrl] = urlSet.split('|');
                                this.addWatchFile(absoluteFileUrl);
                            }
                        }
                        const typescriptResult = yield fileEmitter(id);
                        // return fileEmitter
                        let data = (_b = typescriptResult === null || typescriptResult === void 0 ? void 0 : typescriptResult.content) !== null && _b !== void 0 ? _b : '';
                        if (jit && data.includes('angular:jit:')) {
                            data = data.replace(/angular:jit:style:inline;/g, 'virtual:angular:jit:style:inline;');
                            templateUrls.forEach((templateUrlSet) => {
                                const [templateFile, resolvedTemplateUrl] = templateUrlSet.split('|');
                                data = data.replace(`angular:jit:template:file;${templateFile}`, `${resolvedTemplateUrl}?raw`);
                            });
                            styleUrls.forEach((styleUrlSet) => {
                                const [styleFile, resolvedStyleUrl] = styleUrlSet.split('|');
                                data = data.replace(`angular:jit:style:file;${styleFile}`, `${resolvedStyleUrl}?inline`);
                            });
                        }
                        if (jit) {
                            return {
                                code: data.replace(/^\/\/# sourceMappingURL=[^\r\n]*/gm, ''),
                            };
                        }
                        const forceAsyncTransformation = /for\s+await\s*\(|async\s+function\s*\*/.test(data);
                        const useInputSourcemap = (!isProd ? undefined : false);
                        if (!forceAsyncTransformation && !isProd) {
                            return {
                                code: data.replace(/^\/\/# sourceMappingURL=[^\r\n]*/gm, ''),
                            };
                        }
                        const babelResult = yield transformAsync(data, {
                            filename: id,
                            inputSourceMap: (useInputSourcemap
                                ? undefined
                                : false),
                            sourceMaps: !isProd ? 'inline' : false,
                            compact: false,
                            configFile: false,
                            babelrc: false,
                            browserslistConfigFile: false,
                            plugins: [],
                            presets: [
                                [
                                    angularApplicationPreset,
                                    {
                                        supportedBrowsers: pluginOptions.supportedBrowsers,
                                        forceAsyncTransformation,
                                        optimize: isProd && {},
                                    },
                                ],
                            ],
                        });
                        return {
                            code: (_c = babelResult === null || babelResult === void 0 ? void 0 : babelResult.code) !== null && _c !== void 0 ? _c : '',
                            map: babelResult === null || babelResult === void 0 ? void 0 : babelResult.map,
                        };
                    }
                    return undefined;
                });
            },
        };
    }
    return [
        angularPlugin(),
        (jit &&
            jitPlugin({
                inlineStylesExtension: pluginOptions.inlineStylesExtension,
            })),
        buildOptimizerPlugin({
            isProd,
            supportedBrowsers: pluginOptions.supportedBrowsers,
        }),
    ].filter(Boolean);
    function setupCompilation() {
        const { options: tsCompilerOptions, rootNames: rn } = compilerCli.readConfiguration(pluginOptions.tsconfig, {
            enableIvy: true,
            noEmitOnError: false,
            suppressOutputPathCheck: true,
            outDir: undefined,
            inlineSources: !isProd,
            inlineSourceMap: !isProd,
            sourceMap: false,
            mapRoot: undefined,
            sourceRoot: undefined,
            declaration: false,
            declarationMap: false,
            allowEmptyCodegenFiles: false,
            annotationsAs: 'decorators',
            enableResourceInlining: false,
        });
        rootNames = rn;
        compilerOptions = tsCompilerOptions;
        host = ts.createIncrementalCompilerHost(compilerOptions);
        styleTransform = watchMode
            ? viteServer.pluginContainer.transform
            : cssPlugin.transform;
        if (!jit) {
            augmentHostWithResources(host, styleTransform, {
                inlineStylesExtension: pluginOptions.inlineStylesExtension,
            });
        }
    }
    /**
     * Creates a new NgtscProgram to analyze/re-analyze
     * the source files and create a file emitter.
     * This is shared between an initial build and a hot update.
     */
    function buildAndAnalyze() {
        return __awaiter(this, void 0, void 0, function* () {
            let builder;
            let typeScriptProgram;
            let angularCompiler;
            if (!jit) {
                // Create the Angular specific program that contains the Angular compiler
                const angularProgram = new compilerCli.NgtscProgram(rootNames, compilerOptions, host, nextProgram);
                angularCompiler = angularProgram.compiler;
                typeScriptProgram = angularProgram.getTsProgram();
                augmentProgramWithVersioning(typeScriptProgram);
                builder = builderProgram =
                    ts.createEmitAndSemanticDiagnosticsBuilderProgram(typeScriptProgram, host, builderProgram);
                yield angularCompiler.analyzeAsync();
                nextProgram = angularProgram;
            }
            else {
                builder = builderProgram =
                    ts.createEmitAndSemanticDiagnosticsBuilderProgram(rootNames, compilerOptions, host, nextProgram);
                typeScriptProgram = builder.getProgram();
                nextProgram = builderProgram;
            }
            if (!watchMode) {
                // When not in watch mode, the startup cost of the incremental analysis can be avoided by
                // using an abstract builder that only wraps a TypeScript program.
                builder = ts.createAbstractBuilder(typeScriptProgram, host);
            }
            const getTypeChecker = () => builder.getProgram().getTypeChecker();
            fileEmitter = createFileEmitter(builder, mergeTransformers({
                before: [
                    replaceBootstrap(getTypeChecker),
                    ...(jit
                        ? [
                            compilerCli.constructorParametersDownlevelTransform(builder.getProgram()),
                            createJitResourceTransformer(getTypeChecker),
                        ]
                        : []),
                    ...pluginOptions.advanced.tsTransformers.before,
                ],
                after: pluginOptions.advanced.tsTransformers.after,
                afterDeclarations: pluginOptions.advanced.tsTransformers.afterDeclarations,
            }, jit ? {} : angularCompiler.prepareEmit().transformers), () => []);
        });
    }
}
export function createFileEmitter(program, transformers = {}, onAfterEmit) {
    return (file) => __awaiter(this, void 0, void 0, function* () {
        const sourceFile = program.getSourceFile(file);
        if (!sourceFile) {
            return undefined;
        }
        let content;
        program.emit(sourceFile, (filename, data) => {
            if (/\.[cm]?js$/.test(filename)) {
                content = data;
            }
        }, undefined /* cancellationToken */, undefined /* emitOnlyDtsFiles */, transformers);
        onAfterEmit === null || onAfterEmit === void 0 ? void 0 : onAfterEmit(sourceFile);
        return { content, dependencies: [] };
    });
}
//# sourceMappingURL=angular-vite-plugin.js.map