"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAngularWorkspace = void 0;
const tslib_1 = require("tslib");
const semver_1 = require("semver");
const devkit_1 = require("@nx/devkit");
const version_utils_1 = require("../../../utils/version-utils");
const minimum_supported_versions_1 = require("../versions/minimum-supported-versions");
const nx_dependencies_1 = require("../versions/nx-dependencies");
function initializeAngularWorkspace(tree, installedNxVersion, normalizedOptions) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let angularVersion = (0, version_utils_1.getInstalledPackageVersion)(tree, '@angular/core');
        if (!angularVersion) {
            console.log('Angular has not been installed yet. Creating an Angular application');
            if ((0, semver_1.major)(installedNxVersion) === 16) {
                angularVersion = yield initWithNxNamespace(tree, installedNxVersion, normalizedOptions.skipFormat);
            }
            else {
                angularVersion = yield initWithNrwlNamespace(tree, installedNxVersion, normalizedOptions.skipFormat);
            }
        }
        if ((0, minimum_supported_versions_1.belowMinimumSupportedAngularVersion)(angularVersion)) {
            throw new Error((0, devkit_1.stripIndents) `Analog only supports an Angular version of 15 and higher`);
        }
        return angularVersion;
    });
}
exports.initializeAngularWorkspace = initializeAngularWorkspace;
const initWithNxNamespace = (tree, installedNxVersion, skipFormat = true) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const versions = (0, nx_dependencies_1.getNxDependencies)(installedNxVersion);
    try {
        (0, devkit_1.ensurePackage)('@nx/devkit', versions['@nx/devkit']);
        (0, devkit_1.ensurePackage)('@nx/angular', versions['@nx/angular']);
        (0, devkit_1.ensurePackage)('@nx/linter', versions['@nx/linter']);
    }
    catch (_a) {
        // @nx/angular cannot be required so this fails but this will still allow executing the nx angular init later on
    }
    (0, devkit_1.addDependenciesToPackageJson)(tree, {}, {
        '@nx/devkit': versions['@nx/devkit'],
        '@nx/angular': versions['@nx/angular'],
        '@nx/linter': versions['@nx/linter'],
    });
    yield (yield Promise.resolve().then(() => require(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '@nx/angular/generators'))).angularInitGenerator(tree, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        unitTestRunner: 'none',
        skipInstall: true,
        skipFormat: skipFormat,
    });
    return (0, version_utils_1.getInstalledPackageVersion)(tree, '@angular/core', null, true);
});
const initWithNrwlNamespace = (tree, installedNxVersion, skipFormat = true) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const versions = (0, nx_dependencies_1.getNrwlDependencies)(installedNxVersion);
    try {
        (0, devkit_1.ensurePackage)('@nrwl/devkit', versions['@nrwl/devkit']);
        (0, devkit_1.ensurePackage)('@nrwl/angular', versions['@nrwl/angular']);
        (0, devkit_1.ensurePackage)('@nrwl/linter', versions['@nrwl/linter']);
    }
    catch (_b) {
        // @nx/angular cannot be required so this fails but this will still allow executing the nx angular init later on
    }
    (0, devkit_1.addDependenciesToPackageJson)(tree, {}, {
        '@nrwl/devkit': versions['@nrwl/devkit'],
        '@nrwl/angular': versions['@nrwl/angular'],
        '@nrwl/linter': versions['@nrwl/linter'],
    });
    yield (yield Promise.resolve().then(() => require(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '@nrwl/angular/generators'))).angularInitGenerator(tree, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        unitTestRunner: 'none',
        skipInstall: true,
        skipFormat: skipFormat,
    });
    return (0, version_utils_1.getInstalledPackageVersion)(tree, '@angular/core', null, true);
});
//# sourceMappingURL=initialize-analog-workspace.js.map