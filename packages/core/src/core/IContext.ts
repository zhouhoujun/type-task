import { IConfigure, ActivityResultType } from './IConfigure';
import { IActivity, GActivity } from './IActivity';
import { ITaskRunner } from './ITaskRunner';
import { IActivityBuilder } from './IActivityBuilder';
import { IContainer, Type, Token, ObjectMap, Registration } from '@ts-ioc/core';
import { ITaskContainer } from '../ITaskContainer';



/**
 * context type.
 */
export type CtxType<T> = T | ((context?: IContext, config?: IConfigure) => T);
/**
 * async result.
 */
export type AsyncResult<T> = (activity?: GActivity<T>, data?: any) => Promise<T>;
/**
 * activity result.
 */
export type ActivityResult<T> = Promise<T> | AsyncResult<T> | GActivity<T> | ITaskRunner<T>;
/**
 * expression.
 */
export type Expression<T> = T | ActivityResult<T>;
/**
 * condition expression.
 */
export type Condition = Expression<boolean>;

/**
 *  expression token.
 */
export type ExpressionToken<T> = Expression<T> | Token<GActivity<T>>;

/**
 * expression type.
 */
export type ExpressionType<T> = Expression<T> | ActivityResultType<T>;

/**
 * key value pair.
 *
 * @export
 * @interface KeyValue
 * @template TKey
 * @template TVal
 */
export interface KeyValue<TKey, TVal> {
  key: TKey;
  value: TVal;
}

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
   * get ioc container.
   *
   * @returns {IContainer}
   * @memberof IContext
   */
  getContainer(): IContainer;

  /**
   * get task container.
   *
   * @returns {ITaskContainer}
   * @memberof IContext
   */
  getTaskContiner(): ITaskContainer;

  /**
   * get task runner;
   *
   * @param {ActivityResultType<any>} task
   * @param {string} uuid
   * @param {(IActivityBuilder | Token<IActivityBuilder>)} [builder]
   * @param {*} [instance]
   * @returns {ITaskRunner}
   * @memberof IContext
   */
  getRunner(task: ActivityResultType<any>, uuid?: string, builder?: IActivityBuilder | Token<IActivityBuilder>, instance?: any): ITaskRunner<any>;

  /**
   * get task run root path.
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

  // /**
  //  * validate condition.
  //  *
  //  * @param {Condition} condition
  //  * @param {*} data
  //  * @returns {Promise<boolean>}
  //  * @memberof IContext
  //  */
  // validate(condition: Condition, data: any): Promise<boolean>;

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
   * check is task or not.
   *
   * @param {Type<IActivity>} task
   * @returns {boolean}
   * @memberof IContext
   */
  isTask(task: Type<IActivity>): boolean;
}
