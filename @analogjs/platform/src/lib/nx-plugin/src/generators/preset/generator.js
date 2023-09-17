"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function default_1(tree, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield Promise.resolve().then(() => require('../app/generator')).then(({ appGenerator }) => appGenerator(tree, options));
    });
}
exports.default = default_1;
//# sourceMappingURL=generator.js.map