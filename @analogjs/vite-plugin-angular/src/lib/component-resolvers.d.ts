export declare function hasStyleUrls(code: string): boolean;
export declare class StyleUrlsResolver {
    private readonly styleUrlsCache;
    resolve(code: string, id: string): string[];
}
export declare function hasTemplateUrl(code: string): boolean;
export declare class TemplateUrlsResolver {
    private readonly templateUrlsCache;
    resolve(code: string, id: string): string[];
}
