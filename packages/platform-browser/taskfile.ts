import { PipeModule, Package, AssetConfigure, AssetActivity, PackageActivity, TsConfigure, AssetTask, TsCompile } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
import { CleanActivity, CleanToken } from '@taskfr/node';
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');


@AssetTask({
    src: 'lib/**/*.js',
    sourcemaps: true,
    data: {
        name: 'platform-browser.umd.js',
        input: 'lib/index.js'
    },
    pipes: [
        (act) => rollup({
            name: act.config.data.name,
            format: 'umd',
            sourceMap: true,
            plugins: [
                resolve(),
                commonjs(),
                builtins(),
                rollupSourcemaps()
            ],
            external: [
                'reflect-metadata',
                'tslib',
                'events',
                '@ts-ioc/core',
                '@ts-ioc/aop',
                '@ts-ioc/logs',
                '@taskfr/core'
            ],
            globals: {
                'reflect-metadata': 'Reflect'
            },
            input: act.config.data.input
        }),
        (act) => rename(act.config.data.name)
    ],
    dest: 'bundles'
})
export class RollupTs extends AssetActivity {
}

@Package({
    src: 'src',
    clean: 'lib',
    assets: {
        ts: { dest: 'lib', annotation: true, uglify: false },
        ts2015: {
            sequence: [
                { src: 'src/**/*.ts', dest: 'esnext', annotation: true, uglify: false, tsconfig: './tsconfig.es2015.json', activity: TsCompile },
                { dest: 'es2015', activity: RollupTs }
            ]
        },
        ts2017: {
            sequence: [
                { clean: 'esnext', activity: CleanToken },
                { src: 'src/**/*.ts', dest: 'esnext', annotation: true, uglify: false, tsconfig: './tsconfig.es2017.json', activity: TsCompile },
                { dest: 'es2017', activity: RollupTs },
                { clean: 'esnext', activity: CleanToken }
            ]
        }
    }
})
export class PfBrowserBuilder extends PackageActivity {
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(PfBrowserBuilder);
