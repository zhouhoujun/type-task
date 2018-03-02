import { Task, TaskElement, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { isArray, Abstract } from 'tsioc';
import { ITransform } from '.';
import { IPipeTask } from './IPipeTask';
import { IEnvironment } from '../../IEnvironment';
import { isFunction } from 'util';
import { TaskExpress } from './pipeTypes';

@Task
export class PipeStream extends AbstractTask implements IPipeTask<ITransform> {

    constructor(name: string, private pipes: TaskExpress<IEnvironment, ITransform>) {
        super(name);
    }

    run(data: ITransform): Promise<ITransform> {
        if (isArray(this.pipes)) {
            return Promise.all(this.pipes.map(trans => trans(this.enviroment)))
                .then(transforms => {
                    let pstream = data;
                    if (isArray(transforms)) {
                        transforms.forEach(trans => {
                            pstream = pstream.pipe(trans);
                        });
                    }
                    return pstream;
                });
        } else {
            return Promise.resolve(this.pipes(this.enviroment))
                .then(transforms => {
                    let pstream = data;
                    if (isArray(transforms)) {
                        transforms.forEach(trans => {
                            pstream.pipe(trans);
                        });
                    }
                    return pstream;
                });
        }

    }
}
