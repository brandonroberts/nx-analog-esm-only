import { ContentFile } from './content-file';
export declare function injectContentFiles<Attributes extends Record<string, any>>(filterFn?: InjectContentFilesFilterFunction<Attributes>): ContentFile<Attributes>[];
export type InjectContentFilesFilterFunction<T extends Record<string, any>> = (value: ContentFile<T>, index: number, array: ContentFile<T>[]) => boolean;
