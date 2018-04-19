import { ExecOptions, ExecFileOptions, execFile, exec } from 'child_process';
import { isString, isArray } from '@ts-ioc/core';
import { AbstractTask, Task, RunWay } from '@taskp/core';

/**
 * Shell Task
 *
 * @class ShellTask
 * @implements {ITask}
 */
@Task('shell')
export class ExecShellTask extends AbstractTask {
    constructor(name: string, private cmds: string | string[], private options?: ExecOptions, private allowError = true, private runWay = RunWay.sequence) {
        super(name);
    }

    run(): Promise<any> {
        return Promise.resolve(this.cmds)
            .then(cmds => {
                if (isString(cmds)) {
                    return this.execShell(cmds, this.options, this.allowError !== false);
                } else if (isArray(cmds)) {
                    if (this.runWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        cmds.forEach(cmd => {
                            pip = pip.then(() => this.execShell(cmd, this.options));
                        });
                        return pip;
                    } else {
                        return Promise.all(cmds.map(cmd => this.execShell(cmd, this.options, this.allowError !== false)));
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
