import { ITaskProvider } from '../../core/index';
import { Src } from '../../utils';
import { ITaskContext } from '../../ITaskContext';
import { ITransform } from './ITransform';
import { ObjectMap, Type } from 'tsioc';
import { IPipeTask } from './IPipeTask';
import { ITransformMerger } from './ITransformMerger';
import { ITransformReference } from './ITransformReference';

/**
 * transform source.
 */
export type TransformSource = Src | ((context?: ITaskContext) => Src);

/**
 * task transform express.
 */
export type TransformExpress = ((context?: ITaskContext, transform?: ITransform) => (ITransform | ((context?: ITaskContext, transform?: ITransform) => ITransform))[])
    | ((context?: ITaskContext, transform?: ITransform) => ITransform)[];

/**
 * transform dest express
 */
export type DestExpress = ObjectMap<TransformExpress> | TransformExpress;

/**
 * transform merger.
 */
export type TransformMerger = ((transforms: ITransform[]) => ITransform) | ITransformMerger | Type<ITransformMerger>;

/**
 * transfrom reference
 */
export type TransformReference = ((transform: ITransform) => Promise<ITransform>) | ITransformReference | Type<ITransformReference>;

