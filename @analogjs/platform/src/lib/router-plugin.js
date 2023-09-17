import { normalizePath } from 'vite';
/**
 * This plugin invalidates the files for routes when new files
 * are added/deleted.
 *
 * Workaround for: https://github.com/vitejs/vite/issues/10616
 *
 * @returns
 */
export function routerPlugin() {
    return [
        {
            name: 'analogjs-router-plugin',
            config() {
                return {
                    ssr: {
                        noExternal: [
                            '@analogjs/**',
                            '@analogjs/trpc/**',
                            '@angular/**',
                            '@angular/cdk/**',
                            '@angular/fire/**',
                            '@ngrx/**',
                            '@rx-angular/**',
                            '@ng-bootstrap/**',
                            '@ngneat/**',
                            'apollo-angular/**',
                            'primeng/**',
                        ],
                    },
                    optimizeDeps: {
                        include: [
                            '@angular/common',
                            '@angular/common/http',
                            '@angular/core/rxjs-interop',
                        ],
                        exclude: ['@angular/platform-server', '@analogjs/router'],
                    },
                };
            },
        },
        {
            name: 'analogjs-router-invalidate-routes',
            configureServer(server) {
                function invalidateRoutes(path) {
                    if (path.includes(normalizePath(`/app/routes/`)) ||
                        path.includes(normalizePath(`/app/pages/`))) {
                        server.moduleGraph.fileToModulesMap.forEach((mods) => {
                            mods.forEach((mod) => {
                                if (mod.id?.includes('analogjs') &&
                                    mod.id?.includes('router')) {
                                    server.moduleGraph.invalidateModule(mod);
                                    mod.importers.forEach((imp) => {
                                        server.moduleGraph.invalidateModule(imp);
                                    });
                                }
                            });
                        });
                        server.ws.send({
                            type: 'full-reload',
                        });
                    }
                }
                server.watcher.on('add', invalidateRoutes);
                server.watcher.on('unlink', invalidateRoutes);
            },
        },
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtL3NyYy9saWIvcm91dGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0sTUFBTSxDQUFDO0FBRTdDOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsWUFBWTtJQUMxQixPQUFPO1FBQ0w7WUFDRSxJQUFJLEVBQUUsd0JBQXdCO1lBQzlCLE1BQU07Z0JBQ0osT0FBTztvQkFDTCxHQUFHLEVBQUU7d0JBQ0gsVUFBVSxFQUFFOzRCQUNWLGNBQWM7NEJBQ2QsbUJBQW1COzRCQUNuQixhQUFhOzRCQUNiLGlCQUFpQjs0QkFDakIsa0JBQWtCOzRCQUNsQixVQUFVOzRCQUNWLGdCQUFnQjs0QkFDaEIsa0JBQWtCOzRCQUNsQixZQUFZOzRCQUNaLG1CQUFtQjs0QkFDbkIsWUFBWTt5QkFDYjtxQkFDRjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osT0FBTyxFQUFFOzRCQUNQLGlCQUFpQjs0QkFDakIsc0JBQXNCOzRCQUN0Qiw0QkFBNEI7eUJBQzdCO3dCQUNELE9BQU8sRUFBRSxDQUFDLDBCQUEwQixFQUFFLGtCQUFrQixDQUFDO3FCQUMxRDtpQkFDRixDQUFDO1lBQ0osQ0FBQztTQUNGO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsbUNBQW1DO1lBQ3pDLGVBQWUsQ0FBQyxNQUFNO2dCQUNwQixTQUFTLGdCQUFnQixDQUFDLElBQVk7b0JBQ3BDLElBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQzNDO3dCQUNBLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQ0FDbkIsSUFDRSxHQUFHLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUM7b0NBQzVCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUMxQjtvQ0FDQSxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUV6QyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dDQUM1QixNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUMzQyxDQUFDLENBQUMsQ0FBQztpQ0FDSjs0QkFDSCxDQUFDLENBQUMsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0QkFDYixJQUFJLEVBQUUsYUFBYTt5QkFDcEIsQ0FBQyxDQUFDO3FCQUNKO2dCQUNILENBQUM7Z0JBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hELENBQUM7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDIn0=