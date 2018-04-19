import { Task, ITaskContext, ITaskProvider, RunWay, AbstractTask } from '@taskp/core';
import { isArray, Abstract, isFunction, isClass } from '@ts-ioc/core';
import { ITransform } from './ITransform';
import { IPipeComponent, IPipeComponentProvider } from './IPipeComponent';
import { PipeComponent } from './PipeComponent';
import { TransformExpress, TransformMerger } from './pipeTypes';

/**
 * pipe stream provider
 *
 * @export
 * @interface IPipeStreamProvider
 * @extends {IPipeComponentProvider}
 */
export interface IPipeStreamProvider extends IPipeComponentProvider {
    /**
     * pipe stream.
     *
     * @type {TransformExpress}
     * @memberof IPipeStreamProvider
     */
    pipes?: TransformExpress;
    /**
     * await piped.
     *
     * @type {boolean}
     * @memberof IPipeStreamProvider
     */
    awaitPiped?: boolean;
}

@Task
export class PipeStream extends PipeComponent<IPipeComponent> implements IPipeComponent {

    constructor(name: string, runWay = RunWay.seqFirst, protected pipes: TransformExpress, merger?: TransformMerger, protected awaitPiped = false) {
        super(name, runWay, merger);
    }

    pipe(transform: ITransform): Promise<ITransform> {
        let pStream = this.pipeToPromise(transform, this.pipes);
        if (this.awaitPiped) {
            pStream = pStream.then(pipe => {
                if (!pipe) {
                    return null;
                }

                return new Promise((resolve, reject) => {
                    pipe
                        .once('end', () => {
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
                    process.exit(1);
                    return err;
                });
            });
        }
        return pStream;
    }
}
