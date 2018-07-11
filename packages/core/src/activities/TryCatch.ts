import { IActivity, Task, InjectAcitityToken, Condition, InjectAcitityBuilderToken, IConfigure, ActivityType, ActivityBuilder } from '../core';
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
 * TryCatch activity configure.
 *
 * @export
 * @interface TryCatchConfigure
 * @extends {IConfigure}
 */
export interface TryCatchConfigure extends IConfigure {
    /**
     * try activity.
     *
     * @type {CtxType<number>}
     * @memberof TryCatchConfigure
     */
    try: ActivityType<any>;

    /**
     * catchs activities.
     *
     * @type {ActivityType<any>[]}
     * @memberof TryCatchConfigure
     */
    catchs: ActivityType<any>[];

    /**
     * finally activity.
     *
     * @type {ActivityType<any>}
     * @memberof TryCatchConfigure
     */
    finally?: ActivityType<any>;
}
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
    try: IActivity<any>;
    /**
     * catch activities.
     *
     * @type {IActivity[]}
     * @memberof TryCatchActivity
     */
    catchs: IActivity<any>[] = [];
    /**
     * finally activity.
     *
     * @memberof TryCatchActivity
     */
    finally?: IActivity<any>;

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
export class TryCatchActivityBuilder extends ActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: TryCatchConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof TryCatchActivity) {
            activity.try = await this.build(config.try, activity.id);
            if (config.catchs && config.catchs.length) {
                let catchs = await Promise.all(config.catchs.map(cat => {
                    return this.build(cat, activity.id);
                }));
                activity.catchs = catchs;
            }
            if (config.finally) {
                activity.finally = await this.build(config.finally, activity.id);
            }
        }

        return activity;
    }
}