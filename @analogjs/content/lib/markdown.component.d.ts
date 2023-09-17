import { AfterViewChecked, OnChanges, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ContentRenderer } from './content-renderer';
import * as i0 from "@angular/core";
import * as i1 from "./anchor-navigation.directive";
export default class AnalogMarkdownComponent implements OnInit, OnChanges, AfterViewChecked {
    private sanitizer;
    private route;
    private zone;
    private readonly platformId;
    private readonly mermaidImport;
    private mermaid;
    content$: Observable<SafeHtml>;
    content: string | undefined | null;
    classes: string;
    contentRenderer: ContentRenderer;
    constructor();
    ngOnInit(): void;
    ngOnChanges(): void;
    updateContent(): void;
    renderContent(content: string): Promise<string>;
    ngAfterViewChecked(): void;
    private loadMermaid;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnalogMarkdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AnalogMarkdownComponent, "analog-markdown", never, { "content": { "alias": "content"; "required": false; }; "classes": { "alias": "classes"; "required": false; }; }, {}, never, never, true, [{ directive: typeof i1.AnchorNavigationDirective; inputs: {}; outputs: {}; }]>;
}
