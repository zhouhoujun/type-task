import { PipeModule, PackageTask, PipeElement, AssetPipe } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(
        {
            // test: 'test/**/*.spec.ts',
            clean: 'lib',
            src: 'src',
            assets: {
                ts: {  src: 'src/**/*.ts', dest: 'lib', uglify: false }
            },
            task: PackageTask
        },
        {
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
