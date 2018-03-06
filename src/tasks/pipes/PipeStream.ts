import { Task, TaskElement, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { isArray, Abstract, isFunction } from 'tsioc';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { ITaskContext } from '../../ITaskContext';
import { StreamExpress } from './pipeTypes';

@Task
export class PipeStream extends TaskElement implements IPipeComponent<ITransform> {

    constructor(name: string, runWay = RunWay.seqFirst, protected pipes: StreamExpress<ITaskContext, ITransform>, protected awaitPiped = false) {
        super(name, runWay);
    }

    execute(data: ITransform): Promise<ITransform> {
        let pStream = this.pipeToPromise(data);
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

    protected pipeToPromise(stream: ITransform): Promise<ITransform> {
        if (!this.pipes) {
            return Promise.resolve(stream);
        }

        return Promise.resolve(isFunction(this.pipes) ? this.pipes(this.context, stream) : this.pipes)
            .then(transforms => {
                let pstream = stream;
                if (isArray(transforms)) {
                    transforms.forEach(transform => {
                        let pipe = isFunction(transform) ? transform(this.context, pstream) : transform;
                        if (pipe.changeAsOrigin) {
                            pstream = pipe;
                        } else {
                            pstream = pstream.pipe(pipe);
                        }
                    });
                }
                return pstream;
            });
    }

}
