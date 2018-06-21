import { ExecOptions, exec } from 'child_process';
import { isString, isArray } from '@ts-ioc/core';
import { Task, AbstractTask, RunWay, Src } from '@taskfr/core';

/**
 * Shell Task
 *
 * @class ShellTask
 * @implements {ITask}
 */
@Task('shell')
export class ExecShellTask extends AbstractTask {
    /**
     * cmds.
     *
     * @type {Src}
     * @memberof ExecShellTask
     */
    cmds: Src;
    args: string[];
    options: ExecOptions;
    allowError = true;
    runWay = RunWay.sequence
    constructor(name?: string) {
        super(name);
    }

    run(): Promise<any> {
        return Promise.resolve(this.cmds)
            .then(cmds => {
                let allowError = this.allowError;
                let options = this.options;
                if (isString(cmds)) {
                    return this.execShell(cmds, options, allowError !== false);
                } else if (isArray(cmds)) {
                    if (this.runWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        cmds.forEach(cmd => {
                            pip = pip.then(() => this.execShell(cmd, options));
                        });
                        return pip;
                    } else {
                        return Promise.all(cmds.map(cmd => this.execShell(cmd, options, allowError !== false)));
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
