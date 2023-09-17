import * as i0 from "@angular/core";
export declare abstract class ContentRenderer {
    render(content: string): Promise<string>;
    enhance(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContentRenderer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContentRenderer>;
}
