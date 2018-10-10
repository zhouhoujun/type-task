import { Src } from '@taskfr/core';
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

    async onActivityInit(config: PackConfigure) {
        await super.onActivityInit(config);
        if (config.clean) {
            this.clean = await this.toActivity<Src, CleanActivity, CleanConfigure>(
                config.clean,
                act => act instanceof CleanActivity,
                src => {
                    return <CleanConfigure>{ clean: src, task: CleanActivity };
                }
            );
        }

        if (config.test) {
            this.test = await this.toActivity<Src, TestActivity, TestConfigure>(
                config.test,
                act => act instanceof TestActivity,
                src => {
                    if (!src) {
                        return null;
                    }
                    return <TestConfigure>{ src: src, task: TestActivity };
                }
            );
        }
    }

    protected async execOnce(ctx: BuidActivityContext): Promise<void> {
        await this.clean.run(ctx);
        await super.execOnce(ctx);
    }

    protected async execute(ctx: BuidActivityContext): Promise<void> {
        await super.execute(ctx);
        if (this.test) {
            await this.test.run(ctx);
        }
    }
}
