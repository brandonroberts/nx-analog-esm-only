import { Plugin } from 'vite';
import * as ts from 'typescript';
export interface PluginOptions {
    tsconfig?: string;
    workspaceRoot?: string;
    inlineStylesExtension?: string;
    jit?: boolean;
    advanced?: {
        /**
         * Custom TypeScript transformers that are run before Angular compilation
         */
        tsTransformers?: ts.CustomTransformers;
    };
    supportedBrowsers?: string[];
    transformFilter?: (code: string, id: string) => boolean;
}
interface EmitFileResult {
    content?: string;
    map?: string;
    dependencies: readonly string[];
    hash?: Uint8Array;
}
type FileEmitter = (file: string) => Promise<EmitFileResult | undefined>;
export declare function angular(options?: PluginOptions): Plugin[];
export declare function createFileEmitter(program: ts.BuilderProgram, transformers?: ts.CustomTransformers, onAfterEmit?: (sourceFile: ts.SourceFile) => void): FileEmitter;
export {};
