import { TaskString, TaskSource, Order } from './types';
import { RunWay } from './RunWay';

/**
 * IAsserts to be dealt with.
 *
 * @export
 * @interface IAsserts
 * @extends {IAssertDist}
 */
export interface IAssets {

    /**
     * assert name
     *
     * @type {TaskString}
     * @memberof IOperate
     */
    name?: TaskString;

    /**
     * the src file filter string. default 'src'.
     *
     * @type {TaskSource}
     * @memberof IAssertDist
     */
    src?: TaskSource;

    /**
     * default output folder. if empty use parent setting, or ues 'dist'.
     */
    dist?: TaskString;

    /**
     * current assert order.
     */
    order?: Order;

    /**
     * task runway  in this context.  default sequence.
     *
     * @type {RunWay}@memberof IAsserts
     */
    runWay?: RunWay;

}
