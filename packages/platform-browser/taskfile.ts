import { PipeModule, Package, AssetConfigure, AssetActivity, PackageActivity, TsConfigure, CleanConfigure, CleanActivity } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');

@Package({
    src: 'src',
    clean: 'lib',
    test: 'test/**/*.spec.ts',
    assets: {
        ts: { dest: 'lib', annotation: true, uglify: true }
    },
    sequence: [
        <AssetConfigure>{
            src: 'lib/**/*.js',
            pipes: [
                () => rollup({
                    name: 'core.umd.js',
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
                    input: 'lib/index.js'
                }),
                () => rename('core.umd.js')
            ],
            dest: 'bundles',
            task: AssetActivity
        }
    ]
})
export class  PfBrowserBuilder  extends PackageActivity {
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
                        name: 'platform-browser.js',
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
                        input: './esnext/index.js'
                    })
                },
                () => rename('platform-browser.js')
            ],
            task: AssetActivity
        }
    ]
})
export class PfBrowserES2015Builder extends PackageActivity {
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
                        name: 'platform-browser.js',
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
                        input: './esnext/index.js'
                    })
                },
                () => rename('platform-browser.js')
            ],
            task: AssetActivity
        },
        <CleanConfigure>{
            clean: 'esnext',
            activity: CleanActivity
        }
    ]
})
export class PfBrowserES2017Builder extends PackageActivity {
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(PfBrowserBuilder, PfBrowserES2015Builder, PfBrowserES2017Builder);
