import { Around, Aspect, Joinpoint, JoinpointState, ObjectMap, Singleton } from 'tsioc';
import chalk from 'chalk';
const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
/**
 * Task Log
 *
 * @export
 * @class TaskLog
 */
@Aspect
@Singleton
export class TaskLog {

    private startHrts: ObjectMap<any>;
    constructor() {
        this.startHrts = {};
    }

    @Around('execution(*.run)')
    log(joinPoint: Joinpoint) {
        let name = joinPoint.target.name;
        if (!name) {
            name = joinPoint.targetType.classAnnations ? joinPoint.targetType.classAnnations.name : joinPoint.targetType.name;
        }
        let start, end;
        let taskname = '\'' + chalk.cyan(name) + '\'';
        if (joinPoint.state === JoinpointState.Before) {
            start = process.hrtime();
            this.startHrts[name] = start;
            console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Starting', taskname, '...');
        }

        if (joinPoint.state === JoinpointState.After) {
            start = this.startHrts[name];
            end = prettyTime(process.hrtime(start));
            delete this.startHrts[name];
            console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Finished', taskname, ' after ', chalk.magenta(end));
        }

        if (joinPoint.state === JoinpointState.AfterThrowing) {
            start = this.startHrts[name];
            end = prettyTime(process.hrtime(start));
            delete this.startHrts[name];
            console.log('[' + chalk.grey(timestamp('HH:mm:ss', new Date())) + ']', 'Finished',  taskname, chalk.red('errored after'), chalk.magenta(end));
        }
    }
}
