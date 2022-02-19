import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';

import packageJson from './package.json';

export default [
  {
    input: packageJson.source,
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],

    plugins: [
      peerDepsExternal(),
      resolve(),
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
            target: 'es2020',
            loose: true,
            minify: {
              compress: true,
              mangle: false,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        })
      ),
    ],
  },
  {
    input: packageJson.source,
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [dts()],
  },
];
