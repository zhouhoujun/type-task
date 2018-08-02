import { IConfigure, ActivityResultType, Expression, ExpressionType, ActivityType } from './IConfigure';
import { IActivity } from './IActivity';
import { IActivityRunner } from './IActivityRunner';
import { IActivityBuilder } from './IActivityBuilder';
import { IContainer, Type, Token, ObjectMap, Registration, Express } from '@ts-ioc/core';



/**
 * context type.
 */
export type CtxType<T> = T | ((context?: IContext, config?: IConfigure) => T);


/**
 * Inject Acitity context Token
 *
 * @export
 * @class InjectContextToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectContextToken<T> extends Registration<T> {
  constructor(desc: string) {
    super('ActivityContext', desc);
  }
}



/**
 * task context token.
 */
export const ContextToken = new InjectContextToken<IContext>('');


/**
 * task context.
 *
 * @export
 * @interface IContext
 */
export interface IContext {

  /**
   * default builder.
   *
   * @type {IActivityBuilder}
   * @memberof IContext
   */
  builder: IActivityBuilder;

  /**
   * get ioc container.
   *
   * @returns {IContainer}
   * @memberof IContext
   */
  getContainer(): IContainer;

  /**
   * get base URL.
   *
   * @returns {string}
   * @memberof IContext
   */
  getRootPath(): string;

  /**
   * create task runner;
   *
   * @param {ActivityResultType<any>} task
   * @param {string} uuid
   * @param {(IActivityBuilder | Token<IActivityBuilder>)} [builder]
   * @param {*} [instance]
   * @returns {IActivityRunner}
   * @memberof IContext
   */
  createRunner(task: ActivityResultType<any>, uuid?: string, builder?: IActivityBuilder | Token<IActivityBuilder>, instance?: any): IActivityRunner<any>;

  /**
   * get task evn args.
   *
   * @returns {ObjectMap<any>}
   * @memberof IContext
   */
  getEnvArgs(): ObjectMap<any>;

  /**
   *convert to finally type via context.
   *
   * @template T
   * @param {CtxType<T>} target
   * @param {IConfigure} [config]
   * @returns {T}
   * @memberof IContext
   */
  to<T>(target: CtxType<T>, config?: IConfigure): T;

  /**
   * exec activity result.
   *
   * @template T
   * @param {IActivity} target
   * @param {Expression<T>} expression
   * @param {IConfigure} [data]
   * @returns {Promise<T>}
   * @memberof IContext
   */
  exec<T>(target: IActivity, expression: Expression<T>, data?: any): Promise<T>;

  /**
   * traslate config to expression.
   *
   * @template T
   * @param {ExpressionType<T>} exptype
   * @param {IActivity} target
   * @returns {Promise<Expression<T>>}
   * @memberof IContext
   */
  toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>>;

  /**
   * traslate config to acitvity.
   *
   * @template Tr
   * @template Ta
   * @template TCfg
   * @param {(ExpressionType<Tr> | ActivityType<Ta>)} exptype
   * @param {IActivity} target
   * @param {Express<any, boolean>} isRightActivity
   * @param {Express<Tr, TCfg>} toConfig
   * @param {Express<TCfg, TCfg>} [valify]
   * @returns {Promise<Ta>}
   * @memberof IContext
   */
  toActivity<Tr extends any, Ta extends IActivity, TCfg extends IConfigure>(exptype: ExpressionType<Tr> | ActivityType<Ta>, target: IActivity, isRightActivity: Express<any, boolean>, toConfig: Express<Tr, TCfg>, valify?: Express<TCfg, TCfg>): Promise<Ta>;


  /**
   * check is task or not.
   *
   * @param {Type<IActivity>} task
   * @returns {boolean}
   * @memberof IContext
   */
  isTask(task: Type<IActivity>): boolean;
}
