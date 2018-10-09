import { HandleActivity, InputDataToken, Active, Task, ExpressionType, IActivity, Expression, HandleConfigure, Src } from '@taskfr/core';
import { Inject, isString, isRegExp } from '@ts-ioc/core';
import { NodeContextToken, INodeContext } from '../core';
import { BuidActivityContext } from './BuidActivityContext';
import minimatch = require('minimatch');
import { isArray } from 'util';


/**
 * handle config
 *
 * @export
 * @interface BuildHandleConfigure
 * @extends {ActivityConfigure}
 */
export interface BuildHandleConfigure extends HandleConfigure {
    /**
     * file filter
     *
     * @type {ExpressionType<boolean>}
     * @memberof BuildHandleConfigure
     */
    test: ExpressionType<string | RegExp>;

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
     * @type {Expression<string | RegExp>}
     * @memberof BuildHandleActivity
     */
    test: Expression<string | RegExp>;

    async onActivityInit(config: BuildHandleConfigure) {
        await super.onActivityInit(config);
        this.compiler = await this.buildActivity(config.compiler);
        this.test = await this.toExpression(config.test);
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
        let test = await this.context.exec(this, this.test, ctx);
        let files: string[];

        if (isRegExp(test)) {
            let exp = test;
            files = ctx.getState().filter(f => exp.test(f));
        } else if (test) {
            let match = test;
            files = ctx.getState().filter(f => minimatch(f, match));
        }
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
