import { DefaultTaskContainer, ITaskContainer, ITask, RunState, TaskType } from '@taskfr/core';
import { Type, Token, LoadType } from '@ts-ioc/core';
import { TaskLogAspect } from './aop/index';

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
        this.logAspect = TaskLogAspect;
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
            taskContainer.useModules(...modules);
        }
        return taskContainer;
    }

    /**
     * bootstrap task.
     *
     * @param {...TaskType<ITask>[]} tasks
     * @returns {Promise<any>}
     * @memberof DefaultTaskContainer
     */
    bootstrap<T extends ITask>(...tasks: TaskType<ITask>[]): Promise<any> {
        let end: Date;
        let start = new Date();

        console.log('[' + start.toString() + ']', 'Starting', '...');

        return super.bootstrap(...tasks)
            .then(
                runner => {
                    runner.stateChanged.subscribe(state => {
                        switch (state) {
                            case RunState.running:
                                if (!start) {
                                    start = new Date();
                                }
                                break;
                            case RunState.complete:
                                end = new Date();
                                console.log('[' + end.toString() + ']', 'Finished', ' after ', end.getTime() - start.getTime());
                                start = null;
                                break;

                            case RunState.stop:
                                end = new Date();
                                console.log('[' + end.toString() + ']', 'Stopped', ' after ', end.getTime() - start.getTime());
                                start = null;
                                break;
                            case RunState.pause:
                                end = new Date();
                                console.log('[' + end.toString() + ']', 'Paused', ' after ', end.getTime() - start.getTime());

                                break;
                        }
                    });

                    return runner;
                },
                err => {
                    end = new Date();
                    console.log('[' + end.toString() + ']', 'Finished', 'errored after', end.getTime() - start.getTime());
                    console.error(err);
                    return err;
                });
    }

}
