import { IActivityContext, InputDataToken, ITranslator, InjectActivityContextToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Injectable, Inject } from '@ts-ioc/core';
import { SourceMapsActivity } from './SourceMapsActivity';
import { FileChanged, NodeActivityContext, INodeContext, NodeContextToken } from '@taskfr/node';
import { Files2StreamToken } from './Files2Stream';
import { PipeActivity } from './PipeActivity';


export const PipeActivityContextToken = new InjectActivityContextToken(PipeActivity);

/**
 * pipe activity context.
 *
 * @export
 * @class PipeActivityContext
 * @extends {ActivityContext}
 * @implements {IActivityContext<ITransform>}
 */
@Injectable(PipeActivityContextToken)
export class PipeActivityContext extends NodeActivityContext implements IActivityContext<ITransform> {
    data: ITransform;
    sourceMaps: SourceMapsActivity;

    constructor(@Inject(InputDataToken) input: any, @Inject(NodeContextToken) context: INodeContext) {
        super(input, context);
    }

    protected getTranslator(input: any): ITranslator {
        if (input instanceof FileChanged) {
            return this.context.getContainer().get(Files2StreamToken);
        }
        return null;
    }
}
