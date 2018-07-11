import { ObjectMap, Inject, IContainer, ContainerToken } from '@ts-ioc/core';
import { Around, Aspect, Joinpoint, JoinpointState, Before } from '@ts-ioc/aop';
import { LoggerAspect } from '@ts-ioc/logs';
import chalk from 'chalk';
import { Runner } from '@taskfr/core';
const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
/**
 * Task Log
 *
 * @export
 * @class TaskLogAspect
 */
@Aspect({
    annotation: Runner,
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
        let uuid = joinPoint.target.uuid;

        let start, end;
        let taskname = '\'' + chalk.cyan(uuid) + '\'';
        if (joinPoint.state === JoinpointState.Before) {
            start = process.hrtime();
            this.startHrts[uuid] = start;
            logger.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Starting workflow',  taskname, '...');
        }

        if (joinPoint.state === JoinpointState.AfterReturning) {
            start = this.startHrts[uuid];
            end = prettyTime(process.hrtime(start));
            delete this.startHrts[uuid];
            logger.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Finished workflow', taskname, ' after ', chalk.magenta(end));
        }

        if (joinPoint.state === JoinpointState.AfterThrowing) {
            start = this.startHrts[uuid];
            end = prettyTime(process.hrtime(start));
            delete this.startHrts[uuid];
            logger.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Finished workflow', taskname, chalk.red('errored after'), chalk.magenta(end));
            process.exit(1);
        }
    }

}