import { Src, ITaskProvider, IConfigure, ITaskRunner } from '@taskp/core';
import { ITransform } from './ITransform';
import { ObjectMap, Type, Token, isMetadataObject, isBaseObject, isObservable, isBaseType } from '@ts-ioc/core';
import { IPipeComponent } from './IPipeComponent';
import { ITransformMerger } from './ITransformMerger';
import { ITaskContext } from './ITaskContext';
import { IPipeTask } from './IPipeTask';
import { isObject, isFunction } from '@ts-ioc/core';
import { Observable } from 'rxjs/Observable';
import { Stream } from 'stream';

/**
 * context type.
 */
export type CtxType<T> = T | ((context?: ITaskContext, config?: IConfigure) => T)


/**
 * pipe express
 */
export type PipeExpress = (context?: ITaskContext, config?: IConfigure, transform?: ITransform) => ITransform | Promise<ITransform>;

/**
 * transform type.
 */
export type TransformType = ITransform | PipeExpress | Token<IPipeTask> | ITaskRunner;
/**
 * task transform express.
 */
export type TransformExpress = CtxType<TransformType[]>;

/**
 * transform dest express
 */
export type DestExpress = ObjectMap<TransformExpress> | TransformExpress;

/**
 * transform merger.
 */
export type TransformMerger = ((transforms: ITransform[]) => ITransform | Promise<ITransform>) | ITransformMerger | Token<ITransformMerger>;

/**
 *check target is transform or not.
 *
 * @export
 * @param {*} target
 * @returns {boolean}
 */
export function isTransform(target: any): boolean {
    if ( isBaseType(target)
        || isMetadataObject(target)
        || isObservable(target)) {
        return false;
    }

    return target &&  (target instanceof Stream || isFunction(target.pipe));
}
