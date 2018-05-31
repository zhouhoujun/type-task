import { ActionData, isFunction, ActionComposite, CoreActions, IContainer, hasClassMetadata, getTypeMetadata } from '@ts-ioc/core';
import { Task, } from '../decorators/index';
import { ITask } from '../ITask';
import { TaskMetadata } from '../metadatas/index';
import { AdviceMetadata } from '@ts-ioc/aop';

/**
 * init task action data.
 *
 * @export
 * @interface InitTaskActionData
 * @extends {ActionData<AdviceMetadata>}
 */
export interface InitTaskActionData extends ActionData<AdviceMetadata> {

}

/**
 * Inject DrawType action.
 *
 * @export
 * @class SetPropAction
 * @extends {ActionComposite}
 */
export class InitTaskAction extends ActionComposite {

    constructor() {
        super('InitTaskAction')
    }

    protected working(container: IContainer, data: InitTaskActionData) {

        if (data.targetType && data.target && hasClassMetadata(Task, data.targetType)) {
            let task = data.target as ITask;
            let metas = getTypeMetadata<TaskMetadata>(Task, data.targetType);
            if (metas.length) {
                task.config = metas[0];
            }
        }
    }
}

