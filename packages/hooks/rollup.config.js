import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'src/index.ts');
const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, 'package.json'));

export default {
    input: INPUT_FILE,
    output: [
        {
            file: PKG_JSON.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: PKG_JSON.module,
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript({
            tsconfig: `${PACKAGE_ROOT_PATH}/tsconfig.json`
        }),
    ],
    external: [
        ...Object.keys(PKG_JSON.devDependencies || {}),
        ...Object.keys(PKG_JSON.peerDependencies || {})
    ]
}