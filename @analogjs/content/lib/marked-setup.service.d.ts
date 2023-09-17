import { marked } from 'marked';
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import * as i0 from "@angular/core";
export declare class MarkedSetupService {
    private readonly marked;
    constructor();
    getMarkedInstance(): typeof marked;
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkedSetupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MarkedSetupService>;
}
