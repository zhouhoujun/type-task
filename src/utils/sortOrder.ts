import { ObjectMap, isFunction } from 'tsioc';
import { Order } from '../types';
import { RunWay } from '../RunWay';
import { ITaskContext } from '../ITaskContext';
import { isNumber, isArray } from 'util';

/**
 * sorting via order.
 *
 * @export
 * @template T
 * @param {T[]} sequence
 * @param {(item: T) => Order} orderBy
 * @param {ITaskContext} ctx
 * @param {boolean} [forceSequence=false]
 * @returns {(Array<T | T[]>)}
 */
export function sortOrder<T>(sequence: T[], orderBy: (item: T) => Order, ctx: ITaskContext, forceSequence = false): Array<T | T[]> {
    let parall: ObjectMap<T[]> = {};
    sequence = sequence.filter(t => !!t);
    let rseq: Array<T | T[]> = sequence.sort((t1: T, t2: T) => {
        let t1f = factor(ctx, parall, t1, orderBy, sequence.length, forceSequence);
        let t2f = factor(ctx, parall, t1, orderBy, sequence.length, forceSequence);
        return t1f - t2f;
    });
    if (!forceSequence) {
        Object.keys(parall).forEach(n => {
            let pals = parall[n];
            if (pals.length) {
                rseq.splice(rseq.indexOf(pals[0]), pals.length, pals);
            }
        });
    }

    return rseq;
}


function factor<T>(ctx: ITaskContext, parall: ObjectMap<T[]>, t: T, orderBy: (item: T) => Order, length: number, forceSequence = false) {
    if (isArray(t)) {
        return 0.5;
    } else {
        let order = orderBy(t);
        if (isFunction(order)) {
            order = order(length, ctx);
        }

        let orderVal: number;
        if (isNumber(order)) {
            orderVal = order;
        } else if (order) {
            order.value = isNumber(order.value) ? order.value : 0.5;
            if (!forceSequence && order.runWay === RunWay.parallel) {
                parall[order.value] = parall[order.value] || [];
                parall[order.value].push(t);
            }
            orderVal = order.value;
        } else {
            orderVal = 0.5;
        }

        if (orderVal > 1) {
            return (orderVal % length) / length;
        } else if (orderVal < 0) {
            orderVal = 0;
        }

        return orderVal;
    }
}
