import { Activity, InputDataToken, Task } from '@taskfr/core';
import { NodeActivityContext } from './NodeActivityContext';
import { Inject } from '@ts-ioc/core';
import { INodeContext, NodeContextToken } from './INodeContext';

@Task
export abstract class NodeActivity extends Activity<any> {
    /**
     * override to node context
     *
     * @type {IPipeContext}
     * @memberof NodeActivity
     */
    @Inject(NodeContextToken)
    context: INodeContext;

    protected createCtx(input?: any) {
        return this.context.getContainer().resolve(NodeActivityContext, { provide: InputDataToken, useValue: input });
    }

    protected abstract async execute(ctx: NodeActivityContext): Promise<void>;
}
