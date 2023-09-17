import { InjectionToken, Provider } from '@angular/core';
import { ContentRenderer } from './content-renderer';
import * as i0 from "@angular/core";
export declare class MarkdownContentRendererService implements ContentRenderer {
    #private;
    platformId: Object;
    render(content: string): Promise<string>;
    enhance(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkdownContentRendererService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MarkdownContentRendererService>;
}
export interface MarkdownRendererOptions {
    loadMermaid?: () => Promise<typeof import('mermaid')>;
}
export declare function withMarkdownRenderer(options?: MarkdownRendererOptions): Provider;
export declare function provideContent(...features: Provider[]): Provider[];
export declare const MERMAID_IMPORT_TOKEN: InjectionToken<Promise<typeof import("mermaid")>>;
