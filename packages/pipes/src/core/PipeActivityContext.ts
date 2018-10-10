import { ActivityContext, IActivityContext, InputDataToken, ITranslator } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Injectable, Inject } from '@ts-ioc/core';
import { SourceMapsActivity } from './SourceMapsActivity';
import { IPipeContext, PipeContextToken } from './IPipeContext';
import { FileChanged, NodeActivityContext } from '@taskfr/node';
import { Files2StreamToken } from './Files2Stream';

/**
 * pipe activity context.
 *
 * @export
 * @class PipeActivityContext
 * @extends {ActivityContext}
 * @implements {IActivityContext<ITransform>}
 */
@Injectable
export class PipeActivityContext extends NodeActivityContext implements IActivityContext<ITransform> {
    data: ITransform;
    // watch: WatchActivity;
    sourceMaps: SourceMapsActivity;
    /**
     * ovverid to pipe context
     *
     * @type {IPipeContext}
     * @memberof PipeActivityContext
     */
    context: IPipeContext;
    constructor(@Inject(InputDataToken) input: any, @Inject(PipeContextToken) context: IPipeContext) {
        super(input, context);
    }

    protected getTranslator(input: any): ITranslator {
        if (input instanceof FileChanged) {
            return this.context.getContainer().get(Files2StreamToken);
        }
        return null;
    }
}
