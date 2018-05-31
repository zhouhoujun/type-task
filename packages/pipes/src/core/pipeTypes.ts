import { Src, ITaskProvider, IConfigure } from '@taskp/core';
import { ITransform } from './ITransform';
import { ObjectMap, Type, Token } from '@ts-ioc/core';
import { IPipeComponent } from './IPipeComponent';
import { ITransformMerger } from './ITransformMerger';
import { ITaskContext } from './ITaskContext';
import { IPipeTask } from '.';

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
export type TransformType = ITransform | PipeExpress | Token<IPipeTask>;
/**
 * task transform express.
 */
export type TransformExpress = ((context?: ITaskContext, config?: IConfigure, transform?: ITransform) => TransformType[]) | TransformType[];

/**
 * transform dest express
 */
export type DestExpress = ObjectMap<TransformExpress> | TransformExpress;

/**
 * transform merger.
 */
export type TransformMerger = ((transforms: ITransform[]) => ITransform | Promise<ITransform>) | ITransformMerger | Token<ITransformMerger>;

