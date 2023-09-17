/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import type { DepOptimizationConfig } from 'vite';
import { CompilerPluginOptions } from './utils/devkit.js';
type EsbuildOptions = NonNullable<DepOptimizationConfig['esbuildOptions']>;
type EsbuildPlugin = NonNullable<EsbuildOptions['plugins']>[number];
export declare function createCompilerPlugin(pluginOptions: CompilerPluginOptions): EsbuildPlugin;
export {};
