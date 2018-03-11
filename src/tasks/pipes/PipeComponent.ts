import { Task, ITask, RunWay, ITaskComponent, TaskComponent } from '../../core/index';
import { ITransform } from './ITransform';
import {  } from '../../core/index';
import { IPipeComponent } from './IPipeComponent';
import { Abstract, isArray, isClass, isFunction } from 'tsioc';
import { TransformMerger, TransformReference } from './pipeTypes';
import { ITransformMerger } from './ITransformMerger';
import { ITransformReference } from './ITransformReference';

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
export abstract class PipeComponent<T extends IPipeComponent> extends TaskComponent<T> implements ITask, IPipeComponent {
    constructor(
        name: string,
        runWay = RunWay.seqFirst,
        protected merger?: TransformMerger,
        protected reference?: TransformReference
    ) {
        super(name, runWay);
    }

    private _merger;
    getMerger(): ITransformMerger {
        if (!this._merger) {
            if (this.merger) {
                if (isClass(this.merger)) {
                    this._merger = this.context.container.resolve(this.merger);
                } else if (isFunction(this.merger)) {
                    let func = this.merger;
                    this._merger = {
                        merge: (transforms: ITransform[]) => func(transforms)
                    }
                } else {
                    this._merger = this.merger;
                }
            }
        }
        return this._merger;
    }

    private _reference;
    getReference(): ITransformReference {
        if (!this._reference) {
            if (this.reference) {
                if (isClass(this.reference)) {
                    this._reference = this.context.container.resolve(this.reference);
                } else if (isFunction(this.reference)) {
                    let func = this.reference;
                    this._reference = {
                        bindRefer: (transform: ITransform) => func(transform)
                    }
                }
            } else {
                this._reference = this.reference;
            }
        }

        return this._reference;
    }

    run(data?: ITransform | ITransform[]): Promise<ITransform> {
        return super.run(data)
            .then(rd => {
                return rd as ITransform;
            });
    }

    /**
     * execute tasks
     *
     * @protected
     * @param {(ITransform | ITransform[])} data
     * @returns {Promise<any>}
     * @memberof TaskComponent
     */
    protected execute(data: ITransform | ITransform[]): Promise<ITransform> {
        return this.pipe(this.mergeTransforms(data))
            .then(transform => {
                let reference = this.getReference();
                if (reference) {
                    return reference.bindReference(transform);
                } else {
                    return transform;
                }
            });
    }

    /**
     * merge transforms
     *
     * @protected
     * @param {(ITransform | ITransform[])} data
     * @returns {ITransform}
     * @memberof PipeComponent
     */
    protected mergeTransforms(data: ITransform | ITransform[]): ITransform {
        let tranform;
        if (isArray(data) && data.length) {
            let merger = this.getMerger();
            tranform = merger ? merger.merge(data) : data[0];
        } else {
            tranform = data;
        }
        return tranform;
    }

    /**
     * pipe transform.
     *
     * @protected
     * @abstract
     * @param {ITransform} transform
     * @returns {Promise<ITransform>}
     * @memberof PipeComponent
     */
    protected abstract pipe(transform: ITransform): Promise<ITransform>;

}
