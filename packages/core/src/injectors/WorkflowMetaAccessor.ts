import { MetaAccessor, InjectMetaAccessorToken } from '@ts-ioc/bootstrap';
import { Workflow, ActivityRunner } from '../core';
import { Injectable } from '@ts-ioc/core';

export const WorkflowMetaAccessorToken = new InjectMetaAccessorToken(ActivityRunner);
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
        super(Workflow.toString())
    }
}
