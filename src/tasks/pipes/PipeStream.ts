import { Task, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { isArray, Abstract, isFunction } from 'tsioc';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { ITaskContext } from '../../ITaskContext';
import { PipeComponent } from './PipeComponent';
import { TransformExpress, TransformMerger, TransformReference } from './pipeTypes';

@Task
export class PipeStream extends PipeComponent<IPipeComponent> implements IPipeComponent {

    constructor(name: string, runWay = RunWay.seqFirst, protected pipes: TransformExpress, merger?: TransformMerger, reference?: TransformReference, protected awaitPiped = false) {
        super(name, runWay, merger, reference);
    }

    pipe(transform: ITransform): Promise<ITransform> {
        let pStream = this.pipeToPromise(transform);
        if (this.awaitPiped) {
            pStream = pStream.then(pipe => {
                return new Promise((resolve, reject) => {
                    if (pipe) {
                        pipe
                            .once('end', () => {
                                resolve();
                            })
                            .once('error', reject);
                    } else {
                        resolve();
                    }
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

    protected pipeToPromise(transform: ITransform): Promise<ITransform> {
        if (!this.pipes) {
            return Promise.resolve(transform);
        }
        let config = this.getConfig();
        return Promise.resolve(isFunction(this.pipes) ? this.pipes(this.context, config, transform) : this.pipes)
            .then(transforms => {
                let pstream = transform;
                if (isArray(transforms)) {
                    transforms.forEach(transform => {
                        if (transform) {
                            let pipe = isFunction(transform) ? transform(this.context, config, pstream) : transform;
                            if (pipe.changeAsOrigin) {
                                pstream = pipe;
                            } else {
                                pstream = pstream.pipe(pipe);
                            }
                        }
                    });
                }
                return pstream;
            });
    }

}
