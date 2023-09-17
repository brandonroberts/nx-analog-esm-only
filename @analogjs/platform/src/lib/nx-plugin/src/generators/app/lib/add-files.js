"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const devkit_1 = require("@nx/devkit");
const path = require("path");
function addFiles(tree, options, majorAngularVersion) {
    const templateOptions = Object.assign(Object.assign({}, options), { template: '' });
    (0, devkit_1.generateFiles)(tree, path.join(__dirname, '..', 'files', 'template-angular-v' + majorAngularVersion), options.projectRoot, templateOptions);
}
exports.addFiles = addFiles;
//# sourceMappingURL=add-files.js.map