import { ITaskProvider, IConfigure } from '../../core/index';
import { Src } from '../../utils';
import { ITaskContext } from '../../ITaskContext';
import { ITransform } from './ITransform';
import { ObjectMap, Type } from '@ts-ioc/core';
import { IPipeComponent } from './IPipeComponent';
import { ITransformMerger } from './ITransformMerger';
import { ITaskOption } from '../../core/ITaskOption';

/**
 * transform source.
 */
export type TransformSource = Src | ((context?: ITaskContext, config?: IConfigure) => Src);

/**
 * pipe express
 */
export type PipeExpress = (context?: ITaskContext, config?: IConfigure, transform?: ITransform) => ITransform | Promise<ITransform>;

/**
 * transform type.
 */
export type TransformType = ITransform | PipeExpress | Type<IPipeComponent> | ITaskOption<IPipeComponent>;
/**
 * task transform express.
 */
export type TransformExpress = ((context?: ITaskContext, config?: IConfigure, transform?: ITransform) => TransformType[])
    | TransformType[];

/**
 * transform dest express
 */
export type DestExpress = ObjectMap<TransformExpress> | TransformExpress;

/**
 * transform merger.
 */
export type TransformMerger = ((transforms: ITransform[]) => ITransform | Promise<ITransform>) | ITransformMerger | Type<ITransformMerger> | ITaskOption<ITransformMerger>;

