import { toAbsolutePath } from '@ts-ioc/platform-server';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import { ObjectMap, Express2, Singleton } from '@ts-ioc/core';
import { Context } from '@taskfr/core';
import { IPipeContext, PipeContextToken } from './IPipeContext';
const minimist = require('minimist');

/**
 * pipe context.
 *
 * @export
 * @class PipeContext
 * @extends {Context}
 * @implements {IPipeContext}
 */
@Singleton(PipeContextToken)
export class PipeContext extends Context implements IPipeContext {

    packageFile = 'package.json';

    constructor() {
        super()
    }

    private args: ObjectMap<any>;
    /**
     * get evn args.
     *
     * @returns {ObjectMap<any>}
     * @memberof PipeContext
     */
    getEnvArgs(): ObjectMap<any> {
        if (!this.args) {
            this.args = minimist(process.argv.slice(2));
        }
        return this.args;
    }
    /**
     * get run tasks.
     *
     * @returns {string[]}
     * @memberof PipeContext
     */
    getRunTasks(): string[] {
        return this.getEnvArgs()._ || ['default'];
    }
    /**
     * get root folders.
     *
     * @param {Express2<string, string, boolean>} [express]
     * @returns {string[]}
     * @memberof PipeContext
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
     * @memberof PipeContext
     */
    getFolders(pathstr: string, express?: Express2<string, string, boolean>): string[] {
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
     * to root path.
     *
     * @param {string} pathstr
     * @returns {string}
     * @memberof PipeContext
     */
    toRootPath(pathstr: string): string {
        return toAbsolutePath(this.getRootPath(), pathstr);
    }

    private _package: any;
    /**
     * get package.
     *
     * @returns {*}
     * @memberof PipeContext
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
     * @memberof PipeContext
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
     * @memberof PipeContext
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
}
