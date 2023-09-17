import { __awaiter } from "tslib";
export function jitPlugin({ inlineStylesExtension, }) {
    let styleTransform;
    let watchMode = false;
    let viteServer;
    let cssPlugin;
    return {
        name: '@analogjs/vite-plugin-angular-jit',
        config(_config, { command }) {
            watchMode = command === 'serve';
        },
        buildStart({ plugins }) {
            if (Array.isArray(plugins)) {
                cssPlugin = plugins.find((plugin) => plugin.name === 'vite:css');
            }
            styleTransform = watchMode
                ? viteServer.pluginContainer.transform
                : cssPlugin.transform;
        },
        configureServer(server) {
            viteServer = server;
        },
        resolveId(id) {
            if (id.startsWith('virtual:angular')) {
                return `\0${id}`;
            }
            return;
        },
        load(id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (id.includes('virtual:angular:jit:style:inline;')) {
                    const styleId = id.split('style:inline;')[1];
                    const decodedStyles = Buffer.from(decodeURIComponent(styleId), 'base64').toString();
                    let styles = '';
                    try {
                        const compiled = yield styleTransform(decodedStyles, `${styleId}.${inlineStylesExtension}?direct`);
                        styles = compiled === null || compiled === void 0 ? void 0 : compiled.code;
                    }
                    catch (e) {
                        console.error(`${e}`);
                    }
                    return `export default \`${styles}\``;
                }
                return;
            });
        },
    };
}
//# sourceMappingURL=angular-jit-plugin.js.map