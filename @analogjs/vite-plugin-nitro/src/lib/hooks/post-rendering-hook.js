export function addPostRenderingHooks(nitro, hooks) {
    hooks.forEach((hook) => {
        nitro.hooks.hook('prerender:generate', (route) => {
            hook(route);
        });
    });
}
//# sourceMappingURL=post-rendering-hook.js.map