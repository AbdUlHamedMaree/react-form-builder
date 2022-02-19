import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
      },
      {
        file: packageJson.main,
        format: 'cjs',
      },
    ],

    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      swc(
        defineRollupSwcOption({
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
    input: 'src/index.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [dts()],
  },
];
