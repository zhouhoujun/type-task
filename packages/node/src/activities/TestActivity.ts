import { CtxType, ExpressionType, Expression, Task, InjectAcitityToken, ActivityConfigure, IActivity, IActivityContext } from '@taskfr/core';
import { isUndefined } from '@ts-ioc/core';
import { NodeActivity } from '../core';

/**
 * test activity configure.
 *
 * @export
 * @interface TestConfigure
 * @extends {SourceConfigure}
 */
export interface TestConfigure extends ActivityConfigure {

    /**
     * set match test file source.
     *
     * @type {ExpressionType<boolean>}
     * @memberof TestConfigure
     */
    enable?: ExpressionType<boolean>;

    /**
     * test framework.
     *
     * @type {ExpressionType<boolean>}
     * @memberof TestConfigure
     */
    framework?: ExpressionType<boolean>;
    /**
     * test options.
     *
     * @type {CtxType<any>}
     * @memberof TestConfigure
     */
    options?: CtxType<any>;
}

/**
 * test activity token.
 */
export const TestToken = new InjectAcitityToken<IActivity>('test');

/**
 * test activity.
 *
 * @export
 * @class TestActivity
 * @extends {SourceActivity}
 */
@Task(TestToken)
export class TestActivity extends NodeActivity {

    /**
     * test options.
     *
     * @type {*}
     * @memberof IPipeTest
     */
    options: any;

    /**
     * eanble test or not.
     *
     * @type {Expression<boolean>}
     * @memberof TestActivity
     */
    enable: Expression<boolean>;

    /**
     * test framework.
     *
     * @type {Expression<boolean>}
     * @memberof TestActivity
     */
    framework: Expression<boolean>;

    async onActivityInit(config: TestConfigure) {
        await super.onActivityInit(config);
        this.options = this.getContext().to(config.options);
        if (!isUndefined(config.enable)) {
            this.enable = await this.toExpression(config.enable);
        }
        if (config.framework) {
            this.framework = await this.toExpression(config.framework);
        }
    }

    protected async execute(): Promise<void> {
        let test = await this.getContext().exec(this, this.enable);
        if (test !== false && this.framework) {
            await this.getContext().exec(this, this.framework);
        }
    }
}
