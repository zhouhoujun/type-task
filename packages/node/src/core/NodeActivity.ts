import { ContextActivity } from '@taskfr/core';
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
export abstract class NodeActivity<T extends NodeActivityContext> extends ContextActivity {
    /**
     * override to node context
     *
     * @type {IPipeContext}
     * @memberof NodeActivity
     */
    @Inject(NodeContextToken)
    context: INodeContext;

    /**
     * execute build activity.
     *
     * @protected
     * @abstract
     * @param {T} ctx
     * @returns {Promise<void>}
     * @memberof NodeActivity
     */
    protected abstract async execute(ctx: T): Promise<void>;
}
