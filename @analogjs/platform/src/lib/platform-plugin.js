import viteNitroPlugin from '@analogjs/vite-plugin-nitro';
import angular from '@analogjs/vite-plugin-angular';
import { routerPlugin } from './router-plugin.js';
import { ssrBuildPlugin } from './ssr/ssr-build-plugin.js';
import { contentPlugin } from './content-plugin.js';
import { clearClientPageEndpointsPlugin } from './clear-client-page-endpoint.js';
export function platformPlugin(opts = {}) {
    const { apiPrefix, ...platformOptions } = {
        ssr: true,
        ...opts,
    };
    let nitroOptions = platformOptions?.nitro;
    if (apiPrefix) {
        nitroOptions = {
            ...nitroOptions,
            runtimeConfig: {
                apiPrefix,
            },
        };
    }
    return [
        ...viteNitroPlugin(platformOptions, nitroOptions),
        (platformOptions.ssr ? ssrBuildPlugin() : false),
        ...routerPlugin(),
        ...contentPlugin(),
        ...angular({ jit: platformOptions.jit, ...(opts?.vite ?? {}) }),
        clearClientPageEndpointsPlugin(),
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tcGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0vc3JjL2xpYi9wbGF0Zm9ybS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxlQUFlLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxPQUFPLE1BQU0sK0JBQStCLENBQUM7QUFHcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFakYsTUFBTSxVQUFVLGNBQWMsQ0FBQyxPQUFnQixFQUFFO0lBQy9DLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxlQUFlLEVBQUUsR0FBRztRQUN4QyxHQUFHLEVBQUUsSUFBSTtRQUNULEdBQUcsSUFBSTtLQUNSLENBQUM7SUFFRixJQUFJLFlBQVksR0FBRyxlQUFlLEVBQUUsS0FBSyxDQUFDO0lBQzFDLElBQUksU0FBUyxFQUFFO1FBQ2IsWUFBWSxHQUFHO1lBQ2IsR0FBRyxZQUFZO1lBQ2YsYUFBYSxFQUFFO2dCQUNiLFNBQVM7YUFDVjtTQUNGLENBQUM7S0FDSDtJQUVELE9BQU87UUFDTCxHQUFHLGVBQWUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDO1FBQ2pELENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBVztRQUMxRCxHQUFHLFlBQVksRUFBRTtRQUNqQixHQUFHLGFBQWEsRUFBRTtRQUNsQixHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDL0QsOEJBQThCLEVBQUU7S0FDakMsQ0FBQztBQUNKLENBQUMifQ==