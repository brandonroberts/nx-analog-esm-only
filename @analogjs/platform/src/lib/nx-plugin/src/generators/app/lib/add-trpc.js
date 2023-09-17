"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTrpc = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nx/devkit");
const path = require("path");
const trpc_dependencies_1 = require("../versions/trpc-dependencies");
function addTrpc(tree, projectRoot, nxVersion, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const dependencies = (0, trpc_dependencies_1.getTrpcDependencies)(nxVersion);
        (0, devkit_1.addDependenciesToPackageJson)(tree, dependencies, {});
        const templateOptions = Object.assign(Object.assign({}, options), { template: '' });
        (0, devkit_1.generateFiles)(tree, path.join(__dirname, '..', 'files', 'trpc'), projectRoot, templateOptions);
    });
}
exports.addTrpc = addTrpc;
//# sourceMappingURL=add-trpc.js.map