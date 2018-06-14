import { IPipeComponent } from './IPipeComponent';
import { PipeComponent } from './PipeComponent';
import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { ITestConfigure } from './IPipeConfigure';
import { OnTaskInit, Src } from '@taskp/core';
import { src, SrcOptions } from 'vinyl-fs';

@PipeTask('test')
export class PipeTest extends PipeComponent<IPipeComponent> implements OnTaskInit  {

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
    testSrcOptions: SrcOptions;

    constructor(name?: string) {
        super(name);
    }

    onTaskInit() {
        let cfg = this.config as ITestConfigure;
        this.test = this.context.to(cfg.test);
        this.testSrcOptions = this.context.to(cfg.testSrcOptions);
    }

    protected source(): Promise<ITransform> {
        return Promise.resolve(src(this.test, this.testSrcOptions));
    }

    protected async merge(...data: ITransform[]): Promise<ITransform> {
        let newTransform = await this.source();
        data = data || [];
        data.unshift(newTransform);
        return await super.merge(...data);
    }
}
