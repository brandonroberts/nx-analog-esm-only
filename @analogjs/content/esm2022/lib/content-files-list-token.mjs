import { InjectionToken } from '@angular/core';
import { getContentFilesList } from './get-content-files';
function getSlug(filename) {
    const parts = filename.match(/^(\\|\/)(.+(\\|\/))*(.+)\.(.+)$/);
    return parts?.length ? parts[4] : '';
}
export const CONTENT_FILES_LIST_TOKEN = new InjectionToken('@analogjs/content Content Files List', {
    providedIn: 'root',
    factory() {
        const contentFiles = getContentFilesList();
        return Object.keys(contentFiles).map((filename) => {
            const attributes = contentFiles[filename];
            const slug = attributes['slug'];
            return {
                filename,
                attributes,
                slug: slug ? encodeURI(slug) : encodeURI(getSlug(filename)),
            };
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1maWxlcy1saXN0LXRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29udGVudC9zcmMvbGliL2NvbnRlbnQtZmlsZXMtbGlzdC10b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTFELFNBQVMsT0FBTyxDQUFDLFFBQWdCO0lBQy9CLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUNoRSxPQUFPLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLGNBQWMsQ0FDeEQsc0NBQXNDLEVBQ3RDO0lBQ0UsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTztRQUNMLE1BQU0sWUFBWSxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFFM0MsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2hELE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFaEMsT0FBTztnQkFDTCxRQUFRO2dCQUNSLFVBQVU7Z0JBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzVELENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udGVudEZpbGUgfSBmcm9tICcuL2NvbnRlbnQtZmlsZSc7XG5pbXBvcnQgeyBnZXRDb250ZW50RmlsZXNMaXN0IH0gZnJvbSAnLi9nZXQtY29udGVudC1maWxlcyc7XG5cbmZ1bmN0aW9uIGdldFNsdWcoZmlsZW5hbWU6IHN0cmluZykge1xuICBjb25zdCBwYXJ0cyA9IGZpbGVuYW1lLm1hdGNoKC9eKFxcXFx8XFwvKSguKyhcXFxcfFxcLykpKiguKylcXC4oLispJC8pO1xuICByZXR1cm4gcGFydHM/Lmxlbmd0aCA/IHBhcnRzWzRdIDogJyc7XG59XG5cbmV4cG9ydCBjb25zdCBDT05URU5UX0ZJTEVTX0xJU1RfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29udGVudEZpbGVbXT4oXG4gICdAYW5hbG9nanMvY29udGVudCBDb250ZW50IEZpbGVzIExpc3QnLFxuICB7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgIGZhY3RvcnkoKSB7XG4gICAgICBjb25zdCBjb250ZW50RmlsZXMgPSBnZXRDb250ZW50RmlsZXNMaXN0KCk7XG5cbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb250ZW50RmlsZXMpLm1hcCgoZmlsZW5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IGNvbnRlbnRGaWxlc1tmaWxlbmFtZV07XG4gICAgICAgIGNvbnN0IHNsdWcgPSBhdHRyaWJ1dGVzWydzbHVnJ107XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBmaWxlbmFtZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzLFxuICAgICAgICAgIHNsdWc6IHNsdWcgPyBlbmNvZGVVUkkoc2x1ZykgOiBlbmNvZGVVUkkoZ2V0U2x1ZyhmaWxlbmFtZSkpLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSxcbiAgfVxuKTtcbiJdfQ==