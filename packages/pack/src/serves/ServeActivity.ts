import { Task, Src, CtxType, ActivityConfigure } from '@taskfr/core';
import { NodeActivityContext, NodeActivity, BuidActivityContext } from '@taskfr/node';


/**
 * ServeConfigure
 *
 * @export
 * @interface ServeConfigure
 */
export interface ServeConfigure extends ActivityConfigure {
    /**
     * dirs.
     *
     * @type {CtxType<Src>}
     * @memberof ServeConfigure
     */
    dirs: CtxType<Src>;
}

/**
 * Serve activity.
 *
 * @export
 * @class ServeActivity
 * @extends {BuildActivity}
 */
@Task('serve')
export class ServeActivity extends NodeActivity<BuidActivityContext> {

    /**
     * dirs.
     *
     * @type {Src}
     * @memberof ServeActivity
     */
    dirs: Src;

    constructor() {
        super();
    }

    async onActivityInit(config: ServeConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.dirs = await this.context.to(config.dirs);
    }

    /**
     * before run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<void>}
     * @memberof NodeActivityContext
     */
    protected async execute(ctx: BuidActivityContext): Promise<void> {

    }

}
