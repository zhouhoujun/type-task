import { IActivity, Task, InjectAcitityToken, Condition, TryCatchConfigure } from '../core';
import { Activity } from '../core/Activity';

/**
 * while activity token.
 */
export const TryCatchActivityToken = new InjectAcitityToken<TryCatchActivity>('trycatch');

/**
 * while control activity.
 *
 * @export
 * @class TryCatchActivity
 * @extends {Activity}
 */
@Task(TryCatchActivityToken)
export class TryCatchActivity extends Activity<any> {
    /**
     * while condition.
     *
     * @type {Condition}
     * @memberof TryCatchActivity
     */
    condition: Condition;
    /**
     * try activity.
     *
     * @type {IActivity}
     * @memberof TryCatchActivity
     */
    try: IActivity;
    /**
     * catch activities.
     *
     * @type {IActivity[]}
     * @memberof TryCatchActivity
     */
    catchs: IActivity[] = [];
    /**
     * finally activity.
     *
     * @memberof TryCatchActivity
     */
    finally?: IActivity;

    async onActivityInit(config: TryCatchConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.try = await this.buildActivity(config.try);
        if (config.catchs && config.catchs.length) {
            let catchs = await Promise.all(config.catchs.map(cat => {
                return this.buildActivity(cat);
            }));
            this.catchs = catchs;
        }
        if (config.finally) {
            this.finally = await this.buildActivity(config.finally);
        }
    }

    async run(data?: any): Promise<any> {
        let rp;
        try {
            rp = this.try.run(data);
            this.catchs.forEach(cth => {
                rp = rp.catch(r => cth.run(r));
            });
            if (this.finally) {
                rp.then(r => {
                    return this.finally.run(r);
                });
            }
        } catch {
            rp = Promise.resolve(data);
            if (this.finally) {
                rp.then(r => {
                    return this.finally.run(r);
                });
            }
        }

        return rp;
    }
}
