import { Injector, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
export function injectLoad(options) {
    const injector = options?.injector ?? inject(Injector);
    const route = injector.get(ActivatedRoute);
    return route.data.pipe(map((data) => data['load']));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LWxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvc3JjL2xpYi9pbmplY3QtbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFjLEdBQUcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl2QyxNQUFNLFVBQVUsVUFBVSxDQUV4QixPQUFpQztJQUNqQyxNQUFNLFFBQVEsR0FBRyxPQUFPLEVBQUUsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTNDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3BCLEdBQUcsQ0FBK0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUMxRCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdG9yLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG1hcCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBQYWdlU2VydmVyTG9hZCB9IGZyb20gJy4vcm91dGUtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0TG9hZDxcbiAgVCBleHRlbmRzIChwYWdlU2VydmVyTG9hZDogUGFnZVNlcnZlckxvYWQpID0+IFByb21pc2U8YW55PlxuPihvcHRpb25zPzogeyBpbmplY3Rvcj86IEluamVjdG9yIH0pOiBPYnNlcnZhYmxlPEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4+IHtcbiAgY29uc3QgaW5qZWN0b3IgPSBvcHRpb25zPy5pbmplY3RvciA/PyBpbmplY3QoSW5qZWN0b3IpO1xuICBjb25zdCByb3V0ZSA9IGluamVjdG9yLmdldChBY3RpdmF0ZWRSb3V0ZSk7XG5cbiAgcmV0dXJuIHJvdXRlLmRhdGEucGlwZShcbiAgICBtYXA8RGF0YSwgQXdhaXRlZDxSZXR1cm5UeXBlPFQ+Pj4oKGRhdGEpID0+IGRhdGFbJ2xvYWQnXSlcbiAgKTtcbn1cbiJdfQ==