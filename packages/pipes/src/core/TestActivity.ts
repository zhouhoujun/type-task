import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { CtxType, IActivity, ExpressionType, Expression } from '@taskfr/core';
import { isUndefined } from '@ts-ioc/core';
import { TransformType, TransformConfig } from './pipeTypes';
import { SourceConfigure, SourceActivity } from './SourceActivity';
import { InjectPipeActivityToken } from './IPipeActivity';

/**
 * test activity token.
 */
export const TestAcitvityToken = new InjectPipeActivityToken<TestActivity>('test');

/**
 * test activity configure.
 *
 * @export
 * @interface TestConfigure
 * @extends {SourceConfigure}
 */
export interface TestConfigure extends SourceConfigure {

    /**
     * set match test file source.
     *
     * @type {ExpressionType<boolean>}
     * @memberof TestConfigure
     */
    enable?: ExpressionType<boolean>;

    /**
     * test framewok. default use gulp-mocha to test.
     *
     * @type {TransformConfig}
     * @memberof TestConfigure
     */
    framework?: TransformConfig;

    /**
     * test options.
     *
     * @type {CtxType<any>}
     * @memberof TestConfigure
     */
    options?: CtxType<any>;
}

/**
 * test activity.
 *
 * @export
 * @class TestActivity
 * @extends {SourceActivity}
 */
@PipeTask(TestAcitvityToken)
export class TestActivity extends SourceActivity {

    /**
     * task framework
     *
     * @type {TransformType}
     * @memberof PipeTest
     */
    framework: TransformType;

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

    async onActivityInit(config: TestConfigure) {
        await super.onActivityInit(config);
        this.options = this.context.to(config.options);
        if (!isUndefined(config.enable)) {
            this.enable = await this.toExpression(config.enable);
        }
        if (config.framework) {
            this.framework = await this.toExpression(config.framework);
        } else {
            this.framework = () => {
                let mocha = require('gulp-mocha');
                return this.options ? mocha(this.options) : mocha();
            };
        }
    }

    protected async afterPipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        let source = await super.afterPipe(stream, execute);
        let test = await this.context.exec(this, this.enable, source);
        if (test !== false) {
            return await this.executePipe(source, this.framework, true);
        } else {
            return source;
        }
    }
}
