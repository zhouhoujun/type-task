import { Src } from './utils/index';
import { Express, IContainer, IContainerBuilder, ObjectMap } from 'tsioc';
import { ITaskContainer } from './ITaskContainer';


/**
 * task environment.
 *
 * @export
 * @interface ITaskContext
 */
export interface ITaskContext {

    /**
     * ioc container.
     *
     * @type {IContainer}
     * @memberof ITaskContext
     */
    container: IContainer;

    /**
     * container builder.
     *
     * @type {IContainerBuilder}
     * @memberof ITaskContext
     */
    containerBuilder: IContainerBuilder;

    /**
     * task container.
     *
     * @type {ITaskContainer}
     * @memberof ITaskContext
     */
    taskContainer: ITaskContainer;

    /**
     * get process env agrs.
     * 
     * @returns {*} 
     * @memberof ITaskContext
     */
    getEnvArgs(): ObjectMap<any>;

    /**
     * get run tasks via cil cammand options.
     * 
     * @returns {string[]} 
     * @memberof ITaskContext
     */
    getRunTasks(): string[];

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
     * get module version. the module dependencies or devDependencies.
     * defualt only dependencies module.
     *
     * @param {string} name
     * @param {boolean} [dependencies]
     * @returns {string}
     * @memberof ITaskContext
     */
    getModuleVersion(name: string, dependencies?: boolean): string;
}
