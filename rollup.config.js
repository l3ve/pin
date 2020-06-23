import pkg from "./package.json";
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/pin.cjs.js',
    format: "esm",
  }, {
    file: 'dist/pin.umd.js',
    format: "umd",
    name:'pin'
  }],
  plugins: [
    typescript({
      typescript: require("typescript"),
    })
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
};