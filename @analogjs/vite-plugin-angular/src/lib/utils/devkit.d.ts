import * as app from '@angular-devkit/build-angular/src/tools/babel/presets/application.js';
declare let requiresLinking: Function;
declare const angularApplicationPreset: typeof app.default;
import { createJitResourceTransformer } from '@angular-devkit/build-angular/src/tools/esbuild/angular/jit-resource-transformer.js';
import { CompilerPluginOptions } from '@angular-devkit/build-angular/src/tools/esbuild/angular/compiler-plugin.js';
import { JavaScriptTransformer } from '@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer.js';
import { SourceFileCache } from '@angular-devkit/build-angular/src/tools/esbuild/angular/compiler-plugin.js';
export { requiresLinking, angularApplicationPreset, createJitResourceTransformer, CompilerPluginOptions, JavaScriptTransformer, SourceFileCache, };
