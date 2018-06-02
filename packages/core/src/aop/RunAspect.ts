import { ObjectMap, Singleton, Inject, IContainer, Type, hasOwnClassMetadata, ContainerToken } from '@ts-ioc/core';
import { Around, Aspect, Joinpoint, JoinpointState, Before, AfterReturning, AspectMetadata } from '@ts-ioc/aop';
import { LoggerAspect } from '@ts-ioc/logs';
import { ITask, Task, TaskComponent, ITaskRunner, RunState } from '../core/index';

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
        if (task instanceof TaskComponent) {
            let ins = task.getRoot();
            if (ins.workflowId) {
                return this.container.resolve<ITaskRunner>(ins.workflowId);
            }
        }
        return null;
    }
}