import { Plugin } from 'vite';
interface ServerOptions {
    index?: string;
    entryServer?: string;
}
export declare function devServerPlugin(options: ServerOptions): Plugin;
export {};
