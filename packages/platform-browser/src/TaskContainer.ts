import { DefaultTaskContainer, ITaskContainer } from '@taskfr/core';
import { LoadType } from '@ts-ioc/core';
import { TaskLogAspect, RunnerLogAspect } from './aop/index';

/**
 * task container in browser.
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
     * @param {...ModuleType[]} modules
     * @returns {ITaskContainer}
     * @memberof TaskContainer
     */
    static create(root: string, ...modules: LoadType[]): ITaskContainer {
        let taskContainer = new TaskContainer(root);
        if (modules) {
            taskContainer.use(...modules);
        }
        return taskContainer;
    }

}
