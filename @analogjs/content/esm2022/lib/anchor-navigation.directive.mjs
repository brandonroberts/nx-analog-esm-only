import { Directive, HostListener, inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
class AnchorNavigationDirective {
    constructor() {
        this.document = inject(DOCUMENT);
        this.location = inject(Location);
        this.router = inject(Router);
    }
    handleNavigation(element) {
        if (element instanceof HTMLAnchorElement &&
            isInternalUrl(element, this.document) &&
            hasTargetSelf(element) &&
            !hasDownloadAttribute(element)) {
            const { pathname, search, hash } = element;
            const url = this.location.normalize(`${pathname}${search}${hash}`);
            this.router.navigateByUrl(url);
            return false;
        }
        return true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnchorNavigationDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.2", type: AnchorNavigationDirective, isStandalone: true, selector: "[analogAnchorNavigation]", host: { listeners: { "click": "handleNavigation($event.target)" } }, ngImport: i0 }); }
}
export { AnchorNavigationDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: AnchorNavigationDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[analogAnchorNavigation]',
                    standalone: true,
                }]
        }], propDecorators: { handleNavigation: [{
                type: HostListener,
                args: ['click', ['$event.target']]
            }] } });
function hasDownloadAttribute(anchorElement) {
    return anchorElement.getAttribute('download') !== null;
}
function hasTargetSelf(anchorElement) {
    return !anchorElement.target || anchorElement.target === '_self';
}
function isInternalUrl(anchorElement, document) {
    return (anchorElement.host === document.location.host &&
        anchorElement.protocol === document.location.protocol);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5jaG9yLW5hdmlnYXRpb24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29udGVudC9zcmMvbGliL2FuY2hvci1uYXZpZ2F0aW9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRXpDLE1BSWEseUJBQXlCO0lBSnRDO1FBS21CLGFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBbUIxQztJQWhCQyxnQkFBZ0IsQ0FBQyxPQUFvQjtRQUNuQyxJQUNFLE9BQU8sWUFBWSxpQkFBaUI7WUFDcEMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3JDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDdEIsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsRUFDOUI7WUFDQSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFDM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFL0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs4R0FyQlUseUJBQXlCO2tHQUF6Qix5QkFBeUI7O1NBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQUpyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjs4QkFPQyxnQkFBZ0I7c0JBRGYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7O0FBbUIxQyxTQUFTLG9CQUFvQixDQUFDLGFBQWdDO0lBQzVELE9BQU8sYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDekQsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLGFBQWdDO0lBQ3JELE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDO0FBQ25FLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FDcEIsYUFBZ0MsRUFDaEMsUUFBa0I7SUFFbEIsT0FBTyxDQUNMLGFBQWEsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1FBQzdDLGFBQWEsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3RELENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thbmFsb2dBbmNob3JOYXZpZ2F0aW9uXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIEFuY2hvck5hdmlnYXRpb25EaXJlY3RpdmUge1xuICBwcml2YXRlIHJlYWRvbmx5IGRvY3VtZW50ID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSBsb2NhdGlvbiA9IGluamVjdChMb2NhdGlvbik7XG4gIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcbiAgaGFuZGxlTmF2aWdhdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGlmIChcbiAgICAgIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCAmJlxuICAgICAgaXNJbnRlcm5hbFVybChlbGVtZW50LCB0aGlzLmRvY3VtZW50KSAmJlxuICAgICAgaGFzVGFyZ2V0U2VsZihlbGVtZW50KSAmJlxuICAgICAgIWhhc0Rvd25sb2FkQXR0cmlidXRlKGVsZW1lbnQpXG4gICAgKSB7XG4gICAgICBjb25zdCB7IHBhdGhuYW1lLCBzZWFyY2gsIGhhc2ggfSA9IGVsZW1lbnQ7XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmxvY2F0aW9uLm5vcm1hbGl6ZShgJHtwYXRobmFtZX0ke3NlYXJjaH0ke2hhc2h9YCk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHVybCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNEb3dubG9hZEF0dHJpYnV0ZShhbmNob3JFbGVtZW50OiBIVE1MQW5jaG9yRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gYW5jaG9yRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGhhc1RhcmdldFNlbGYoYW5jaG9yRWxlbWVudDogSFRNTEFuY2hvckVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuICFhbmNob3JFbGVtZW50LnRhcmdldCB8fCBhbmNob3JFbGVtZW50LnRhcmdldCA9PT0gJ19zZWxmJztcbn1cblxuZnVuY3Rpb24gaXNJbnRlcm5hbFVybChcbiAgYW5jaG9yRWxlbWVudDogSFRNTEFuY2hvckVsZW1lbnQsXG4gIGRvY3VtZW50OiBEb2N1bWVudFxuKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgYW5jaG9yRWxlbWVudC5ob3N0ID09PSBkb2N1bWVudC5sb2NhdGlvbi5ob3N0ICYmXG4gICAgYW5jaG9yRWxlbWVudC5wcm90b2NvbCA9PT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2xcbiAgKTtcbn1cbiJdfQ==