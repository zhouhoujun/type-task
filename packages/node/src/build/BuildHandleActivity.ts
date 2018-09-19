import { HandleActivity, InputDataToken, ActivityConfigure, Active, Task, ExpressionType, IActivity, Expression } from '@taskfr/core';
import { Inject } from '@ts-ioc/core';
import { NodeContextToken, INodeContext } from '../core';
import { BuidActivityContext } from './BuidActivityContext';


/**
 * handle config
 *
 * @export
 * @interface BuildHandleConfigure
 * @extends {ActivityConfigure}
 */
export interface BuildHandleConfigure extends ActivityConfigure {
    /**
     * file filter
     *
     * @type {ExpressionType<boolean>}
     * @memberof BuildHandleConfigure
     */
    filter: ExpressionType<string[]>;

    /**
     * compiler
     *
     * @type {Active}
     * @memberof BuildHandleConfigure
     */
    compiler: Active;
}

/**
 * build handle activity.
 *
 * @export
 * @abstract
 * @class BuildHandleActivity
 * @extends {HandleActivity}
 */
@Task('build-handle')
export class BuildHandleActivity extends HandleActivity {
    /**
     * override to node context
     *
     * @type {IPipeContext}
     * @memberof NodeActivity
     */
    @Inject(NodeContextToken)
    context: INodeContext;

    /**
     * compiler.
     *
     * @type {IActivity}
     * @memberof BuildHandleActivity
     */
    compiler: IActivity;

    /**
     * file filter.
     *
     * @type {Expression<string[]>}
     * @memberof BuildHandleActivity
     */
    filter: Expression<string[]>;

    async onActivityInit(config: BuildHandleConfigure) {
        await super.onActivityInit(config);
        this.compiler = await this.buildActivity(config.compiler);
        this.filter = await this.toExpression(config.filter);
    }

    protected createCtx(input?: any) {
        return this.context.getContainer().resolve(BuidActivityContext, { provide: InputDataToken, useValue: input });
    }

    /**
     * handle build via files.
     *
     * @protected
     * @param {BuidActivityContext} ctx
     * @param {() => Promise<any>} [next]
     * @returns {Promise<void>}
     * @memberof BuildHandleActivity
     */
    protected async execute(ctx: BuidActivityContext, next?: () => Promise<any>): Promise<void> {
        if (ctx.isCompleted()) {
            return;
        }
        let files = await this.context.exec(this, this.filter, ctx);
        if (!files || files.length < 1) {
            let compCtx = this.createCtx(files);
            await this.compiler.run(compCtx);
            ctx.complete(files);
        }
        if (!ctx.isCompleted()) {
            await next();
        }
    }
}
