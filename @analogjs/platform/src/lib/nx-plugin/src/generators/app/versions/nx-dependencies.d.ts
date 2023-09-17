declare const nrwlDependencyKeys: readonly ["@nrwl/devkit", "@nrwl/angular", "@nrwl/linter"];
export type NrwlDependency = (typeof nrwlDependencyKeys)[number];
export declare const getNrwlDependencies: (nxVersion: string) => Record<NrwlDependency, string>;
declare const nxDependencyKeys: readonly ["@nx/devkit", "@nx/angular", "@nx/linter"];
export type NxDependency = (typeof nxDependencyKeys)[number];
export declare const getNxDependencies: (nxVersion: string) => Record<NxDependency, string>;
export {};
