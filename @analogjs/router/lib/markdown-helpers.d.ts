import { RouteExport } from './models';
export declare function toMarkdownModule(markdownFileFactory: () => Promise<string>): () => Promise<RouteExport>;
