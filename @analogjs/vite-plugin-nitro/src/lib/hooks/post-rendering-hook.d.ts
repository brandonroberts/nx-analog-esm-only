import { Nitro, PrerenderRoute } from 'nitropack';
export declare function addPostRenderingHooks(nitro: Nitro, hooks: ((pr: PrerenderRoute) => Promise<void>)[]): void;
