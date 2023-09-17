import { AfterViewChecked } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ContentRenderer } from './content-renderer';
import * as i0 from "@angular/core";
import * as i1 from "./anchor-navigation.directive";
export default class AnalogMarkdownRouteComponent implements AfterViewChecked {
    private sanitizer;
    private route;
    contentRenderer: ContentRenderer;
    protected content: SafeHtml;
    classes: string;
    ngAfterViewChecked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnalogMarkdownRouteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AnalogMarkdownRouteComponent, "analog-markdown-route", never, { "classes": { "alias": "classes"; "required": false; }; }, {}, never, never, true, [{ directive: typeof i1.AnchorNavigationDirective; inputs: {}; outputs: {}; }]>;
}
