import { isString, isArray, Inject, isBoolean } from '@ts-ioc/core';
import { existsSync } from 'fs';
import { Src, Activity, Task, CtxType, ActivityConfigure, ActivityContext } from '@taskfr/core';
import * as execa from 'execa';
import { NodeContextToken, INodeContext, NodeActivity } from '../core';


/**
 * shell task config.
 *
 * @export
 * @interface ExecFileActivityConfig
 * @extends {ActivityConfigure}
 */
export interface ExecFileActivityConfig extends ActivityConfigure {
    /**
     * files
     *
     * @type {CtxType<Src>}
     * @memberof ExecFileActivityConfig
     */
    files: CtxType<Src>;
    /**
     * shell args.
     *
     * @type {CtxType<string[]>}
     * @memberof ExecFileActivityConfig
     */
    args?: CtxType<string[]>;
    /**
     * shell exec options.
     *
     * @type {CtxType<execa.Options>}
     * @memberof ExecFileActivityConfig
     */
    options?: CtxType<execa.Options>;
    /**
     * allow error or not.
     *
     * @type {CtxType<boolean>}
     * @memberof ExecFileActivityConfig
     */
    allowError: CtxType<boolean>;
}


/**
 * exec file Task
 *
 * @class ExecFileActivity
 * @implements {ITask}
 */
@Task('execfile')
export class ExecFileActivity extends NodeActivity {
    files: Src;
    args?: string[];
    options?: execa.Options;
    allowError = true;

    async onActivityInit(config: ExecFileActivityConfig) {
        await super.onActivityInit(config);
        this.files = this.context.to(config.files);
        this.args = this.context.to(config.args);
        this.options = this.context.to(config.options);
        this.allowError = this.context.to(config.allowError);
        if (!isBoolean(this.allowError)) {
            this.allowError = true;
        }
    }

    protected async execute(ctx?: ActivityContext): Promise<void> {
        return await Promise.resolve(this.files)
            .then(files => {
                let allowError = this.allowError;
                let options = this.options;
                let args = this.args;
                if (isString(files)) {
                    return this.execFile(files, args, options, allowError !== false);
                } else if (isArray(files)) {
                    let pip = Promise.resolve();
                    files.forEach(file => {
                        pip = pip.then(() => this.execFile(file, args, options, allowError !== false));
                    });
                    return pip;
                } else {
                    return Promise.reject(new Error('exec file task config error'));
                }
            });
    }

    protected execFile(file: string, args?: string[], options?: execa.Options, allowError = true): Promise<any> {
        if (!file && !existsSync(file)) {
            return Promise.resolve();
        }
        return execa(file, args, options);
    }

}
