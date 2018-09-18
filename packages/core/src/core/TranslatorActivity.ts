import { Activity } from './Activity';
import { IActivity } from './IActivity';
import { Registration, Type } from '@ts-ioc/core';
import { IActivityContext } from './ActivityContext';


/**
 * after dependence activity inject token.
 *
 * @export
 * @class InjectBeforeActivity
 * @extends {Registration<T>}
 * @template T
 */
export class InjectTranslatorActivity<T extends IActivity, TF, TT> extends Registration<TranslatorActivity<TF, TT>> {
    constructor(type: Type<T>) {
        super(type, 'TranslatorActivity');
    }
}

export interface ITranslatorContext<T, TR> extends IActivityContext<TR> {
    input: T;
}

/**
 * Translator Activity.
 *
 * @export
 * @abstract
 * @class TranslatorActivity
 * @extends {Activity<TR>}
 * @template T
 * @template TR
 */
export abstract class TranslatorActivity<T, TR> extends Activity<TR> {
    constructor() {
        super();
    }

    /**
     * execute translate.
     *
     * @protected
     * @abstract
     * @param {T} [data]
     * @param {ITranslatorContext<T, TR>} [ctx]
     * @returns {Promise<void>}
     * @memberof TranslatorActivity
     */
    protected async abstract execute(ctx: ITranslatorContext<T, TR>): Promise<void>;
}
