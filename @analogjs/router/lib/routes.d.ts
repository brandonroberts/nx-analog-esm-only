import type { Route } from '@angular/router';
import type { RouteExport } from './models';
export type Files = Record<string, () => Promise<RouteExport | string>>;
/**
 * A function used to parse list of files and create configuration of routes.
 *
 * @param files
 * @returns Array of routes
 */
export declare function createRoutes(files: Files): Route[];
export declare const routes: Route[];
