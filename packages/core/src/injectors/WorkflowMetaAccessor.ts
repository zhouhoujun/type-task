
import { ActivityRunner, Task, Activity, Workflow } from '../core';
import { Injectable, InjectMetaAccessorToken, MetaAccessor } from '@ts-ioc/core';

export const WorkflowMetaAccessorToken = new InjectMetaAccessorToken(Activity);
/**
 * Workflow metadata accessor.
 *
 * @export
 * @class WorkflowMetaAccessor
 * @extends {MetaAccessor}
 */
@Injectable(WorkflowMetaAccessorToken)
export class WorkflowMetaAccessor extends MetaAccessor {
    constructor() {
        super([Workflow.toString(), Task.toString()])
    }
}
