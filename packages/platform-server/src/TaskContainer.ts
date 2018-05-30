import { DefaultTaskContainer, ITaskContainer, ITask } from '@taskp/core';
import { Type, IContainer, Providers, ModuleType, Token, LoadType, Express2, ObjectMap } from '@ts-ioc/core';
import chalk from 'chalk';
import { TaskLogAspect } from './aop/index';
import { toAbsolutePath } from '@ts-ioc/platform-server';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
// import { TaskContext } from './TaskContext';
const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
const minimist = require('minimist');

/**
 * task container in server.
 *
 * @export
 * @class TaskContainer
 * @extends {DefaultTaskContainer}
 */
export class TaskContainer extends DefaultTaskContainer {

    constructor(rootPath: string) {
        super(rootPath);
        this.logAspect = TaskLogAspect;
    }

    /**
     * create task container.
     *
     * @static
     * @param {string} root
     * @param {...(Type<any> | AsyncLoadOptions)[]} modules
     * @returns {ITaskContainer}
     * @memberof TaskContainer
     */
    static create(root: string, ...modules: LoadType[]): ITaskContainer {
        let taskContainer = new TaskContainer(root);
        if (modules) {
            taskContainer.useModules(...modules);
        }
        return taskContainer;
    }

    /**
     * bootstrap task.
     *
     * @template T
     * @param {(Token<T> | Type<any>)} [task]
     * @returns {Promise<any>}
     * @memberof TaskContainer
     */
    bootstrap<T extends ITask>(task: Token<T> | Type<any>): Promise<any> {
        let start, end;
        start = process.hrtime();

        console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Starting'), '...');

        return super.bootstrap(task)
            .then(
                data => {
                    end = prettyTime(process.hrtime(start));
                    console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Finished'), ' after ', chalk.magenta(end));
                    return data;
                },
                err => {
                    end = prettyTime(process.hrtime(start));
                    console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Finished'), chalk.red('errored after'), chalk.magenta(end));
                    console.error(err);
                    return err;
                });
    }

    packageFile = 'package.json';

    private args: ObjectMap<any>;
    getEnvArgs(): ObjectMap<any> {
        if (this.args) {
            this.args = minimist(process.argv.slice(2));
        }
        return this.args;
    }

    getRunTasks(): string[] {
        return this.getEnvArgs()._ || ['default'];
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

    getRootPath() {
        return this.rootPath;
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
