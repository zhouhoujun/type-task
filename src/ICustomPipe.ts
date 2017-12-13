import { ITransform } from './ITransform';
import { ITaskContext } from './ITaskContext';
import { IAssertDist } from './IAssertDist';
import { NodeCabllback } from './types';


/**
 * custom pipe.
 *
 * @export
 * @interface ICustomPipe
 */
export interface ICustomPipe {
    /**
     * custom stream pipe.
     *
     * @param {ITransform} gulpsrc
     * @param {ITaskContext} context
     * @param {IAssertDist} [dist]
     * @returns {(ITransform | Promise<ITransform> | void)}
     *
     * @memberof ICustomPipe
    * */
    pipe?(gulpsrc: ITransform, context: ITaskContext, dist?: IAssertDist, callback?:  NodeCabllback): ITransform | Promise<ITransform> | void;

}
