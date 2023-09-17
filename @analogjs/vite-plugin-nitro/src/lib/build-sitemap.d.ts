import { UserConfig } from 'vite';
import { SitemapConfig } from './options.js';
export type PagesJson = {
    page: string;
    lastMod: string;
};
export declare function buildSitemap(config: UserConfig, sitemapConfig: SitemapConfig, routes: string[] | (() => Promise<(string | undefined)[]>), outputDir: string): Promise<void>;
