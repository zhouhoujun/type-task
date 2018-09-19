

import * as path from 'path';
import { ShellActivity, ShellActivityConfig } from '../ShellActivity';
import { Task, Src, CtxType, ActivityContext } from '@taskfr/core';
import { lang, ObjectMap } from '@ts-ioc/core';
import { RollupDirOptions, RollupFileOptions, rollup } from 'rollup';

export interface RollupCmdOptions {
    format: string,
    file: string,
    dir: string
}

/**
 * rollup activity config.
 *
 * @export
 * @interface RollupActivityConfig
 * @extends {ShellActivityConfig}
 */
export interface RollupActivityConfig extends ShellActivityConfig {

    /**
     * rollup cmd src.
     *
     * @type {CtxType<Src>}
     * @memberof RollupActivityConfig
     */
    src: CtxType<Src>;

    /**
     * rollup cmd args options.
     *
     * @type {CtxType<RollupCmdOptions>}
     * @memberof RollupActivityConfig
     */
    args: CtxType<RollupCmdOptions>;

    /**
     * rollup config file.
     *
     * @type {CtxType<string>}
     * @memberof RollupActivityConfig
     */
    rollupConfig?: CtxType<string>;

    /**
     * rollup dir options.
     *
     * @type {CtxType<RollupDirOptions>}
     * @memberof RollupActivityConfig
     */
    rollupDirOptions?: CtxType<RollupDirOptions>;
    /**
     * rollup file options.
     *
     * @type {CtxType<RollupFileOptions>}
     * @memberof RollupActivityConfig
     */
    rollupFileOptions?: CtxType<RollupFileOptions>;
}


@Task('rollup')
export class RollupActivity extends ShellActivity {
    /**
     * rollup src for cmd
     *
     * @type {string[]}
     * @memberof RollupActivity
     */
    src: string[];
    /**
     * rollup config file.
     *
     * @type {string}
     * @memberof RollupActivity
     */
    rollupConfig: string;
    rollupDirOptions: RollupDirOptions;
    rollupFileOptions: RollupFileOptions;

    async onActivityInit(config: RollupActivityConfig) {
        await super.onActivityInit(config);
        this.src = await this.context.getFiles(this.context.to(config.src));
        this.options = lang.assign({ silent: true }, this.options || {});
        this.rollupFileOptions = this.context.to(config.rollupFileOptions);
        this.rollupDirOptions = this.context.to(config.rollupDirOptions);
        this.rollupConfig = this.context.to(config.rollupConfig);
    }

    protected async execute(ctx: ActivityContext): Promise<any> {
        if (this.rollupDirOptions) {
            return await rollup(this.rollupDirOptions);
        }
        if (this.rollupFileOptions) {
            return await rollup(this.rollupFileOptions);
        }
        await super.execute(ctx);
    }


    protected formatShell(shell: string) {
        if (this.rollupConfig) {
            return path.normalize(this.context.getRootPath() + '/node_modules/.bin/rollup') +
                ' -c ' + this.rollupConfig;
        }
        shell = path.normalize(this.context.getRootPath() + '/node_modules/.bin/rollup') + ' ' + this.src.join(' ');
        return super.formatShell(shell);
    }

    protected formatArgs(env: ObjectMap<any>): string[] {
        let args = lang.assign({
            format: 'umd',
            file: 'bundle.js',
            dir: 'dist'
        }, env || {});
        return super.formatArgs(args);
    }
}
