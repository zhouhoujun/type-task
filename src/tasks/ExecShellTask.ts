import { ExecOptions, ExecFileOptions, execFile, exec } from 'child_process';
import { RunWay, Task, TaskComposite, ITask, ITaskContext } from '../core/index';
import { isString, isArray } from 'tsioc';

/**
 * Shell Task
 *
 * @class ShellTask
 * @implements {ITask}
 */
@Task('ExecShell')
export class ExecShellTask extends TaskComposite {
    constructor(taskName?: string) {
        super(taskName);
    }

    protected execute(): Promise<any> {
        let ctx = this.getContext();
        return Promise.resolve(ctx.cmds)
            .then(cmds => {
                if (isString(cmds)) {
                    return this.execShell(cmds, option.execOptions, option.allowError !== false);
                } else if (isArray(cmds)) {
                    if (option.shellRunWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        cmds.forEach(cmd => {
                            pip = pip.then(() => this.execShell(cmd, option.execOptions));
                        });
                        return pip;
                    } else {
                        return Promise.all(cmds.map(cmd => this.execShell(cmd, option.execOptions, option.allowError !== false)));
                    }
                } else {
                    return Promise.reject('shell task config error');
                }
            });
    }

    protected execShell(cmd: string, options?: ExecOptions, allowError = true): Promise<any> {
        if (!cmd) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            let shell = exec(cmd, options, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stdout);
                }
            });

            shell.stdout.on('data', data => {
                console.log(data);
            });

            shell.stderr.on('data', err => {
                console.log(err);
                if (!allowError) {
                    reject(err);
                }
            });

            shell.on('exit', (code) => {
                console.log(`exit child process with code：${code}`);
                if (code > 0) {
                    reject(code);
                }
            });
        });
    }
}
