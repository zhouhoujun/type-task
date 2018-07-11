import { ITaskRunner, ActivityType, CtxType, IActivity } from '@taskfr/core';
import { ITransform } from './ITransform';
import { ObjectMap, isMetadataObject, isObservable, isBaseType, Token } from '@ts-ioc/core';
import { IPipeContext } from './IPipeContext';
import { IPipeActivity } from './IPipeActivity';
import { isFunction } from '@ts-ioc/core';
import { Stream } from 'stream';
import { ITransformMerger } from './ITransformMerger';



/**
 * pipe express
 */
export type PipeExpress = (context?: IPipeContext, acitvity?: IActivity<any>, transform?: ITransform) => ITransform | Promise<ITransform>;

/**
 * transform type.
 */
export type TransformType = ITransform | PipeExpress | ITaskRunner;

/**
 * transform config type.
 */
export type TransformConfig = TransformType | ActivityType<IPipeActivity>;

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
export type TransMergerConfig = TransformMerger | ActivityType<IPipeActivity>;
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
