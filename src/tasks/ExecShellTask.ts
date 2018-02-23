import { ExecOptions, ExecFileOptions, execFile, exec } from 'child_process';
import { Task, TaskElement, ITask, IContext } from '../core/index';
import { isString, isArray } from 'tsioc';
import { RunWay } from '../pipes/index';

/**
 * Shell Task
 *
 * @class ShellTask
 * @implements {ITask}
 */
@Task('ExecShell')
export class ExecShellTask extends TaskElement {
    constructor(name: string, private cmds: string | string[], private options?: ExecOptions, private allowError = true, private shellRunWay = RunWay.sequence) {
        super(name);
    }

    protected execute(): Promise<any> {
        return Promise.resolve(this.cmds)
            .then(cmds => {
                if (isString(cmds)) {
                    return this.execShell(cmds, this.options, this.allowError !== false);
                } else if (isArray(cmds)) {
                    if (this.shellRunWay === RunWay.sequence) {
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
