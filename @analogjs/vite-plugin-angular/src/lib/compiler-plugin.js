/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __awaiter } from "tslib";
import { JavaScriptTransformer, } from './utils/devkit.js';
export function createCompilerPlugin(pluginOptions) {
    return {
        name: 'analogjs-angular-esbuild-deps-optimizer-plugin',
        setup(build) {
            return __awaiter(this, void 0, void 0, function* () {
                const javascriptTransformer = new JavaScriptTransformer(pluginOptions, 1);
                build.onLoad({ filter: /\.[cm]?js$/ }, (args) => __awaiter(this, void 0, void 0, function* () {
                    const contents = yield javascriptTransformer.transformFile(args.path);
                    return {
                        contents,
                        loader: 'js',
                    };
                }));
                build.onEnd(() => javascriptTransformer.close());
            });
        },
    };
}
//# sourceMappingURL=compiler-plugin.js.map