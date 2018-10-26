import { SequenceActivity, ParallelActivity, IActivity, InputDataToken } from '@taskfr/core';
import { CleanActivity, TestActivity, TransformActivityContext, DestActivity } from '@taskfr/node';
import { Type } from '@ts-ioc/core';
import { IPackageActivity, PackageToken } from './PackageConfigure';
import { Package } from '../decorators';


/**
 * package activity.
 *
 * @export
 * @class PackageActivity
 * @extends {SequenceActivity}
 */
@Package(PackageToken)
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
     * @type {IActivity[]}
     * @memberof PackageActivity
     */
    assets: IActivity[] = [];
    /**
     * assets execute control type.
     *
     * @type {(Type<SequenceActivity | ParallelActivity>)}
     * @memberof PackageActivity
     */
    executeType: Type<SequenceActivity | ParallelActivity>;

    /**
     * eecute activity.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @memberof PackageActivity
     */
    protected async execute(ctx: TransformActivityContext) {
        if (this.test) {
            await this.test.run(ctx);
        }
        if (this.clean) {
            await this.clean.run(ctx);
        }
        await this.execAssets(ctx);
        await super.execute(ctx);
    }

    protected verifyCtx(input?: any) {
        return this.context.getContainer().resolve(TransformActivityContext, { provide: InputDataToken, useValue: input });
    }

    /**
     * execute assets.
     *
     * @protected
     * @param {TransformActivityContext} ctx
     * @returns
     * @memberof PackageActivity
     */
    protected execAssets(ctx: TransformActivityContext) {
        this.executeType = this.executeType || SequenceActivity;
        let execute = this.context.getContainer().resolve(this.executeType);
        execute.activities = this.assets;
        return execute.run(ctx);
    }
}
