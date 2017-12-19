import { folderCallback, Src } from './types';

export interface IEnvironment {

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
     * @param {folderCallback} [express]
     * @returns {string[]}
     *
     * @memberof ITaskContext
     */
    getRootFolders(express?: folderCallback): string[];
    /**
     * get folders in path.
     *
     * @param {string} pathstr
     * @param {folderCallback} [express]
     * @returns {string[]}
     *
     * @memberof ITaskContext
     */
    getFolders(pathstr: string, express?: folderCallback): string[];


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
    getModuleVersion(name: string, dependencies?: boolean): string
}
