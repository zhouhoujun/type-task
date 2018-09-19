import { Activity } from './Activity';
import { ActivityContext } from './ActivityContext';
import { IActivity } from './IActivity';
import { Registration, Type } from '@ts-ioc/core';
import { Task } from '../decorators';



/**
 * before dependence activity inject token.
 *
 * @export
 * @class InjectBeforeActivity
 * @extends {Registration<T>}
 * @template T
 */
export class InjectBeforeActivity<T extends IActivity> extends Registration<T> {
    constructor(type: Type<T>) {
        super(type, 'BeforeDepActivity');
    }
}

/**
 * after dependence activity inject token.
 *
 * @export
 * @class InjectBeforeActivity
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAfterActivity<T extends IActivity> extends Registration<T> {
    constructor(type: Type<T>) {
        super(type, 'AfterDepActivity');
    }
}


/**
 * activity with before after context.
 *
 * @export
 * @abstract
 * @class ContextActivity
 * @extends {Activity<any>}
 */
@Task
export abstract class ContextActivity extends Activity<any> {
    /**
    * run task.
    *
    * @param {ActivityContext} [ctx] execute context.
    * @returns {Promise<T>}
    * @memberof Activity
    */
    async run(ctx?: ActivityContext): Promise<any> {
        ctx = ctx || this.createCtx();
        await this.before(ctx);
        await this.execute(ctx);
        await this.after(ctx);
        return ctx.data;
    }


    /**
     * before run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<void>}
     * @memberof ContextActivity
     */
    protected async before(ctx: ActivityContext): Promise<void> {
        if (this.config && this.config.type) {
            let dep = this.context.getContainer().getRefService(InjectBeforeActivity, this.config.type);
            if (dep) {
                await dep.run(ctx);
            }
        }
    }

    /**
     * execute the activity body.
     *
     * @protected
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns {Promise<void>}
     * @memberof Activity
     */
    protected abstract async execute(ctx: ActivityContext): Promise<void>;

    /**
     * after run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<void>}
     * @memberof ContextActivity
     */
    protected async after(ctx: ActivityContext): Promise<void> {
        if (this.config && this.config.type) {
            let dep = this.context.getContainer().getRefService(InjectAfterActivity, this.config.type);
            if (dep) {
                await dep.run(ctx);
            }
        }
    }
}
