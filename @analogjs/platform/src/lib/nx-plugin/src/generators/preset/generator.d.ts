import { Tree } from '@nx/devkit';
import { PresetGeneratorSchema } from './schema';
export default function (tree: Tree, options: PresetGeneratorSchema): Promise<() => void>;
