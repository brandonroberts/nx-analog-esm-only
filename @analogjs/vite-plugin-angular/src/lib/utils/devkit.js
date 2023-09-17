import * as wbl from '@angular-devkit/build-angular/src/tools/babel/webpack-loader.js';
import * as app from '@angular-devkit/build-angular/src/tools/babel/presets/application.js';
let requiresLinking;
/**
 * Workaround for compatibility with Angular 16.2+
 */
if (typeof wbl['requiresLinking'] !== 'undefined') {
    requiresLinking = wbl.requiresLinking;
}
else if (typeof app['requiresLinking'] !== 'undefined') {
    requiresLinking = app['requiresLinking'];
}
const angularApplicationPreset = app.default;
import { createJitResourceTransformer } from '@angular-devkit/build-angular/src/tools/esbuild/angular/jit-resource-transformer.js';
import { JavaScriptTransformer } from '@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer.js';
import { SourceFileCache } from '@angular-devkit/build-angular/src/tools/esbuild/angular/compiler-plugin.js';
export { requiresLinking, angularApplicationPreset, createJitResourceTransformer, JavaScriptTransformer, SourceFileCache, };
//# sourceMappingURL=devkit.js.map