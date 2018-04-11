import { ActionData, isFunction, ActionComposite, CoreActions, IContainer, hasClassMetadata, getTypeMetadata } from '@ts-ioc/core';
import { AdviceMetadata } from '@ts-ioc/aop';
import { TaskModule, TaskModuleMetadata } from '../decorators/index';
import { ITaskModule } from '../ITaskModule';


/**
 * init task action data.
 *
 * @export
 * @interface InitTaskModuleActionData
 * @extends {ActionData<AdviceMetadata>}
 */
export interface InitTaskModuleActionData extends ActionData<AdviceMetadata> {

}

/**
 * Inject DrawType action.
 *
 * @export
 * @class SetPropAction
 * @extends {ActionComposite}
 */
export class InitTaskModuleAction extends ActionComposite {

    constructor() {
        super('InitTaskModuleAction')
    }

    protected working(container: IContainer, data: InitTaskModuleActionData) {

        if (data.targetType && data.target && hasClassMetadata(TaskModule, data.targetType)) {
            let task = data.target as ITaskModule;
            let metas = getTypeMetadata<TaskModuleMetadata>(TaskModule, data.targetType);
            if (metas.length) {
                let meta = metas[0];
                task.config = task.config || meta.config;
                task.name = task.name || meta.name;
            }
        }
    }
}
