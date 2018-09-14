import { Express2 } from '@ts-ioc/core';
import { IContext, InjectContextToken } from '@taskfr/core';

/**
 * node context token.
 */
export const NodeContextToken = new InjectContextToken<INodeContext>('nodejs');

/**
 * task context.
 *
 * @export
 * @interface INodeContext
 */
export interface INodeContext extends IContext {

    /**
     * package file.
     *
     * @type {string}
     * @memberof INodeContext
     */
    packageFile: string;

    /**
     * get run tasks.
     *
     * @returns {string[]}
     * @memberof INodeContext
     */
    getRunTasks(): string[];


    /**
     * get root folders.
     *
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof INodeContext
     */
    getRootFolders(express?: Express2<string, string, boolean>): string[];

    /**
     * get folders in an dir.
     *
     * @param {string} pathstr
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof INodeContext
     */
    getFolders(pathstr: string, express?: Express2<string, string, boolean>): string[];

    /**
     * to root path.
     *
     * @param {string} pathstr
     * @returns {string}
     * @memberof INodeContext
     */
    toRootPath(pathstr: string): string;

    /**
     * get package.
     *
     * @returns {*}
     * @memberof INodeContext
     */
    getPackage(): any;

    /**
     * get package version.
     *
     * @returns {string}
     * @memberof INodeContext
     */
    getPackageVersion(): string;

    /**
     * get module version.
     *
     * @param {string} name
     * @param {boolean} [dependencies]
     * @returns {string}
     * @memberof INodeContext
     */
    getModuleVersion(name: string, dependencies?: boolean): string;

}
