
import { Activity } from '../core';
import { Injectable, InjectMetaAccessorToken, MetaAccessor } from '@ts-ioc/core';
import { Workflow, Task } from '../decorators';

/**
 *  workflow metadata accessor token.
 */
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
