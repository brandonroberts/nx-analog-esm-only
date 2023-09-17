"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstalledPackageVersion = void 0;
const devkit_1 = require("@nx/devkit");
const semver_1 = require("semver");
function getInstalledPackageVersion(tree, packageName, defaultVersion, raw = false) {
    var _a, _b;
    const pkgJson = (0, devkit_1.readJson)(tree, 'package.json');
    const installedPackageVersion = (pkgJson.dependencies && pkgJson.dependencies[packageName]) ||
        (pkgJson.devDependencies && pkgJson.devDependencies[packageName]);
    if (!installedPackageVersion && !defaultVersion) {
        return null;
    }
    if (!installedPackageVersion ||
        installedPackageVersion === 'latest' ||
        installedPackageVersion === 'next') {
        return (_a = (0, semver_1.clean)(defaultVersion)) !== null && _a !== void 0 ? _a : (0, semver_1.coerce)(defaultVersion).version;
    }
    return ((_b = (raw ? installedPackageVersion : (0, semver_1.clean)(installedPackageVersion))) !== null && _b !== void 0 ? _b : (0, semver_1.coerce)(installedPackageVersion).version);
}
exports.getInstalledPackageVersion = getInstalledPackageVersion;
//# sourceMappingURL=version-utils.js.map