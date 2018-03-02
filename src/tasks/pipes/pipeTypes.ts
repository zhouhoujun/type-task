import { ITaskProvider } from '../../core/index';
import { Src } from '../../utils';
import { ITaskContainer } from '../../ITaskContainer';
import { ITransform } from './ITransform';

/**
 * task source.
 */
export type TaskSource<T> = Src | ((container?: T) => Src);

/**
 * task express.
 */
export type TaskExpress<T, TResult> = ((container?: T) => TResult[] | TResult) | ((container?: T) => TResult)[]

// /**
//  * pipe task provider.
//  * 
//  * @export
//  * @interface IPipe
//  */
// export interface IPipe {
//     /**
//      *  pipe src
//      * 
//      * @type {TaskExpress<ITaskContainer, Src>}
//      * @memberof IPipeTaskProvider
//      */
//     src?: TaskExpress<ITaskContainer, Src>;
//     /**
//      * pipes
//      * 
//      * @type {TaskExpress<ITaskContainer, ITransform>}
//      * @memberof IPipeTaskProvider
//      */
//     pipes: TaskExpress<ITaskContainer, ITransform>;
//     /**
//      * pipe dest
//      * 
//      * @type {TaskExpress<ITaskContainer, ITransform>}
//      * @memberof IPipeTaskProvider
//      */
//     dest?: TaskExpress<ITaskContainer, ITransform>;
// }
