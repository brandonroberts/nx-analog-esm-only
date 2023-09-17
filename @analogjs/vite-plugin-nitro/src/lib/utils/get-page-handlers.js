import * as path from 'path';
import fg from 'fast-glob';
import { normalizePath } from 'vite';
export function getPageHandlers({ workspaceRoot, rootDir }) {
    const root = normalizePath(path.resolve(workspaceRoot, rootDir));
    const endpointFiles = fg.sync([`${root}/src/app/pages/**/*.server.ts`], { dot: true });
    const handlers = endpointFiles.map((endpointFile) => {
        const route = endpointFile
            .replace(normalizePath(path.resolve(workspaceRoot, rootDir, 'src/app')), '')
            .replace(/\.server\.ts$/, '')
            .replace(/\[\.{3}(.+)\]/g, '**:$1')
            .replace(/\[\.{3}(\w+)\]/g, '**:$1')
            .replace(/\/\((.*?)\)$/, '/-$1-')
            .replace(/\[(\w+)\]/g, ':$1')
            .replace(/\./g, '/');
        return {
            handler: endpointFile,
            route: `/_analog${route}`,
            lazy: true,
        };
    });
    return handlers;
}
//# sourceMappingURL=get-page-handlers.js.map