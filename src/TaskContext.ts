import { IPipeTask } from './IPipeTask';
import { ITaskContext } from './ITaskContext';
import { IAssets } from './IAssets';
import { ITask } from './ITask';
import { Src, TaskString, TaskSource, ZipTaskName, folderCallback, CtxType } from './types';
import { RunWay } from './RunWay';
import { Injectable, Composite, Express, Mode } from 'tsioc';
import { Environment } from './Environment';


/**
 *TaskContext
 *
 *@export
 *@class TaskContext
 *@implements {ITaskContext}
 */
@Injectable
export class TaskContext extends Composite implements ITaskContext {

    constructor(name: string, private enviroment: Environment) {
        super(name);
    }

    private _asserts: IAssets;
    getAssets(): IAssets {
        return this._asserts;
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

    /**
     *run task in this context.
     *
     *@returns {Promise<any>}
     *
     *@memberof TaskContext
     */
    async run(): Promise<any> {

    }
}
