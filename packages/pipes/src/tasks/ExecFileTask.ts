import { ExecFileOptions, execFile } from 'child_process';
import { isString, isArray } from '@ts-ioc/core';
import { existsSync } from 'fs';
import { AbstractTask, Task, RunWay, Src } from '@taskp/core';



/**
 * exec file Task
 *
 * @class ExecFileTask
 * @implements {ITask}
 */
@Task('execfile')
export class ExecFileTask extends AbstractTask {
    files: Src;
    args?: string[];
    options?: ExecFileOptions;
    allowError = true;
    runWay = RunWay.sequence
    constructor(name?: string) {
        super(name);
    }

    run(): Promise<any> {
        return Promise.resolve(this.files)
            .then(files => {
                let allowError = this.allowError;
                let options = this.options;
                let args = this.args;
                if (isString(files)) {
                    return this.execFile(files, args, options, allowError !== false);
                } else if (isArray(files)) {
                    if (this.runWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        files.forEach(file => {
                            pip = pip.then(() => this.execFile(file, args, options, allowError !== false));
                        });
                        return pip;
                    } else {
                        return Promise.all(files.map(file => this.execFile(file, args, options, allowError !== false)));
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
