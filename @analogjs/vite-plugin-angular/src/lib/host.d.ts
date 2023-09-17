import * as ts from 'typescript';
export declare function augmentHostWithResources(host: ts.CompilerHost, transform: (code: string, id: string, options?: {
    ssr?: boolean;
}) => ReturnType<any> | null, options?: {
    inlineStylesExtension?: string;
}): void;
