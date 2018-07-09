import { ITaskRunner, TaskType, CtxType, ITask } from '@taskfr/core';
import { ITransform } from '../ITransform';
import { ObjectMap, isMetadataObject, isObservable, isBaseType, Token } from '@ts-ioc/core';
import { IPipeContext } from './IPipeContext';
import { IPipeTask } from '../IPipeTask';
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
export type TransformType = ITransform | PipeExpress | ITaskRunner;

/**
 * transform config type.
 */
export type TransformConfig = TransformType | TaskType<IPipeTask>;

/**
 * task transform express.
 */
export type TransformExpress = CtxType<TransformConfig[]>;

/**
 * transform dest express
 */
export type DestExpress = ObjectMap<TransformExpress> | TransformExpress;

/**
 * transform merger.
 */
export type TransformMerger = ((transforms: ITransform[]) => ITransform | Promise<ITransform>) | ITransformMerger | ITaskRunner;

/**
 * transform merger config.
 */
export type TransMergerConfig = TransformMerger | TaskType<IPipeTask>;
/**
 * task transform express.
 */
export type TransformMergerExpress = CtxType<TransMergerConfig[]>;


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
