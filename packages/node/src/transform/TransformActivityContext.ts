import { IActivityContext, InputDataToken, ITranslator, InjectActivityContextToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Injectable, Inject, isArray, isString } from '@ts-ioc/core';
import { ISourceMapsActivity } from './SourceMapsActivity';
import { Files2StreamToken } from './Files2Stream';
import { src } from 'vinyl-fs';
import { Stream } from 'stream';
import { TransformActivity } from './TransformActivity';
import { NodeActivityContext, NodeContextToken, INodeContext, FileChanged } from '../core';


export const TransformActivityContextToken = new InjectActivityContextToken(TransformActivity);

/**
 * Transform activity context.
 *
 * @export
 * @class TransformActivityContext
 * @extends {ActivityContext}
 * @implements {IActivityContext<ITransform>}
 */
@Injectable(TransformActivityContextToken)
export class TransformActivityContext extends NodeActivityContext implements IActivityContext<ITransform> {
    data: ITransform;
    sourceMaps: ISourceMapsActivity;

    constructor(@Inject(InputDataToken) input: any, @Inject(NodeContextToken) context: INodeContext) {
        super(input, context);
    }

    protected getTranslator(input: any): ITranslator {
        if (input instanceof FileChanged) {
            return this.context.getContainer().get(Files2StreamToken);
        }
        return null;
    }

    protected translate(input: any): any {
        if (isArray(input)) {
            return src(input.filter(i => isString(i) || isArray(i)));
        } else if (isString(input)) {
            return src(input);
        } else if (input instanceof Stream) {
            return input;
        }

        return null;
    }
}
