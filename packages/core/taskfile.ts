import { PipeModule, Package, AssetConfigure, TsConfigure, PackageActivity, AssetActivity, CleanConfigure, CleanActivity } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');
// const builtins = require('rollup-plugin-node-builtins');

@Package({
    clean: 'lib',
    // src: 'src',
    assets: {
        ts: <TsConfigure>{
            // watch: true,
            src: 'src/**/*.ts', test: 'test/**/*.spec.ts', dest: 'lib', annotation: true, uglify: false
        }
    },
    sequence: [
        <AssetConfigure>{
            name: 'rollup',
            src: 'lib/**/*.js',
            pipes: [
                () => rollup({
                    name: 'core.umd.js',
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
                    input: 'lib/index.js'
                }),
                () => rename('core.umd.js')
            ],
            dest: 'bundles',
            task: AssetActivity
        },
        <AssetConfigure>{
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
})
export class CoreBuilder extends PackageActivity {
}

@Package({
    src: 'src',
    clean: 'esnext',
    assets: {
        ts: <TsConfigure>{ dest: 'esnext', annotation: true, uglify: false, tsconfig: './tsconfig.es2015.json' }
    },
    sequence: [
        <AssetConfigure>{
            src: 'esnext/**/*.js',
            dest: 'es2015',
            sourcemaps: true,
            pipes: [
                (ctx) => {
                    return rollup({
                        name: 'core.js',
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
                        input: './esnext/index.js'
                    })
                },
                () => rename('core.js')
            ],
            task: AssetActivity
        },
        <CleanConfigure>{
            clean: 'esnext',
            activity: CleanActivity
        }
    ]
})
export class CoreES2015Builder extends PackageActivity {
}

@Package({
    src: 'src',
    clean: 'esnext',
    assets: {
        ts: <TsConfigure>{ dest: 'esnext', annotation: true, uglify: false, tsconfig: './tsconfig.es2017.json' }
    },
    sequence: [
        <AssetConfigure>{
            src: 'esnext/**/*.js',
            dest: 'es2017',
            sourcemaps: true,
            pipes: [
                (ctx) => {
                    return rollup({
                        name: 'core.js',
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
                        input: './esnext/index.js'
                    })
                },
                () => rename('core.js')
            ],
            task: AssetActivity
        },
        <CleanConfigure>{
            clean: 'esnext',
            activity: CleanActivity
        }
    ]
})
export class CoreES2017Builder extends PackageActivity {
}

// @Package({
//     sequence: [
//         {
//             if: (act) => act.context.getEnvArgs().test === true,
//             ifBody: CoreBuilder,
//             interval: CoreES2015Builder,
//             do: CoreES2015Builder,
//             while: (act) => act.context.getEnvArgs().test === true,
//         }
//     ]
// })
// export class Builder {

// }

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(CoreBuilder, CoreES2015Builder, CoreES2017Builder);
