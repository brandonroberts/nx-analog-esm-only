import { __awaiter } from "tslib";
import { vi } from 'vitest';
import * as path from 'path';
export const mockViteDevServer = {
    middlewares: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        use: () => { },
    },
};
export const mockNitroConfig = {
    buildDir: path.resolve('./dist/.nitro'),
    handlers: [],
    logLevel: 0,
    output: {
        dir: path.resolve('dist/analog'),
        publicDir: path.resolve('dist/analog/public'),
    },
    rootDir: '.',
    runtimeConfig: {},
    scanDirs: ['src/server'],
    srcDir: 'src/server',
    prerender: {
        crawlLinks: undefined,
    },
    typescript: {
        generateTsConfig: false,
    },
    rollupConfig: {
        plugins: [
            {
                name: 'analogjs-vite-plugin-nitro-rollup-page-endpoint',
                transform() { },
            },
        ],
    },
};
export function mockBuildFunctions() {
    return __awaiter(this, void 0, void 0, function* () {
        const buildServerImport = yield import('./build-server');
        const buildServerImportSpy = vi.fn();
        buildServerImport.buildServer = buildServerImportSpy;
        const buildSSRAppImport = yield import('./build-ssr');
        const buildSSRAppImportSpy = vi.fn();
        buildSSRAppImport.buildSSRApp = buildSSRAppImportSpy;
        const buildSitemapImport = yield import('./build-sitemap');
        const buildSitemapImportSpy = vi.fn();
        buildSitemapImport.buildSitemap = buildSitemapImportSpy;
        return { buildSSRAppImportSpy, buildServerImportSpy, buildSitemapImportSpy };
    });
}
export function runConfigAndCloseBundle(plugin) {
    return __awaiter(this, void 0, void 0, function* () {
        yield plugin[1].config({}, { command: 'build' });
        yield plugin[1].closeBundle();
    });
}
//# sourceMappingURL=vite-nitro-plugin.spec.data.js.map