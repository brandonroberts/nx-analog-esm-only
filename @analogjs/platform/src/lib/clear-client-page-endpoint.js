import { normalizePath } from 'vite';
export function clearClientPageEndpointsPlugin() {
    return {
        name: 'analogjs-platform-clear-client-page-endpoint',
        apply: 'build',
        config() {
            return {
                build: {
                    rollupOptions: {
                        onwarn(warning) {
                            if (warning.message.includes('empty chunk') &&
                                warning.message.endsWith('.server')) {
                                return;
                            }
                        },
                    },
                },
            };
        },
        transform(_code, id, options) {
            if (!options?.ssr &&
                id.includes(normalizePath('src/app/pages')) &&
                id.endsWith('.server.ts')) {
                return {
                    code: 'export default undefined;',
                    map: null,
                };
            }
            return;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXItY2xpZW50LXBhZ2UtZW5kcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS9zcmMvbGliL2NsZWFyLWNsaWVudC1wYWdlLWVuZHBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBVSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFN0MsTUFBTSxVQUFVLDhCQUE4QjtJQUM1QyxPQUFPO1FBQ0wsSUFBSSxFQUFFLDhDQUE4QztRQUNwRCxLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU07WUFDSixPQUFPO2dCQUNMLEtBQUssRUFBRTtvQkFDTCxhQUFhLEVBQUU7d0JBQ2IsTUFBTSxDQUFDLE9BQU87NEJBQ1osSUFDRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7Z0NBQ3ZDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNuQztnQ0FDQSxPQUFPOzZCQUNSO3dCQUNILENBQUM7cUJBQ0Y7aUJBQ0Y7YUFDRixDQUFDO1FBQ0osQ0FBQztRQUNELFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU87WUFDMUIsSUFDRSxDQUFDLE9BQU8sRUFBRSxHQUFHO2dCQUNiLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUN6QjtnQkFDQSxPQUFPO29CQUNMLElBQUksRUFBRSwyQkFBMkI7b0JBQ2pDLEdBQUcsRUFBRSxJQUFJO2lCQUNWLENBQUM7YUFDSDtZQUVELE9BQU87UUFDVCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==