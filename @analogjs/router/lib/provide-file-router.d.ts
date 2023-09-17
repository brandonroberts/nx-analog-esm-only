import { EnvironmentProviders } from '@angular/core';
import { RouterFeatures } from '@angular/router';
/**
 * Sets up providers for the Angular router, and registers
 * file-based routes. Additional features can be provided
 * to further configure the behavior of the router.
 *
 * @param features
 * @returns Providers and features to configure the router with routes
 */
export declare function provideFileRouter(...features: RouterFeatures[]): EnvironmentProviders;
