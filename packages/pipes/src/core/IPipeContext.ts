import { IContainer, ObjectMap, Express2, InjectToken, Type } from '@ts-ioc/core';
import { ITaskContainer, ITask, IConfigure, IContext } from '@taskp/core';

/**
 * task context token.
 */
export const PipeContextToken = new InjectToken<IPipeContext>('__TASK_TaskContext');

/**
 * task context.
 *
 * @export
 * @interface IPipeContext
 */
export interface IPipeContext extends IContext {

    /**
     * package file.
     *
     * @type {string}
     * @memberof IPipeContext
     */
    packageFile: string;

    /**
     * get task evn args.
     *
     * @returns {ObjectMap<any>}
     * @memberof IPipeContext
     */
    getEnvArgs(): ObjectMap<any>;

    /**
     * get run tasks.
     *
     * @returns {string[]}
     * @memberof IPipeContext
     */
    getRunTasks(): string[];


    /**
     * get root folders.
     *
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof IPipeContext
     */
    getRootFolders(express?: Express2<string, string, boolean>): string[];

    /**
     * get folders in an dir.
     *
     * @param {string} pathstr
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof IPipeContext
     */
    getFolders(pathstr: string, express?: Express2<string, string, boolean>): string[];

    /**
     * to root path.
     *
     * @param {string} pathstr
     * @returns {string}
     * @memberof IPipeContext
     */
    toRootPath(pathstr: string): string;

    /**
     * get package.
     *
     * @returns {*}
     * @memberof IPipeContext
     */
    getPackage(): any;

    /**
     * get package version.
     *
     * @returns {string}
     * @memberof IPipeContext
     */
    getPackageVersion(): string;

    /**
     * get module version.
     *
     * @param {string} name
     * @param {boolean} [dependencies]
     * @returns {string}
     * @memberof IPipeContext
     */
    getModuleVersion(name: string, dependencies?: boolean): string;

}