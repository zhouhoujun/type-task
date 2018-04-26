import { ObjectMap, Singleton, Inject, symbols, IContainer, Type, hasOwnClassMetadata } from '@ts-ioc/core';
import { Around, Aspect, Joinpoint, JoinpointState } from '@ts-ioc/aop';
import { LoggerAspect } from '@ts-ioc/logs';

import { ITask, Task, TaskModule } from '@taskp/core';
/**
 * Task Log
 *
 * @export
 * @class TaskLogAspect
 */
@Aspect
@Singleton
export class TaskLogAspect extends LoggerAspect {

    private startHrts: ObjectMap<any>;
    constructor(@Inject(symbols.IContainer) container: IContainer) {
        super(container);

        this.startHrts = {};
    }

    isTask(task: Type<ITask>): boolean {
        return hasOwnClassMetadata(Task, task) || hasOwnClassMetadata(TaskModule, task);
    }

    @Around('execution(*.run)')
    logging(joinPoint: Joinpoint) {
        let logger = this.logger;

        if (!this.isTask(joinPoint.targetType)) {
            return;
        }

        let name = joinPoint.target.name;
        if (!name) {
            name = joinPoint.targetType.classAnnations ? joinPoint.targetType.classAnnations.name : joinPoint.targetType.name;
        }
        let start: Date, end: Date;
        let taskname = '\'' + name + '\'';
        if (joinPoint.state === JoinpointState.Before) {
            start = new Date();
            this.startHrts[name] = start;
            logger.log('[' + start.toString() + ']', 'Starting', taskname, '...');
        }

        if (joinPoint.state === JoinpointState.AfterReturning) {
            start = this.startHrts[name];
            end = new Date();
            delete this.startHrts[name];
            logger.log('[' + end.toString() + ']', 'Finished', taskname, ' after ', end.getTime() - start.getTime());
        }

        if (joinPoint.state === JoinpointState.AfterThrowing) {
            start = this.startHrts[name];
            end = new Date();
            delete this.startHrts[name];
            logger.log('[' + end.toString() + ']', 'Finished', taskname, 'errored after', end.getTime() - start.getTime());
        }
    }
}
