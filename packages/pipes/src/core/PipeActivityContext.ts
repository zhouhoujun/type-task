import { ActivityContext, IActivityContext, IActivity, InputDataToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Injectable, Inject } from '@ts-ioc/core';
import { SourceMapsActivity } from './SourceMapsActivity';
import { WatchActivity } from '@taskfr/node';

/**
 * pipe activity context.
 *
 * @export
 * @class PipeActivityContext
 * @extends {ActivityContext}
 * @implements {IActivityContext<ITransform>}
 */
@Injectable
export class PipeActivityContext extends ActivityContext implements IActivityContext<ITransform> {
    data: ITransform;
    watch: WatchActivity;
    sourceMaps: SourceMapsActivity;
    constructor(@Inject(InputDataToken) input: any) {
        super(input);
    }
}
