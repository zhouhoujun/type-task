import { DefaultTaskContainer, ITaskContainer, ITask, ITaskRunner, RunState, TaskType } from '@taskp/core';
import { Type, Token, LoadType } from '@ts-ioc/core';
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
     * @param {...TaskType<ITask>[]} tasks
     * @returns {Promise<any>}
     * @memberof TaskContainer
     */
    bootstrap<T extends ITask>(...tasks: TaskType<ITask>[]): Promise<ITaskRunner> {
        let start, end;
        start = process.hrtime();
        console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Starting'), '...');

        return super.bootstrap(...tasks)
            .then(runner => {
                runner.stateChanged.subscribe(state => {
                    switch (state) {
                        case RunState.running:
                            if (!start) {
                                start = process.hrtime();
                            }
                            break;
                        case RunState.complete:
                            end = prettyTime(process.hrtime(start));
                            console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Finished'), ' after ', chalk.magenta(end));
                            start = null;
                            break;

                        case RunState.stop:
                            end = prettyTime(process.hrtime(start));
                            console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Stopped'), ' after ', chalk.magenta(end));
                            start = null;
                            break;
                        case RunState.pause:
                            end = prettyTime(process.hrtime(start));
                            console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Paused'), ' after ', chalk.magenta(end));
                            start = null;
                            break;
                    }
                });

                return runner;
            },
                err => {
                    end = prettyTime(process.hrtime(start));
                    console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', chalk.cyan('Finished'), chalk.red('errored after'), chalk.magenta(end));
                    console.error(err);
                    return err;
                });
    }
}
