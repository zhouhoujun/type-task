import { Task, ITask, IConfigure, RunWay } from '@taskp/core';
import { IPipeContext, PipeContextToken } from './IPipeContext';
import { Inject } from '@ts-ioc/core';

@Task
export class BaseTask implements ITask {

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

    constructor(public name: string) {

    }

    /**
     * run task.
     *
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof BaseTask
     */
    run(data?: any): Promise<any> {
        return Promise.resolve(data);
    }
}
