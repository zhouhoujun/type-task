import { SequenceActivity, ParallelActivity } from '@taskfr/core';
import { Package } from '../decorators';
import { DestActivity } from './DestActivity';
import { TestActivity } from './TestActivity';
import { CleanActivity } from './CleanActivity';
import { AssetActivity } from './AssetActivity';
import { ITransform } from './ITransform';
import { Type, Inject } from '@ts-ioc/core';
import { PipeContextToken, IPipeContext } from './IPipeContext';
import { IPackageActivity } from './PackageConfigure';

/**
 * package activity.
 *
 * @export
 * @class PackageActivity
 * @extends {SequenceActivity}
 */
@Package
export class PackageActivity extends SequenceActivity implements IPackageActivity {

    /**
     * dest activity.
     *
     * @type {DestActivity}
     * @memberof PackageActivity
     */
    dest: DestActivity;
    /**
     * test activity.
     *
     * @type {TestActivity}
     * @memberof PackageActivity
     */
    test: TestActivity;
    /**
     * clean activity.
     *
     * @type {CleanActivity}
     * @memberof PackageActivity
     */
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
    /**
     * context.
     *
     * @type {IPipeContext}
     * @memberof PackageActivity
     */
    @Inject(PipeContextToken)
    context: IPipeContext;

    /**
     * begin transform
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<ITransform>}
     * @memberof PackageActivity
     */
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

    /**
     * execute assets.
     *
     * @protected
     * @param {*} [data]
     * @returns
     * @memberof PackageActivity
     */
    protected execAssets(data?: any) {
        this.executeType = this.executeType || SequenceActivity;
        let execute = this.context.getContainer().resolve(this.executeType);
        execute.activites = this.assets;
        return execute.run(data);
    }
}
