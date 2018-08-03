import {
    IActivity, Task, InjectAcitityToken, Condition,
    InjectAcitityBuilderToken, ActivityBootBuilder, TryCatchConfigure
} from '../core';
import { Activity } from '../core/Activity';
import { Singleton } from '@ts-ioc/core';

/**
 * while activity token.
 */
export const TryCatchActivityToken = new InjectAcitityToken<TryCatchActivity>('trycatch');
/**
 * TryCatch activity builder token
 */
export const TryCatchActivityBuilderToken = new InjectAcitityBuilderToken<TryCatchActivityBuilder>('delay');

/**
 * while control activity.
 *
 * @export
 * @class TryCatchActivity
 * @extends {Activity}
 */
@Task(TryCatchActivityToken, TryCatchActivityBuilderToken)
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

@Singleton(TryCatchActivityBuilderToken)
export class TryCatchActivityBuilder extends ActivityBootBuilder {

    createBuilder() {
        return this.container.get(TryCatchActivityBuilderToken);
    }

    async buildStrategy(activity: IActivity, config: TryCatchConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof TryCatchActivity) {
            activity.try = await this.buildByConfig(config.try, activity.id);
            if (config.catchs && config.catchs.length) {
                let catchs = await Promise.all(config.catchs.map(cat => {
                    return this.buildByConfig(cat, activity.id);
                }));
                activity.catchs = catchs;
            }
            if (config.finally) {
                activity.finally = await this.buildByConfig(config.finally, activity.id);
            }
        }

        return activity;
    }
}
