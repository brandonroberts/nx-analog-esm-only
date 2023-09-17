/// <reference types="vite/client" />
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CONTENT_FILES_TOKEN } from './content-files-token';
import { parseRawContentFile } from './parse-raw-content-file';
import { waitFor } from './utils/zone-wait-for';
function getContentFile(contentFiles, prefix, slug, fallback) {
    const filePath = `/src/content/${prefix}${slug}.md`;
    const contentFile = contentFiles[filePath];
    if (!contentFile) {
        return of({
            filename: filePath,
            attributes: {},
            slug: '',
            content: fallback,
        });
    }
    return new Observable((observer) => {
        const contentResolver = contentFile();
        if (import.meta.env.SSR === true) {
            waitFor(contentResolver).then((content) => {
                observer.next(content);
            });
        }
        else {
            contentResolver.then((content) => {
                observer.next(content);
            });
        }
    }).pipe(map((rawContentFile) => {
        const { content, attributes } = parseRawContentFile(rawContentFile);
        return {
            filename: filePath,
            slug,
            attributes,
            content,
        };
    }));
}
/**
 * Retrieves the static content using the provided param and/or prefix.
 *
 * @param param route parameter (default: 'slug')
 * @param fallback fallback text if content file is not found (default: 'No Content Found')
 */
export function injectContent(param = 'slug', fallback = 'No Content Found') {
    const contentFiles = inject(CONTENT_FILES_TOKEN);
    if (typeof param === 'string' || 'param' in param) {
        const prefix = typeof param === 'string' ? '' : `${param.subdirectory}/`;
        const route = inject(ActivatedRoute);
        const paramKey = typeof param === 'string' ? param : param.param;
        return route.paramMap.pipe(map((params) => params.get(paramKey)), switchMap((slug) => {
            if (slug) {
                return getContentFile(contentFiles, prefix, slug, fallback);
            }
            else {
                return of({
                    filename: '',
                    slug: '',
                    attributes: {},
                    content: fallback,
                });
            }
        }));
    }
    else {
        return getContentFile(contentFiles, '', param.customFilename, fallback);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbnRlbnQvc3JjL2xpYi9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFDQUFxQztBQUVyQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRCxTQUFTLGNBQWMsQ0FHckIsWUFBbUQsRUFDbkQsTUFBYyxFQUNkLElBQVksRUFDWixRQUFnQjtJQUVoQixNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDO0lBQ3BELE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO1lBQ1IsUUFBUSxFQUFFLFFBQVE7WUFDbEIsVUFBVSxFQUFFLEVBQUU7WUFDZCxJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTyxJQUFJLFVBQVUsQ0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sZUFBZSxHQUFHLFdBQVcsRUFBRSxDQUFDO1FBRXRDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7UUFDckIsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FDM0IsbUJBQW1CLENBQWEsY0FBYyxDQUFDLENBQUM7UUFFbEQsT0FBTztZQUNMLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLElBQUk7WUFDSixVQUFVO1lBQ1YsT0FBTztTQUNSLENBQUM7SUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FHM0IsUUFRUSxNQUFNLEVBQ2QsUUFBUSxHQUFHLGtCQUFrQjtJQUU3QixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUVqRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxFQUFFO1FBQ2pELE1BQU0sTUFBTSxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQztRQUN6RSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckMsTUFBTSxRQUFRLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDakUsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDeEIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ3JDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pCLElBQUksSUFBSSxFQUFFO2dCQUNSLE9BQU8sY0FBYyxDQUNuQixZQUFZLEVBQ1osTUFBTSxFQUNOLElBQUksRUFDSixRQUFRLENBQ1QsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO29CQUNSLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRSxFQUFFO29CQUNSLFVBQVUsRUFBRSxFQUFFO29CQUNkLE9BQU8sRUFBRSxRQUFRO2lCQUNsQixDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7S0FDSDtTQUFNO1FBQ0wsT0FBTyxjQUFjLENBQ25CLFlBQVksRUFDWixFQUFFLEVBQ0YsS0FBSyxDQUFDLGNBQWMsRUFDcEIsUUFBUSxDQUNULENBQUM7S0FDSDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGUvY2xpZW50XCIgLz5cblxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IENvbnRlbnRGaWxlIH0gZnJvbSAnLi9jb250ZW50LWZpbGUnO1xuaW1wb3J0IHsgQ09OVEVOVF9GSUxFU19UT0tFTiB9IGZyb20gJy4vY29udGVudC1maWxlcy10b2tlbic7XG5pbXBvcnQgeyBwYXJzZVJhd0NvbnRlbnRGaWxlIH0gZnJvbSAnLi9wYXJzZS1yYXctY29udGVudC1maWxlJztcbmltcG9ydCB7IHdhaXRGb3IgfSBmcm9tICcuL3V0aWxzL3pvbmUtd2FpdC1mb3InO1xuXG5mdW5jdGlvbiBnZXRDb250ZW50RmlsZTxcbiAgQXR0cmlidXRlcyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT4gPSBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4+KFxuICBjb250ZW50RmlsZXM6IFJlY29yZDxzdHJpbmcsICgpID0+IFByb21pc2U8c3RyaW5nPj4sXG4gIHByZWZpeDogc3RyaW5nLFxuICBzbHVnOiBzdHJpbmcsXG4gIGZhbGxiYWNrOiBzdHJpbmdcbik6IE9ic2VydmFibGU8Q29udGVudEZpbGU8QXR0cmlidXRlcyB8IFJlY29yZDxzdHJpbmcsIG5ldmVyPj4+IHtcbiAgY29uc3QgZmlsZVBhdGggPSBgL3NyYy9jb250ZW50LyR7cHJlZml4fSR7c2x1Z30ubWRgO1xuICBjb25zdCBjb250ZW50RmlsZSA9IGNvbnRlbnRGaWxlc1tmaWxlUGF0aF07XG4gIGlmICghY29udGVudEZpbGUpIHtcbiAgICByZXR1cm4gb2Yoe1xuICAgICAgZmlsZW5hbWU6IGZpbGVQYXRoLFxuICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICBzbHVnOiAnJyxcbiAgICAgIGNvbnRlbnQ6IGZhbGxiYWNrLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPHN0cmluZz4oKG9ic2VydmVyKSA9PiB7XG4gICAgY29uc3QgY29udGVudFJlc29sdmVyID0gY29udGVudEZpbGUoKTtcblxuICAgIGlmIChpbXBvcnQubWV0YS5lbnYuU1NSID09PSB0cnVlKSB7XG4gICAgICB3YWl0Rm9yKGNvbnRlbnRSZXNvbHZlcikudGhlbigoY29udGVudCkgPT4ge1xuICAgICAgICBvYnNlcnZlci5uZXh0KGNvbnRlbnQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnRSZXNvbHZlci50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQoY29udGVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pLnBpcGUoXG4gICAgbWFwKChyYXdDb250ZW50RmlsZSkgPT4ge1xuICAgICAgY29uc3QgeyBjb250ZW50LCBhdHRyaWJ1dGVzIH0gPVxuICAgICAgICBwYXJzZVJhd0NvbnRlbnRGaWxlPEF0dHJpYnV0ZXM+KHJhd0NvbnRlbnRGaWxlKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZW5hbWU6IGZpbGVQYXRoLFxuICAgICAgICBzbHVnLFxuICAgICAgICBhdHRyaWJ1dGVzLFxuICAgICAgICBjb250ZW50LFxuICAgICAgfTtcbiAgICB9KVxuICApO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgc3RhdGljIGNvbnRlbnQgdXNpbmcgdGhlIHByb3ZpZGVkIHBhcmFtIGFuZC9vciBwcmVmaXguXG4gKlxuICogQHBhcmFtIHBhcmFtIHJvdXRlIHBhcmFtZXRlciAoZGVmYXVsdDogJ3NsdWcnKVxuICogQHBhcmFtIGZhbGxiYWNrIGZhbGxiYWNrIHRleHQgaWYgY29udGVudCBmaWxlIGlzIG5vdCBmb3VuZCAoZGVmYXVsdDogJ05vIENvbnRlbnQgRm91bmQnKVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0Q29udGVudDxcbiAgQXR0cmlidXRlcyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT4gPSBSZWNvcmQ8c3RyaW5nLCBhbnk+XG4+KFxuICBwYXJhbTpcbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICBwYXJhbTogc3RyaW5nO1xuICAgICAgICBzdWJkaXJlY3Rvcnk6IHN0cmluZztcbiAgICAgIH1cbiAgICB8IHtcbiAgICAgICAgY3VzdG9tRmlsZW5hbWU6IHN0cmluZztcbiAgICAgIH0gPSAnc2x1ZycsXG4gIGZhbGxiYWNrID0gJ05vIENvbnRlbnQgRm91bmQnXG4pOiBPYnNlcnZhYmxlPENvbnRlbnRGaWxlPEF0dHJpYnV0ZXMgfCBSZWNvcmQ8c3RyaW5nLCBuZXZlcj4+PiB7XG4gIGNvbnN0IGNvbnRlbnRGaWxlcyA9IGluamVjdChDT05URU5UX0ZJTEVTX1RPS0VOKTtcblxuICBpZiAodHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJyB8fCAncGFyYW0nIGluIHBhcmFtKSB7XG4gICAgY29uc3QgcHJlZml4ID0gdHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJyA/ICcnIDogYCR7cGFyYW0uc3ViZGlyZWN0b3J5fS9gO1xuICAgIGNvbnN0IHJvdXRlID0gaW5qZWN0KEFjdGl2YXRlZFJvdXRlKTtcbiAgICBjb25zdCBwYXJhbUtleSA9IHR5cGVvZiBwYXJhbSA9PT0gJ3N0cmluZycgPyBwYXJhbSA6IHBhcmFtLnBhcmFtO1xuICAgIHJldHVybiByb3V0ZS5wYXJhbU1hcC5waXBlKFxuICAgICAgbWFwKChwYXJhbXMpID0+IHBhcmFtcy5nZXQocGFyYW1LZXkpKSxcbiAgICAgIHN3aXRjaE1hcCgoc2x1ZykgPT4ge1xuICAgICAgICBpZiAoc2x1Zykge1xuICAgICAgICAgIHJldHVybiBnZXRDb250ZW50RmlsZTxBdHRyaWJ1dGVzPihcbiAgICAgICAgICAgIGNvbnRlbnRGaWxlcyxcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgIHNsdWcsXG4gICAgICAgICAgICBmYWxsYmFja1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9mKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnJyxcbiAgICAgICAgICAgIHNsdWc6ICcnLFxuICAgICAgICAgICAgYXR0cmlidXRlczoge30sXG4gICAgICAgICAgICBjb250ZW50OiBmYWxsYmFjayxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRDb250ZW50RmlsZTxBdHRyaWJ1dGVzPihcbiAgICAgIGNvbnRlbnRGaWxlcyxcbiAgICAgICcnLFxuICAgICAgcGFyYW0uY3VzdG9tRmlsZW5hbWUsXG4gICAgICBmYWxsYmFja1xuICAgICk7XG4gIH1cbn1cbiJdfQ==