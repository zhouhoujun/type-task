import { DefaultTaskContainer, ITaskContainer } from '@taskfr/core';
import { Type, Token, LoadType } from '@ts-ioc/core';
import chalk from 'chalk';
import { TaskLogAspect, RunnerLogAspect } from './aop';
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
        this.useLog(TaskLogAspect);
        this.useLog(RunnerLogAspect);
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
}
