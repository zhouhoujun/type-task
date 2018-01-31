import { ActionData, AdviceMetadata, isFunction, ActionComposite, CoreActions, IContainer, hasClassMetadata, getTypeMetadata } from 'tsioc';
import { Task,  } from '../decorators/index';
import { ITask } from '../ITask';
import { TaskMetadata } from '../metadatas/index';



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
            if (!task.name && metas.length) {
                task.name = metas[0].name;
            }
        }
    }
}

