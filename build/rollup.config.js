import buble from 'rollup-plugin-buble';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// const minify = process.env.minify || false;

export default {
  input: 'src/index.js',

  output: [
    {
      file: `dist/vue-edge-check.umd.js`,
      format: 'umd',
      name: 'VueEdgeCheck'
    },
    {
      file: `dist/vue-edge-check.common.js`,
      format: 'cjs',
    },
    {
      file: `dist/vue-edge-check.es.js`,
      format: 'es',
    }
  ],

  plugins: [
    buble(),
    resolve(),
    commonjs()
  ],
};
