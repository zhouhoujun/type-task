import { NodeActivity } from 'src/core';
import { CompilerActivityContext } from './CompilerActivityContext';
import { ShellActivity } from 'src/shells';
import { ExecOptions } from 'child_process';
import { Task } from '@taskfr/core';

/**
 * compiler activity.
 *
 * @export
 * @abstract
 * @class CompilerActivity
 * @extends {NodeActivity}
 */
export abstract class CompilerActivity extends NodeActivity {
    /**
     * execute build activity.
     *
     * @protected
     * @abstract
     * @param {CompilerActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof NodeActivity
     */
    protected abstract async execute(ctx: CompilerActivityContext): Promise<void>;
}


/**
 * shell compiler activity.
 *
 * @export
 * @class ShellCompilerActivity
 * @extends {ShellActivity<CompilerActivityContext>}
 */
@Task
export class ShellCompilerActivity extends ShellActivity {

    protected async execute(ctx: CompilerActivityContext): Promise<void> {
        await super.execute(ctx);
    }

    protected execShell(cmd: string, ctx: CompilerActivityContext, options?: ExecOptions): Promise<any> {
        return super.execShell(cmd, ctx, options);
    }

    protected formatShell(shell: string, ctx?: CompilerActivityContext): string {
        return super.formatShell(shell, ctx);
    }
}
