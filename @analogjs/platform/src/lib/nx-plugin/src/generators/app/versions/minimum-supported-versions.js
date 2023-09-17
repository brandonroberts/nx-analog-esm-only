"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.belowMinimumSupportedAngularVersion = exports.belowMinimumSupportedNxtRPCVersion = exports.belowMinimumSupportedNxVersion = exports.MINIMUM_SUPPORTED_ANGULAR_VERSION = exports.MINIMUM_SUPPORTED_NX_VERSION = exports.MINIMUM_SUPPORTED_NX_TRPC_VERSION = void 0;
const semver_1 = require("semver");
exports.MINIMUM_SUPPORTED_NX_TRPC_VERSION = '16.1.0';
exports.MINIMUM_SUPPORTED_NX_VERSION = '15.2.0';
exports.MINIMUM_SUPPORTED_ANGULAR_VERSION = '15.0.0';
const belowMinimumSupportedNxVersion = (nxVersion) => (0, semver_1.lt)((0, semver_1.coerce)(nxVersion), exports.MINIMUM_SUPPORTED_NX_VERSION);
exports.belowMinimumSupportedNxVersion = belowMinimumSupportedNxVersion;
const belowMinimumSupportedNxtRPCVersion = (nxVersion) => (0, semver_1.lt)((0, semver_1.coerce)(nxVersion), exports.MINIMUM_SUPPORTED_NX_TRPC_VERSION);
exports.belowMinimumSupportedNxtRPCVersion = belowMinimumSupportedNxtRPCVersion;
const belowMinimumSupportedAngularVersion = (angularVersion) => (0, semver_1.lt)((0, semver_1.coerce)(angularVersion), exports.MINIMUM_SUPPORTED_ANGULAR_VERSION);
exports.belowMinimumSupportedAngularVersion = belowMinimumSupportedAngularVersion;
//# sourceMappingURL=minimum-supported-versions.js.map