import { Inject, IContainer, ContainerToken } from '@ts-ioc/core';
import { Aspect, Joinpoint, Before, AfterReturning } from '@ts-ioc/aop';
import { ITaskRunner, RunState, Task } from '../core';
import { Activity } from '../activities';

/**
 * Task Log
 *
 * @export
 * @class TaskLogAspect
 */
@Aspect({
    annotation: Task,
    singleton: true
})
export class RunAspect {

    @Inject(ContainerToken)
    container: IContainer;
    constructor() {

    }

    @Before('execution(*.run)')
    beforeRun(joinPoint: Joinpoint) {
        let runner = this.getRunner(joinPoint.target);
        if (!runner) {
            return;
        }
        runner.saveState(joinPoint);
        switch (runner.state) {
            case RunState.pause:
                throw new Error('workflow paused!');
            case RunState.stop:
                throw new Error('workflow stop!');
        }

    }

    @AfterReturning('execution(*.run)')
    afterRun(joinPoint: Joinpoint) {

        let runner = this.getRunner(joinPoint.target);
        if (!runner) {
            return;
        }
        runner.saveState(joinPoint);
        switch (runner.state) {
            case RunState.pause:
                throw new Error('workflow paused!');
            case RunState.stop:
                throw new Error('workflow stop!');
        }

    }

    getRunner(task: any) {
        if (task instanceof Activity) {
            if (task.id && this.container.has(task.id)) {
                return this.container.resolve<ITaskRunner>(task.id);
            }
        }
        return null;
    }
}
