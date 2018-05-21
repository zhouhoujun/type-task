import { ObjectMap, Singleton, Inject, IContainer, Type, hasOwnClassMetadata, ContainerToken } from '@ts-ioc/core';
import {  Around, Aspect, Joinpoint, JoinpointState } from '@ts-ioc/aop';
import { LoggerAspect } from '@ts-ioc/logs';

import chalk from 'chalk';
import { ITask, Task, TaskModule } from '../core/index';
const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
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
    constructor(@Inject(ContainerToken) container: IContainer) {
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
        let start, end;
        let taskname = '\'' + chalk.cyan(name) + '\'';
        if (joinPoint.state === JoinpointState.Before) {
            start = process.hrtime();
            this.startHrts[name] = start;
            logger.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Starting', taskname, '...');
        }

        if (joinPoint.state === JoinpointState.AfterReturning) {
            start = this.startHrts[name];
            end = prettyTime(process.hrtime(start));
            delete this.startHrts[name];
            logger.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Finished', taskname, ' after ', chalk.magenta(end));
        }

        if (joinPoint.state === JoinpointState.AfterThrowing) {
            start = this.startHrts[name];
            end = prettyTime(process.hrtime(start));
            delete this.startHrts[name];
            logger.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Finished', taskname, chalk.red('errored after'), chalk.magenta(end));
        }
    }
}
