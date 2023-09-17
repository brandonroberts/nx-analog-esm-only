import { __awaiter } from "tslib";
import { transformAsync } from '@babel/core';
import { createEs2015LinkerPlugin as linkerPluginCreator } from '@angular/compiler-cli/linker/babel';
import { angularApplicationPreset, requiresLinking } from './utils/devkit.js';
export function buildOptimizerPlugin({ isProd, supportedBrowsers, }) {
    return {
        name: '@analogjs/vite-plugin-angular-optimizer',
        apply: 'build',
        config() {
            return {
                esbuild: {
                    legalComments: 'none',
                    keepNames: false,
                    define: isProd
                        ? {
                            ngDevMode: 'false',
                            ngJitMode: 'false',
                            ngI18nClosureMode: 'false',
                        }
                        : undefined,
                    supported: {
                        // Native async/await is not supported with Zone.js. Disabling support here will cause
                        // esbuild to downlevel async/await to a Zone.js supported form.
                        'async-await': false,
                        // Zone.js also does not support async generators or async iterators. However, esbuild does
                        // not currently support downleveling either of them. Instead babel is used within the JS/TS
                        // loader to perform the downlevel transformation. They are both disabled here to allow
                        // esbuild to handle them in the future if support is ever added.
                        // NOTE: If esbuild adds support in the future, the babel support for these can be disabled.
                        'async-generator': false,
                        'for-await': false,
                        'class-field': false,
                        'class-static-field': false,
                    },
                },
            };
        },
        transform(code, id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (/\.[cm]?js$/.test(id)) {
                    const angularPackage = /[\\/]node_modules[\\/]@angular[\\/]/.test(id);
                    const forceAsyncTransformation = !/[\\/][_f]?esm2015[\\/]/.test(id) &&
                        /for\s+await\s*\(|async\s+function\s*\*/.test(code);
                    const shouldLink = yield requiresLinking(id, code);
                    const useInputSourcemap = (!isProd ? undefined : false);
                    if (!forceAsyncTransformation && !isProd && !shouldLink) {
                        return {
                            code: isProd
                                ? code.replace(/^\/\/# sourceMappingURL=[^\r\n]*/gm, '')
                                : code,
                        };
                    }
                    const result = yield transformAsync(code, {
                        filename: id,
                        inputSourceMap: useInputSourcemap,
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
                                    angularLinker: {
                                        shouldLink,
                                        jitMode: false,
                                        linkerPluginCreator,
                                    },
                                    forceAsyncTransformation,
                                    supportedBrowsers,
                                    optimize: isProd && {
                                        looseEnums: angularPackage,
                                        pureTopLevel: angularPackage,
                                    },
                                },
                            ],
                        ],
                    });
                    return {
                        code: (result === null || result === void 0 ? void 0 : result.code) || '',
                        map: result === null || result === void 0 ? void 0 : result.map,
                    };
                }
                return;
            });
        },
    };
}
//# sourceMappingURL=angular-build-optimizer-plugin.js.map