import { Task, TaskElement, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { TaskSource, DestExpress, StreamExpress } from './pipeTypes';
import { isArray, Abstract, isFunction, ObjectMap } from 'tsioc';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { ITaskContext } from '../../ITaskContext';
import { Src } from '../../utils/index';
import { DestOptions, dest } from 'vinyl-fs';

@Task
export class PipeDest extends TaskElement implements IPipeComponent<ITransform> {

    constructor(name: string, runWay = RunWay.seqFirst, protected dest: TaskSource<ITaskContext>, protected destPipes?: DestExpress<ITaskContext, ITransform>, protected options?: DestOptions) {
        super(name, runWay);
    }

    execute(data: ITransform): Promise<ITransform> {
        let dest = isFunction(this.dest) ? this.dest(this.context) : this.dest;

        if (isArray(dest)) {
            return Promise.all(dest.map(dist => this.writeStream(data, dist)))
                .then(() => {
                    return data;
                });
        } else {
            return this.writeStream(data, dest)
        }
    }

    protected writeStream(stream: ITransform, dist: string): Promise<ITransform> {
        return this.destPipesToPromise(stream)
            .then(streams => {
                let transforms = isArray(streams) ? streams : [streams];
                return Promise.all(transforms.map(transform => {
                    let output = transform.pipe(dest(this.context.toRootPath(dist), this.options));
                    return new Promise((resolve, reject) => {
                        if (output) {
                            output
                                .once('end', () => {
                                    resolve();
                                })
                                .once('error', reject);
                        } else {
                            resolve();
                        }
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

    protected pipeToPromise(stream: ITransform, pipes: StreamExpress<ITaskContext, ITransform>): Promise<ITransform> {
        if (!pipes) {
            return Promise.resolve(stream);
        }

        return Promise.resolve(isFunction(pipes) ? pipes(this.context, stream) : pipes)
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
