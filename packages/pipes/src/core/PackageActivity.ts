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
    /**
     * src root pacth.
     *
     * @type {string}
     * @memberof PackageActivity
     */
    src: string;


    protected async execBeforeBody(ctx: BuidActivityContext) {
        let execute = this.context.getContainer().resolve(SequenceActivity);
        if (this.clean) {
            execute.activities.push(this.clean);
        }
        if (this.dest) {
            execute.activities.push(this.dest);
        }
        if (this.beforeBuildBody) {
            execute.activities.push(this.beforeBuildBody);
        }
        await execute.run(ctx);
    }

    protected async execAfterBody(ctx: BuidActivityContext) {
        let execute = this.context.getContainer().resolve(SequenceActivity);
        if (this.afterBuildBody) {
            execute.activities.push(this.afterBuildBody);
        }
        if (this.dest) {
            execute.activities.push(this.dest);
        }
        await execute.run(ctx);
    }

}
