"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEslint = void 0;
const tslib_1 = require("tslib");
function addEslint(tree, majorNxVersion, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const linterOptions = {
            // needed to not depend on linter package
            linter: 'eslint',
            project: options.projectName,
            eslintFilePatterns: [`${options.projectRoot}/**/*.{ts,html}`],
            skipFormat: true,
        };
        if (majorNxVersion === 16) {
            yield (yield Promise.resolve().then(() => require(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            '@nx/linter'))).lintProjectGenerator(tree, linterOptions);
        }
        else {
            yield (yield Promise.resolve().then(() => require(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            '@nrwl/linter'))).lintProjectGenerator(tree, linterOptions);
        }
    });
}
exports.addEslint = addEslint;
//# sourceMappingURL=add-eslint.js.map