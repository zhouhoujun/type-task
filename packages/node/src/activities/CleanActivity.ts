import { Src, Activity, InjectAcitityToken, Task, ActivityConfigure, Expression, ExpressionType } from '@taskfr/core';
import { Inject } from '@ts-ioc/core';
import { NodeContextToken, INodeContext } from '../core';



/**
 * clean task token.
 */
export const CleanToken = new InjectAcitityToken<CleanActivity>('clean');

/**
 * clean configure
 *
 * @export
 * @interface ICleanConfigure
 * @extends {ActivityConfigure}
 */
export interface CleanConfigure extends ActivityConfigure {
    /**
     * clean match.
     *
     * @type {ExpressionType<Src>}
     * @memberof ICleanConfigure
     */
    clean: ExpressionType<Src>;
}


/**
 * clean task.
 */
@Task(CleanToken)
export class CleanActivity extends Activity<any> {

    /**
     * context.
     *
     * @type {INodeContext}
     * @memberof BaseTask
     */
    @Inject(NodeContextToken)
    context: INodeContext;
    /**
     * clean source.
     *
     * @type {Expression<Src>}
     * @memberof CleanActivity
     */
    clean: Expression<Src>;

    async onActivityInit(config: CleanConfigure) {
        await super.onActivityInit(config);
        this.clean = await this.toExpression(config.clean);
    }

    /**
     * run clean.
     *
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof CleanActivity
     */
    protected async execute(data?: any): Promise<any> {
        let clean = await this.context.exec(this, this.clean, data);
        return await this.context.del(clean);
    }
}
