import { Src, SequenceActivity } from '@taskfr/core';
import { BuildActivity, CleanActivity, CleanConfigure, TestActivity, TestConfigure, BuidActivityContext } from '@taskfr/node';
import { Pack, PackConfigure } from './pack';


@Pack({
    clean: 'dist',
    src: 'src',
    dist: 'dist',
    handles: [
        {
            test: '*.ts',
            compiler: 'tsc'
        }
    ]
})
export class PackActivity extends BuildActivity {

    /**
     * clean activity.
     *
     * @type {CleanActivity}
     * @memberof PackActivity
     */
    clean: CleanActivity;

    /**
     * test activity.
     *
     * @type {TestActivity}
     * @memberof PackActivity
     */
    test: TestActivity;

    protected async execOnce(): Promise<void> {
        if (this.clean) {
            await this.clean.run(this.getContext());
        }
        await super.execOnce();
    }

    protected async execBeforeBody() {
        let ctx = this.getContext();
        if (this.clean) {
            await this.clean.run(ctx);
        }
        if (this.test) {
            await this.test.run(ctx);
        }
        if (this.beforeBuildBody) {
            await this.beforeBuildBody.run(ctx);
        }
    }

}
