/**
 * Credit goes to Scully for original implementation
 * https://github.com/scullyio/scully/blob/main/libs/scully/src/lib/fileHanderPlugins/markdown.ts
 */
import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
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
class MarkedSetupService {
    constructor() {
        const renderer = new marked.Renderer();
        renderer.code = (code, lang) => {
            // Let's do a language based detection like on GitHub
            // So we can still have non-interpreted mermaid code
            if (lang === 'mermaid') {
                return '<pre class="mermaid">' + code + '</pre>';
            }
            if (!lang) {
                return '<pre><code>' + code + '</code></pre>';
            }
            const classes = lang.startsWith('diff') && Prism.languages['diff']
                ? `language-${lang} diff-highlight`
                : `language-${lang.replace('diff-', '')}`;
            return `<pre class="${classes}"><code class="${classes}">${code}</code></pre>`;
        };
        marked.use(gfmHeadingId(), markedHighlight({
            async: true,
            highlight: (code, lang) => {
                let diff = lang?.startsWith('diff-');
                lang = diff ? lang.replace('diff-', '') : lang || 'typescript';
                if (diff && !Prism.languages['diff']) {
                    diff = false;
                    console.warn(`Notice:
    ---------------------------------------------------------------------------------------
    The \`diff\` language and plugin are not available in the provided setup.
    To enable it, add the following imports your \`main.ts\`:
      import 'prismjs/components/prism-diff';
      import 'prismjs/plugins/diff-highlight/prism-diff-highlight';
    ---------------------------------------------------------------------------------------
            `);
                }
                if (!Prism.languages[lang]) {
                    if (lang !== 'mermaid') {
                        console.warn(`Notice:
    ---------------------------------------------------------------------------------------
    The requested language '${lang}' is not available in the provided setup.
    To enable it, add the following import your \`main.ts\`:
      import 'prismjs/components/prism-${lang}';
    ---------------------------------------------------------------------------------------
              `);
                    }
                    return code;
                }
                return Prism.highlight(code, diff ? Prism.languages['diff'] : Prism.languages[lang], lang);
            },
        }), {
            renderer,
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            smartypants: false,
            xhtml: false,
            mangle: false,
        });
        this.marked = marked;
    }
    getMarkedInstance() {
        return this.marked;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkedSetupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkedSetupService }); }
}
export { MarkedSetupService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.2", ngImport: i0, type: MarkedSetupService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VkLXNldHVwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb250ZW50L3NyYy9saWIvbWFya2VkLXNldHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbkQsT0FBTyxTQUFTLENBQUM7QUFDakIsT0FBTyx1Q0FBdUMsQ0FBQztBQUMvQyxPQUFPLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sOEJBQThCLENBQUM7QUFDdEMsT0FBTyxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8saUNBQWlDLENBQUM7QUFDekMsT0FBTyxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLDJEQUEyRCxDQUFDOztBQUluRSxNQUNhLGtCQUFrQjtJQUc3QjtRQUNFLE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLEVBQUU7WUFDN0MscURBQXFEO1lBQ3JELG9EQUFvRDtZQUNwRCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ3RCLE9BQU8sdUJBQXVCLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUNsRDtZQUVELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsT0FBTyxhQUFhLEdBQUcsSUFBSSxHQUFHLGVBQWUsQ0FBQzthQUMvQztZQUVELE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxZQUFZLElBQUksaUJBQWlCO2dCQUNuQyxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzlDLE9BQU8sZUFBZSxPQUFPLGtCQUFrQixPQUFPLEtBQUssSUFBSSxlQUFlLENBQUM7UUFDakYsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLEdBQUcsQ0FDUixZQUFZLEVBQUUsRUFDZCxlQUFlLENBQUM7WUFDZCxLQUFLLEVBQUUsSUFBSTtZQUNYLFNBQVMsRUFBRSxDQUFDLElBQVksRUFBRSxJQUFZLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxZQUFZLENBQUM7Z0JBRS9ELElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDcEMsSUFBSSxHQUFHLEtBQUssQ0FBQztvQkFDYixPQUFPLENBQUMsSUFBSSxDQUFDOzs7Ozs7O2FBT1osQ0FBQyxDQUFDO2lCQUNKO2dCQUVELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMxQixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7d0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUM7OzhCQUVHLElBQUk7O3lDQUVPLElBQUk7O2VBRTlCLENBQUMsQ0FBQztxQkFDSjtvQkFDRCxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQ3BCLElBQUksRUFDSixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQ3RELElBQUksQ0FDTCxDQUFDO1lBQ0osQ0FBQztTQUNGLENBQUMsRUFDRjtZQUNFLFFBQVE7WUFDUixRQUFRLEVBQUUsS0FBSztZQUNmLEdBQUcsRUFBRSxJQUFJO1lBQ1QsTUFBTSxFQUFFLEtBQUs7WUFDYixRQUFRLEVBQUUsS0FBSztZQUNmLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7OEdBL0VVLGtCQUFrQjtrSEFBbEIsa0JBQWtCOztTQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlZGl0IGdvZXMgdG8gU2N1bGx5IGZvciBvcmlnaW5hbCBpbXBsZW1lbnRhdGlvblxuICogaHR0cHM6Ly9naXRodWIuY29tL3NjdWxseWlvL3NjdWxseS9ibG9iL21haW4vbGlicy9zY3VsbHkvc3JjL2xpYi9maWxlSGFuZGVyUGx1Z2lucy9tYXJrZG93bi50c1xuICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXJrZWQgfSBmcm9tICdtYXJrZWQnO1xuaW1wb3J0IHsgZ2ZtSGVhZGluZ0lkIH0gZnJvbSAnbWFya2VkLWdmbS1oZWFkaW5nLWlkJztcbmltcG9ydCB7IG1hcmtlZEhpZ2hsaWdodCB9IGZyb20gJ21hcmtlZC1oaWdobGlnaHQnO1xuXG5pbXBvcnQgJ3ByaXNtanMnO1xuaW1wb3J0ICdwcmlzbWpzL3BsdWdpbnMvdG9vbGJhci9wcmlzbS10b29sYmFyJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWJhc2gnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbic7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrdXAnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdHlwZXNjcmlwdCc7XG5pbXBvcnQgJ3ByaXNtanMvcGx1Z2lucy9jb3B5LXRvLWNsaXBib2FyZC9wcmlzbS1jb3B5LXRvLWNsaXBib2FyZCc7XG5cbmRlY2xhcmUgY29uc3QgUHJpc206IHR5cGVvZiBpbXBvcnQoJ3ByaXNtanMnKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcmtlZFNldHVwU2VydmljZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbWFya2VkOiB0eXBlb2YgbWFya2VkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IG1hcmtlZC5SZW5kZXJlcigpO1xuICAgIHJlbmRlcmVyLmNvZGUgPSAoY29kZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcpID0+IHtcbiAgICAgIC8vIExldCdzIGRvIGEgbGFuZ3VhZ2UgYmFzZWQgZGV0ZWN0aW9uIGxpa2Ugb24gR2l0SHViXG4gICAgICAvLyBTbyB3ZSBjYW4gc3RpbGwgaGF2ZSBub24taW50ZXJwcmV0ZWQgbWVybWFpZCBjb2RlXG4gICAgICBpZiAobGFuZyA9PT0gJ21lcm1haWQnKSB7XG4gICAgICAgIHJldHVybiAnPHByZSBjbGFzcz1cIm1lcm1haWRcIj4nICsgY29kZSArICc8L3ByZT4nO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxhbmcpIHtcbiAgICAgICAgcmV0dXJuICc8cHJlPjxjb2RlPicgKyBjb2RlICsgJzwvY29kZT48L3ByZT4nO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjbGFzc2VzID1cbiAgICAgICAgbGFuZy5zdGFydHNXaXRoKCdkaWZmJykgJiYgUHJpc20ubGFuZ3VhZ2VzWydkaWZmJ11cbiAgICAgICAgICA/IGBsYW5ndWFnZS0ke2xhbmd9IGRpZmYtaGlnaGxpZ2h0YFxuICAgICAgICAgIDogYGxhbmd1YWdlLSR7bGFuZy5yZXBsYWNlKCdkaWZmLScsICcnKX1gO1xuICAgICAgcmV0dXJuIGA8cHJlIGNsYXNzPVwiJHtjbGFzc2VzfVwiPjxjb2RlIGNsYXNzPVwiJHtjbGFzc2VzfVwiPiR7Y29kZX08L2NvZGU+PC9wcmU+YDtcbiAgICB9O1xuXG4gICAgbWFya2VkLnVzZShcbiAgICAgIGdmbUhlYWRpbmdJZCgpLFxuICAgICAgbWFya2VkSGlnaGxpZ2h0KHtcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIGhpZ2hsaWdodDogKGNvZGU6IHN0cmluZywgbGFuZzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgbGV0IGRpZmYgPSBsYW5nPy5zdGFydHNXaXRoKCdkaWZmLScpO1xuICAgICAgICAgIGxhbmcgPSBkaWZmID8gbGFuZy5yZXBsYWNlKCdkaWZmLScsICcnKSA6IGxhbmcgfHwgJ3R5cGVzY3JpcHQnO1xuXG4gICAgICAgICAgaWYgKGRpZmYgJiYgIVByaXNtLmxhbmd1YWdlc1snZGlmZiddKSB7XG4gICAgICAgICAgICBkaWZmID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vdGljZTpcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBUaGUgXFxgZGlmZlxcYCBsYW5ndWFnZSBhbmQgcGx1Z2luIGFyZSBub3QgYXZhaWxhYmxlIGluIHRoZSBwcm92aWRlZCBzZXR1cC5cbiAgICBUbyBlbmFibGUgaXQsIGFkZCB0aGUgZm9sbG93aW5nIGltcG9ydHMgeW91ciBcXGBtYWluLnRzXFxgOlxuICAgICAgaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tZGlmZic7XG4gICAgICBpbXBvcnQgJ3ByaXNtanMvcGx1Z2lucy9kaWZmLWhpZ2hsaWdodC9wcmlzbS1kaWZmLWhpZ2hsaWdodCc7XG4gICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgICBgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIVByaXNtLmxhbmd1YWdlc1tsYW5nXSkge1xuICAgICAgICAgICAgaWYgKGxhbmcgIT09ICdtZXJtYWlkJykge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYE5vdGljZTpcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBUaGUgcmVxdWVzdGVkIGxhbmd1YWdlICcke2xhbmd9JyBpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBwcm92aWRlZCBzZXR1cC5cbiAgICBUbyBlbmFibGUgaXQsIGFkZCB0aGUgZm9sbG93aW5nIGltcG9ydCB5b3VyIFxcYG1haW4udHNcXGA6XG4gICAgICBpbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS0ke2xhbmd9JztcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByaXNtLmhpZ2hsaWdodChcbiAgICAgICAgICAgIGNvZGUsXG4gICAgICAgICAgICBkaWZmID8gUHJpc20ubGFuZ3VhZ2VzWydkaWZmJ10gOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ10sXG4gICAgICAgICAgICBsYW5nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAge1xuICAgICAgICByZW5kZXJlcixcbiAgICAgICAgcGVkYW50aWM6IGZhbHNlLFxuICAgICAgICBnZm06IHRydWUsXG4gICAgICAgIGJyZWFrczogZmFsc2UsXG4gICAgICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICAgICAgc21hcnR5cGFudHM6IGZhbHNlLFxuICAgICAgICB4aHRtbDogZmFsc2UsXG4gICAgICAgIG1hbmdsZTogZmFsc2UsXG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMubWFya2VkID0gbWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkSW5zdGFuY2UoKTogdHlwZW9mIG1hcmtlZCB7XG4gICAgcmV0dXJuIHRoaXMubWFya2VkO1xuICB9XG59XG4iXX0=