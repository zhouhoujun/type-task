import { ObjectMap, Singleton, Inject, IContainer, Type, hasOwnClassMetadata, ContainerToken } from '@ts-ioc/core';
import { Around, Aspect, Joinpoint, JoinpointState, Before, AfterReturning } from '@ts-ioc/aop';
import { LoggerAspect } from '@ts-ioc/logs';
import { ITask, Task, TaskComponent, ITaskRunner, RunState } from '../core/index';

/**
 * Task Log
 *
 * @export
 * @class TaskLogAspect
 */
@Aspect
@Singleton
export class RunAspect {

    @Inject(ContainerToken)
    container: IContainer;
    constructor() {

    }

    isTask(task: Type<ITask>): boolean {
        return hasOwnClassMetadata(Task, task);
    }

    @Before('execution(*.run)')
    beforeRun(joinPoint: Joinpoint) {
        if (!this.isTask(joinPoint.targetType)) {
            return;
        }
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
        if (!this.isTask(joinPoint.targetType)) {
            return;
        }
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
