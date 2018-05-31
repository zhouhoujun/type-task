import { Task, ITaskProvider, Src, RunWay, AbstractTask } from '@taskp/core';
import { TransformSource, DestExpress, TransformExpress, TransformMerger } from './pipeTypes';
import { isArray, Abstract, isFunction, ObjectMap, isClass } from '@ts-ioc/core';
import { ITransform } from './ITransform';
import { IPipeComponentProvider, IPipeComponent } from './IPipeComponent';
import { PipeComponent } from './PipeComponent';
import { DestOptions, dest } from 'vinyl-fs';
import { PipeTask } from '..';


/**
 * pipe dest provider.
 *
 * @export
 * @interface IPipeDestProvider
 * @extends {IPipeComponentProvider}
 */
export interface IPipeDestProvider extends IPipeComponentProvider {
    /**
     * dest source.
     *
     * @type {TransformSource}
     * @memberof IPipeDestProvider
     */
    dest?: TransformSource;
    /**
     * dest pipes.
     *
     * @type {DestExpress}
     * @memberof IPipeDestProvider
     */
    destPipes?: DestExpress;
    /**
     * source options.
     *
     * @type {DestOptions}
     * @memberof IPipeDestProvider
     */
    options?: DestOptions;
}

@PipeTask()
export class PipeDest extends PipeComponent<IPipeComponent> implements IPipeComponent {

    constructor(name: string, runWay = RunWay.seqFirst, protected dest: TransformSource, protected destPipes?: DestExpress, merger?: TransformMerger, protected options?: DestOptions) {
        super(name, runWay, merger);
    }

    pipe(transform: ITransform): Promise<ITransform> {
        let dest = isFunction(this.dest) ? this.dest(this.getConfig()) : this.dest;

        if (isArray(dest)) {
            return Promise.all(dest.map(dist => this.writeStream(transform, dist)))
                .then(() => {
                    return transform;
                });
        } else {
            return this.writeStream(transform, dest)
        }
    }

    protected writeStream(stream: ITransform, dist: string): Promise<ITransform> {
        return this.destPipesToPromise(stream)
            .then(streams => {
                let transforms = isArray(streams) ? streams : [streams];
                return Promise.all(transforms.map(transform => {
                    let output = transform.pipe(dest(this.context.toRootPath(dist), this.options));
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
                        return output;
                    }, err => {
                        output.removeAllListeners('error');
                        output.removeAllListeners('end');
                        process.exit(1);
                        return err;
                    });
                }))
                    .then(pipes => {
                        return stream;
                    });
            });
    }

    protected destPipesToPromise(stream: ITransform): Promise<ITransform | ITransform[]> {
        if (!this.destPipes) {
            return Promise.resolve(stream);
        }

        if (isArray(this.destPipes) || isFunction(this.destPipes)) {
            return this.pipeToPromise(stream, this.destPipes);
        } else {
            let keys = Object.keys(this.destPipes).filter(key => key !== 'constructor');
            if (keys.length) {
                return Promise.all(keys.map(key => {
                    return this.pipeToPromise(stream, this.destPipes[key]);
                }));
            } else {
                return Promise.resolve(stream);
            }
        }
    }

}
