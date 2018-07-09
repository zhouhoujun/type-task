import { PipeModule, PackageTask, PipeElement, PipeAsset, IPackageConfigure, IAssetConfigure } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(
        <IPackageConfigure>{
            test: 'test/**/*.spec.ts',
            // test: false,
            clean: 'lib',
            src: 'src',
            // awaitPiped: true,
            assets: {
                ts: { src: 'src/**/*.ts', dest: 'lib', uglify: true }
            },
            task: PackageTask
        },
        <IAssetConfigure>{
            src: 'lib/**/*.js',
            // awaitPiped: true,
            pipes: [
                () => rollup({
                    name: 'core.umd.js',
                    format: 'umd',
                    plugins: [
                        resolve(),
                        commonjs(),
                        rollupSourcemaps()
                    ],
                    external: [
                        'reflect-metadata',
                        'tslib',
                        '@ts-ioc/core',
                        '@ts-ioc/aop',
                        '@ts-ioc/logs',
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
            task: PipeAsset
        });
