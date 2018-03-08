import { Task, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { isArray, Abstract, isFunction, Type } from 'tsioc';
import { ITransform } from './ITransform';
import { IPipeComponent } from './IPipeComponent';
import { ITaskContext } from '../../ITaskContext';
import { PipeComponent } from './PipeComponent';
import { TransformExpress, TransformMerger, TransformReference } from './pipeTypes';
import { PipeStream } from './PipeStream';
import { ITransformReference } from './ITransformReference';
import { PipeSource } from '.';

@Abstract()
export abstract class PipeReference extends PipeStream implements IPipeComponent, ITransformReference {

    constructor(name: string, runWay = RunWay.seqFirst, pipes: TransformExpress, merger?: TransformMerger, reference?: TransformReference, awaitPiped = false) {
        super(name, runWay, pipes, merger, reference, awaitPiped);
    }

    pipe(transform: ITransform): Promise<ITransform> {
        return super.pipe(transform)
            .then(transform => {
                return this.bindReference(transform);
            })
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
