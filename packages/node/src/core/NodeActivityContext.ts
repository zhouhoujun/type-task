import { ActivityContext, InputDataToken } from '@taskfr/core';
import { Injectable, Inject, isArray } from '@ts-ioc/core';
import { INodeContext, NodeContextToken } from './INodeContext';
import { FileChanged } from '../activities';

/**
 * pipe activity context.
 *
 * @export
 * @class NodeActivityContext
 * @extends {ActivityContext}
 * @implements {IActivityContext<ITransform>}
 */
@Injectable
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
        if (input instanceof FileChanged) {
            return input.changed();
        }
        if (isArray(input)) {
            return input.slice(0);
        }
        return input;
    }
}
