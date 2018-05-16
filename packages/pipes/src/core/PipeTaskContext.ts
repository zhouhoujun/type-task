import { Singleton, Express, Express2, Inject, IContainer, IContainerBuilder, ObjectMap } from '@ts-ioc/core';
import { toAbsolutePath } from '@ts-ioc/platform-server';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import { ITaskContext, ITaskContainer, DefaultTaskContext, TaskContextToken } from '@taskp/core';
import { IPipeTaskContext } from './IPipeTaskContext';
const minimist = require('minimist');

/**
 * TaskContext.
 *
 * @export
 * @class TaskContext
 */
@Singleton(TaskContextToken, 'pipe')
export class PipeTaskContext extends DefaultTaskContext implements IPipeTaskContext {
    packageFile = 'package.json';

    constructor() {
        super()
    }

    private args: ObjectMap<any>;
    getEnvArgs(): ObjectMap<any> {
        if (this.args) {
            this.args = minimist(process.argv.slice(2));
        }
        return this.args;
    }

    getRunTasks(): string[] {
        return this.getEnvArgs()._  ||  ['default'];
    }

    /**
     * get path.
     *
     * @returns
     * @memberof TaskContext
     */
    getRootPath() {
        return this.taskContainer.rootPath;
    }

    getRootFolders(express?: Express2<string, string, boolean>): string[] {
        return this.getFolders(this.getRootPath(), express);
    }

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

    toRootPath(pathstr: string): string {
        return toAbsolutePath(this.getRootPath(), pathstr);
    }

    private _package: any;
    getPackage(): any {
        let filename = this.toRootPath(this.packageFile);
        if (!this._package) {
            this._package = require(filename);
        }
        return this._package;
    }

    getPackageVersion(): string {
        let packageCfg = this.getPackage();
        if (!packageCfg) {
            return '';
        }
        return packageCfg.version || '';
    }

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
