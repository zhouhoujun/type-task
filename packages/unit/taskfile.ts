import { PipeModule, Package, PackageActivity, AssetActivity, Asset, TsCompile } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
import { CleanActivity } from '@taskfr/node';
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');
// const builtins = require('rollup-plugin-node-builtins');


@Asset({
    src: 'lib/**/*.js',
    sourcemaps: true,
    data: {
        name: 'unit.umd.js',
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
                // builtins(),
                rollupSourcemaps()
            ],
            external: [
                'reflect-metadata',
                'tslib',
                'events',
                '@ts-ioc/core',
                '@ts-ioc/aop',
                '@ts-ioc/logs',
                '@ts-ioc/bootstrap',
                'rxjs',
                'rxjs/operators'
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
    // clean: 'lib',
    test: 'test/**/*.spec.ts',
    assets: {
        ts: {
            sequence: [
                { src: 'src/**/*.ts', dest: 'lib', annotation: true, uglify: false, activity: TsCompile },
                RollupTs,
                {
                    name: 'zip',
                    src: 'bundles/unit.umd.js',
                    uglify: true,
                    pipes: [
                        () => rename('unit.umd.min.js'),
                    ],
                    dest: 'bundles',
                    task: AssetActivity
                }
            ]
        },
        ts2015: {
            sequence: [
                { src: 'src/**/*.ts', dest: 'esnext', annotation: true, uglify: false, tsconfig: './tsconfig.es2015.json', activity: TsCompile },
                {
                    src: 'esnext/**/*.js', dest: 'es2015',
                    data: {
                        name: 'unit.js',
                        input: 'esnext/index.js'
                    },
                    activity: RollupTs
                }
            ]
        },
        ts2017: {
            sequence: [
                { src: 'src/**/*.ts', dest: 'esnext', annotation: true, uglify: false, tsconfig: './tsconfig.es2015.json', activity: TsCompile },
                {
                    src: 'esnext/**/*.js',
                    dest: 'es2017',
                    data: {
                        name: 'core.js',
                        input: 'esnext/index.js'
                    },
                    activity: RollupTs
                },
                { clean: 'esnext', activity: CleanActivity }
            ]
        }
    }
})
export class UnitBuilder extends PackageActivity {
}



TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(UnitBuilder);
