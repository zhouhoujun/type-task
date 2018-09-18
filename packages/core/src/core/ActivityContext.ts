import { Injectable, isNullOrUndefined, InjectToken, Inject } from '@ts-ioc/core';
import { IActivity } from './IActivity';

/**
 * activity run context.
 *
 * @export
 * @interface IActivityContext
 */
export interface IActivityContext<T> {
    /**
     * input data
     *
     * @type {*}
     * @memberof IRunContext
     */
    input?: any;

    /**
     * outpu data.
     *
     * @type {T}
     * @memberof IActivityContext
     */
    data?: T;

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

}


export const InputDataToken = new InjectToken<any>('Context_Inputdata')

/**
 * base activity context.
 *
 * @export
 * @class ActivityContext
 * @implements {IActivityContext<any>}
 */
@Injectable
export class ActivityContext implements IActivityContext<any> {
    /**
     * input data
     *
     * @type {*}
     * @memberof IRunContext
     */
    input: any;

    /**
     * execute data.
     *
     * @type {T}
     * @memberof IActivityContext
     */
    data: any;

    /**
     * execute activity.
     *
     * @type {IActivity}
     * @memberof IRunContext
     */
    execute: IActivity;

    /**
     * target activiy.
     *
     * @type {IActivity}
     * @memberof ActivityContext
     */
    target: IActivity;

    constructor(@Inject(InputDataToken) input: any) {
        if (!isNullOrUndefined(input)) {
            this.input = input;
            this.data = input;
        }
    }
}
