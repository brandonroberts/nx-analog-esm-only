declare const tRPCDependencyKeys: readonly ["@analogjs/trpc", "@trpc/client", "@trpc/server", "superjson", "isomorphic-fetch", "zod"];
export type TrpcDependency = (typeof tRPCDependencyKeys)[number];
export declare const getTrpcDependencies: (nxVersion: string) => Record<TrpcDependency, string>;
export {};
