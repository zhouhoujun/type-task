import { ContextActivity, Task } from '@taskfr/core';
import { NodeActivityContext } from './NodeActivityContext';
import { Inject } from '@ts-ioc/core';
import { INodeContext, NodeContextToken } from './INodeContext';

/**
 * node activity.
 *
 * @export
 * @abstract
 * @class NodeActivity
 * @extends {ContextActivity}
 * @template T
 */
@Task
export abstract class NodeActivity extends ContextActivity {

    /**
     * override to node context
     *
     * @type {IPipeContext}
     * @memberof NodeActivity
     */
    @Inject(NodeContextToken)
    context: INodeContext;

    protected createActiveCtx(input?: any): NodeActivityContext {
        return super.createActiveCtx(input) as NodeActivityContext;
    }

    /**
     * execute build activity.
     *
     * @protected
     * @abstract
     * @param {NodeActivityContext} ctx
     * @returns {Promise<void>}
     * @memberof NodeActivity
     */
    protected abstract async execute(ctx: NodeActivityContext): Promise<void>;
}
