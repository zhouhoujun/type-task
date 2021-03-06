import { ObjectMap, Inject, IContainer, ContainerToken } from '@ts-ioc/core';
import { Around, Aspect, Joinpoint, JoinpointState } from '@ts-ioc/aop';
import { LoggerAspect } from '@ts-ioc/logs';
import { Workflow, IActivityRunner } from '@taskfr/core';
/**
 * Task Log
 *
 * @export
 * @class TaskLogAspect
 */
@Aspect({
    annotation: Workflow,
    singleton: true
})
export class RunnerLogAspect extends LoggerAspect {

    private startHrts: ObjectMap<any>;
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container);

        this.startHrts = {};
    }

    @Around('execution(*.start)')
    logStart(joinPoint: Joinpoint) {
        let logger = this.logger;
        let runner = joinPoint.target as IActivityRunner<any>;
        let uuid = runner.instance.id;

        let start: Date, end: Date;
        let taskname = '\'' + uuid + '\'';
        if (joinPoint.state === JoinpointState.Before) {
            start = new Date();
            this.startHrts[uuid] = start;
            logger.log('[' + start.toString() + ']', 'Starting workflow', taskname, '...');
        }

        if (joinPoint.state === JoinpointState.AfterReturning) {
            start = this.startHrts[uuid];
            end = new Date();
            delete this.startHrts[uuid];
            logger.log('[' + end.toString() + ']', 'Finished workflow', taskname, ' after ', end.getTime() - start.getTime());
        }

        if (joinPoint.state === JoinpointState.AfterThrowing) {
            start = this.startHrts[uuid];
            end = new Date();
            delete this.startHrts[uuid];
            logger.log('[' + end.toString() + ']', 'Finished workflow', taskname, 'errored after', end.getTime() - start.getTime());
        }
    }

}
