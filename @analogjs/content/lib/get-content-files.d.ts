/**
 * Returns the list of content files by filename with ?analog-content-list=true.
 * We use the query param to transform the return into an array of
 * just front matter attributes.
 *
 * @returns
 */
export declare const getContentFilesList: () => Record<string, Record<string, any>>;
/**
 * Returns the lazy loaded content files for lookups.
 *
 * @returns
 */
export declare const getContentFiles: () => Record<string, () => Promise<string>>;
