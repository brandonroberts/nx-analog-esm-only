import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Component, Input, NgZone, PLATFORM_ID, ViewEncapsulation, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AnchorNavigationDirective } from './anchor-navigation.directive';
import { ContentRenderer } from './content-renderer';
import { MERMAID_IMPORT_TOKEN } from './markdown-content-renderer.service';
import * as i0 from "@angular/core";
import * as i1 from "./anchor-navigation.directive";
class AnalogMarkdownComponent {
    constructor() {
        this.sanitizer = inject(DomSanitizer);
        this.route = inject(ActivatedRoute);
        this.zone = inject(NgZone);
        this.platformId = inject(PLATFORM_ID);
        this.mermaidImport = inject(MERMAID_IMPORT_TOKEN, {
            optional: true,
        });
        this.content$ = of('');
        this.classes = 'analog-markdown';
        this.contentRenderer = inject(ContentRenderer);
        if (isPlatformBrowser(this.platformId) && this.mermaidImport) {
            // Mermaid can only be loaded on client side
            this.loadMermaid(this.mermaidImport);
        }
    }
    ngOnInit() {
        this.updateContent();
    }
    ngOnChanges() {
        this.updateContent();
    }
    updateContent() {
        this.content$ = this.route.data.pipe(map((data) => this.content ?? data['_analogContent']), mergeMap((contentString) => this.renderContent(contentString)), map((content) => this.sanitizer.bypassSecurityTrustHtml(content)), catchError((e) => of(`There was an error ${e}`)));
    }
    async renderContent(content) {
        return this.contentRenderer.render(content);
    }
    ngAfterViewChecked() {
        this.contentRenderer.enhance();
        this.zone.runOutsideAngular(() => this.mermaid?.default.run());
    }
    loadMermaid(mermaidImport) {
        this.zone.runOutsideAngular(() => 
        // Wrap into an observable to avoid redundant initialization once
        // the markdown component is destroyed before the promise is resolved.
        from(mermaidImport)
            .pipe(takeUntilDestroyed())
            .subscribe((mermaid) => {
            this.mermaid = mermaid;
            this.mermaid.default.initialize({ startOnLoad: false });
            // Explicitly running mermaid as ngAfterViewChecked
            // has probably already been called
            this.mermaid?.default.run();
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnalogMarkdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: AnalogMarkdownComponent, isStandalone: true, selector: "analog-markdown", inputs: { content: "content", classes: "classes" }, usesOnChanges: true, hostDirectives: [{ directive: i1.AnchorNavigationDirective }], ngImport: i0, template: `<div [innerHTML]="content$ | async" [class]="classes"></div>`, isInline: true, dependencies: [{ kind: "pipe", type: AsyncPipe, name: "async" }], encapsulation: i0.ViewEncapsulation.None, preserveWhitespaces: true }); }
}
export default AnalogMarkdownComponent;
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnalogMarkdownComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'analog-markdown',
                    standalone: true,
                    imports: [AsyncPipe],
                    hostDirectives: [AnchorNavigationDirective],
                    preserveWhitespaces: true,
                    encapsulation: ViewEncapsulation.None,
                    template: `<div [innerHTML]="content$ | async" [class]="classes"></div>`,
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { content: [{
                type: Input
            }], classes: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29udGVudC9zcmMvbGliL21hcmtkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0QsT0FBTyxFQUVMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsY0FBYyxFQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFjLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7QUFFM0UsTUFTcUIsdUJBQXVCO0lBbUIxQztRQWhCUSxjQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLFVBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0IsU0FBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNiLGVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsa0JBQWEsR0FBRyxNQUFNLENB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QUUsOERBQThEO2lCQUN6RTswRUFlVSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXN5bmNQaXBlLCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBQTEFURk9STV9JRCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWxEZXN0cm95ZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgRGF0YSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQW5jaG9yTmF2aWdhdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vYW5jaG9yLW5hdmlnYXRpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbnRlbnRSZW5kZXJlciB9IGZyb20gJy4vY29udGVudC1yZW5kZXJlcic7XG5pbXBvcnQgeyBNRVJNQUlEX0lNUE9SVF9UT0tFTiB9IGZyb20gJy4vbWFya2Rvd24tY29udGVudC1yZW5kZXJlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5hbG9nLW1hcmtkb3duJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0FzeW5jUGlwZV0sXG4gIGhvc3REaXJlY3RpdmVzOiBbQW5jaG9yTmF2aWdhdGlvbkRpcmVjdGl2ZV0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IHRydWUsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgPGRpdiBbaW5uZXJIVE1MXT1cImNvbnRlbnQkIHwgYXN5bmNcIiBbY2xhc3NdPVwiY2xhc3Nlc1wiPjwvZGl2PmAsXG59KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5hbG9nTWFya2Rvd25Db21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3Q2hlY2tlZFxue1xuICBwcml2YXRlIHNhbml0aXplciA9IGluamVjdChEb21TYW5pdGl6ZXIpO1xuICBwcml2YXRlIHJvdXRlID0gaW5qZWN0KEFjdGl2YXRlZFJvdXRlKTtcbiAgcHJpdmF0ZSB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZCA9IGluamVjdChQTEFURk9STV9JRCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWVybWFpZEltcG9ydCA9IGluamVjdChNRVJNQUlEX0lNUE9SVF9UT0tFTiwge1xuICAgIG9wdGlvbmFsOiB0cnVlLFxuICB9KTtcbiAgcHJpdmF0ZSBtZXJtYWlkOiB0eXBlb2YgaW1wb3J0KCdtZXJtYWlkJykgfCB1bmRlZmluZWQ7XG5cbiAgcHVibGljIGNvbnRlbnQkOiBPYnNlcnZhYmxlPFNhZmVIdG1sPiA9IG9mKCcnKTtcblxuICBASW5wdXQoKSBjb250ZW50ITogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgQElucHV0KCkgY2xhc3NlcyA9ICdhbmFsb2ctbWFya2Rvd24nO1xuXG4gIGNvbnRlbnRSZW5kZXJlciA9IGluamVjdChDb250ZW50UmVuZGVyZXIpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMubWVybWFpZEltcG9ydCkge1xuICAgICAgLy8gTWVybWFpZCBjYW4gb25seSBiZSBsb2FkZWQgb24gY2xpZW50IHNpZGVcbiAgICAgIHRoaXMubG9hZE1lcm1haWQodGhpcy5tZXJtYWlkSW1wb3J0KTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlQ29udGVudCgpO1xuICB9XG5cbiAgdXBkYXRlQ29udGVudCgpIHtcbiAgICB0aGlzLmNvbnRlbnQkID0gdGhpcy5yb3V0ZS5kYXRhLnBpcGUoXG4gICAgICBtYXA8RGF0YSwgc3RyaW5nPigoZGF0YSkgPT4gdGhpcy5jb250ZW50ID8/IGRhdGFbJ19hbmFsb2dDb250ZW50J10pLFxuICAgICAgbWVyZ2VNYXAoKGNvbnRlbnRTdHJpbmcpID0+IHRoaXMucmVuZGVyQ29udGVudChjb250ZW50U3RyaW5nKSksXG4gICAgICBtYXAoKGNvbnRlbnQpID0+IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGNvbnRlbnQpKSxcbiAgICAgIGNhdGNoRXJyb3IoKGUpID0+IG9mKGBUaGVyZSB3YXMgYW4gZXJyb3IgJHtlfWApKVxuICAgICk7XG4gIH1cblxuICBhc3luYyByZW5kZXJDb250ZW50KGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFJlbmRlcmVyLnJlbmRlcihjb250ZW50KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICB0aGlzLmNvbnRlbnRSZW5kZXJlci5lbmhhbmNlKCk7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMubWVybWFpZD8uZGVmYXVsdC5ydW4oKSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRNZXJtYWlkKG1lcm1haWRJbXBvcnQ6IFByb21pc2U8dHlwZW9mIGltcG9ydCgnbWVybWFpZCcpPikge1xuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgLy8gV3JhcCBpbnRvIGFuIG9ic2VydmFibGUgdG8gYXZvaWQgcmVkdW5kYW50IGluaXRpYWxpemF0aW9uIG9uY2VcbiAgICAgIC8vIHRoZSBtYXJrZG93biBjb21wb25lbnQgaXMgZGVzdHJveWVkIGJlZm9yZSB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZC5cbiAgICAgIGZyb20obWVybWFpZEltcG9ydClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKG1lcm1haWQpID0+IHtcbiAgICAgICAgICB0aGlzLm1lcm1haWQgPSBtZXJtYWlkO1xuICAgICAgICAgIHRoaXMubWVybWFpZC5kZWZhdWx0LmluaXRpYWxpemUoeyBzdGFydE9uTG9hZDogZmFsc2UgfSk7XG4gICAgICAgICAgLy8gRXhwbGljaXRseSBydW5uaW5nIG1lcm1haWQgYXMgbmdBZnRlclZpZXdDaGVja2VkXG4gICAgICAgICAgLy8gaGFzIHByb2JhYmx5IGFscmVhZHkgYmVlbiBjYWxsZWRcbiAgICAgICAgICB0aGlzLm1lcm1haWQ/LmRlZmF1bHQucnVuKCk7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19