declare const devDependencyKeys: readonly ["@analogjs/platform", "@analogjs/vite-plugin-angular", "jsdom", "vite", "vite-tsconfig-paths", "vitest"];
export type AnalogDevDependency = (typeof devDependencyKeys)[number];
export declare const getAnalogDevDependencies: (nxVersion: string) => Record<AnalogDevDependency, string>;
export {};
