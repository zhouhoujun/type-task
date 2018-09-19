import { Injectable, isNullOrUndefined, InjectToken, Inject } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IContext, ContextToken } from './IContext';
import { ITranslator } from './Translator';

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

    /**
     * evn context.
     *
     * @type {IContext}
     * @memberof IActivityContext
     */
    context: IContext;

    /**
     * get state.
     *
     * @returns {*}
     * @memberof IActivityContext
     */
    getState(): any;

}


export const InputDataToken = new InjectToken<any>('Context_Inputdata');

/**
 * base activity context.
 *
 * @export
 * @class ActivityContext
 * @implements {IActivityContext<any>}
 */
@Injectable
export class ActivityContext implements IActivityContext<any> {

    protected _input: any;
    /**
     * input data
     *
     * @type {*}
     * @memberof IRunContext
     */
    get input(): any {
        return this._input;
    }

    /**
     * set input.
     *
     * @memberof ActivityContext
     */
    set input(val: any) {
        if (val !== this._input) {
            this.onInuputChanged(val);
        }
        this._input = val;
    }

    /**
     * execute data.
     *
     * @type {*}
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


    constructor(@Inject(InputDataToken) input: any, @Inject(ContextToken) public context: IContext) {
        if (!isNullOrUndefined(input)) {
            this.input = input;
        }
    }

    getState() {
        return this.data;
    }


    protected onInuputChanged(input: any) {
        let chg;
        if (!isNullOrUndefined(input)) {
            let translator = this.getTranslator(input);
            if (translator) {
                chg = translator.translate(input);
            } else {
                chg = this.translate(input);
            }
        }
        this.setState(chg);
    }

    protected setState(chg: any) {
        this.data = chg;
    }

    protected translate(input: any): any {
        return input;
    }

    protected getTranslator(input: any): ITranslator {
        return null;
    }
}
