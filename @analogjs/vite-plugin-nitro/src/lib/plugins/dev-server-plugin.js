// SSR dev server, middleware and error page source modified from
// https://github.com/solidjs/solid-start/blob/main/packages/start/dev/server.js
import { __awaiter } from "tslib";
import * as path from 'path';
import * as fs from 'fs';
export function devServerPlugin(options) {
    const entryServer = options.entryServer || 'src/main.server.ts';
    const index = options.index || 'index.html';
    return {
        name: 'analogjs-dev-ssr-plugin',
        config() {
            return {
                resolve: {
                    alias: {
                        '~analog/entry-server': entryServer,
                    },
                },
            };
        },
        configureServer(viteServer) {
            return () => __awaiter(this, void 0, void 0, function* () {
                remove_html_middlewares(viteServer.middlewares);
                viteServer.middlewares.use((req, res) => __awaiter(this, void 0, void 0, function* () {
                    let template = fs.readFileSync(path.join(viteServer.config.root, index), 'utf-8');
                    template = yield viteServer.transformIndexHtml(req.originalUrl, template);
                    try {
                        const entryServer = (yield viteServer.ssrLoadModule('~analog/entry-server'))['default'];
                        const result = yield entryServer(req.originalUrl, template);
                        res.end(result);
                    }
                    catch (e) {
                        viteServer && viteServer.ssrFixStacktrace(e);
                        res.statusCode = 500;
                        res.end(`
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <title>Error</title>
                  <script type="module">
                    import { ErrorOverlay } from '/@vite/client'
                    document.body.appendChild(new ErrorOverlay(${JSON.stringify(prepareError(req, e)).replace(/</g, '\\u003c')}))
                  </script>
                </head>
                <body>
                </body>
              </html>
            `);
                    }
                }));
            });
        },
    };
}
/**
 * Removes Vite internal middleware
 *
 * @param server
 */
function remove_html_middlewares(server) {
    const html_middlewares = [
        'viteIndexHtmlMiddleware',
        'vite404Middleware',
        'viteSpaFallbackMiddleware',
    ];
    for (let i = server.stack.length - 1; i > 0; i--) {
        // @ts-ignore
        if (html_middlewares.includes(server.stack[i].handle.name)) {
            server.stack.splice(i, 1);
        }
    }
}
/**
 * Formats error for SSR message in error overlay
 * @param req
 * @param error
 * @returns
 */
function prepareError(req, error) {
    const e = error;
    return {
        message: `An error occured while server rendering ${req.url}:\n\n\t${typeof e === 'string' ? e : e.message} `,
        stack: typeof e === 'string' ? '' : e.stack,
    };
}
//# sourceMappingURL=dev-server-plugin.js.map