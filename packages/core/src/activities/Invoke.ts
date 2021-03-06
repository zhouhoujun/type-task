import { Task } from '../decorators';
import { InjectAcitityToken, Activity } from '../core';
import { Token, ObjectMap } from '@ts-ioc/core';

/**
 * while activity token.
 */
export const InvokeActivityToken = new InjectAcitityToken<InvokeActivity>('invoke');

/**
 * while control activity.
 *
 * @export
 * @class InvokeActivity
 * @extends {Activity}
 */
@Task(InvokeActivityToken)
export class InvokeActivity extends Activity<any> {
    /**
     * while condition.
     *
     * @type {Condition}
     * @memberof InvokeActivity
     */
    args: ObjectMap<any>;

    /**
     * target instance.
     *
     * @type {*}
     * @memberof InvokeActivity
     */
    target?: any;
    /**
     * invoke target token.
     *
     * @type {Token<any>}
     * @memberof InvokeActivity
     */
    targetType: Token<any>;

    async run(data?: any): Promise<any> {
        return this.context.getContainer().invoke(this.targetType, this.target, this.args, { data: data });
    }
}
