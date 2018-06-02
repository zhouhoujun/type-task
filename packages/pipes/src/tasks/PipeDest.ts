import { Task, ITaskProvider, Src, RunWay, AbstractTask } from '@taskp/core';
import { isArray, Abstract, isFunction, ObjectMap, isClass } from '@ts-ioc/core';
import { DestOptions, dest } from 'vinyl-fs';
import { IPipeComponent, PipeComponent, ITransform, TransformExpress, DestExpress, TransformMerger, CtxType } from '../core/index';
import { PipeTask } from '../decorators/index';


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
     * @type {TransformSource}
     * @memberof IPipeDest
     */
    dest?: CtxType<Src>;
    /**
     * dest pipes.
     *
     * @type {DestExpress}
     * @memberof IPipeDestProvider
     */
    destPipes?: CtxType<DestExpress>;
    /**
     * source options.
     *
     * @type {DestOptions}
     * @memberof IPipeDestProvider
     */
    options?: DestOptions;
}

@PipeTask('dest')
export class PipeDest extends PipeComponent<IPipeDest> implements IPipeDest {
    dest: CtxType<Src>;
    options: DestOptions

    constructor(name?: string) {
        super(name);
    }

    pipe(transform: ITransform): Promise<ITransform> {
        let dest = this.to(this.dest);

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
        let destPipes = 
        if (!destPipes) {
            return Promise.resolve(stream);
        }
        if (isArray(destPipes)) {
            return this.pipesToPromise(stream, destPipes);
        } else {
            let keys = Object.keys(destPipes).filter(key => key !== 'constructor');
            if (keys.length) {
                return Promise.all(keys.map(key => {
                    return this.pipesToPromise(stream, destPipes[key]);
                }));
            } else {
                return Promise.resolve(stream);
            }
        }
    }

}
