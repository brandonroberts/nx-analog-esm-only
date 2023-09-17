import { Observable } from 'rxjs';
import { ContentFile } from './content-file';
/**
 * Retrieves the static content using the provided param and/or prefix.
 *
 * @param param route parameter (default: 'slug')
 * @param fallback fallback text if content file is not found (default: 'No Content Found')
 */
export declare function injectContent<Attributes extends Record<string, any> = Record<string, any>>(param?: string | {
    param: string;
    subdirectory: string;
} | {
    customFilename: string;
}, fallback?: string): Observable<ContentFile<Attributes | Record<string, never>>>;
