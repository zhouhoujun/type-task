import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { CtxType, IActivity, ExpressionType, Expression } from '@taskfr/core';
import { isUndefined, Injectable } from '@ts-ioc/core';
import { TransformType, TransformConfig } from './pipeTypes';
import { SourceConfigure, SourceActivity, SourceActivityBuilder } from './SourceActivity';
import { InjectPipeActivityToken, InjectPipeAcitityBuilderToken } from './IPipeActivity';


export const TestAcitvityToken = new InjectPipeActivityToken<TestActivity>('test');
export const TestAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<TestActivityBuilder>('test')

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

@PipeTask(TestAcitvityToken, TestAcitvityBuilderToken)
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


@Injectable(TestAcitvityBuilderToken)
export class TestActivityBuilder extends SourceActivityBuilder {

    createBuilder() {
        return this.container.get(TestAcitvityBuilderToken);
    }

    async buildStrategy(activity: IActivity, config: TestConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof TestActivity) {
            activity.options = activity.context.to(config.options);
            if (!isUndefined(config.enable)) {
                activity.enable = await this.toExpression(config.enable, activity);
            }
            if (config.framework) {
                activity.framework = await this.toExpression(config.framework, activity);
            } else {
                activity.framework = () => {
                    let mocha = require('gulp-mocha');
                    return activity.options ? mocha(activity.options) : mocha();
                };
            }
        }
        return activity;
    }
}
