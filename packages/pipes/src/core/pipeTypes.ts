import { ITaskRunner, TaskType, CtxType, ITask } from '@taskfr/core';
import { ITransform } from './ITransform';
import { ObjectMap, isMetadataObject, isObservable, isBaseType, Token } from '@ts-ioc/core';
import { IPipeContext } from './IPipeContext';
import { IPipeTask } from './IPipeTask';
import { isFunction } from '@ts-ioc/core';
import { Stream } from 'stream';
import { ITransformMerger } from './ITransformMerger';



/**
 * pipe express
 */
export type PipeExpress = (context?: IPipeContext, taskInstance?: ITask, transform?: ITransform) => ITransform | Promise<ITransform>;

/**
 * transform type.
 */
export type TransformType = ITransform | PipeExpress | ITaskRunner | Token<IPipeTask>;

/**
 * task transform express.
 */
export type TransformExpress = CtxType<(TransformType | TaskType<IPipeTask>)[]>;

/**
 * transform dest express
 */
export type DestExpress = ObjectMap<TransformExpress> | TransformExpress;

/**
 * transform merger.
 */
export type TransformMerger = ((transforms: ITransform[]) => ITransform | Promise<ITransform>) | ITransformMerger | ITaskRunner;

/**
 * task transform express.
 */
export type TransformMergerExpress = CtxType<(TransformMerger | TaskType<IPipeTask>)[]>;


/**
 *check target is transform or not.
 *
 * @export
 * @param {*} target
 * @returns {boolean}
 */
export function isTransform(target: any): boolean {
    if (isBaseType(target)
        || isMetadataObject(target)
        || isObservable(target)) {
        return false;
    }

    return target && (target instanceof Stream || isFunction(target.pipe));
}
