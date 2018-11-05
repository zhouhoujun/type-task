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
        execute.name = 'Before build';
        if (this.clean) {
            execute.add(this.clean);
        }
        if (this.test) {
            execute.add(this.test);
        }
        if (this.dest) {
            execute.add(this.dest);
        }
        if (this.beforeBuildBody) {
            execute.add(this.beforeBuildBody);
        }
        await execute.run(ctx);
    }

    protected async execAfterBody(ctx: BuidActivityContext) {
        let execute = this.context.getContainer().resolve(SequenceActivity);
        execute.name = 'After build';
        if (this.afterBuildBody) {
            execute.add(this.afterBuildBody);
        }
        if (this.dest) {
            execute.add(this.dest);
        }
        await execute.run(ctx);
    }

}
