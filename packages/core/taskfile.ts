import { PipeModule, Package, PackageActivity, AssetActivity, CleanActivity, AssetTask, TsCompile } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');
// const builtins = require('rollup-plugin-node-builtins');


@AssetTask({
    src: 'lib/**/*.js',
    sourcemaps: true,
    data: {
        name: 'core.umd.js',
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
                'rxjs/Observer',
                'rxjs/util',
                'rxjs/util/ObjectUnsubscribedError',
                'rxjs/util/UnsubscriptionError',
                'rxjs/Subject',
                'rxjs/Observable',
                'rxjs/Subscriber',
                'rxjs/Subscription',
                'rxjs/BehaviorSubject',
                'rxjs/add/operator/map',
                'rxjs/add/operator/mergeMap',
                'rxjs/add/operator/delay',
                'rxjs/add/operator/distinct',
                'rxjs/add/operator/catch',
                'rxjs/add/operator/distinctUntilChanged',
                'rxjs/add/operator/timeout',
                'rxjs/add/operator/filter',
                'rxjs/add/observable/of',
                'rxjs/add/observable/throw',
                'rxjs/add/observable/fromPromise',
                'rxjs/add/operator/toPromise',
                'rxjs/add/observable/forkJoin',
                'rxjs/add/observable/empty'
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
    clean: 'lib',
    test: 'test/**/*.spec.ts',
    assets: {
        ts: {
            sequence: [
                { src: 'src/**/*.ts', dest: 'lib', annotation: true, uglify: false, activity: TsCompile },
                RollupTs,
                {
                    name: 'zip',
                    src: 'bundles/core.umd.js',
                    uglify: true,
                    pipes: [
                        () => rename('core.umd.min.js'),
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
                        name: 'core.js',
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
export class CoreBuilder extends PackageActivity {
}



TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(CoreBuilder);
