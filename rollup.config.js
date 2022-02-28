import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';

import { dirname } from 'path';
import packageJson from './package.json';

export default defineConfig([
  {
    input: packageJson.source,
    output: [
      {
        dir: dirname(packageJson.module),
        format: 'esm',
        sourcemap: 'inline',
        preserveModules: true,
        strict: true,
      },
      {
        dir: dirname(packageJson.main),
        format: 'cjs',
        sourcemap: 'inline',
        preserveModules: true,
        strict: true,
        esModule: false,
      },
    ],
    treeshake: {
      moduleSideEffects: false,
    },
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      swc(
        defineRollupSwcOption({
          sourceMaps: true,
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
            },
            target: 'es2022',
            loose: true,
            minify: {
              compress: true,
              mangle: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
          module: { strict: true, type: 'es6', strictMode: true },
          isModule: true,
        })
      ),
    ],
  },
  {
    input: packageJson.source,
    output: [
      {
        dir: dirname(packageJson.types),
        format: 'esm',
        preserveModules: true,
      },
    ],
    plugins: [dts()],
  },
]);
