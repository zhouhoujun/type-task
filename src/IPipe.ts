import { ITaskContext } from './ITaskContext';
import { IOperate } from './IOperate';
import { TaskString } from './types';
import { IAssertDist } from './IAssertDist';
import { ITransform } from './ITransform';

/**
 * pipe work
 *
 * @export
 * @interface IPipe
 */
export interface IPipe extends IOperate {
    /**
     * the pipe for some task with named as the taskName.
     *
     * @type {TaskString}
     * @memberof IPipe
     */
    taskName?: TaskString;
    /**
     * transform to pipe work
     *
     * @param {ITaskContext} context
     * @param {IAssertDist} [dist]
     * @returns {(ITransform | Promise<ITransform>)}
     *
     * @memberof IPipe
     */
    toTransform?(context: ITaskContext, dist?: IAssertDist): ITransform | Promise<ITransform>;

    /**
     * transform to pipe work
     *
     * @param {ITaskContext} context
     * @param {IAssertDist} [dist]
     * @returns {(ITransform | Promise<ITransform>)}
     * @memberof IPipe
     */
    pipe?(context: ITaskContext, dist?: IAssertDist): ITransform | Promise<ITransform>;
}
