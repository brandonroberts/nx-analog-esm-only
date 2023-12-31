import { InjectionToken, inject } from '@angular/core';
import { getContentFiles } from './get-content-files';
import { CONTENT_FILES_LIST_TOKEN } from './content-files-list-token';
export const CONTENT_FILES_TOKEN = new InjectionToken('@analogjs/content Content Files', {
    providedIn: 'root',
    factory() {
        const contentFiles = getContentFiles();
        const contentFilesList = inject(CONTENT_FILES_LIST_TOKEN);
        const lookup = {};
        contentFilesList.forEach((item) => {
            const fileParts = item.filename.split('/');
            const filePath = fileParts.slice(0, fileParts.length - 1).join('/');
            lookup[item.filename] = `${filePath}/${item.slug}.md`;
        });
        const objectUsingSlugAttribute = {};
        Object.entries(contentFiles).forEach((entry) => {
            const filename = entry[0];
            const value = entry[1];
            const newFilename = lookup[filename];
            if (newFilename !== undefined) {
                objectUsingSlugAttribute[newFilename] = value;
            }
        });
        return objectUsingSlugAttribute;
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1maWxlcy10b2tlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbnRlbnQvc3JjL2xpYi9jb250ZW50LWZpbGVzLXRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RSxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLGNBQWMsQ0FFbkQsaUNBQWlDLEVBQUU7SUFDbkMsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTztRQUNMLE1BQU0sWUFBWSxHQUFHLGVBQWUsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFMUQsTUFBTSxNQUFNLEdBQTJCLEVBQUUsQ0FBQztRQUMxQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sd0JBQXdCLEdBQTBDLEVBQUUsQ0FBQztRQUMzRSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzdDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtnQkFDN0Isd0JBQXdCLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQy9DO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLHdCQUF3QixDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGdldENvbnRlbnRGaWxlcyB9IGZyb20gJy4vZ2V0LWNvbnRlbnQtZmlsZXMnO1xuaW1wb3J0IHsgQ09OVEVOVF9GSUxFU19MSVNUX1RPS0VOIH0gZnJvbSAnLi9jb250ZW50LWZpbGVzLWxpc3QtdG9rZW4nO1xuXG5leHBvcnQgY29uc3QgQ09OVEVOVF9GSUxFU19UT0tFTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcbiAgUmVjb3JkPHN0cmluZywgKCkgPT4gUHJvbWlzZTxzdHJpbmc+PlxuPignQGFuYWxvZ2pzL2NvbnRlbnQgQ29udGVudCBGaWxlcycsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5KCkge1xuICAgIGNvbnN0IGNvbnRlbnRGaWxlcyA9IGdldENvbnRlbnRGaWxlcygpO1xuICAgIGNvbnN0IGNvbnRlbnRGaWxlc0xpc3QgPSBpbmplY3QoQ09OVEVOVF9GSUxFU19MSVNUX1RPS0VOKTtcblxuICAgIGNvbnN0IGxvb2t1cDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgIGNvbnRlbnRGaWxlc0xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmlsZVBhcnRzID0gaXRlbS5maWxlbmFtZS5zcGxpdCgnLycpO1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBmaWxlUGFydHMuc2xpY2UoMCwgZmlsZVBhcnRzLmxlbmd0aCAtIDEpLmpvaW4oJy8nKTtcbiAgICAgIGxvb2t1cFtpdGVtLmZpbGVuYW1lXSA9IGAke2ZpbGVQYXRofS8ke2l0ZW0uc2x1Z30ubWRgO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgb2JqZWN0VXNpbmdTbHVnQXR0cmlidXRlOiBSZWNvcmQ8c3RyaW5nLCAoKSA9PiBQcm9taXNlPHN0cmluZz4+ID0ge307XG4gICAgT2JqZWN0LmVudHJpZXMoY29udGVudEZpbGVzKS5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBlbnRyeVswXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gZW50cnlbMV07XG5cbiAgICAgIGNvbnN0IG5ld0ZpbGVuYW1lID0gbG9va3VwW2ZpbGVuYW1lXTtcbiAgICAgIGlmIChuZXdGaWxlbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9iamVjdFVzaW5nU2x1Z0F0dHJpYnV0ZVtuZXdGaWxlbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBvYmplY3RVc2luZ1NsdWdBdHRyaWJ1dGU7XG4gIH0sXG59KTtcbiJdfQ==