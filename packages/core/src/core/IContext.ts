import { IConfigure, ActivityType } from './IConfigure';
import { IActivity } from './IActivity';
import { ITaskRunner } from './ITaskRunner';
import { IActivityBuilder } from './IActivityBuilder';
import { InjectToken, IContainer, Type, Token, ObjectMap } from '@ts-ioc/core';
import { ITaskContainer } from '../ITaskContainer';



/**
 * context type.
 */
export type CtxType<T> = T | ((context?: IContext, config?: IConfigure) => T);

export type AsyncResult<T> = (activity?: IActivity<T>, data?: any) => Promise<T>;

export type ActivityResult<T> = Promise<T> | AsyncResult<T> | IActivity<T>;

export type Expression<T> = T | ActivityResult<T>;

export type Condition = Expression<boolean>;

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
 * task context token.
 */
export const ContextToken = new InjectToken<IContext>('__TASK_Context');


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
   * @param {ActivityType<IActivity>} task
   * @param {string} uuid
   * @param {(IActivityBuilder | Token<IActivityBuilder>)} [builder]
   * @param {*} [instance]
   * @returns {ITaskRunner}
   * @memberof IContext
   */
  getRunner(task: ActivityType<IActivity<any>>, uuid?: string, builder?: IActivityBuilder | Token<IActivityBuilder>, instance?: any): ITaskRunner;

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
   * @param {IActivity<any>} target
   * @param {Expression<T>} expression
   * @param {IConfigure} [data]
   * @returns {Promise<T>}
   * @memberof IContext
   */
  exec<T>(target: IActivity<any>, expression: Expression<T>, data?: any): Promise<T>;

  /**
   * check is task or not.
   *
   * @param {Type<IActivity>} task
   * @returns {boolean}
   * @memberof IContext
   */
  isTask(task: Type<IActivity<any>>): boolean;
}
