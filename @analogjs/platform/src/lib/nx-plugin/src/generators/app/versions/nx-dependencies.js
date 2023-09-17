"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNxDependencies = exports.getNrwlDependencies = void 0;
const semver_1 = require("semver");
const devkit_1 = require("@nx/devkit");
const versions_1 = require("./nx_16_X/versions");
const versions_2 = require("./nx_15_X/versions");
const nrwlDependencyKeys = [
    '@nrwl/devkit',
    '@nrwl/angular',
    '@nrwl/linter',
];
const getNrwlDependencies = (nxVersion) => {
    const escapedNxVersion = (0, semver_1.clean)(nxVersion);
    // fail out for versions <15.2.0
    if ((0, semver_1.lt)(escapedNxVersion, '15.2.0')) {
        throw new Error((0, devkit_1.stripIndents) `Nx v15.2.0 or newer is required to install Analog`);
    }
    // install 15.8 deps for versions 15.8.0 =< 16.0.0
    if ((0, semver_1.lt)(escapedNxVersion, '16.0.0')) {
        return {
            '@nrwl/angular': versions_2.V15_X_NRWL_ANGULAR,
            '@nrwl/devkit': versions_2.V15_X_NRWL_DEVKIT,
            '@nrwl/linter': versions_2.V15_X_NRWL_LINTER,
        };
    }
    // error for @nrwl to @nx namespace change for Nx >= 16
    throw new Error((0, devkit_1.stripIndents) `As of Nx 16.0.0 the @nrwl scope has been replaced with the @nx scope. Please use @nx scope to install version ${nxVersion}`);
};
exports.getNrwlDependencies = getNrwlDependencies;
const nxDependencyKeys = ['@nx/devkit', '@nx/angular', '@nx/linter'];
const getNxDependencies = (nxVersion) => {
    const escapedNxVersion = (0, semver_1.clean)(nxVersion);
    // error for @nrwl to @nx namespace changes for Nx < 16
    if ((0, semver_1.lt)(escapedNxVersion, '16.0.0')) {
        throw new Error((0, devkit_1.stripIndents) `The @nx scope is only supported in Nx 16.0.0 and newer. Please use @nrwl scope to install version ${nxVersion}`);
    }
    // install 16.0 deps for versions 16.0.0 =< 16.1.0
    if ((0, semver_1.lt)(escapedNxVersion, '16.1.0')) {
        return {
            '@nx/angular': versions_2.V15_X_NX_ANGULAR,
            '@nx/devkit': versions_2.V15_X_NX_DEVKIT,
            '@nx/linter': versions_2.V15_X_NX_LINTER,
        };
    }
    // return latest for >= 16.4.0
    return {
        '@nx/angular': versions_1.V16_X_NX_ANGULAR,
        '@nx/devkit': versions_1.V16_X_NX_DEVKIT,
        '@nx/linter': versions_1.V16_X_NX_LINTER,
    };
};
exports.getNxDependencies = getNxDependencies;
//# sourceMappingURL=nx-dependencies.js.map