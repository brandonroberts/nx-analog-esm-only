import { __awaiter } from "tslib";
import { build, mergeConfig } from 'vite';
import * as path from 'path';
export function buildSSRApp(config, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const rootDir = config.root || '.';
        const ssrBuildConfig = mergeConfig(config, {
            build: {
                ssr: true,
                rollupOptions: {
                    input: (options === null || options === void 0 ? void 0 : options.entryServer) || path.resolve(rootDir, './src/main.server.ts'),
                },
                outDir: (options === null || options === void 0 ? void 0 : options.ssrBuildDir) || path.resolve('dist', rootDir, 'ssr'),
            },
        });
        yield build(ssrBuildConfig);
    });
}
//# sourceMappingURL=build-ssr.js.map