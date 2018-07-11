import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { IPipeConfigure } from './IPipeConfigure';
import { OnTaskInit, Src, CtxType, InjectAcitityToken } from '@taskfr/core';
import { src, SrcOptions } from 'vinyl-fs';
import { isArray, Registration, isUndefined } from '@ts-ioc/core';
import { PipeActivityToken, IPipeActivity } from './IPipeActivity';
import { TransformType } from './pipeTypes';
import { PipeActivity } from './PipeActivity';


export const TestToken = new InjectAcitityToken<PipeTestActivity>('test');


export interface TestConfigure extends IPipeConfigure {

    /**
     * await piped complete.
     *
     * @type {CtxType<boolean>}
     * @memberof TestConfigure
     */
    awaitPiped?: CtxType<boolean>;

    /**
     * set match test file source.
     *
     * @type {CtxType<Src>}
     * @memberof TestConfigure
     */
    test?: CtxType<Src>;

    /**
     * test src options.
     *
     * @type {CtxType<SrcOptions>}
     * @memberof TestConfigure
     */
    srcOptions?: CtxType<SrcOptions>;

    /**
     * test framewok. default use gulp-mocha to test.
     *
     * @type {CtxType<TransformType>}
     * @memberof TestConfigure
     */
    framework: CtxType<TransformType>;

    /**
     * test options.
     *
     * @type {CtxType<any>}
     * @memberof TestConfigure
     */
    options: CtxType<any>;
}



@PipeTask(TestToken)
export class PipeTestActivity extends PipeActivity implements OnTaskInit {
    /**
     * await pipe compileted.
     *
     * @memberof PipeComponent
     */
    awaitPiped = true;
    /**
     * source.
     *
     * @type {Src}
     * @memberof PipeSource
     */
    test: Src;

    /**
     * test src options.
     *
     * @type {SrcOptions}
     * @memberof PipeTest
     */
    srcOptions: SrcOptions;

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

    onTaskInit(config: TestConfigure) {
        if (!isUndefined(config.awaitPiped)) {
            this.awaitPiped = this.context.to(config.awaitPiped);
        }
        this.test = this.context.to(config.test);
        this.srcOptions = this.context.to(config.srcOptions);
        this.options = this.context.to(config.options);
        this.framework = this.context.to(config.framework);
        if (!this.framework) {
            this.framework = () => {
                let mocha = require('gulp-mocha');
                return mocha(this.options);
            };
        }
        // defaults setting.
        this.awaitPiped = true;
        this.pipes = this.pipes || [];
        this.pipes.push(this.framework);
    }

    protected async execute(data: ITransform | ITransform[]): Promise<ITransform> {
        let trans = await this.merge(...(isArray(data) ? data : [data]));
        if (this.test) {
            await this.pipe(this.source())
        } else {
            await this.pipe(trans);
        }
        return trans;
    }

    protected source(): ITransform {
        return src(this.test, this.srcOptions);
    }

    /**
     * pipe transform.
     *
     * @protected
     * @param {ITransform} transform
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected pipe(stream: ITransform): Promise<ITransform> {
        let pStream = super.pipe(stream);
        if (this.awaitPiped) {
            pStream = pStream.then(pipe => {
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
        }
        return pStream;
    }

}
