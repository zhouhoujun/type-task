import { DefaultTaskContainer, ITaskContainer, ITask } from '@taskp/core';
import { Type, IContainer, Providers, ModuleType, Token, LoadType, Express2, ObjectMap } from '@ts-ioc/core';
import chalk from 'chalk';
import { TaskLogAspect } from './aop/index';
// import { TaskContext } from './TaskContext';
const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');


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
}
