import { __awaiter } from "tslib";
import { copyPublicAssets, prerender } from 'nitropack';
import { createNitro, build, prepare } from 'nitropack';
import { addPostRenderingHooks } from './hooks/post-rendering-hook.js';
export function buildServer(options, nitroConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const nitro = yield createNitro(Object.assign({ dev: false, preset: process.env['BUILD_PRESET'] }, nitroConfig));
        if ((_a = options === null || options === void 0 ? void 0 : options.prerender) === null || _a === void 0 ? void 0 : _a.postRenderingHooks) {
            addPostRenderingHooks(nitro, options.prerender.postRenderingHooks);
        }
        yield prepare(nitro);
        yield copyPublicAssets(nitro);
        console.log(`Prerendering static pages...`);
        yield prerender(nitro);
        if (!(options === null || options === void 0 ? void 0 : options.static)) {
            console.log('Building Server...');
            yield build(nitro);
        }
        yield nitro.close();
    });
}
//# sourceMappingURL=build-server.js.map