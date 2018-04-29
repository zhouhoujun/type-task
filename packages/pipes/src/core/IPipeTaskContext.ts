import { Express, ObjectMap } from "@ts-ioc/core";
import { ITaskContext } from "@taskp/core";

export interface IPipeTaskContext extends ITaskContext {
    
    /**
     * get task context env agrs.
     *
     * @returns {*}
     * @memberof ITaskContext
     */
    getEnvArgs(): ObjectMap<any>;
    
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