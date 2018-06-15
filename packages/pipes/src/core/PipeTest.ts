import { IPipeComponent } from './IPipeComponent';
import { PipeComponent } from './PipeComponent';
import { ITransform } from './ITransform';
import { PipeTask } from '../decorators';
import { ITestConfigure } from './IPipeConfigure';
import { OnTaskInit, Src } from '@taskp/core';
import { src, SrcOptions } from 'vinyl-fs';
import * as mocha from 'gulp-mocha';
import { isArray } from '@ts-ioc/core';

@PipeTask('test')
export class PipeTest extends PipeComponent<IPipeComponent> implements OnTaskInit {

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

    onTaskInit(config: ITestConfigure) {
        super.onTaskInit(config);
        console.log(config);
        config.awaitPiped = true;
        this.test = this.context.to(config.test);
        this.testSrcOptions = this.context.to(config.testSrcOptions);
        // defaults setting.
        this.awaitPiped = true;
        this.pipes = [() => mocha()];
    }

    protected async execute(data: ITransform | ITransform[]): Promise<ITransform> {
        let trans = await this.merge(...isArray(data) ? data : [data]);
        if (this.test) {
            await this.pipe(this.source())
        } else {
            await this.pipe(trans);
        }
        return trans;
    }

    protected source(): ITransform {
        return src(this.test, this.testSrcOptions);
    }

}
