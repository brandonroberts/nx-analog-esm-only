"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalogDevDependencies = void 0;
const semver_1 = require("semver");
const versions_1 = require("./nx_16_X/versions");
const versions_2 = require("./nx_15_X/versions");
const devkit_1 = require("@nx/devkit");
// TODO: @analogjs/vite-plugin-angular is being defined as we must pin
// a supported version for Angular 15.x. This is not necessary for 16.x,
// so this could probably be amended to only add as an explicit
// devDependency for 15.x.
const devDependencyKeys = [
    '@analogjs/platform',
    '@analogjs/vite-plugin-angular',
    'jsdom',
    'vite',
    'vite-tsconfig-paths',
    'vitest',
];
const getAnalogDevDependencies = (nxVersion) => {
    const escapedNxVersion = nxVersion.replace(/[~^]/, '');
    const nxViteDependency = getViteDependency(escapedNxVersion);
    const devDependencies = getDevDependencies(escapedNxVersion);
    return Object.assign(Object.assign({}, nxViteDependency), devDependencies);
};
exports.getAnalogDevDependencies = getAnalogDevDependencies;
const getViteDependency = (escapedNxVersion) => {
    // fail out for versions <15.2.0
    if ((0, semver_1.lt)(escapedNxVersion, '15.2.0')) {
        throw new Error((0, devkit_1.stripIndents) `Nx v15.2.0 or newer is required to install Analog`);
    }
    // install 15.8 deps for versions 15.8.0 =< 16.0.0
    if ((0, semver_1.lt)(escapedNxVersion, '16.0.0')) {
        return {
            '@nrwl/vite': versions_2.V15_X_NRWL_VITE,
        };
    }
    // install 16.0 deps for versions 16.0.0 =< 16.1.0
    if ((0, semver_1.lt)(escapedNxVersion, '16.1.0')) {
        return {
            '@nx/vite': versions_2.V15_X_NX_VITE,
        };
    }
    // return latest deps for versions >= 16.4.0
    return {
        '@nx/vite': versions_1.V16_X_NX_VITE,
    };
};
const getDevDependencies = (escapedNxVersion) => {
    // fail out for versions <15.2.0
    if ((0, semver_1.lt)(escapedNxVersion, '15.2.0')) {
        throw new Error((0, devkit_1.stripIndents) `Nx v15.2.0 or newer is required to install Analog`);
    }
    // install 15.x deps for versions <16.1.0
    if ((0, semver_1.lt)(escapedNxVersion, '16.1.0')) {
        return {
            '@analogjs/platform': versions_2.V15_X_ANALOG_JS_PLATFORM,
            '@analogjs/vite-plugin-angular': versions_2.V15_X_ANALOG_JS_VITE_PLUGIN_ANGULAR,
            jsdom: versions_2.V15_X_JSDOM,
            vite: versions_2.V15_X_VITE,
            'vite-tsconfig-paths': versions_2.V15_X_VITE_TSCONFIG_PATHS,
            vitest: versions_2.V15_X_VITEST,
        };
    }
    // return latest 16.x deps for versions >16.1.0
    return {
        '@analogjs/platform': versions_1.V16_X_ANALOG_JS_PLATFORM,
        '@analogjs/vite-plugin-angular': versions_1.V16_X_ANALOG_JS_VITE_PLUGIN_ANGULAR,
        jsdom: versions_1.V16_X_JSDOM,
        vite: versions_1.V16_X_VITE,
        'vite-tsconfig-paths': versions_1.V16_X_VITE_TSCONFIG_PATHS,
        vitest: versions_1.V16_X_VITEST,
    };
};
//# sourceMappingURL=dev-dependencies.js.map