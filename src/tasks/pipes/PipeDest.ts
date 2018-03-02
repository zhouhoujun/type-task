import { Task, TaskElement, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { TaskSource } from './pipeTypes';
import { isArray, Abstract, isFunction } from 'tsioc';
import { ITransform } from '.';
import { IPipeTask } from './IPipeTask';
import { IEnvironment } from '../../IEnvironment';
import { Src } from '../../utils/index';

@Task
export class PipeDest extends AbstractTask implements IPipeTask<ITransform> {

    constructor(name: string, private dest: TaskSource<IEnvironment>) {
        super(name);
    }

    run(data: ITransform): Promise<ITransform> {
        let dest = isFunction(this.dest)? this.dest(this.enviroment): this.dest;

        if (isArray(dest)) {
            return Promise.all(dest.map(dist => this.writeStream(dist)))
                .then(transforms => {
                    let pstream = data;
                    if (isArray(transforms)) {
                        transforms.forEach(trans => {
                            pstream.pipe(trans);
                        });
                    }
                    return pstream;
                });
        } else {

            return Promise.resolve(dest)
                .then(dest => {
                    return data.pipe(this.writeStream(dest));
                });
        }
    }

    protected writeStream(src: string): ITransform{
        return null;
    }
}
