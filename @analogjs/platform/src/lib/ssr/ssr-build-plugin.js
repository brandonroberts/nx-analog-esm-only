import { normalizePath } from 'vite';
export function ssrBuildPlugin() {
    return {
        name: 'analogjs-ssr-build-plugin',
        transform(code, id) {
            if (id.includes('platform-server')) {
                code = code.replace(/global\./g, 'globalThis.');
                return {
                    code: code.replace('new xhr2.XMLHttpRequest', 'new (xhr2.default.XMLHttpRequest || xhr2.default)'),
                };
            }
            // Remove usage of `with()` in sloppy.js file
            if (id.includes(normalizePath('domino/lib/sloppy.js'))) {
                return {
                    code: code.replace(/with\(/gi, 'if('),
                };
            }
            return;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyLWJ1aWxkLXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtL3NyYy9saWIvc3NyL3Nzci1idWlsZC1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBVSxNQUFNLE1BQU0sQ0FBQztBQUU3QyxNQUFNLFVBQVUsY0FBYztJQUM1QixPQUFPO1FBQ0wsSUFBSSxFQUFFLDJCQUEyQjtRQUNqQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQ2xDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFFaEQsT0FBTztvQkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FDaEIseUJBQXlCLEVBQ3pCLG1EQUFtRCxDQUNwRDtpQkFDRixDQUFDO2FBQ0g7WUFFRCw2Q0FBNkM7WUFDN0MsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RELE9BQU87b0JBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztpQkFDdEMsQ0FBQzthQUNIO1lBRUQsT0FBTztRQUNULENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9