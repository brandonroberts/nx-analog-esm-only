export declare const ROUTE_META_TAGS_KEY: unique symbol;
declare const CHARSET_KEY = "charset";
declare const HTTP_EQUIV_KEY = "httpEquiv";
declare const NAME_KEY = "name";
declare const PROPERTY_KEY = "property";
declare const CONTENT_KEY = "content";
export type MetaTag = (CharsetMetaTag & ExcludeRestMetaTagKeys<typeof CHARSET_KEY>) | (HttpEquivMetaTag & ExcludeRestMetaTagKeys<typeof HTTP_EQUIV_KEY>) | (NameMetaTag & ExcludeRestMetaTagKeys<typeof NAME_KEY>) | (PropertyMetaTag & ExcludeRestMetaTagKeys<typeof PROPERTY_KEY>);
type CharsetMetaTag = {
    [CHARSET_KEY]: string;
};
type HttpEquivMetaTag = {
    [HTTP_EQUIV_KEY]: string;
    [CONTENT_KEY]: string;
};
type NameMetaTag = {
    [NAME_KEY]: string;
    [CONTENT_KEY]: string;
};
type PropertyMetaTag = {
    [PROPERTY_KEY]: string;
    [CONTENT_KEY]: string;
};
type MetaTagKey = typeof CHARSET_KEY | typeof HTTP_EQUIV_KEY | typeof NAME_KEY | typeof PROPERTY_KEY;
type ExcludeRestMetaTagKeys<Key extends MetaTagKey> = {
    [K in Exclude<MetaTagKey, Key>]?: never;
};
export declare function updateMetaTagsOnRouteChange(): void;
export {};
