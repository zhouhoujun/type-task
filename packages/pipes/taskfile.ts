import { PipeModule, Package, PackageActivity, CleanActivity, TsConfigure, AssetActivity } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');
// import { rollup } from 'rollup';
const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const builtins = require('rollup-plugin-node-builtins');

@Package({
    src: 'src',
    clean: 'lib',
    test: 'test/**/*.spec.ts',
    assets: {
        ts: { dest: 'lib', uglify: true, annotation: true }
    }
})
export class PipesBuilder extends PackageActivity {
}


@Package({
    src: 'src',
    clean: 'esnext',
    assets: {
        ts: <TsConfigure>{ dest: 'esnext', annotation: true, uglify: false, tsconfig: './tsconfig.es2015.json' }
    },
    sequence: [
        {
            src: 'esnext/**/*.js',
            dest: 'es2015',
            sourcemaps: true,
            pipes: [
                (ctx) => {
                    return rollup({
                        name: 'pipes.js',
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
                            'globby', 'path', 'fs', 'events', 'stream', 'child_process',
                            '@ts-ioc/core',
                            '@ts-ioc/aop',
                            '@ts-ioc/logs',
                            '@ts-ioc/bootstrap',
                            '@ts-ioc/pipes',
                            '@ts-ioc/platform-server',
                            'minimist', 'gulp-sourcemaps', 'vinyl-fs', 'gulp-mocha', 'del', 'chokidar',
                            'rxjs', 'gulp-uglify', 'execa', '@ts-ioc/annotations', 'gulp-typescript',
                            '@taskfr/core',
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
                            'reflect-metadata': 'Reflect',
                            'log4js': 'log4js',
                            '@ts-ioc/core': '@ts-ioc/core',
                            '@ts-ioc/aop': '@ts-ioc/aop'
                        },
                        input: './esnext/index.js'
                    })
                },
                () => rename('pipes.js')
            ],
            task: AssetActivity
        }
    ]
})
export class PipesES2015Builder extends PackageActivity {
}

@Package({
    src: 'src',
    clean: 'esnext',
    assets: {
        ts: <TsConfigure>{ dest: 'esnext', annotation: true, uglify: false, tsconfig: './tsconfig.es2017.json' }
    },
    sequence: [
        {
            src: 'esnext/**/*.js',
            dest: 'es2017',
            sourcemaps: true,
            pipes: [
                (ctx) => {
                    return rollup({
                        name: 'pipes.js',
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
                            'globby', 'path', 'fs', 'events', 'stream', 'child_process',
                            '@ts-ioc/core',
                            '@ts-ioc/aop',
                            '@ts-ioc/logs',
                            '@ts-ioc/bootstrap',
                            '@ts-ioc/pipes',
                            '@ts-ioc/platform-server',
                            'minimist', 'gulp-sourcemaps', 'vinyl-fs', 'gulp-mocha', 'del', 'chokidar',
                            'rxjs', 'gulp-uglify', 'execa', '@ts-ioc/annotations', 'gulp-typescript',
                            '@taskfr/core',
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
                            'reflect-metadata': 'Reflect',
                            'log4js': 'log4js',
                            '@ts-ioc/core': '@ts-ioc/core',
                            '@ts-ioc/aop': '@ts-ioc/aop'
                        },
                        input: './esnext/index.js'
                    })
                },
                () => rename('pipes.js')
            ],
            task: AssetActivity
        },
        {
            clean: 'esnext',
            activity: CleanActivity
        }
    ]
})
export class PipesES2017Builder extends PackageActivity {
}


TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(PipesBuilder, PipesES2015Builder, PipesES2017Builder);
