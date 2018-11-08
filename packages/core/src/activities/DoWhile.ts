import { Task } from '../decorators';
import { IActivity, InjectAcitityToken, Condition, Activity, DoWhileConfigure, IActivityContext } from '../core';

/**
 * do while activity token.
 */
export const DoWhileActivityToken = new InjectAcitityToken<DoWhileActivity>('dowhile');

/**
 * do while control activity.
 *
 * @export
 * @class DoWhileActivity
 * @extends {Activity}
 */
@Task(DoWhileActivityToken)
export class DoWhileActivity extends Activity<any> {
    /**
     * do while condition.
     *
     * @type {Condition}
     * @memberof DoWhileActivity
     */
    condition: Condition;
    /**
     * do while body.
     *
     * @type {IActivity}
     * @memberof DoWhileActivity
     */
    body: IActivity;

    async onActivityInit(config: DoWhileConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.body = await this.buildActivity(config.do);
        this.condition = await this.toExpression(config.while);
    }

    protected async execute(): Promise<any> {
        await this.body.run(this.getContext());
        let condition = await this.getContext().exec(this, this.condition);
        while (condition) {
            await this.body.run(this.getContext());
            condition = await this.getContext().exec(this, this.condition);
        }
    }
}
