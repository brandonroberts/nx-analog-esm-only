import { __awaiter } from "tslib";
import { buildSync } from 'esbuild';
import { normalizePath } from 'vite';
export function pageEndpointsPlugin() {
    return {
        name: 'analogjs-vite-plugin-nitro-rollup-page-endpoint',
        transform(_code, id) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                if (normalizePath(id).includes('src/app/pages') &&
                    id.endsWith('.server.ts')) {
                    const compiled = buildSync({
                        stdin: {
                            contents: _code,
                            sourcefile: id,
                            loader: 'ts',
                        },
                        write: false,
                        metafile: true,
                        platform: 'neutral',
                        format: 'esm',
                        logLevel: 'silent',
                    });
                    let fileExports = [];
                    for (let key in (_a = compiled.metafile) === null || _a === void 0 ? void 0 : _a.outputs) {
                        if ((_b = compiled.metafile) === null || _b === void 0 ? void 0 : _b.outputs[key].entryPoint) {
                            fileExports = (_c = compiled.metafile) === null || _c === void 0 ? void 0 : _c.outputs[key].exports;
                        }
                    }
                    const code = `
            import { defineEventHandler } from 'h3';

            ${fileExports.includes('load')
                        ? _code
                        : `
                ${_code}
                export const load = () => {
                  return {};
                }`}

            export default defineEventHandler(async(event) => {
              try {
                return await load({
                  params: event.context.params,
                  req: event.node.req,
                  res: event.node.res,
                  fetch: $fetch,
                  event
                });
              } catch(e) {
                console.error(\` An error occurred: \$\{e\}\`)
                throw e;
              }
            });
          `;
                    return {
                        code,
                        map: null,
                    };
                }
                return;
            });
        },
    };
}
//# sourceMappingURL=page-endpoints.js.map