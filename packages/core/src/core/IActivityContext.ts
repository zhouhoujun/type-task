import { InjectToken, Registration, Token } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IContext } from './IContext';

/**
 * activity run context.
 *
 * @export
 * @interface IActivityContext
 */
export interface IActivityContext extends IContext {
    /**
     * input data
     *
     * @type {*}
     * @memberof IRunContext
     */
    input: any;

    /**
     * execute activity.
     *
     * @type {IActivity}
     * @memberof IRunContext
     */
    execute?: IActivity;

    /**
     * target activiy.
     *
     * @type {IActivity}
     * @memberof ActivityContext
     */
    target?: IActivity;

    /**
     * ge activity execute result.
     *
     * @returns {*}
     * @memberof IActivityContext
     */
    result: any;

    /**
     * set the data as result.
     *
     * @param {*} data
     * @memberof IActivityContext
     */
    setAsResult(data: any);
}

/**
 * inpit data token.
 */
export const InputDataToken = new InjectToken<any>('Context_Inputdata');

export interface GActivityContext<T> extends IActivityContext {
    /**
     * ge activity execute result.
     *
     * @returns {T}
     * @memberof IActivityContext
     */
    result: T;
}

/**
 * inject actitiy context token.
 *
 * @export
 * @class InjectActivityContextToken
 * @extends {Registration<IActivityContext<any>>}
 */
export class InjectActivityContextToken extends Registration<IActivityContext> {
    constructor(type: Token<IActivity>) {
        super(type, 'AtContext');
    }
}
