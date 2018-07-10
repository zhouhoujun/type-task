import { dest, DestOptions } from 'vinyl-fs';
import { PipeTask } from '../decorators';
import { IPipeComponent } from './IPipeComponent';
import { PipeComponent } from './PipeComponent';
import { ITransform } from '../ITransform';
import { TransformType } from './pipeTypes';
import { OnTaskInit } from '@taskfr/core';
import { IDestConfigure } from './IPipeConfigure';
import { Registration } from '@ts-ioc/core';
import { PipeToken, IPipeTask } from '../IPipeTask';


/**
 * dest task token.
 */
export const DestToken = new Registration<IPipeTask>(PipeToken, 'dest');

/**
 * pipe dest provider.
 *
 * @export
 * @interface IPipeDest
 * @extends {IPipeComponent}
 */
export interface IPipeDest extends IPipeComponent {
    /**
     * dest source.
     *
     * @type {string}
     * @memberof IPipeDest
     */
    dest?: string;

    /**
     * source options.
     *
     * @type {DestOptions}
     * @memberof IPipeDestProvider
     */
    destOptions?: DestOptions;
}

/**
 * pipe dest.
 *
 * @export
 * @class PipeDest
 * @extends {PipeComponent<IPipeDest>}
 * @implements {IPipeDest}
 * @implements {OnTaskInit}
 */
@PipeTask(DestToken)
export class PipeDest extends PipeComponent<IPipeDest> implements IPipeDest, OnTaskInit {

    /**
     * source
     *
     * @type {TransformSource}
     * @memberof IPipeSource
     */
    dest: string;

    /**
     * source options.
     *
     * @type {DestOptions}
     * @memberof PipeSource
     */
    destOptions: DestOptions;

    onTaskInit(config: IDestConfigure) {
        super.onTaskInit(config);
        this.dest = this.context.to(config.dest);
        this.destOptions = this.context.to(config.destOptions);
    }

    protected pipesToPromise(source: ITransform, pipes: TransformType[]): Promise<ITransform> {
        return super.pipesToPromise(source, pipes)
            .then(stream => {
                return this.writeStream(stream)
            })
            .then(() => {
                return source;
            });
    }

    protected writeStream(stream: ITransform): Promise<ITransform> {
        let output = stream.pipe(dest(this.context.toRootPath(this.dest), this.destOptions));
        if (!output) {
            return null;
        }

        return new Promise((resolve, reject) => {
            output
                .once('end', () => {
                    resolve();
                })
                .once('error', reject);

        }).then(() => {
            output.removeAllListeners('error');
            output.removeAllListeners('end');
            return stream;
        }, err => {
            output.removeAllListeners('error');
            output.removeAllListeners('end');
            process.exit(1);
            return err;
        });


    }
}
