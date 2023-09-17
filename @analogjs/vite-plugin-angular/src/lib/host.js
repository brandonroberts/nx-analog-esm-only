import { __awaiter } from "tslib";
import { normalizePath } from '@ngtools/webpack/src/ivy/paths.js';
export function augmentHostWithResources(host, transform, options = {}) {
    const resourceHost = host;
    resourceHost.readResource = function (fileName) {
        const filePath = normalizePath(fileName);
        const content = this.readFile(filePath);
        if (content === undefined) {
            throw new Error('Unable to locate component resource: ' + fileName);
        }
        return content;
    };
    resourceHost.transformResource = function (data, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Only style resources are supported currently
            if (context.type !== 'style') {
                return null;
            }
            if (options.inlineStylesExtension) {
                // Resource file only exists for external stylesheets
                const filename = (_a = context.resourceFile) !== null && _a !== void 0 ? _a : `${context.containingFile.replace(/\.ts$/, `.${options === null || options === void 0 ? void 0 : options.inlineStylesExtension}`)}`;
                let stylesheetResult;
                try {
                    stylesheetResult = yield transform(data, `${filename}?direct`);
                }
                catch (e) {
                    console.error(`${e}`);
                }
                return { content: (stylesheetResult === null || stylesheetResult === void 0 ? void 0 : stylesheetResult.code) || '' };
            }
            return null;
        });
    };
}
//# sourceMappingURL=host.js.map