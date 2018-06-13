import { Task, IConfigure, RunWay } from '@taskp/core';
import { IPipeContext, PipeContextToken } from './IPipeContext';
import { Inject, Abstract } from '@ts-ioc/core';
import { IPipeTask } from './IPipeTask';

/**
 * base task.
 *
 * @export
 * @class BaseTask
 * @implements {ITask}
 */
@Abstract()
export abstract class AbstractPipe implements IPipeTask {

    /**
     * task name.
     *
     * @type {string}
     * @memberof AbstractPipe
     */
    name: string;

    /**
     * task config.
     *
     * @type {IConfigure}
     * @memberof BaseTask
     */
    config: IConfigure;

    /**
     * run wary.
     *
     * @memberof BaseTask
     */
    runWay = RunWay.seqFirst;

    /**
     * context.
     *
     * @type {IPipeContext}
     * @memberof BaseTask
     */
    @Inject(PipeContextToken)
    context: IPipeContext;

    constructor(name?: string) {
        this.name = name;
    }

    /**
     * run task.
     *
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof BaseTask
     */
    abstract run(data?: any): Promise<any>;
}
