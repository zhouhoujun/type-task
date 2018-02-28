import { Src } from './utils/index';
import { Express, IContainer } from 'tsioc';
import { ITaskContainer } from './ITaskContainer';

/**
 * task environment.
 *
 * @export
 * @interface IEnvironment
 */
export interface IEnvironment {

    /**
     * ioc container.
     *
     * @type {IContainer}
     * @memberof IEnvironment
     */
    container: IContainer;

    /**
     * task container.
     *
     * @type {ITaskContainer}
     * @memberof IEnvironment
     */
    taskContainer: ITaskContainer;

    /**
     * get development root.
     *
     * @returns {string}
     *
     * @memberof ITaskContext
     */
    getRootPath(): string;

    /**
     * get root folders.
     *
     * @param { Express<string, boolean>} [express]
     * @returns {string[]}
     *
     * @memberof ITaskContext
     */
    getRootFolders(express?: Express<string, boolean>): string[];
    /**
     * get folders in path.
     *
     * @param {string} pathstr
     * @param { Express<string, boolean>} [express]
     * @returns {string[]}
     *
     * @memberof ITaskContext
     */
    getFolders(pathstr: string, express?: Express<string, boolean>): string[];

    /**
     * join pathstr to absolute path src with root( env.root ).
     *
     * @param {string} pathstr
     * @returns {string}
     *
     * @memberof ITaskContext
     */
    toRootPath(pathstr: string): string;

    /**
     * get project package.json.
     *
     * @returns {*}
     * @memberof IEnvironment
     */
    getPackage(): any;


    /**
     * get package version.
     *
     * @returns {string}
     * @memberof IEnvironment
     */
    getPackageVersion(): string;

    /**
     * get module version. the module dependencies or devDependencies.
     * defualt only dependencies module.
     *
     * @param {string} name
     * @param {boolean} [dependencies]
     * @returns {string}
     * @memberof IEnvironment
     */
    getModuleVersion(name: string, dependencies?: boolean): string;
}
