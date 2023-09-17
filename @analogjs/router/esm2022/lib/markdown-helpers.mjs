import { inject } from '@angular/core';
// The Zone is currently enabled by default, so we wouldn't need this check.
// However, leaving this open space will be useful if zone.js becomes optional
// in the future. This means we won't have to modify the current code, and it will
// continue to work seamlessly.
const isNgZoneEnabled = typeof Zone !== 'undefined' && !!Zone.root;
export function toMarkdownModule(markdownFileFactory) {
    return async () => {
        const createLoader = () => Promise.all([import('@analogjs/content'), markdownFileFactory()]);
        const [{ parseRawContentFile, MarkdownRouteComponent, ContentRenderer }, markdownFile,] = await (isNgZoneEnabled
            ? // We are not able to use `runOutsideAngular` because we are not inside
                // an injection context to retrieve the `NgZone` instance.
                // The `Zone.root.run` is required when the code is running in the
                // browser since asynchronous tasks being scheduled in the current context
                // are a reason for unnecessary change detection cycles.
                Zone.root.run(createLoader)
            : createLoader());
        const { content, attributes } = parseRawContentFile(markdownFile);
        const { title, meta } = attributes;
        return {
            default: MarkdownRouteComponent,
            routeMeta: {
                data: { _analogContent: content },
                title,
                meta,
                resolve: {
                    renderedAnalogContent: async () => {
                        const contentRenderer = inject(ContentRenderer);
                        return contentRenderer.render(content);
                    },
                },
            },
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24taGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvbGliL21hcmtkb3duLWhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUt2Qyw0RUFBNEU7QUFDNUUsOEVBQThFO0FBQzlFLGtGQUFrRjtBQUNsRiwrQkFBK0I7QUFDL0IsTUFBTSxlQUFlLEdBQUcsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBRW5FLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDOUIsbUJBQTBDO0lBRTFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7UUFDaEIsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwRSxNQUFNLENBQ0osRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxlQUFlLEVBQUUsRUFDaEUsWUFBWSxFQUNiLEdBQWlELE1BQU0sQ0FBQyxlQUFlO1lBQ3RFLENBQUMsQ0FBQyx1RUFBdUU7Z0JBQ3ZFLDBEQUEwRDtnQkFDMUQsa0VBQWtFO2dCQUNsRSwwRUFBMEU7Z0JBQzFFLHdEQUF3RDtnQkFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFFbkMsT0FBTztZQUNMLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUU7Z0JBQ2pDLEtBQUs7Z0JBQ0wsSUFBSTtnQkFDSixPQUFPLEVBQUU7b0JBQ1AscUJBQXFCLEVBQUUsS0FBSyxJQUFJLEVBQUU7d0JBQ2hDLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDaEQsT0FBTyxlQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN6QyxDQUFDO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVFeHBvcnQgfSBmcm9tICcuL21vZGVscyc7XG5cbmRlY2xhcmUgY29uc3QgWm9uZTogYW55O1xuXG4vLyBUaGUgWm9uZSBpcyBjdXJyZW50bHkgZW5hYmxlZCBieSBkZWZhdWx0LCBzbyB3ZSB3b3VsZG4ndCBuZWVkIHRoaXMgY2hlY2suXG4vLyBIb3dldmVyLCBsZWF2aW5nIHRoaXMgb3BlbiBzcGFjZSB3aWxsIGJlIHVzZWZ1bCBpZiB6b25lLmpzIGJlY29tZXMgb3B0aW9uYWxcbi8vIGluIHRoZSBmdXR1cmUuIFRoaXMgbWVhbnMgd2Ugd29uJ3QgaGF2ZSB0byBtb2RpZnkgdGhlIGN1cnJlbnQgY29kZSwgYW5kIGl0IHdpbGxcbi8vIGNvbnRpbnVlIHRvIHdvcmsgc2VhbWxlc3NseS5cbmNvbnN0IGlzTmdab25lRW5hYmxlZCA9IHR5cGVvZiBab25lICE9PSAndW5kZWZpbmVkJyAmJiAhIVpvbmUucm9vdDtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvTWFya2Rvd25Nb2R1bGUoXG4gIG1hcmtkb3duRmlsZUZhY3Rvcnk6ICgpID0+IFByb21pc2U8c3RyaW5nPlxuKTogKCkgPT4gUHJvbWlzZTxSb3V0ZUV4cG9ydD4ge1xuICByZXR1cm4gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNyZWF0ZUxvYWRlciA9ICgpID0+XG4gICAgICBQcm9taXNlLmFsbChbaW1wb3J0KCdAYW5hbG9nanMvY29udGVudCcpLCBtYXJrZG93bkZpbGVGYWN0b3J5KCldKTtcblxuICAgIGNvbnN0IFtcbiAgICAgIHsgcGFyc2VSYXdDb250ZW50RmlsZSwgTWFya2Rvd25Sb3V0ZUNvbXBvbmVudCwgQ29udGVudFJlbmRlcmVyIH0sXG4gICAgICBtYXJrZG93bkZpbGUsXG4gICAgXTogW3R5cGVvZiBpbXBvcnQoJ0BhbmFsb2dqcy9jb250ZW50JyksIHN0cmluZ10gPSBhd2FpdCAoaXNOZ1pvbmVFbmFibGVkXG4gICAgICA/IC8vIFdlIGFyZSBub3QgYWJsZSB0byB1c2UgYHJ1bk91dHNpZGVBbmd1bGFyYCBiZWNhdXNlIHdlIGFyZSBub3QgaW5zaWRlXG4gICAgICAgIC8vIGFuIGluamVjdGlvbiBjb250ZXh0IHRvIHJldHJpZXZlIHRoZSBgTmdab25lYCBpbnN0YW5jZS5cbiAgICAgICAgLy8gVGhlIGBab25lLnJvb3QucnVuYCBpcyByZXF1aXJlZCB3aGVuIHRoZSBjb2RlIGlzIHJ1bm5pbmcgaW4gdGhlXG4gICAgICAgIC8vIGJyb3dzZXIgc2luY2UgYXN5bmNocm9ub3VzIHRhc2tzIGJlaW5nIHNjaGVkdWxlZCBpbiB0aGUgY3VycmVudCBjb250ZXh0XG4gICAgICAgIC8vIGFyZSBhIHJlYXNvbiBmb3IgdW5uZWNlc3NhcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZXMuXG4gICAgICAgIFpvbmUucm9vdC5ydW4oY3JlYXRlTG9hZGVyKVxuICAgICAgOiBjcmVhdGVMb2FkZXIoKSk7XG5cbiAgICBjb25zdCB7IGNvbnRlbnQsIGF0dHJpYnV0ZXMgfSA9IHBhcnNlUmF3Q29udGVudEZpbGUobWFya2Rvd25GaWxlKTtcbiAgICBjb25zdCB7IHRpdGxlLCBtZXRhIH0gPSBhdHRyaWJ1dGVzO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRlZmF1bHQ6IE1hcmtkb3duUm91dGVDb21wb25lbnQsXG4gICAgICByb3V0ZU1ldGE6IHtcbiAgICAgICAgZGF0YTogeyBfYW5hbG9nQ29udGVudDogY29udGVudCB9LFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgbWV0YSxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgIHJlbmRlcmVkQW5hbG9nQ29udGVudDogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGVudFJlbmRlcmVyID0gaW5qZWN0KENvbnRlbnRSZW5kZXJlcik7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudFJlbmRlcmVyLnJlbmRlcihjb250ZW50KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9O1xufVxuIl19