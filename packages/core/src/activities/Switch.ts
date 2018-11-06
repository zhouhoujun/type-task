import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Activity, Expression, SwitchConfigure, IActivityContext } from '../core';
import { MapSet, isUndefined } from '@ts-ioc/core';

/**
 * Switch activity token.
 */
export const SwitchActivityToken = new InjectAcitityToken<SwitchActivity>('switch');

/**
 * Switch control activity.
 *
 * @export
 * @class SwitchActivity
 * @extends {Activity}
 */
@Task(SwitchActivityToken)
export class SwitchActivity extends Activity<any> {
    /**
     * Switch condition.
     *
     * @type {Expression<any>}
     * @memberof SwitchActivity
     */
    expression: Expression<any>;
    /**
     * Switch body.
     *
     * @type {MapSet<any, IActivity>}
     * @memberof SwitchActivity
     */
    cases: MapSet<any, IActivity> = new MapSet();

    /**
     * default activity.
     *
     * @type {IActivity}
     * @memberof SwitchActivity
     */
    defaultBody?: IActivity;

    async onActivityInit(config: SwitchConfigure): Promise<void> {
        await super.onActivityInit(config);
        this.expression = await this.toExpression(config.expression);
        if (config.cases && config.cases.length) {
            await Promise.all(config.cases.map(async (cs) => {
                let val = await this.buildActivity(cs.value);
                this.cases.set(cs.key, val);
                return val;
            }));
        }

        if (config.defaultBody) {
            this.defaultBody = await this.buildActivity(config.defaultBody);
        }
    }

    protected async execute(ctx: IActivityContext): Promise<void> {
        let matchkey = await this.context.exec<any>(this, this.expression, ctx);
        if (!isUndefined(matchkey) && this.cases.has(matchkey)) {
            await this.cases.get(matchkey).run(ctx);
        } else if (this.defaultBody) {
            await this.defaultBody.run(ctx);
        }
    }
}
