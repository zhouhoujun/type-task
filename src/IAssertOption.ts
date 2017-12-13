import { IAsserts } from './IAsserts';
import { RunWay } from './RunWay';
import { Operation } from './Operation';
import { Src, Order } from './types';
import { IDynamicTaskOption } from './IDynamicTaskOption';
import { ObjectMap } from 'tsioc';


/**
 * assert option
 *
 * @export
 * @interface IAssertOption
 * @extends {IAsserts}
 */
export interface IAssertOption extends IAsserts {

    /**
     * asserts tasks run way. default RunWay.parallel
     *
     * @type {RunWay}
     * @memberOf IAssertOption
     */
    assertsRunWay?: RunWay;

    /**
     * tasks to deal with IAsserts.
     *
     * @type {ObjectMap<Operation | Src | IAsserts | IDynamicTaskOption[]>}
     * @memberOf IAsserts
     */
    asserts?: ObjectMap<Operation | Src | IAsserts | IDynamicTaskOption[]>;

    /**
     * set sub asserts task order in this task sequence.
     *
     * @type {Order}
     * @memberOf IAsserts
     */
    assertsOrder?: Order;
}
