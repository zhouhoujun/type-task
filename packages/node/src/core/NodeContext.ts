import { toAbsolutePath } from '@ts-ioc/platform-server';
import { existsSync, readdirSync, lstatSync } from 'fs';
import { join, dirname, normalize } from 'path';
import {
    mkdir, cp, rm
    /* ls, test, cd, ShellString, pwd, ShellArray, find, mv, TestOptions, cat, sed */
} from 'shelljs';
import * as globby from 'globby';
import { ObjectMap, Express2, Singleton, isArray, assert, assertExp } from '@ts-ioc/core';
import { Context, Src } from '@taskfr/core';
import { INodeContext, NodeContextToken, CmdOptions } from './INodeContext';
import { isString } from 'util';

const minimist = require('minimist');
const del = require('del');



/**
 * nodejs project context.
 *
 * @export
 * @class NodeContext
 * @extends {Context}
 * @implements {INodeContext}
 */
@Singleton(NodeContextToken)
export class NodeContext extends Context implements INodeContext {

    packageFile = 'package.json';

    constructor() {
        super()
    }

    private args: ObjectMap<any>;
    /**
     * get evn args.
     *
     * @returns {ObjectMap<any>}
     * @memberof NodeContext
     */
    getEnvArgs(): ObjectMap<any> {
        if (!this.args) {
            this.args = minimist(process.argv.slice(2));
        }
        return this.args;
    }

    hasArg(arg): boolean {
        return process.argv.indexOf(arg) > -1 || process.argv.indexOf('--' + arg) > -1;
    }

    /**
     * get run tasks.
     *
     * @returns {string[]}
     * @memberof NodeContext
     */
    getRunTasks(): string[] {
        return this.getEnvArgs()._ || ['default'];
    }
    /**
     * get root folders.
     *
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof NodeContext
     */
    getRootFolders(express?: Express2<string, string, boolean>): string[] {
        return this.getFolders(this.getRootPath(), express);
    }

    /**
     * get folders of path.
     *
     * @param {string} pathstr
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof NodeContext
     */
    getFolders(pathstr: string, express?: Express2<string, string, boolean>): string[] {
        pathstr = normalize(pathstr);
        let dir = readdirSync(pathstr);
        let folders = [];
        dir.forEach(d => {
            let sf = join(pathstr, d);
            let f = lstatSync(sf);
            if (f.isDirectory()) {
                if (express) {
                    let fl = express(sf, d);
                    if (fl) {
                        folders.push(fl);
                    }
                } else {
                    folders.push(sf);
                }
            }
        });
        return folders;
    }

    /**
     * filter fileName in directory.
     *
     * @param {Src} express
     * @param {(fileName: string) => boolean} [filter]
     * @param {(filename: string) => string} [mapping]
     * @returns {Promise<string[]>}
     * @memberof NodeContext
     */
    async getFiles(express: Src, filter?: (fileName: string) => boolean, mapping?: (filename: string) => string): Promise<string[]> {
        assertExp(isString(express) || isArray(express), 'input express param type error!');
        let filePaths: string[] = await globby(express);
        if (filter) {
            filePaths = filePaths.filter(filter);
        }

        if (mapping) {
            return filePaths.map(mapping);
        }

        return filePaths;
    }

    copyFile(src: Src, dist: string, options?: CmdOptions) {
        if (options && options.force) {
            rm('-f', dist);
            cp(src, dist);
        } else {
            cp(src, dist);
        }
    }

    copyDir(src: Src, dist: string, options?: CmdOptions) {
        if (!existsSync(dist)) {
            mkdir('-p', dist);
        }
        if (options && options.force) {
            rm('-rf', normalize(join(dist, '/')));
            mkdir('-p', normalize(join(dist, '/')));
            cp('-R', normalize(src + '/*'), normalize(join(dist, '/')));
        } else {
            cp('-R', normalize(src + '/*'), normalize(join(dist, '/')));
        }
    }

    async copyTo(filePath: string, dist: string): Promise<any> {
        const outFile = join(dist, filePath.replace(/(node_modules)[\\\/]/g, ''));
        return new Promise((res) => {
            if (!existsSync(outFile)) {
                if (!existsSync(dirname(outFile))) {
                    mkdir('-p', dirname(outFile));
                }
                cp('-R', join(filePath), outFile);
                res();
            }
        });
    }

    del(src: Src): Promise<any> {
        return del(src);
    }

    /**
     * to root path.
     *
     * @param {string} pathstr
     * @returns {string}
     * @memberof NodeContext
     */
    toRootPath(pathstr: string): string {
        return toAbsolutePath(this.getRootPath(), pathstr);
    }

    private _package: any;
    /**
     * get package.
     *
     * @returns {*}
     * @memberof NodeContext
     */
    getPackage(): any {
        let filename = this.toRootPath(this.packageFile);
        if (!this._package) {
            this._package = require(filename);
        }
        return this._package;
    }
    /**
     * get package version.
     *
     * @returns {string}
     * @memberof NodeContext
     */
    getPackageVersion(): string {
        let packageCfg = this.getPackage();
        if (!packageCfg) {
            return '';
        }
        return packageCfg.version || '';
    }
    /**
     * get module version.
     *
     * @param {string} name
     * @param {boolean} [dependencies=false]
     * @returns {string}
     * @memberof NodeContext
     */
    getModuleVersion(name: string, dependencies = false): string {
        let packageCfg = this.getPackage();
        if (!packageCfg) {
            return '';
        }
        let version = '';
        if (packageCfg.dependencies) {
            version = packageCfg.dependencies[name];
        }
        if (!dependencies && !version && packageCfg.devDependencies) {
            version = packageCfg.devDependencies[name];
        }

        return version || '';
    }

    // // ---------------shelljs command----------------

    // /**
    //  * Changes to directory dir for the duration of the script. Changes to home directory if no argument is supplied.
    //  * @param {string} [dir] Directory to change in.
    //  */
    // cd(dir?: string): void {
    //     cd(dir);
    // }

    // /**
    //  * Returns the current directory.
    //  * @return The current directory.
    //  */
    // pwd(): ShellString {
    //     return pwd();
    // }

    // /**
    //  * Returns array of files in the given path, or in current directory if no path provided.
    //  * @param  {...Src[]} paths Paths to search.
    //  * @return          An array of files in the given path(s).
    //  */
    // ls(...paths: Src[]): ShellArray {
    //     return ls(...paths);
    // }

    // /**
    //  * Returns array of files in the given path, or in current directory if no path provided.
    //  * @param {string} options  Available options:  -R: recursive -A: all files (include files beginning with ., except for . and ..) -L: follow symlinks -d: list directories themselves, not their contents -l: list objects representing each file, each with fields containing ls -l output fields. See fs.Stats for more info
    //  * @param {...Src[]} paths Paths to search.
    //  * @return          An array of files in the given path(s).
    //  */
    // lsOpt(options?: string, ...paths: Array<string | string[]>): ShellArray {
    //     return ls(options, ...paths);
    // }

    // /**
    //  * Returns array of all files (however deep) in the given paths.
    //  * @param {...Src[]} paths   The path(s) to search.
    //  * @return          An array of all files (however deep) in the given path(s).
    //  */
    // find(...path: Src[]): ShellArray {
    //     return find(...path);
    // }

    // /**
    //  * Copies files. The wildcard * is accepted.
    //  * @param {Src}  source  The source.
    //  * @param {string} dest    The destination.
    //  * @param {string} [options] Available options: -f: force (default behavior) -n: no-clobber -u: only copy if source is newer than dest -r, -R: recursive -L: follow symlinks -P: don't follow symlinks
    //  */
    // cp(source: Src, dest: string, options?: string): void {
    //     options ? cp(options, source, dest) : cp(source, dest);
    // }

    // /**
    //  * Removes files. The wildcard * is accepted.
    //  * @param ...files Files to remove.
    //  */
    // rm(...files: Src[]): void {
    //     rm(...files);
    // }

    // /**
    //  * Removes files. The wildcard * is accepted.
    //  * @param  {string} options  Available options: -f (force), -r, -R (recursive)
    //  * @param ...files Files to remove.
    //  */
    // rmOpt(options: string, ...files: Src[]): void {
    //     rm(options, ...files);
    // }

    // /**
    //  * Moves files. The wildcard * is accepted.
    //  * @param source The source.
    //  * @param dest   The destination.
    //  * @param {string} [options] Available options: -f: force (default behavior) -n: no-clobber
    //  */
    // mv(source: string | string[], dest: string, options?: string): void {
    //     options ? mv(options, source, dest) : mv(source, dest);
    // }

    // /**
    //  * Creates directories.
    //  * @param ...dir Directories to create.
    //  */
    // mkdir(...dir: Src[]): void {
    //     mkdir(...dir);
    // }

    // /**
    //  * Creates directories.
    //  * @param   options Available options: p (full paths, will create intermediate dirs if necessary)
    //  * @param ...dir  The directories to create.
    //  */
    // mkdirOpt(options: string, ...dir: Src[]): void {
    //     mkdir(...dir);
    // }

    // /**
    //  * Evaluates expression using the available primaries and returns corresponding value.
    //  * @param   option '-b': true if path is a block device; '-c': true if path is a character device; '-d': true if path is a directory; '-e': true if path exists; '-f': true if path is a regular file; '-L': true if path is a symboilc link; '-p': true if path is a pipe (FIFO); '-S': true if path is a socket
    //  * @param   path   The path.
    //  * @return        See option parameter.
    //  */
    // test(option: TestOptions, path: string): boolean {
    //     return test(option, path);
    // }

    // /**
    //  * Returns a string containing the given file, or a concatenated string containing the files if more than one file is given (a new line character is introduced between each file). Wildcard * accepted.
    //  * @param  ...files Files to use.
    //  * @return            A string containing the given file, or a concatenated string containing the files if more than one file is given (a new line character is introduced between each file).
    //  */
    // cat(...files: Src[]): ShellString {
    //     return cat(...files);
    // }

    // /**
    //  * Reads an input string from file and performs a JavaScript replace() on the input using the given search regex and replacement string or function. Returns the new string after replacement.
    //  * @param  searchRegex The regular expression to use for search.
    //  * @param  replacement The replacement.
    //  * @param  file        The file to process.
    //  * @param {string} [options]     Available options: -i (Replace contents of 'file' in-place. Note that no backups will be created!)
    //  * @return             The new string after replacement.
    //  */
    // sed(searchRegex: string | RegExp, replacement: string, file: string, options?: string): ShellString {
    //     return options ? sed(options, searchRegex, replacement, file) : sed(searchRegex, replacement, file);
    // }

}
