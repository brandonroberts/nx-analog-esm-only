import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
/**
 * @deprecated Use `RouteMeta` type instead.
 * For more info see: https://github.com/analogjs/analog/issues/223
 *
 * Defines additional route config metadata. This
 * object is merged into the route config with
 * the predefined file-based route.
 *
 * @usageNotes
 *
 * ```
 * import { Component } from '@angular/core';
 * import { defineRouteMeta } from '@analogjs/router';
 *
 *  export const routeMeta = defineRouteMeta({
 *    title: 'Welcome'
 *  });
 *
 * @Component({
 *   template: `Home`,
 *   standalone: true,
 * })
 * export default class HomeComponent {}
 * ```
 *
 * @param route
 * @returns
 */
export const defineRouteMeta = (route) => {
    return route;
};
/**
 * Returns the instance of Angular Router
 *
 * @returns The router
 */
export const injectRouter = () => {
    return inject(Router);
};
/**
 * Returns the instance of the Activate Route for the component
 *
 * @returns The activated route
 */
export const injectActivatedRoute = () => {
    return inject(ActivatedRoute);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5lLXJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9saWIvZGVmaW5lLXJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFvQixNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFXakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxDQUFDLEtBQXNCLEVBQUUsRUFBRTtJQUN4RCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO0lBQy9CLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUU7SUFDdkMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZSBhcyBOZ1JvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG50eXBlIFJvdXRlT21pdHRlZCA9XG4gIHwgJ2NvbXBvbmVudCdcbiAgfCAnbG9hZENvbXBvbmVudCdcbiAgfCAnbG9hZENoaWxkcmVuJ1xuICB8ICdwYXRoJ1xuICB8ICdwYXRoTWF0Y2gnO1xuXG50eXBlIFJlc3RyaWN0ZWRSb3V0ZSA9IE9taXQ8TmdSb3V0ZSwgUm91dGVPbWl0dGVkPjtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFJvdXRlTWV0YWAgdHlwZSBpbnN0ZWFkLlxuICogRm9yIG1vcmUgaW5mbyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmFsb2dqcy9hbmFsb2cvaXNzdWVzLzIyM1xuICpcbiAqIERlZmluZXMgYWRkaXRpb25hbCByb3V0ZSBjb25maWcgbWV0YWRhdGEuIFRoaXNcbiAqIG9iamVjdCBpcyBtZXJnZWQgaW50byB0aGUgcm91dGUgY29uZmlnIHdpdGhcbiAqIHRoZSBwcmVkZWZpbmVkIGZpbGUtYmFzZWQgcm91dGUuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHsgZGVmaW5lUm91dGVNZXRhIH0gZnJvbSAnQGFuYWxvZ2pzL3JvdXRlcic7XG4gKlxuICogIGV4cG9ydCBjb25zdCByb3V0ZU1ldGEgPSBkZWZpbmVSb3V0ZU1ldGEoe1xuICogICAgdGl0bGU6ICdXZWxjb21lJ1xuICogIH0pO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogICB0ZW1wbGF0ZTogYEhvbWVgLFxuICogICBzdGFuZGFsb25lOiB0cnVlLFxuICogfSlcbiAqIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVDb21wb25lbnQge31cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSByb3V0ZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmluZVJvdXRlTWV0YSA9IChyb3V0ZTogUmVzdHJpY3RlZFJvdXRlKSA9PiB7XG4gIHJldHVybiByb3V0ZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5zdGFuY2Ugb2YgQW5ndWxhciBSb3V0ZXJcbiAqXG4gKiBAcmV0dXJucyBUaGUgcm91dGVyXG4gKi9cbmV4cG9ydCBjb25zdCBpbmplY3RSb3V0ZXIgPSAoKSA9PiB7XG4gIHJldHVybiBpbmplY3QoUm91dGVyKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5zdGFuY2Ugb2YgdGhlIEFjdGl2YXRlIFJvdXRlIGZvciB0aGUgY29tcG9uZW50XG4gKlxuICogQHJldHVybnMgVGhlIGFjdGl2YXRlZCByb3V0ZVxuICovXG5leHBvcnQgY29uc3QgaW5qZWN0QWN0aXZhdGVkUm91dGUgPSAoKSA9PiB7XG4gIHJldHVybiBpbmplY3QoQWN0aXZhdGVkUm91dGUpO1xufTtcbiJdfQ==