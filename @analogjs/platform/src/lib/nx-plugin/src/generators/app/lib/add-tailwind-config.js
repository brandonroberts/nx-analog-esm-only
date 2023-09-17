"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTailwindConfig = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const path = require("path");
function addTailwindConfig(tree, projectRoot, projectName, majorNxVersion) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (majorNxVersion === 16) {
            yield (yield Promise.resolve().then(() => require(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            '@nx/angular/generators'))).setupTailwindGenerator(tree, {
                project: projectName,
            });
        }
        else {
            yield (yield Promise.resolve().then(() => require(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            '@nrwl/angular/generators'))).setupTailwindGenerator(tree, { project: projectName });
        }
        (0, devkit_1.generateFiles)(tree, path.join(__dirname, '..', 'files', 'tailwind'), projectRoot, { template: '' });
    });
}
exports.addTailwindConfig = addTailwindConfig;
//# sourceMappingURL=add-tailwind-config.js.map