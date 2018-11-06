import { HandleActivity, Active, Task, ExpressionType, IActivity, Expression, HandleConfigure, CtxType, InjectAcitityToken } from '@taskfr/core';
import { Inject, isRegExp, Token, isToken, isString, isArray, Express, isFunction } from '@ts-ioc/core';
import { NodeContextToken, INodeContext } from '../core';
import { BuidActivityContext, BuidActivityContextToken } from './BuidActivityContext';
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
     * @type {ExpressionType<string | RegExp| Express<string, boolean>>}
     * @memberof BuildHandleConfigure
     */
    test: ExpressionType<string | RegExp | Express<string, boolean>>;

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

export const BuildHandleToken = new InjectAcitityToken<BuildHandleActivity>('build-handle');

/**
 * build handle activity.
 *
 * @export
 * @abstract
 * @class BuildHandleActivity
 * @extends {HandleActivity}
 */
@Task(BuildHandleToken, BuidActivityContextToken)
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
     * @type {Expression<string | RegExp | Express<string, boolean>>}
     * @memberof BuildHandleActivity
     */
    test: Expression<string | RegExp | Express<string, boolean>>;

    async onActivityInit(config: BuildHandleConfigure) {
        await super.onActivityInit(config);
        if (config.compiler) {
            if (isToken(config.compiler)) {
                this.compilerToken = config.compiler;
            } else {
                this.compilerToken = this.context.builder.getType(config.compiler);
            }
            this.compiler = await this.buildActivity(config.compiler);
        }
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

        if (isArray(ctx.result)) {
            if (isString(test)) {
                files = ctx.result.filter(f => minimatch(f, test as string));
            } else if (isFunction(test)) {
                files = ctx.result.filter(test);
            } else if (isRegExp(test)) {
                files = ctx.result.filter(f => (<RegExp>test).test(f));
            }
        }
        if (!files || files.length < 1) {
            let compCtx = this.ctxFactory.create<CompilerActivityContext>(files, this.compilerToken, CompilerActivity);
            compCtx.builder = ctx.builder;
            compCtx.handle = this;
            await this.compile(compCtx);
            ctx.complete(files);
        }
        if (!ctx.isCompleted()) {
            await next();
        }
    }

    protected async compile(ctx: CompilerActivityContext) {
        await this.compiler.run(ctx);
    }
}
