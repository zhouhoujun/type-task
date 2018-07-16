import {
    Src, Activity, InjectAcitityToken, Task, IConfigure,
    Expression, InjectAcitityBuilderToken, ActivityBuilder,
    IActivity, ExpressionType
} from '@taskfr/core';
import { Singleton, Inject } from '@ts-ioc/core';
import { PipeContextToken, IPipeContext } from './IPipeContext';
const del = require('del');


/**
 * clean task token.
 */
export const CleanToken = new InjectAcitityToken<CleanActivity>('clean');
/**
 * clean activity builder token
 */
export const CleanActivityBuilderToken = new InjectAcitityBuilderToken<CleanActivityBuilder>('clean');

/**
 * clean configure
 *
 * @export
 * @interface ICleanConfigure
 * @extends {IConfigure}
 */
export interface CleanConfigure extends IConfigure {
    /**
     * clean match.
     *
     * @type {ExpressionType<Src>}
     * @memberof ICleanConfigure
     */
    clean?: ExpressionType<Src>;
}


/**
 * clean task.
 */
@Task(CleanToken, CleanActivityBuilderToken)
export class CleanActivity extends Activity<any> {

    /**
     * context.
     *
     * @type {IPipeContext}
     * @memberof BaseTask
     */
    @Inject(PipeContextToken)
    context: IPipeContext;

    clean: Expression<Src>;

    async run(data?: any): Promise<any> {
        let clean = await this.context.exec(this, this.clean, data);
        return await del(clean);
    }
}

@Singleton(CleanActivityBuilderToken)
export class CleanActivityBuilder extends ActivityBuilder {

    async buildStrategy(activity: IActivity<any>, config: CleanConfigure): Promise<IActivity<any>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof CleanActivity) {
            activity.clean = await this.toExpression(config.clean, activity);
        }

        return activity;
    }
}