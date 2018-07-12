import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { OnTaskInit, Src, CtxType, InjectAcitityToken, Condition, IActivity, isActivityType, ExpressionType } from '@taskfr/core';
import { isUndefined, Singleton } from '@ts-ioc/core';
import { TransformType, TransformConfig } from './pipeTypes';
import { InjectPipeAcitityBuilderToken, PipeActivityBuilder } from './PipeActivityBuilder';
import { SourceConfigure, PipeSourceActivity } from './PipeSource';


export const TestToken = new InjectAcitityToken<PipeTestActivity>('test');
export const TestAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<PipeTestActivityBuilder>('source')


export interface TestConfigure extends SourceConfigure {

    /**
     * set match test file source.
     *
     * @type {ExpressionType<Src>}
     * @memberof TestConfigure
     */
    test?: ExpressionType<Src>;

    /**
     * test framewok. default use gulp-mocha to test.
     *
     * @type {TransformConfig}
     * @memberof TestConfigure
     */
    framework: TransformConfig;

    /**
     * test options.
     *
     * @type {CtxType<any>}
     * @memberof TestConfigure
     */
    options: CtxType<any>;
}



@PipeTask(TestToken)
export class PipeTestActivity extends PipeSourceActivity implements OnTaskInit {

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

    test: Condition;

    onTaskInit(config: TestConfigure) {

        this.options = this.context.to(config.options);
        this.framework = this.context.to(config.framework);
        if (!this.framework) {
            this.framework = () => {
                let mocha = require('gulp-mocha');
                return mocha(this.options);
            };
        }

        this.pipes = this.pipes || [];
        this.pipes.push(this.framework);
    }

    async run(data?: any): Promise<ITransform> {
        let test = await this.context.exec(this, this.test, data);
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
export class PipeTestActivityBuilder extends PipeActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: TestConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof PipeTestActivity) {

            if (isActivityType(config.test)) {
                activity.src = await this.build(config.test, activity.id);
            } else {
                activity.src = config.test;
            }

            if (config.srcOptions) {
                if (isActivityType(config.srcOptions)) {
                    activity.srcOptions = await this.build(config.srcOptions, activity.id);
                } else {
                    activity.srcOptions = config.srcOptions;
                }
            }

            if (config.framework) {
                if (isActivityType(config.framework)) {
                    activity.framework = await this.build(config.framework, activity.id);
                } else {
                    activity.framework = config.framework;
                }
            }
        }
        return activity;
    }
}
