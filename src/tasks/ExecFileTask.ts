import { ExecOptions, ExecFileOptions, execFile } from 'child_process';
import { RunWay, Task, TaskComposite, ITask, ITaskContext } from '../core/index';
import { isString, isArray } from 'tsioc';
import { existsSync } from 'fs';


/**
 * exec file Task
 *
 * @class ExecFileTask
 * @implements {ITask}
 */
@Task('ExecFile')
export class ExecFileTask extends TaskComposite {
    constructor(taskName?: string) {
        super(taskName);
    }

    protected execute(): Promise<any> {
        let option = ctx.option as IExecFileOption;
        let files = ctx.to<AsyncSrc>(this.files);
        return Promise.resolve(files)
            .then(files => {
                if (isString(files)) {
                    return this.execFile(files, option.args, option.execFileOptions, option.allowError !== false);
                } else if (isArray(files)) {
                    if (option.fileRunWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        files.forEach(file => {
                            pip = pip.then(() => this.execFile(file, option.args, option.execFileOptions, option.allowError !== false));
                        });
                        return pip;
                    } else {
                        return Promise.all(files.map(file => this.execFile(file, option.args, option.execFileOptions, option.allowError !== false)));
                    }
                } else {
                    return Promise.reject('exec file task config error');
                }
            });
    }

    protected execFile(file: string, args?: string[], options?: ExecFileOptions, allowError = true): Promise<any> {
        if (!file && !existsSync(file)) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            let proc = execFile(file, args, options, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stdout);
                }
            });

            proc.stdout.on('data', data => {
                console.log(data);
            });

            proc.stderr.on('data', data => {
                console.log(data);
                if (!allowError) {
                    reject(data);
                }
            });

            proc.on('exit', (code) => {
                console.log(`exit child process with code：${code}`);
                if (code > 0) {
                    reject(code);
                }
            });
        });
    }

}
