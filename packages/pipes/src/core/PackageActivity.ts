import { SequenceActivity, ParallelActivity, IActivity, InputDataToken } from '@taskfr/core';
import { DestActivity } from './DestActivity';
import { CleanActivity, TestActivity } from '@taskfr/node';
import { Type, Inject } from '@ts-ioc/core';
import { IPackageActivity, PackageToken } from './PackageConfigure';
import { Package } from '../decorators';
import { PipeActivityContext } from './PipeActivityContext';


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

    protected async execute(ctx: PipeActivityContext) {
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
        return this.context.getContainer().resolve(PipeActivityContext, { provide: InputDataToken, useValue: input });
    }

    /**
     * execute assets.
     *
     * @protected
     * @param {PipeActivityContext} ctx
     * @returns
     * @memberof PackageActivity
     */
    protected execAssets(ctx: PipeActivityContext) {
        this.executeType = this.executeType || SequenceActivity;
        let execute = this.context.getContainer().resolve(this.executeType);
        execute.activities = this.assets;
        return execute.run(ctx);
    }
}
