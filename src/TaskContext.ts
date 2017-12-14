
import * as chalk from 'chalk';
import { exec, execFile, ExecOptions, ExecFileOptions } from 'child_process';
import * as minimist from 'minimist';
import { sortOrder } from './utils/sortOrder';
import { matchCompare } from './utils/match';

import { IPipeTask } from './IPipeTask';
import *as path from 'path';
import *as fs from 'fs';
import { ITaskContext } from './ITaskContext';
import { IAssets } from './IAssets';
import { ITask } from './ITask';
import { Src, TaskString, TaskSource, ZipTaskName, folderCallback, CtxType } from './types';
import { RunWay } from './RunWay';
import { Injectable, Composite, Express, Mode } from 'tsioc';
const globby = require('globby');


/**
 *TaskContext
 *
 *@export
 *@class TaskContext
 *@implements {ITaskContext}
 */
@Injectable
export class TaskContext extends Composite implements ITaskContext {

    constructor(name: string) {
        super(name);
    }

    /**
     * map context.
     *
     *@template T
     *@param {Express<ITaskContext, T>} express
     *@param {Mode} [mode]
     *@param {Express<ITaskContext, boolean>} [filter]
     *@returns {T[]}
     *
     *@memberof TaskContext
     */
    map<T>(express: Express<ITaskContext, T>, mode?: Mode, filter?: Express<ITaskContext, boolean>): T[] {
        let arr: T[] = []
        this.each<ITaskContext>((ctx) => {
            if (filter) {
                if (filter(ctx)) {
                    arr.push(express(ctx));
                }
            } else {
                arr.push(express(ctx));
            }
        }, mode);
        return arr;
    }

    getSrc(relative = false): Src {
        let src: Src;
        let ctx = this;
        if (task && task.assert) {
            src = taskSourceVal(getAssertSrc(task.assert, oper), ctx)
        }

        if (!src) {
            this.route(c => {
                src = taskSourceVal(getAssertSrc(c.option, oper), c);
                if (src) {
                    return false;
                }
                return true;
            });
        }
        return (relative !== false) ? src : absoluteSrc(ctx.env.root, src);
    }

    getDist(relative = false): string {
        let dist: string;
        let ctx = this;
        // let oper = task ? (task.oper || context.oper) : context.oper;
        if (task && task.assert) {
            dist = getCurrentDist(task.assert, ctx);
        }
        if (!dist) {
            this.route(c => {
                dist = getCurrentDist(c.option, c);
                if (dist) {
                    return false;
                }
                return true;
            });
        }

        return (relative !== false) ? dist : absolutePath(ctx.env.root, dist);
    }


    addTask(...task: ITask[]) {
        this.taskseq.push(...task);
    }

    removeTask(task: ITask): ITask[] | Promise<ITask[]> {
        let idx = this.taskseq.indexOf(task);
        if (idx >= 0 && idx < this.taskseq.length) {
            return this.taskseq.splice(idx, 1);
        }

        return [];
    }

    /**
     *run task in this context.
     *
     *@returns {Promise<any>}
     *
     *@memberof TaskContext
     */
    run(): Promise<any> {
        if (this.env.help) {
            return Promise.resolve(this.help())
        } else {
            // if (!this.builder.isBuilt(this)) {
            //     this.builder.build(this);
            // }
            return this.setup()
                .then(tseq => {
                    let opt = this.option as IAsserts;
                    if (opt.runWay === RunWay.parallel) {
                        return this.runSequence([this.flattenSequence(tseq)]);
                    } else {
                        return this.runSequence(tseq);
                    }
                });
        }
    }

    execShell(cmd: string, options?: ExecOptions, allowError = true): Promise<any> {
        if (!cmd) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            console.log('execute shell:', chalk.cyan(cmd));
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

    execFile(file: string, args?: string[], options?: ExecFileOptions, allowError = true): Promise<any> {
        if (!file && !fs.existsSync(file)) {
            console.log('file:', chalk.yellow(file), 'no exists.');
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            console.log('execute shell:', chalk.cyan(file));
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
