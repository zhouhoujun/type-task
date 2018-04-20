import { DefaultTaskContainer, ITaskContainer, BootsrapTask } from '@taskp/core';
import { AsyncLoadOptions, Type, IContainer, Providers } from '@ts-ioc/core';
import chalk from 'chalk';
import { TaskLogAspect } from './aop/index';
const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');

export class TaskContainer extends DefaultTaskContainer {

    constructor(rootPath: string, container?: IContainer) {
        super(rootPath, container);
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
    static create(root: string, ...modules: (Type<any> | AsyncLoadOptions)[]): ITaskContainer {
        let taskContainer = new TaskContainer(root);
        if (modules) {
            taskContainer.use(...modules);
        }
        return taskContainer;
    }

    /**
     * bootstrap task.
     *
     * @param {BootsrapTask} [tasks]
     * @param {...Providers[]} providers
     * @returns {Promise<any>}
     * @memberof DefaultTaskContainer
     */
    bootstrap(tasks?: BootsrapTask, ...providers: Providers[]): Promise<any> {
        let start, end;
        start = process.hrtime();

        console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Starting'), '...');

        return super.bootstrap(tasks, ...providers)
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

    protected registerExt(container: IContainer) {
        super.registerExt(container);
        container.register(this.log || TaskLogAspect);
    }
}
