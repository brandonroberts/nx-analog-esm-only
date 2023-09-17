import { NitroConfig } from 'nitropack';
import { Plugin } from 'vite';
import { Mock } from 'vitest';
export declare const mockViteDevServer: {
    middlewares: {
        use: () => void;
    };
};
export declare const mockNitroConfig: NitroConfig;
export declare function mockBuildFunctions(): Promise<{
    buildSSRAppImportSpy: Mock<any, any>;
    buildServerImportSpy: Mock<any, any>;
    buildSitemapImportSpy: Mock<any, any>;
}>;
export declare function runConfigAndCloseBundle(plugin: Plugin[]): Promise<void>;
