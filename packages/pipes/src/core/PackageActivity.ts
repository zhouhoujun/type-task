import { SequenceActivity, ParallelActivity } from '@taskfr/core';
import { Package } from '../decorators';
import { WatchActivity } from './WatchActivity';
import { DestActivity } from './DestActivity';
import { TestActivity } from './TestActivity';
import { CleanActivity } from './CleanActivity';
import { AssetActivity } from './AssetActivity';
import { ITransform } from './ITransform';
import { Type } from '@ts-ioc/core';

/**
 * package activity.
 *
 * @export
 * @class PackageActivity
 * @extends {SequenceActivity}
 */
@Package
export class PackageActivity extends SequenceActivity {

    watch: WatchActivity;

    dest: DestActivity;

    test: TestActivity;

    clean: CleanActivity;

    /**
     * src root pacth.
     *
     * @type {string}
     * @memberof PackageActivity
     */
    src: string;

    /**
     * assets activities.
     *
     * @type {AssetActivity[]}
     * @memberof PackageActivity
     */
    assets: AssetActivity[] = [];

    /**
     * assets execute control type.
     *
     * @type {(Type<SequenceActivity | ParallelActivity>)}
     * @memberof PackageActivity
     */
    executeType: Type<SequenceActivity | ParallelActivity>;


    protected async begin(data?: any): Promise<ITransform> {
        if (this.test) {
            await this.test.run(data);
        }
        if (this.clean) {
            await this.clean.run(data);
        }

        let assets = await this.execAssets(data);

        return assets;

    }

    protected execAssets(data?: any) {
        this.executeType = this.executeType || SequenceActivity;
        let execute = this.context.getContainer().resolve(this.executeType);
        execute.activites = this.assets;
        return execute.run(data);
    }


}
