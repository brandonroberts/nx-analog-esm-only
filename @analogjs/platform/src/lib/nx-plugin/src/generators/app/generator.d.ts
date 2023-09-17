import { names, Tree } from '@nx/devkit';
import { AnalogNxApplicationGeneratorOptions } from './schema';
export interface NormalizedOptions extends AnalogNxApplicationGeneratorOptions, ReturnType<typeof names> {
    projectName: string;
    projectRoot: string;
    projectDirectory: string;
    parsedTags: string[];
    offsetFromRoot: string;
    appsDir: string;
    nxPackageNamespace: string;
}
export declare function appGenerator(tree: Tree, options: AnalogNxApplicationGeneratorOptions): Promise<() => void>;
export default appGenerator;
