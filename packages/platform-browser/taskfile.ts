import { PipeModule, Package, AssetConfigure, AssetActivity, PackageActivity, TsConfigure, CleanConfigure, CleanActivity, AssetTask } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
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
    test: 'test/**/*.spec.ts',
    assets: {
        ts: { dest: 'lib', annotation: true, uglify: true }
    },
    sequence: [
        RollupTs
    ]
})
export class PfBrowserBuilder extends PackageActivity {
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
            data: {
                name: 'platform-browser.js',
                input: 'esnext/index.js'
            },
            activity: RollupTs
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
        {
            src: 'esnext/**/*.js',
            dest: 'es2017',
            data: {
                name: 'platform-browser.js',
                input: 'esnext/index.js'
            },
            task: RollupTs
        },
        {
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
