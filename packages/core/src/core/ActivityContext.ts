import { Injectable, isNullOrUndefined, Inject } from '@ts-ioc/core';
import { IActivity } from './IActivity';
import { IContext, ContextToken } from './IContext';
import { ITranslator } from './Translator';
import { Activity } from './Activity';
import { Events } from '@ts-ioc/bootstrap';
import { InjectActivityContextToken, InputDataToken, GActivityContext } from './IActivityContext';



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
export class ActivityContext<T> extends Events implements GActivityContext<T> {

    /**
     * execute data.
     *
     * @type {T}
     * @memberof IActivityContext
     */
    protected data: T;

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
        this.setAsResult(input);
    }

    /**
     * execute Resulte.
     *
     * @readonly
     * @memberof ActivityContext
     */
    get result(): T {
        return this.data;
    }

    set result(data: T) {
        if (data !== this.data) {
            this.emit('resultChanged', data);
        }
        this.data = data;
    }

    setAsResult(data: any) {
        if (!isNullOrUndefined(data)) {
            data = this.translate(data);
        }
        this.result = data;
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
