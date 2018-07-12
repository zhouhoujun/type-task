import { AssetTask } from '../decorators/AssetTask';
import { SourceActivity } from './SourceActivity';
import { SequenceActivity } from '@taskfr/core';
import { DestActivity } from './DestActivity';
import { isArray } from '@ts-ioc/core';
import { ITransform } from './ITransform';
import { IPipeActivity } from './IPipeActivity';

export interface IAssetActivity extends IPipeActivity {
    /**
     * src activity.
     *
     * @type {SourceActivity}
     * @memberof IAssetActivity
     */
    src: SourceActivity;

    /**
     * dest activity.
     *
     * @type {(DestActivity | DestActivity[])}
     * @memberof IAssetActivity
     */
    dest: DestActivity | DestActivity[];
}

/**
 * Asset Activity
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@AssetTask
export class AssetActivity extends SequenceActivity implements IAssetActivity {

    /**
     * src activity.
     *
     * @type {SourceActivity}
     * @memberof AssetActivity
     */
    src: SourceActivity;

    /**
     * dest activity.
     *
     * @type {(DestActivity | DestActivity[])}
     * @memberof AssetActivity
     */
    dest: DestActivity | DestActivity[];


    protected begin(data?: any): Promise<ITransform> {
        return this.src.run(data);
    }

    protected async end(data?: ITransform): Promise<ITransform> {

        if (isArray(this.dest)) {
            if (this.dest.length === 1) {
                await this.dest[0].run(data);
            } else if (this.dest.length > 0) {
                await Promise.all(this.dest.map(ds => {
                    return ds.run(data);
                }));
            }
        } else if (this.dest) {
            await this.dest.run(data);
        }

        return data;
    }

}
