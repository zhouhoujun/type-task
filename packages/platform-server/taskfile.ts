import { PipeModule, Package, PackageActivity, CleanActivity, CleanConfigure, AssetActivity, AssetConfigure, TsConfigure, TsCompile, CleanToken, AssetTask } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';

const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');
// import { rollup } from 'rollup';
const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const builtins = require('rollup-plugin-node-builtins');

@AssetTask({
    src: 'esnext/**/*.js',
    sourcemaps: true,
    dest: 'es2015',
    data: {
        name: 'pipes.js',
        input: 'esnext/index.js'
    },
    pipes: [
        (act) => rollup({
            name: act.config.data.name,
            format: 'umd',
            sourceMap: true,
            plugins: [
                resolve(),
                commonjs({
                    exclude: ['node_modules/**', '../../node_modules/**']
                }),
                // builtins(),
                rollupSourcemaps()
            ],
            external: [
                'reflect-metadata',
                'tslib',
                'object-assign',
                'log4js',
                'globby', 'path', 'fs', 'time-stamp', 'chalk', 'pretty-hrtime',
                '@ts-ioc/core',
                '@ts-ioc/aop',
                '@ts-ioc/logs',
                '@ts-ioc/platform-server',
                '@ts-ioc/platform-server/bootstrap',
                '@taskfr/core'
            ],
            globals: {
                'reflect-metadata': 'Reflect',
                'log4js': 'log4js',
                '@ts-ioc/core': '@ts-ioc/core',
                '@ts-ioc/aop': '@ts-ioc/aop'
            },
            input: act.config.data.input
        }),
        (act) => rename(act.config.data.name)
    ],
})
export class RollupTs extends AssetActivity {
}

@Package({
    src: 'src',
    clean: 'lib',
    test: 'test/**/*.spec.ts',
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
export class PfServerBuilder extends PackageActivity {
}


TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(PfServerBuilder);
