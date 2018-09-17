import * as path from 'path';
import { ShellActivity, ShellActivityConfig } from '../ShellActivity';
import { Task, CtxType } from '@taskfr/core';
import { lang } from '@ts-ioc/core';

export interface AngularConfig {
    defaultProject?: string;
}

/**
 * ngc builder activity config.
 *
 * @export
 * @interface NgcBuilderActivityConfig
 * @extends {ShellActivityConfig}
 */
export interface NgcBuilderActivityConfig extends ShellActivityConfig {
    /**
     * tsconfig.
     *
     * @type {CtxType<string>}
     * @memberof NgcBuilderActivityConfig
     */
    tsconfig?: CtxType<string>;
}

@Task('ngc')
export class NgcBuilderActivity extends ShellActivity {

    /**
     * tsconfig.
     *
     * @type {string}
     * @memberof TscBuilderActivity
     */
    tsconfig: string;

    projectRoot: string;

    async onActivityInit(config: NgcBuilderActivityConfig) {
        await super.onActivityInit(config);
        this.options = lang.assign({silent: true}, this.options || {});
        this.tsconfig = this.context.to(config.tsconfig);
    }

    protected formatShell(shell: string): string {
        shell = shell || path.join(this.context.getRootPath(), 'node_modules', '.bin', 'ngc') + ' -p ' + this.tsconfig;
        return super.formatShell(shell);
    }

    protected checkStderr(err, resolve: Function, reject: Function) {
        super.checkStderr(err, resolve, reject);
        if (err.includes('Compilation complete.')) {
            resolve();
        }
    }
}
