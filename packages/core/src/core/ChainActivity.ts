import { Task } from '../decorators';
import { ActivityContext } from './ActivityContext';
import { IHandleActivity, HandleActivity } from './HandleActivity';
import { ChainConfigure } from './ActivityConfigure';
import { InjectAcitityToken, IActivity } from './IActivity';
import { Activity } from './Activity';



/**
 * chain activity token.
 */
export const ChainActivityToken = new InjectAcitityToken<ChainActivity>('chain');


@Task(ChainActivityToken)
export class ChainActivity extends Activity<any> {

    protected activities: IHandleActivity[];

    async onActivityInit(config: ChainConfigure): Promise<any> {
        await super.onActivityInit(config);
        if (config.activities && config.activities.length) {
            this.activities = await Promise.all(config.activities.map(cfg => this.buildActivity(cfg)))
        }
        this.activities = (this.activities || []).filter(act => act instanceof HandleActivity);
    }

    protected async execute(ctx: ActivityContext): Promise<any> {
        return await this.handleRequest(ctx);
    }

    protected handleRequest(ctx: ActivityContext, next?: () => Promise<any>) {
        let index = -1;
        let handles = this.activities.map(act => {
            return (ctx: ActivityContext, next?: () => Promise<any>) => act.run(ctx, next);
        });
        return dispatch(0)
        function dispatch(idx: number): Promise<any> {
            if (idx <= index) {
                return Promise.reject('next called mutiple times');
            }
            index = idx;
            let handle = handles[idx];
            if (idx === handles.length) {
                handle = next;
            }
            if (!handle) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(handle(ctx, dispatch.bind(null, idx + 1)));
            } catch (err) {
                return Promise.reject(err);
            }

        }
    }

    use(activity: IActivity) {
        if (activity instanceof Activity) {
            this.activities.push(activity);
        }
    }
}
