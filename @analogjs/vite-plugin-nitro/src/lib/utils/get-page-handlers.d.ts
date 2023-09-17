import { NitroEventHandler } from 'nitropack';
type GetHandlersArgs = {
    workspaceRoot: string;
    rootDir: string;
};
export declare function getPageHandlers({ workspaceRoot, rootDir }: GetHandlersArgs): NitroEventHandler[];
export {};
