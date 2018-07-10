import { Inject, Abstract } from '@ts-ioc/core';
import { IContext, ContextToken } from './IContext';
import { IActivity } from './IActivity';
import { IConfigure } from './IConfigure';


/**
 * abstract task.
 *
 * @export
 * @abstract
 * @class AbstractTask
 * @implements {ITask}
 */
@Abstract()
export abstract class AbstractActivity implements IActivity {
    /**
     * workflow instance uuid.
     *
     * @type {string}
     * @memberof IActivity
     */
    id: string;
    /**
     * activity display name.
     *
     * @type {string}
     * @memberof AbstractActivity
     */
    name: string;
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

    constructor() {

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
