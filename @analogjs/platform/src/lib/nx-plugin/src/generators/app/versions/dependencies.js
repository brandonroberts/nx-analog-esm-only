"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalogDependencies = void 0;
const semver_1 = require("semver");
const versions_1 = require("./nx_16_X/versions");
const versions_2 = require("./nx_15_X/versions");
const devkit_1 = require("@nx/devkit");
const dependencyKeys15 = [
    '@analogjs/content',
    '@analogjs/router',
    '@angular/platform-server',
    'front-matter',
    'marked',
    'mermaid',
    'prismjs',
];
const dependencyKeys16 = [
    'marked-gfm-heading-id',
    'marked-highlight',
    'mermaid',
];
const getAnalogDependencies = (nxVersion, angularVersion) => {
    const escapedNxVersion = nxVersion.replace(/[~^]/, '');
    // fail out for versions <15.2.0
    if ((0, semver_1.lt)(escapedNxVersion, '15.2.0')) {
        throw new Error((0, devkit_1.stripIndents) `Nx v15.2.0 or newer is required to install Analog`);
    }
    // install 15.X deps for versions 15.8.0 =< 16.1.0
    if ((0, semver_1.lt)(escapedNxVersion, '16.1.0')) {
        return {
            '@angular/platform-server': angularVersion,
            '@analogjs/content': versions_2.V15_X_ANALOG_JS_CONTENT,
            '@analogjs/router': versions_2.V15_X_ANALOG_JS_ROUTER,
            'front-matter': versions_2.V15_X_FRONT_MATTER,
            marked: versions_2.V15_X_MARKED,
            mermaid: versions_2.V15_X_MERMAID,
            prismjs: versions_2.V15_X_PRISMJS,
        };
    }
    // return latest 16.X deps for versions >= 16.1.0
    return {
        '@angular/platform-server': angularVersion,
        '@analogjs/content': versions_1.V16_X_ANALOG_JS_CONTENT,
        '@analogjs/router': versions_1.V16_X_ANALOG_JS_ROUTER,
        'front-matter': versions_1.V16_X_FRONT_MATTER,
        marked: versions_1.V16_X_MARKED,
        'marked-gfm-heading-id': versions_1.V16_X_MARKED_GFM_HEADING_ID,
        'marked-highlight': versions_1.V16_X_MARKED_HIGHLIGHT,
        mermaid: versions_1.V16_X_MERMAID,
        prismjs: versions_1.V16_X_PRISMJS,
    };
};
exports.getAnalogDependencies = getAnalogDependencies;
//# sourceMappingURL=dependencies.js.map