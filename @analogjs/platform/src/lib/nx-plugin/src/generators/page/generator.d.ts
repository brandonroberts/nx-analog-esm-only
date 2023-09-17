import { Tree } from '@nx/devkit';
import { AnalogPageGeneratorSchema } from './schema';
export declare function analogPageGenerator(tree: Tree, options: AnalogPageGeneratorSchema): Promise<void>;
export declare const analogPageGeneratorSchematic: (generatorOptions: AnalogPageGeneratorSchema) => (tree: any, context: any) => Promise<any>;
export default analogPageGenerator;
