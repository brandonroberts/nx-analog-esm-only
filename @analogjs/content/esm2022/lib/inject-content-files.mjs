import { inject } from '@angular/core';
import { CONTENT_FILES_LIST_TOKEN } from './content-files-list-token';
export function injectContentFiles(filterFn) {
    const allContentFiles = inject(CONTENT_FILES_LIST_TOKEN);
    if (filterFn) {
        const filteredContentFiles = allContentFiles.filter(filterFn);
        return filteredContentFiles;
    }
    return allContentFiles;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LWNvbnRlbnQtZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb250ZW50L3NyYy9saWIvaW5qZWN0LWNvbnRlbnQtZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RSxNQUFNLFVBQVUsa0JBQWtCLENBQ2hDLFFBQXVEO0lBRXZELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FDNUIsd0JBQXdCLENBQ0ksQ0FBQztJQUUvQixJQUFJLFFBQVEsRUFBRTtRQUNaLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5RCxPQUFPLG9CQUFvQixDQUFDO0tBQzdCO0lBQ0QsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRGaWxlIH0gZnJvbSAnLi9jb250ZW50LWZpbGUnO1xuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDT05URU5UX0ZJTEVTX0xJU1RfVE9LRU4gfSBmcm9tICcuL2NvbnRlbnQtZmlsZXMtbGlzdC10b2tlbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RDb250ZW50RmlsZXM8QXR0cmlidXRlcyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT4+KFxuICBmaWx0ZXJGbj86IEluamVjdENvbnRlbnRGaWxlc0ZpbHRlckZ1bmN0aW9uPEF0dHJpYnV0ZXM+XG4pOiBDb250ZW50RmlsZTxBdHRyaWJ1dGVzPltdIHtcbiAgY29uc3QgYWxsQ29udGVudEZpbGVzID0gaW5qZWN0KFxuICAgIENPTlRFTlRfRklMRVNfTElTVF9UT0tFTlxuICApIGFzIENvbnRlbnRGaWxlPEF0dHJpYnV0ZXM+W107XG5cbiAgaWYgKGZpbHRlckZuKSB7XG4gICAgY29uc3QgZmlsdGVyZWRDb250ZW50RmlsZXMgPSBhbGxDb250ZW50RmlsZXMuZmlsdGVyKGZpbHRlckZuKTtcblxuICAgIHJldHVybiBmaWx0ZXJlZENvbnRlbnRGaWxlcztcbiAgfVxuICByZXR1cm4gYWxsQ29udGVudEZpbGVzO1xufVxuXG5leHBvcnQgdHlwZSBJbmplY3RDb250ZW50RmlsZXNGaWx0ZXJGdW5jdGlvbjxUIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55Pj4gPSAoXG4gIHZhbHVlOiBDb250ZW50RmlsZTxUPixcbiAgaW5kZXg6IG51bWJlcixcbiAgYXJyYXk6IENvbnRlbnRGaWxlPFQ+W11cbikgPT4gYm9vbGVhbjtcbiJdfQ==