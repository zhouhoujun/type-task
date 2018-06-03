import { toAbsolutePath } from '@ts-ioc/platform-server';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import { isFunction, ObjectMap, Express2, Injectable, IContainer, Inject, ContainerToken, Singleton, Type, hasOwnClassMetadata } from '@ts-ioc/core';
import { ITaskContainer, TaskContainerToken, ITask, Task, IConfigure, Context, TaskType, ITaskBuilder, ITaskRunner, TaskBuilderToken, TaskRunnerToken } from '@taskp/core';
import { IPipeContext, PipeContextToken } from './ITaskContext';
const minimist = require('minimist');

@Singleton(PipeContextToken)
export class TaskContext extends Context implements IPipeContext {

    packageFile = 'package.json';

    constructor() {
        super()
    }

    getRunner(task: TaskType<ITask>, instance?: any, builder?: ITaskBuilder): ITaskRunner {
        let container = this.getContainer();
        builder = builder || container.get(TaskBuilderToken, 'pipe');
        return container.resolve(TaskRunnerToken, { work: task, instance: instance, taskBuilder: builder })
    }

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
