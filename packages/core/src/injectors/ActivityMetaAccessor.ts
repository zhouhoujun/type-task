import { MetaAccessor, InjectMetaAccessorToken } from '@ts-ioc/bootstrap';
import { Task, Activity } from '../core';
import { Injectable } from '@ts-ioc/core';

export const ActivityMetaAccessorToken = new InjectMetaAccessorToken(Activity);
/**
 * activity metadata accessor.
 *
 * @export
 * @class ActivityMetaAccessor
 * @extends {MetaAccessor}
 */
@Injectable(ActivityMetaAccessorToken)
export class ActivityMetaAccessor extends MetaAccessor {
    constructor() {
        super(Task.toString())
    }
}
