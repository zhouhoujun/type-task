import { ActivityConfigure, ActivityResultType, Expression } from './ActivityConfigure';
import { IActivity } from './IActivity';
import { IActivityRunner } from './IActivityRunner';
import { IContainer, Type, Token, ObjectMap, Registration } from '@ts-ioc/core';
import { ActivityBuilder } from './ActivityBuilder';
import { IActivityBuilder } from './IActivityBuilder';



/**
 * context type.
 */
export type CtxType<T> = T | ((context?: IContext, config?: ActivityConfigure) => T);


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
  builder: ActivityBuilder;

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
   * @param {ActivityConfigure} [config]
   * @returns {T}
   * @memberof IContext
   */
  to<T>(target: CtxType<T>, config?: ActivityConfigure): T;

  /**
   * exec activity result.
   *
   * @template T
   * @param {IActivity} target
   * @param {Expression<T>} expression
   * @param {ActivityConfigure} [data]
   * @returns {Promise<T>}
   * @memberof IContext
   */
  exec<T>(target: IActivity, expression: Expression<T>, data?: any): Promise<T>;

  /**
   * check is task or not.
   *
   * @param {Type<IActivity>} task
   * @returns {boolean}
   * @memberof IContext
   */
  isTask(task: Type<IActivity>): boolean;
}
