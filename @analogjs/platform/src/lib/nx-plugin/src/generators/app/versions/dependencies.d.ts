declare const dependencyKeys15: readonly ["@analogjs/content", "@analogjs/router", "@angular/platform-server", "front-matter", "marked", "mermaid", "prismjs"];
declare const dependencyKeys16: readonly ["marked-gfm-heading-id", "marked-highlight", "mermaid"];
export type AnalogDependency15 = (typeof dependencyKeys15)[number];
export type AnalogDependency16 = (typeof dependencyKeys16)[number];
type AnalogDependency15Record = Record<AnalogDependency15, string>;
type AnalogDependency16Record = Partial<Record<AnalogDependency16, string>>;
export type ExtendedDependenciesRecord = AnalogDependency15Record & AnalogDependency16Record;
export declare const getAnalogDependencies: (nxVersion: string, angularVersion: string) => ExtendedDependenciesRecord;
export {};
