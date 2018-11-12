import { InputDataToken, ITranslator, InjectActivityContextToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Injectable, Inject, isArray, isString } from '@ts-ioc/core';
import { ISourceMapsActivity } from './SourceMapsActivity';
import { Files2StreamToken } from './Files2Stream';
import { src } from 'vinyl-fs';
import { Stream } from 'stream';
import { TransformActivity } from './TransformActivity';
import { NodeActivityContext, FileChanged } from '@taskfr/node';


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
export class TransformActivityContext extends NodeActivityContext<ITransform> {

    sourceMaps: ISourceMapsActivity;

    constructor(@Inject(InputDataToken) input: any) {
        super(input);
    }

    protected getTranslator(input: any): ITranslator {
        if (input instanceof FileChanged) {
            return this.getContainer().get(Files2StreamToken);
        }
        return null;
    }

    protected translate(input: any): any {
        if (input instanceof Stream) {
            return input;
        } else if (isArray(input)) {
            return src(input.filter(i => isString(i) || isArray(i)));
        } else if (isString(input)) {
            return src(input);
        }
        return super.translate(input);
    }
}
