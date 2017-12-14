import { IAssets } from './IAssets';
import { ITaskInfo, ITask } from './ITask';
import { Src, TaskString, TaskSource, ZipTaskName, folderCallback, CtxType } from './types';
import { ExecOptions, ExecFileOptions } from 'child_process';
import { IComponent, Express, Mode } from 'tsioc';


/**
 * runtime task context.
 *
 * @export
 * @interface ITaskContext
 */
export interface ITaskContext extends IComponent {

    /**
     * get Assets
     *
     * @type {IAssets}@memberof ITaskContext
     */
    getAssets(): IAssets;


    /**
     * map context.
     *
     * @template T
     * @param {Express<ITaskContext, T>} express
     * @param {Mode} [mode]
     * @param {Express<ITaskContext, boolean>} [filter]
     * @returns {T[]}
     *
     * @memberof ITaskContext
     */
    map<T>(express: Express<ITaskContext, T>, mode?: Mode, filter?: Express<ITaskContext, boolean>): T[]


    /**
     * get Src of current state.   default implement in bindingConfig.
     *
     * @param {boolean} [relative] get relative path or absolute path.
     * @returns {Src}
     *
     * @memberof ITaskContext
     */
    getSrc(relative?: boolean): Src;

    /**
     * get dist of current state.  default implement in bindingConfig.
     *
     * @param {boolean} [relative] get relative path or absolute path.
     * @returns {string}
     *
     * @memberof ITaskContext
     */
    getDist(relative?: boolean): string;

    /**
     * add task for this context.
     *
     * @param {...ITask[]} task
     * @memberof ITaskContext
     */
    addTask(...task: ITask[]): void;

    /**
     * remove task
     *
     * @param {ITask} task
     * @returns {(ITask[] | Promise<ITask[]>)}
     * @memberof ITaskContext
     */
    removeTask(task: ITask): ITask[] | Promise<ITask[]>;

    /**
     * run task in this context.
     *
     * @returns {Promise<any>}
     *
     * @memberof IContext
     */
    run(): Promise<any>;


    /**
     * join src to absolute path src with context dist root.
     *
     * @param {Src} src
     * @param {ITaskInfo} [task]
     * @returns {Src}
     *
     * @memberof ITaskContext
     */
    toDistSrc(src: Src, task?: ITaskInfo): Src;

    /**
     * join pathstr to absolute path src with dist root.
     *
     * @param {string} pathstr
     * @param {ITaskInfo} [task]
     * @returns {string}
     *
     * @memberof ITaskContext
     */
    toDistPath(pathstr: string, task?: ITaskInfo): string;

    /**
     * get context dist folders
     *
     * @param {folderCallback} [express]
     * @param {ITaskInfo} [task]
     * @returns {string[]}
     *
     * @memberof ITaskContext
     */
    getDistFolders(express?: folderCallback, task?: ITaskInfo): string[];

    /**
     * parse to T type;
     *
     * @template T
     * @param {CtxType<T>} val
     * @returns {T}
     *
     * @memberof ITaskContext
     */
    to<T>(val: CtxType<T>): T;
    /**
     * to src
     *
     * @param {any} TaskSource
     * @returns {Src}
     *
     * @memberof ITaskContext
     */
    toSrc(source: TaskSource): Src;

    /**
     * to string.
     *
     * @param {TaskString} name
     * @returns {string}
     *
     * @memberof ITaskContext
     */
    toStr(name: TaskString): string;

}
