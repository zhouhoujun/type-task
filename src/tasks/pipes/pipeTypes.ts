import { ITaskProvider, IConfigure } from '../../core/index';
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
export type TransformSource = Src | ((context?: ITaskContext, config?: IConfigure) => Src);

/**
 * pipe express
 */
export type PipeExpress = (context?: ITaskContext, config?: IConfigure, transform?: ITransform) => ITransform;

/**
 * task transform express.
 */
export type TransformExpress = ((context?: ITaskContext, config?: IConfigure, transform?: ITransform) => (ITransform | PipeExpress)[])
    | (ITransform | PipeExpress)[];

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
