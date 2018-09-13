import { ITaskContainer, DefaultTaskContainer } from '@taskfr/core';
import { LoadType } from '@ts-ioc/core';
import { TaskLogAspect, RunnerLogAspect } from './aop';
import { ApplicationBuilder } from '@ts-ioc/platform-server/bootstrap';
import { IApplicationBuilder } from '@ts-ioc/bootstrap';
import * as path from 'path';

const processRoot = path.join(path.dirname(process.cwd()), path.basename(process.cwd()));
/**
 * task container in server.
 *
 * @export
 * @class TaskContainer
 * @extends {DefaultTaskContainer}
 */
export class TaskContainer extends DefaultTaskContainer implements ITaskContainer {

    constructor(baseURL?: string) {
        super(baseURL);
        this.use(TaskLogAspect)
            .use(RunnerLogAspect);
    }

    protected createAppBuilder(): IApplicationBuilder<any> {
        return new ApplicationBuilder(this.baseURL || processRoot);
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
    static create(root?: string, ...modules: LoadType[]) {
        let taskContainer = new TaskContainer(root);
        if (modules) {
            taskContainer.use(...modules);
        }
        return taskContainer;
    }

}
