"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrpcDependencies = void 0;
const semver_1 = require("semver");
const versions_1 = require("./nx_16_X/versions");
const versions_2 = require("./nx_15_X/versions");
const devkit_1 = require("@nx/devkit");
const tRPCDependencyKeys = [
    '@analogjs/trpc',
    '@trpc/client',
    '@trpc/server',
    'superjson',
    'isomorphic-fetch',
    'zod',
];
const getTrpcDependencies = (nxVersion) => {
    const escapedNxVersion = (0, semver_1.clean)(nxVersion);
    // fail out for versions <15.2.0
    if ((0, semver_1.lt)(escapedNxVersion, '15.2.0')) {
        throw new Error((0, devkit_1.stripIndents) `Nx v15.2.0 or newer is required to install Analog`);
    }
    // install 15.8 deps for versions 15.8.0 =< 16.1.0
    if ((0, semver_1.lt)(escapedNxVersion, '16.1.0')) {
        return {
            '@analogjs/trpc': versions_2.V15_X_ANALOG_JS_TRPC,
            '@trpc/client': versions_2.V15_X_TRPC_CLIENT,
            '@trpc/server': versions_2.V15_X_TRPC_SERVER,
            superjson: versions_2.V15_X_SUPERJSON,
            'isomorphic-fetch': versions_2.V15_X_ISOMORPHIC_FETCH,
            zod: versions_2.V15_X_ZOD,
        };
    }
    // return latest deps for versions >= 16.1.0
    return {
        '@analogjs/trpc': versions_1.V16_X_ANALOG_JS_TRPC,
        '@trpc/client': versions_1.V16_X_TRPC_CLIENT,
        '@trpc/server': versions_1.V16_X_TRPC_SERVER,
        superjson: versions_1.V16_X_SUPERJSON,
        'isomorphic-fetch': versions_1.V16_X_ISOMORPHIC_FETCH,
        zod: versions_1.V16_X_ZOD,
    };
};
exports.getTrpcDependencies = getTrpcDependencies;
//# sourceMappingURL=trpc-dependencies.js.map