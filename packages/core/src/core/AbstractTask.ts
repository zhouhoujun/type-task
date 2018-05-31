import { ITask, IConfigure, RunWay } from '@taskp/core';
import { Inject, Abstract } from '@ts-ioc/core';

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
