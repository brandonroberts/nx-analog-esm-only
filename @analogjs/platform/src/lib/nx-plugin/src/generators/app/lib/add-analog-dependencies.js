"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAnalogDependencies = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const dependencies_1 = require("../versions/dependencies");
const dev_dependencies_1 = require("../versions/dev-dependencies");
function addAnalogDependencies(tree, nxVersion, angularVersion) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const dependencies = (0, dependencies_1.getAnalogDependencies)(nxVersion, angularVersion);
        const devDependencies = (0, dev_dependencies_1.getAnalogDevDependencies)(nxVersion);
        // ensure previous @analogjs/platform version is removed, whether installed
        // as a dependency or devDependency, before adding analog dependencies.
        (0, devkit_1.removeDependenciesFromPackageJson)(tree, ['@analogjs/platform'], ['@analogjs/platform']);
        (0, devkit_1.addDependenciesToPackageJson)(tree, dependencies, devDependencies);
    });
}
exports.addAnalogDependencies = addAnalogDependencies;
//# sourceMappingURL=add-analog-dependencies.js.map