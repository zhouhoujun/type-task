import { Task, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { isArray, Abstract, isFunction, Type } from 'tsioc';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { ITaskContext } from '../../ITaskContext';
import { PipeComponent } from './PipeComponent';
import { TransformExpress, TransformMerger, TransformReference } from './pipeTypes';
import { PipeStream } from './PipeStream';
import { ITransformReference } from './ITransformReference';
import { IPipeTask } from './IPipeTask';

@Abstract()
export abstract class PipeReference extends AbstractTask implements IPipeTask<ITransform>, ITransformReference {

    constructor(name: string) {
        super(name);
    }

    run(data: ITransform): Promise<ITransform> {
        return this.bindReference(data);
    }

    bindReference(transform: ITransform): Promise<ITransform> {
        return this.getReferSource(transform)
            .then(refTransform => {
                refTransform = refTransform || [];
                return this.mergeReferTransforms(transform, ...refTransform)
            });
    }

    protected abstract mergeReferTransforms(transform: ITransform, ...refTransforms: ITransform[]): ITransform;

    protected abstract getReferSource(transform: ITransform): Promise<ITransform[]>;


}
