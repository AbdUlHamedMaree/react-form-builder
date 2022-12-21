import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

import { dirname } from 'path';
import packageJson from './package.json';

export default defineConfig([
  {
    input: packageJson.source,
    output: [
      {
        dir: dirname(packageJson.module),
        format: 'esm',
        entryFileNames: '[name].mjs',
        sourcemap: true,
        preserveModules: true,
        strict: true,
        exports: 'named',
      },
      {
        dir: dirname(packageJson.main),
        format: 'cjs',
        entryFileNames: '[name].js',
        sourcemap: true,
        preserveModules: true,
        strict: true,
        exports: 'named',
        esModule: false,
      },
    ],
    treeshake: 'smallest',
    plugins: [
      peerDepsExternal(),
      typescriptPaths(),
      nodeResolve(),
      commonjs(),
      swc(
        defineRollupSwcOption({
          sourceMaps: true,
          tsconfig: 'tsconfig.json',
        })
      ),
    ],
  },
]);
