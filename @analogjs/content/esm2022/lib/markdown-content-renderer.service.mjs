import { inject, Injectable, InjectionToken, PLATFORM_ID, } from '@angular/core';
import { ContentRenderer } from './content-renderer';
import { MarkedSetupService } from './marked-setup.service';
import * as i0 from "@angular/core";
class MarkdownContentRendererService {
    constructor() {
        this.platformId = inject(PLATFORM_ID);
        this.#marked = inject(MarkedSetupService, { self: true });
    }
    #marked;
    async render(content) {
        return this.#marked.getMarkedInstance().parse(content);
    }
    // eslint-disable-next-line
    enhance() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkdownContentRendererService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkdownContentRendererService }); }
}
export { MarkdownContentRendererService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkdownContentRendererService, decorators: [{
            type: Injectable
        }] });
export function withMarkdownRenderer(options) {
    return [
        {
            provide: ContentRenderer,
            useFactory: () => new MarkdownContentRendererService(),
            deps: [MarkedSetupService],
        },
        options?.loadMermaid
            ? [
                {
                    provide: MERMAID_IMPORT_TOKEN,
                    useFactory: options.loadMermaid,
                },
            ]
            : [],
    ];
}
export function provideContent(...features) {
    return [...features, MarkedSetupService];
}
export const MERMAID_IMPORT_TOKEN = new InjectionToken('mermaid_import');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tY29udGVudC1yZW5kZXJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29udGVudC9zcmMvbGliL21hcmtkb3duLWNvbnRlbnQtcmVuZGVyZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsV0FBVyxHQUVaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFNUQsTUFDYSw4QkFBOEI7SUFEM0M7UUFFRSxlQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLFlBQU8sR0FBRyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQVF0RDtJQVJDLE9BQU8sQ0FBOEM7SUFFckQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFlO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsMkJBQTJCO0lBQzNCLE9BQU8sS0FBSSxDQUFDOzhHQVRELDhCQUE4QjtrSEFBOUIsOEJBQThCOztTQUE5Qiw4QkFBOEI7MkZBQTlCLDhCQUE4QjtrQkFEMUMsVUFBVTs7QUFpQlgsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxPQUFpQztJQUVqQyxPQUFPO1FBQ0w7WUFDRSxPQUFPLEVBQUUsZUFBZTtZQUN4QixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSw4QkFBOEIsRUFBRTtZQUN0RCxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUMzQjtRQUNELE9BQU8sRUFBRSxXQUFXO1lBQ2xCLENBQUMsQ0FBQztnQkFDRTtvQkFDRSxPQUFPLEVBQUUsb0JBQW9CO29CQUM3QixVQUFVLEVBQUUsT0FBTyxDQUFDLFdBQVc7aUJBQ2hDO2FBQ0Y7WUFDSCxDQUFDLENBQUMsRUFBRTtLQUNQLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxHQUFHLFFBQW9CO0lBQ3BELE9BQU8sQ0FBQyxHQUFHLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FFcEQsZ0JBQWdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIFBMQVRGT1JNX0lELFxuICBQcm92aWRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbnRlbnRSZW5kZXJlciB9IGZyb20gJy4vY29udGVudC1yZW5kZXJlcic7XG5pbXBvcnQgeyBNYXJrZWRTZXR1cFNlcnZpY2UgfSBmcm9tICcuL21hcmtlZC1zZXR1cC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duQ29udGVudFJlbmRlcmVyU2VydmljZSBpbXBsZW1lbnRzIENvbnRlbnRSZW5kZXJlciB7XG4gIHBsYXRmb3JtSWQgPSBpbmplY3QoUExBVEZPUk1fSUQpO1xuICAjbWFya2VkID0gaW5qZWN0KE1hcmtlZFNldHVwU2VydmljZSwgeyBzZWxmOiB0cnVlIH0pO1xuXG4gIGFzeW5jIHJlbmRlcihjb250ZW50OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy4jbWFya2VkLmdldE1hcmtlZEluc3RhbmNlKCkucGFyc2UoY29udGVudCk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgZW5oYW5jZSgpIHt9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFya2Rvd25SZW5kZXJlck9wdGlvbnMge1xuICBsb2FkTWVybWFpZD86ICgpID0+IFByb21pc2U8dHlwZW9mIGltcG9ydCgnbWVybWFpZCcpPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhNYXJrZG93blJlbmRlcmVyKFxuICBvcHRpb25zPzogTWFya2Rvd25SZW5kZXJlck9wdGlvbnNcbik6IFByb3ZpZGVyIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBDb250ZW50UmVuZGVyZXIsXG4gICAgICB1c2VGYWN0b3J5OiAoKSA9PiBuZXcgTWFya2Rvd25Db250ZW50UmVuZGVyZXJTZXJ2aWNlKCksXG4gICAgICBkZXBzOiBbTWFya2VkU2V0dXBTZXJ2aWNlXSxcbiAgICB9LFxuICAgIG9wdGlvbnM/LmxvYWRNZXJtYWlkXG4gICAgICA/IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBNRVJNQUlEX0lNUE9SVF9UT0tFTixcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IG9wdGlvbnMubG9hZE1lcm1haWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgICAgOiBbXSxcbiAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDb250ZW50KC4uLmZlYXR1cmVzOiBQcm92aWRlcltdKSB7XG4gIHJldHVybiBbLi4uZmVhdHVyZXMsIE1hcmtlZFNldHVwU2VydmljZV07XG59XG5cbmV4cG9ydCBjb25zdCBNRVJNQUlEX0lNUE9SVF9UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcbiAgUHJvbWlzZTx0eXBlb2YgaW1wb3J0KCdtZXJtYWlkJyk+XG4+KCdtZXJtYWlkX2ltcG9ydCcpO1xuIl19