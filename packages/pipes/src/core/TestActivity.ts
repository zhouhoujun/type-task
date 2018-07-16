import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { CtxType, IActivity, ExpressionType, Expression } from '@taskfr/core';
import { isUndefined, Singleton } from '@ts-ioc/core';
import { TransformType, TransformConfig } from './pipeTypes';
import { PipeActivityBuilder } from './PipeActivityBuilder';
import { SourceConfigure, SourceActivity } from './SourceActivity';
import { InjectPipeActivityToken, InjectPipeAcitityBuilderToken } from './IPipeActivity';


export const TestAcitvityToken = new InjectPipeActivityToken<TestActivity>('test');
export const TestAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<TestActivityBuilder>('test')


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

    async run(data?: any): Promise<ITransform> {
        let test = await this.context.exec(this, this.enable, data);
        if (test) {
            let source = await super.run(data);
            return await this.pipe(source, this.framework)
                .then(pipe => {
                    if (!pipe) {
                        return null;
                    }
                    return new Promise((resolve, reject) => {
                        pipe
                            .once('end', () => {
                                console.log('awit pipe end.')
                                resolve();
                            })
                            .once('error', reject);
                    }).then(() => {
                        pipe.removeAllListeners('error');
                        pipe.removeAllListeners('end');
                        return pipe;
                    }, err => {
                        pipe.removeAllListeners('error');
                        pipe.removeAllListeners('end');
                        if (!isUndefined(process)) {
                            process.exit(1);
                            return err;
                        } else {
                            return Promise.reject(new Error(err));
                        }
                    });
                });
        } else {
            return data;
        }
    }
}


@Singleton(TestAcitvityBuilderToken)
export class TestActivityBuilder extends PipeActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: TestConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof TestActivity) {
            activity.options = activity.context.to(config.options);
            activity.src = await this.toExpression(config.test, activity);
            if (!isUndefined(config.enable)) {
                activity.enable = await this.toExpression(config.enable, activity);
            }
            if (config.srcOptions) {
                activity.srcOptions = await this.toExpression(config.srcOptions, activity);
            }
            if (config.framework) {
                activity.framework = await this.toExpression(config.framework, activity);
            } else {
                activity.framework = () => {
                    let mocha = require('gulp-mocha');
                    return mocha(activity.options);
                };
            }
        }
        return activity;
    }
}
