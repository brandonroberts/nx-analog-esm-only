"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHomePage = void 0;
const devkit_1 = require("@nx/devkit");
const path = require("path");
function addHomePage(tree, options) {
    const templateOptions = Object.assign(Object.assign({}, options), { template: '' });
    (0, devkit_1.generateFiles)(tree, path.join(__dirname, '..', 'files', 'index-page'), options.projectRoot, templateOptions);
    let pageDirectory = options.addTailwind ? 'tailwind' : 'css';
    if (options.addTRPC) {
        pageDirectory += '-trpc';
    }
    (0, devkit_1.generateFiles)(tree, path.join(__dirname, '..', 'files', 'welcome-components', pageDirectory), options.projectRoot, templateOptions);
}
exports.addHomePage = addHomePage;
//# sourceMappingURL=add-home-page.js.map