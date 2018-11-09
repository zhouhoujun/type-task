import { CleanActivity, TestActivity, DestActivity, BuildActivity, BuidActivityContext } from '@taskfr/node';
import { IPackageActivity, PackageToken } from './PackageConfigure';
import { Package } from '../decorators';
import { SequenceActivity } from '@taskfr/core';


/**
 * package activity.
 *
 * @export
 * @class PackageActivity
 * @extends {ChainActivity}
 */
@Package(PackageToken)
export class PackageActivity extends BuildActivity implements IPackageActivity {

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

    protected async execOnce(): Promise<void> {
        if (this.clean) {
            await this.clean.run(this.getContext());
        }
        await super.execOnce();
    }

    protected async execBeforeBody() {
        let ctx = this.getContext();
        if (this.test) {
            await this.test.run(ctx);
        }
        if (this.beforeBuildBody) {
            await this.beforeBuildBody.run(ctx);
        }
    }

    protected async execAfterBody() {
        let ctx = this.getContext();
        if (this.afterBuildBody) {
            await this.afterBuildBody.run(ctx);
        }
        if (this.dest) {
            await this.dest.run(ctx);
        }
    }

}
