import { Activity } from './Activity';
import { IActivityContext } from './IActivityContext';
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
    * @param {IActivityContext} [ctx] execute context.
    * @returns {Promise<T>}
    * @memberof Activity
    */
    async run(ctx?: IActivityContext): Promise<any> {
        this.ctx = this.verifyCtx(ctx);
        await this.before(this.ctx);
        await this.execute(this.ctx);
        await this.after(this.ctx);
        return this.ctx.result;
    }


    /**
     * before run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<void>}
     * @memberof ContextActivity
     */
    protected async before(ctx: IActivityContext): Promise<void> {
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
    protected abstract async execute(ctx: IActivityContext): Promise<void>;

    /**
     * after run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<void>}
     * @memberof ContextActivity
     */
    protected async after(ctx: IActivityContext): Promise<void> {
        if (this.config && this.config.type) {
            let dep = this.context.getContainer().getRefService(InjectAfterActivity, this.config.type);
            if (dep) {
                await dep.run(ctx);
            }
        }
    }
}
