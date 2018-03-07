import { Task, ITask, ITaskComponent, TaskComponent } from '../../core/index';
import { ITransform } from './ITransform';
import { RunWay } from '../../core/index';
import { IPipeComponent } from './IPipeComponent';
import { Abstract } from 'tsioc';

/**
 * pipe component
 *
 * @export
 * @abstract
 * @class PipeComponent
 * @extends {TaskComponent<T>}
 * @implements {ITask}
 * @implements {IPipeComponent<ITransform>}
 * @template T
 */
@Abstract()
export abstract class PipeComponent<T extends IPipeComponent<any>> extends TaskComponent<T> implements ITask, IPipeComponent<any> {
    constructor(
        name: string,
        runWay = RunWay.seqFirst
    ) {
        super(name, runWay);
    }

    run(data?: any): Promise<ITransform> {
        return super.run(data)
            .then(rd => {
                return rd as ITransform;
            });
    }

    /**
     * execute tasks
     *
     * @protected
     * @param {*} data
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    protected abstract execute(data: any): Promise<ITransform>;

}
