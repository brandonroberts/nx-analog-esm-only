import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, ViewEncapsulation, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContentRenderer } from './content-renderer';
import { AnchorNavigationDirective } from './anchor-navigation.directive';
import * as i0 from "@angular/core";
import * as i1 from "./anchor-navigation.directive";
class AnalogMarkdownRouteComponent {
    constructor() {
        this.sanitizer = inject(DomSanitizer);
        this.route = inject(ActivatedRoute);
        this.contentRenderer = inject(ContentRenderer);
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.route.snapshot.data['renderedAnalogContent']);
        this.classes = 'analog-markdown-route';
    }
    ngAfterViewChecked() {
        this.contentRenderer.enhance();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnalogMarkdownRouteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.2", type: AnalogMarkdownRouteComponent, isStandalone: true, selector: "analog-markdown-route", inputs: { classes: "classes" }, hostDirectives: [{ directive: i1.AnchorNavigationDirective }], ngImport: i0, template: `<div [innerHTML]="content" [class]="classes"></div>`, isInline: true, encapsulation: i0.ViewEncapsulation.None, preserveWhitespaces: true }); }
}
export default AnalogMarkdownRouteComponent;
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnalogMarkdownRouteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'analog-markdown-route',
                    standalone: true,
                    imports: [AsyncPipe],
                    hostDirectives: [AnchorNavigationDirective],
                    preserveWhitespaces: true,
                    encapsulation: ViewEncapsulation.None,
                    template: `<div [innerHTML]="content" [class]="classes"></div>`,
                }]
        }], propDecorators: { classes: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tcm91dGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29udGVudC9zcmMvbGliL21hcmtkb3duLXJvdXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxFQUVMLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUNMLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBRTFFLE1BU3FCLDRCQUE0QjtJQVRqRDtRQVVVLGNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsVUFBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2QyxvQkFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVoQyxZQUFPLEdBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQ2xELENBQUM7UUFFTyxZQUFPLEdBQUcsdUJBQXVCLENBQUM7S0FLNUM7SUFIQyxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzhHQWJrQiw0QkFBNEI7a0dBQTVCLDRCQUE0QixnTEFGckMscURBQXFEOztlQUU1Qyw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFUaEQsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNwQixjQUFjLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDM0MsbUJBQW1CLEVBQUUsSUFBSTtvQkFDekIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxxREFBcUQ7aUJBQ2hFOzhCQVVVLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDb21wb25lbnQsXG4gIGluamVjdCxcbiAgSW5wdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQ29udGVudFJlbmRlcmVyIH0gZnJvbSAnLi9jb250ZW50LXJlbmRlcmVyJztcbmltcG9ydCB7IEFuY2hvck5hdmlnYXRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2FuY2hvci1uYXZpZ2F0aW9uLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FuYWxvZy1tYXJrZG93bi1yb3V0ZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtBc3luY1BpcGVdLFxuICBob3N0RGlyZWN0aXZlczogW0FuY2hvck5hdmlnYXRpb25EaXJlY3RpdmVdLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiB0cnVlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYDxkaXYgW2lubmVySFRNTF09XCJjb250ZW50XCIgW2NsYXNzXT1cImNsYXNzZXNcIj48L2Rpdj5gLFxufSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuYWxvZ01hcmtkb3duUm91dGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkIHtcbiAgcHJpdmF0ZSBzYW5pdGl6ZXIgPSBpbmplY3QoRG9tU2FuaXRpemVyKTtcbiAgcHJpdmF0ZSByb3V0ZSA9IGluamVjdChBY3RpdmF0ZWRSb3V0ZSk7XG4gIGNvbnRlbnRSZW5kZXJlciA9IGluamVjdChDb250ZW50UmVuZGVyZXIpO1xuXG4gIHByb3RlY3RlZCBjb250ZW50OiBTYWZlSHRtbCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKFxuICAgIHRoaXMucm91dGUuc25hcHNob3QuZGF0YVsncmVuZGVyZWRBbmFsb2dDb250ZW50J11cbiAgKTtcblxuICBASW5wdXQoKSBjbGFzc2VzID0gJ2FuYWxvZy1tYXJrZG93bi1yb3V0ZSc7XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMuY29udGVudFJlbmRlcmVyLmVuaGFuY2UoKTtcbiAgfVxufVxuIl19