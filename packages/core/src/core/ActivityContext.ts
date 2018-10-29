import { Injectable, isNullOrUndefined, InjectToken, Inject, Registration, Token } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IContext, ContextToken } from './IContext';
import { ITranslator } from './Translator';
import { Activity } from './Activity';
import { Events } from '@ts-ioc/bootstrap';

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
     * evn context.
     *
     * @type {IContext}
     * @memberof IActivityContext
     */
    context: IContext;

    /**
     * ge activity execute result.
     *
     * @returns {*}
     * @memberof IActivityContext
     */
    readonly result: any;
}

/**
 * inpit data token.
 */
export const InputDataToken = new InjectToken<any>('Context_Inputdata');

/**
 * inject actitiy context token.
 *
 * @export
 * @class InjectActivityContextToken
 * @extends {Registration<IActivityContext<any>>}
 */
export class InjectActivityContextToken extends Registration<ActivityContext> {
    constructor(type: Token<IActivity>) {
        super(type, 'AContext');
    }
}

/**
 * Activity execute Context Token.
 */
export const ActivityContextToken = new InjectActivityContextToken(Activity);

/**
 * base activity execute context.
 *
 * @export
 * @class ActivityContext
 * @implements {IActivityContext<any>}
 */
@Injectable(ActivityContextToken)
export class ActivityContext extends Events implements IActivityContext<any> {

    protected _input: any;
    /**
     * execute data.
     *
     * @type {*}
     * @memberof IActivityContext
     */
    protected data: any;

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

    constructor(@Inject(InputDataToken) public input: any, @Inject(ContextToken) public context: IContext) {
        super();
        this.setExecResult(input);
    }

    /**
     * execute Resulte.
     *
     * @readonly
     * @memberof ActivityContext
     */
    get result() {
        return this.data;
    }

    setExecResult(data: any) {
        if (!isNullOrUndefined(data)) {
            data = this.translate(data);
        }
        if (data !== this.data) {
            this.emit('resultChanged', data);
        }
        this.data = data;
    }

    protected translate(data: any): any {
        let translator = this.getTranslator(data);
        if (translator) {
            return translator.translate(data);
        }
        return data;
    }

    protected getTranslator(input: any): ITranslator {
        return null;
    }
}
