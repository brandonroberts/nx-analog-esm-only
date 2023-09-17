import { dirname, resolve } from 'path';
const styleUrlsRE = /styleUrls\s*:\s*\[([^\[]*?)\]/;
const templateUrlRE = /templateUrl:\s*["'](.*?)["']/g;
export function hasStyleUrls(code) {
    return styleUrlsRE.test(code);
}
const EMPTY_ARRAY = [];
export class StyleUrlsResolver {
    constructor() {
        // These resolvers may be called multiple times during the same
        // compilation for the same files. Caching is required because these
        // resolvers use synchronous system calls to the filesystem, which can
        // degrade performance when running compilations for multiple files.
        this.styleUrlsCache = new Map();
    }
    resolve(code, id) {
        const styleUrlsExecArray = styleUrlsRE.exec(code);
        if (styleUrlsExecArray === null) {
            return EMPTY_ARRAY;
        }
        // Given the code is the following:
        // @Component({
        //   styleUrls: [
        //     './app.component.scss'
        //   ]
        // })
        // The `matchedStyleUrls` would result in: `styleUrls: [\n    './app.component.scss'\n  ]`.
        const [matchedStyleUrls] = styleUrlsExecArray;
        const entry = this.styleUrlsCache.get(id);
        // We're using `matchedStyleUrls` as a key because the code may be changing continuously,
        // resulting in the resolver being called multiple times. While the code changes, the
        // `styleUrls` may remain constant, which means we should always return the previously
        // resolved style URLs.
        if ((entry === null || entry === void 0 ? void 0 : entry.matchedStyleUrls) === matchedStyleUrls) {
            return entry.styleUrls;
        }
        // The `styleUrls` property is an array, which means we may have a list of
        // CSS files provided there. Let `matchedStyleUrls` be equal to the following:
        // "styleUrls: [\n    './app.component.scss',\n    '../global.scss'\n  ]"
        const styleUrlPaths = matchedStyleUrls
            .replace(/(styleUrls|\:|\s|\[|\]|"|')/g, '')
            // The above replace will result in the following:
            // "./app.component.scss,../global.scss"
            .split(',');
        const styleUrls = styleUrlPaths.map((styleUrlPath) => {
            return `${styleUrlPath}|${resolve(dirname(id), styleUrlPath)}`;
        });
        this.styleUrlsCache.set(matchedStyleUrls, { styleUrls, matchedStyleUrls });
        return styleUrls;
    }
}
export function hasTemplateUrl(code) {
    return code.includes('templateUrl:');
}
export class TemplateUrlsResolver {
    constructor() {
        this.templateUrlsCache = new Map();
    }
    resolve(code, id) {
        const entry = this.templateUrlsCache.get(id);
        if ((entry === null || entry === void 0 ? void 0 : entry.code) === code) {
            return entry.templateUrlPaths;
        }
        const templateUrlGroup = Array.from(code.matchAll(templateUrlRE));
        const templateUrlPaths = [];
        if (Array.isArray(templateUrlGroup)) {
            templateUrlGroup.forEach((trg) => {
                const resolvedTemplatePath = trg[1].replace(/templateUrl|\s|'|"|\:|,/g, '');
                const templateUrlPath = resolve(dirname(id), resolvedTemplatePath);
                templateUrlPaths.push(`${resolvedTemplatePath}|${templateUrlPath}`);
            });
        }
        this.templateUrlsCache.set(id, { code, templateUrlPaths });
        return templateUrlPaths;
    }
}
//# sourceMappingURL=component-resolvers.js.map