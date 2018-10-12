import { HandleActivity, Active, Task, ExpressionType, IActivity, Expression, HandleConfigure, CtxType } from '@taskfr/core';
import { Inject, isRegExp, Token, isToken } from '@ts-ioc/core';
import { NodeContextToken, INodeContext } from '../core';
import { BuidActivityContext } from './BuidActivityContext';
import minimatch = require('minimatch');
import { CompilerActivity } from './CompilerActivity';
import { CompilerActivityContext } from './CompilerActivityContext';


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

    /**
     * sub dist
     *
     * @type {CtxType<string>}
     * @memberof BuildHandleConfigure
     */
    subDist?: CtxType<string>;
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
     * compiler token.
     *
     * @type {Token<IActivity>}
     * @memberof BuildHandleActivity
     */
    compilerToken: Token<IActivity>;

    /**
     * sub dist.
     *
     * @type {string}
     * @memberof BuildHandleActivity
     */
    subDist: string;

    /**
     * file filter.
     *
     * @type {Expression<string | RegExp>}
     * @memberof BuildHandleActivity
     */
    test: Expression<string | RegExp>;

    async onActivityInit(config: BuildHandleConfigure) {
        await super.onActivityInit(config);
        if (isToken(config.compiler)) {
            this.compilerToken = config.compiler;
        } else {
            this.compilerToken = this.context.builder.getType(config.compiler);
        }
        this.compiler = await this.buildActivity(config.compiler);
        this.test = await this.toExpression(config.test);
        this.subDist = this.context.to(config.subDist) || '';
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
            let compCtx = this.ctxFactory.create(files, this.compilerToken, CompilerActivity) as CompilerActivityContext;
            compCtx.builder = ctx.builder;
            compCtx.handle = this;
            await this.compiler.run(compCtx);
            ctx.complete(files);
        }
        if (!ctx.isCompleted()) {
            await next();
        }
    }
}
