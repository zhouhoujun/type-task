import { ContextActivity, Task, ActivityContext, InputDataToken, InjectActivityContextToken } from '@taskfr/core';
import { Inject, Injectable } from '@ts-ioc/core';
import { INodeContext, NodeContextToken } from './INodeContext';
import { FileChanged } from './FileChanged';

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

    protected verifyCtx(input?: any): NodeActivityContext {
        return input instanceof NodeActivityContext ? input : super.verifyCtx(input) as NodeActivityContext;
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


/**
 * node activity context token.
 */
export const NodeActivityContextToken = new InjectActivityContextToken(NodeActivity);


/**
 * pipe activity context.
 *
 * @export
 * @class NodeActivityContext
 * @extends {ActivityContext}
 * @implements {IActivityContext<ITransform>}
 */
@Injectable(NodeActivityContextToken)
export class NodeActivityContext extends ActivityContext {

    /**
     * ovverid to node context
     *
     * @type {IPipeContext}
     * @memberof NodeActivityContext
     */
    context: INodeContext;

    constructor(@Inject(InputDataToken) input: any, @Inject(NodeContextToken) context: INodeContext) {
        super(input, context);
    }

    protected translate(input: any): any {
        input = super.translate(input);
        if (input instanceof FileChanged) {
            return input.changed();
        }
        return input;
    }
}
