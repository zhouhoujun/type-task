import { ITask, IConfigure, RunWay, ITaskConfigure } from '@taskp/core';
import { Inject, Abstract } from '@ts-ioc/core';
import { IContext, ContextToken } from './IContext';

@Abstract()
export abstract class AbstractTask implements ITask {

    /**
     * config.
     *
     * @type {IConfigure}
     * @memberof AbstractTask
     */
    config: IConfigure;

    /**
     * task context.
     *
     * @type {IContext}
     * @memberof AbstractTask
     */
    @Inject(ContextToken)
    context: IContext;

    /**
     * run way.
     *
     * @memberof AbstractTask
     */
    runWay = RunWay.seqFirst;

    constructor(public name: string) {

    }

    /**
     * run task.
     *
     * @abstract
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof AbstractTask
     */
    abstract run(data?: any): Promise<any>;
}
