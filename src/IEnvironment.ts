import { folderCallback, Src } from './types';
import { ITaskInfo } from './ITask';

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
     * join src to absolute path src with root( env.root ).
     *
     * @param {Src} src
     * @returns {Src}
     *
     * @memberof ITaskContext
     */
    toRootSrc(src: Src): Src

    /**
     * join pathstr to absolute path src with root( env.root ).
     *
     * @param {string} pathstr
     * @returns {string}
     *
     * @memberof ITaskContext
     */
    toRootPath(pathstr: string): string;
}
