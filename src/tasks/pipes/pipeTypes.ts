import { ITaskProvider } from '../../core/index';
import { Src } from '../../utils';
import { ITaskContainer } from '../../ITaskContainer';
import { ITransform } from './ITransform';
import { ObjectMap } from 'tsioc';

/**
 * task source.
 */
export type TaskSource<T> = Src | ((context?: T) => Src);

/**
 * task express.
 */
export type StreamExpress<T, TResult extends ITransform> = ((context?: T, transform?: ITransform) => (TResult | ((context?: T, transform?: ITransform) => TResult))[]) | ((context?: T, transform?: ITransform) => TResult)[];


export type DestExpress<T, TResult extends ITransform> = ObjectMap<StreamExpress<T, TResult>> | StreamExpress<T, TResult>;
