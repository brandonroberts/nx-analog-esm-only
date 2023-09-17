import { Route as NgRoute, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
type RouteOmitted = 'component' | 'loadComponent' | 'loadChildren' | 'path' | 'pathMatch';
type RestrictedRoute = Omit<NgRoute, RouteOmitted>;
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
export declare const defineRouteMeta: (route: RestrictedRoute) => RestrictedRoute;
/**
 * Returns the instance of Angular Router
 *
 * @returns The router
 */
export declare const injectRouter: () => Router;
/**
 * Returns the instance of the Activate Route for the component
 *
 * @returns The activated route
 */
export declare const injectActivatedRoute: () => ActivatedRoute;
export {};
