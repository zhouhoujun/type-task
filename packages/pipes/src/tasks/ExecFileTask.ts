import { isString, isArray } from '@ts-ioc/core';
import { existsSync } from 'fs';
import { Src, Activity, Task } from '@taskfr/core';
import * as execa from 'execa';


/**
 * exec file Task
 *
 * @class ExecFileTask
 * @implements {ITask}
 */
@Task('execfile')
export class ExecFileTask extends Activity<any> {
    files: Src;
    args?: string[];
    options?: execa.Options;
    allowError = true;

    run(): Promise<any> {
        return Promise.resolve(this.files)
            .then(files => {
                let allowError = this.allowError;
                let options = this.options;
                let args = this.args;
                if (isString(files)) {
                    return this.execFile(files, args, options, allowError !== false);
                } else if (isArray(files)) {
                    // if (this.runWay & RunWay.sequence) {
                    let pip = Promise.resolve();
                    files.forEach(file => {
                        pip = pip.then(() => this.execFile(file, args, options, allowError !== false));
                    });
                    return pip;
                    // } else {
                    //     return Promise.all(files.map(file => this.execFile(file, args, options, allowError !== false)));
                    // }
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
