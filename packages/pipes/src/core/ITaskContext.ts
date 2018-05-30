import { IContainer, ObjectMap, Express2, InjectToken, Type } from '@ts-ioc/core';
import { ITaskContainer, ITask } from '@taskp/core';

/**
 * task context token.
 */
export const TaskContextToken = new InjectToken<ITaskContext>('__TASK_TaskContext');

/**
 * task context.
 *
 * @export
 * @interface ITaskContext
 */
export interface ITaskContext {

    /**
     * package file.
     *
     * @type {string}
     * @memberof ITaskContext
     */
    packageFile: string;

    /**
     * get ioc container.
     *
     * @returns {IContainer}
     * @memberof ITaskContext
     */
    getContainer(): IContainer;

    /**
     * get task container.
     *
     * @returns {ITaskContainer}
     * @memberof ITaskContext
     */
    getTaskContiner(): ITaskContainer;

    /**
     * get task evn args.
     *
     * @returns {ObjectMap<any>}
     * @memberof ITaskContext
     */
    getEnvArgs(): ObjectMap<any>;

    /**
     * get run tasks.
     *
     * @returns {string[]}
     * @memberof ITaskContext
     */
    getRunTasks(): string[];

    /**
     * get root folders.
     *
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof ITaskContext
     */
    getRootFolders(express?: Express2<string, string, boolean>): string[];

    /**
     * get folders in an dir.
     *
     * @param {string} pathstr
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof ITaskContext
     */
    getFolders(pathstr: string, express?: Express2<string, string, boolean>): string[];

    /**
     * get task run root path.
     *
     * @returns {string}
     * @memberof ITaskContext
     */
    getRootPath(): string;

    /**
     * to root path.
     *
     * @param {string} pathstr
     * @returns {string}
     * @memberof ITaskContext
     */
    toRootPath(pathstr: string): string;

    /**
     * get package.
     *
     * @returns {*}
     * @memberof ITaskContext
     */
    getPackage(): any;

    /**
     * get package version.
     *
     * @returns {string}
     * @memberof ITaskContext
     */
    getPackageVersion(): string;

    /**
     * get module version.
     *
     * @param {string} name
     * @param {boolean} [dependencies]
     * @returns {string}
     * @memberof ITaskContext
     */
    getModuleVersion(name: string, dependencies?: boolean): string;

    /**
     * check is task or not.
     *
     * @param {Type<ITask>} task
     * @returns {boolean}
     * @memberof ITaskContext
     */
    isTask(task: Type<ITask>): boolean;
}
