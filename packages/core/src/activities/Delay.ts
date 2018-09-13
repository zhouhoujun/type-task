import { Defer } from '@ts-ioc/core';
import { Task } from '../decorators';
import { InjectAcitityToken, Activity, Expression, DelayConfigure, OnActivityInit } from '../core';

/**
 * deloy activity token.
 */
export const DelayActivityToken = new InjectAcitityToken<DelayActivity>('delay');

/**
 * while control activity.
 *
 * @export
 * @class DelayActivity
 * @extends {Activity}
 */
@Task(DelayActivityToken)
export class DelayActivity extends Activity<any> implements OnActivityInit {

    /**
     * delay time.
     *
     * @type {Expression<number>}
     * @memberof DelayActivity
     */
    delay: Expression<number>;

    async onActivityInit(config: DelayConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.delay = await this.toExpression(config.delay, this);
    }

    protected async execute(data?: any): Promise<any> {
        let delay = await this.context.exec(this, this.delay, data);
        let defer = new Defer<any>();
        let timmer = setTimeout(() => {
            defer.resolve(data);
            clearTimeout(timmer);
        }, delay);
        let result = await defer.promise;
        return result;
    }
}

