import { ExecOptions, ExecFileOptions, execFile } from 'child_process';
import { isString, isArray, isFunction } from 'tsioc';
import { existsSync } from 'fs';
import { TaskSrc } from '../../utils/index';
import { AbstractTask, Task, RunWay } from '../../core/index';



/**
 * exec file Task
 *
 * @class ExecFileTask
 * @implements {ITask}
 */
@Task('execfile')
export class ExecFileTask extends AbstractTask  {
    constructor(name: string, private files: string, private args?: string[], private options?: ExecFileOptions, private allowError = true, private runWay= RunWay.sequence) {
        super(name);
    }

    run(): Promise<any> {
        let files = isFunction(this.files) ? this.files(this.context.container) : this.files;
        return Promise.resolve(files)
            .then(files => {
                if (isString(files)) {
                    return this.execFile(files, this.args, this.options, this.allowError !== false);
                } else if (isArray(files)) {
                    if (this.runWay === RunWay.sequence) {
                        let pip = Promise.resolve();
                        files.forEach(file => {
                            pip = pip.then(() => this.execFile(file, this.args, this.options, this.allowError !== false));
                        });
                        return pip;
                    } else {
                        return Promise.all(files.map(file => this.execFile(file, this.args, this.options, this.allowError !== false)));
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
