"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analogPageGeneratorSchematic = exports.analogPageGenerator = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const path = require("path");
function normalizeOptions(tree, options) {
    const projectRoot = `${(0, devkit_1.getWorkspaceLayout)(tree).appsDir}/${options.project}`;
    return Object.assign(Object.assign({}, options), { projectRoot });
}
function generateFileName(input) {
    const pattern = /^[a-zA-Z0-9]+\.\[[a-zA-Z0-9-]+\]$/;
    if (pattern.test(input)) {
        return input.replace(/\[[a-zA-Z0-9-]+\]/, (match) => {
            const wordId = match.slice(1, -1);
            const camelCaseWordId = wordId.replace(/-([a-zA-Z0-9])/g, (_, letter) => letter.toUpperCase());
            return `[${camelCaseWordId}]`;
        });
    }
    else {
        return input;
    }
}
function addFiles(tree, options) {
    const splitName = options.pathname.split('/');
    const routeName = splitName[splitName.length - 1];
    const fileName = generateFileName(routeName);
    const templateOptions = Object.assign(Object.assign(Object.assign({}, options), (0, devkit_1.names)(routeName)), { name: (0, devkit_1.names)(routeName).fileName, offsetFromRoot: (0, devkit_1.offsetFromRoot)(options.projectRoot), template: '', fileName });
    const pageFolders = options.pathname.toLowerCase().split('/');
    const pageDir = path.join(options.projectRoot, `/src/app/pages/${pageFolders.slice(0, -1)}`);
    (0, devkit_1.generateFiles)(tree, path.join(__dirname, 'files'), pageDir, templateOptions);
}
function analogPageGenerator(tree, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const normalizedOptions = normalizeOptions(tree, options);
        if (options.redirectPage && !options.redirectPath) {
            throw new Error((0, devkit_1.stripIndents) `A redirectPath is required when redirectPage is true.`);
        }
        addFiles(tree, normalizedOptions);
        yield (0, devkit_1.formatFiles)(tree);
    });
}
exports.analogPageGenerator = analogPageGenerator;
exports.analogPageGeneratorSchematic = (0, devkit_1.convertNxGenerator)(analogPageGenerator);
exports.default = analogPageGenerator;
//# sourceMappingURL=generator.js.map