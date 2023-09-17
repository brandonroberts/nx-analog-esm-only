import { Plugin } from 'vite';
export declare function buildOptimizerPlugin({ isProd, supportedBrowsers, }: {
    isProd: boolean;
    supportedBrowsers: string[];
}): Plugin;
