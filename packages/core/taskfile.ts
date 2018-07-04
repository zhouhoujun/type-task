import { PipeModule, PackageTask, PipeElement, AssetPipe, IPackageConfigure, IAssetConfigure } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(
        <IPackageConfigure>{
            // test: 'test/**/*.spec.ts',
            test: false,
            clean: 'lib',
            src: 'src',
            assets: {
                ts: {  src: 'src/**/*.ts', dest: 'lib', uglify: false }
            },
            task: PackageTask
        },
        <IAssetConfigure>{
            src: 'lib/**/*.js',
            pipes: [
                () => rollup({
                    input: 'lib/index.js',
                    name: 'core.umd.js',
                    format: 'umd',
                    plugins: [
                        resolve(),
                        commonjs(),
                        rollupSourcemaps()
                    ],
                    external: [
                        'reflect-metadata',
                        'tslib'
                    ]
                })
            ],
            dest: 'bundles',
            task: AssetPipe
        });
