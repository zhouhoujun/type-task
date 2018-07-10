import { IConfigure, TaskType } from './IConfigure';
import { IActivity } from './IActivity';
import { ITaskRunner } from './ITaskRunner';
import { ITaskBuilder } from './ITaskBuilder';
import { InjectToken, IContainer, Type, Token, ObjectMap } from '@ts-ioc/core';
import { ITaskContainer } from '../ITaskContainer';



/**
 * context type.
 */
export type CtxType<T> = T | ((context?: IContext, config?: IConfigure) => T)

export type Condition = IActivity | boolean | ((IActivity) => boolean);

export type Expression<T> = IActivity | T | ((IActivity) => T);

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
   * @param {TaskType<IActivity>} task
   * @param {string} uuid
   * @param {(ITaskBuilder | Token<ITaskBuilder>)} [builder]
   * @param {*} [instance]
   * @returns {ITaskRunner}
   * @memberof IContext
   */
  getRunner(task: TaskType<IActivity>, uuid?: string, builder?: ITaskBuilder | Token<ITaskBuilder>, instance?: any): ITaskRunner;

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

  /**
   * validate condition.
   *
   * @param {Condition} condition
   * @param {*} data
   * @returns {Promise<boolean>}
   * @memberof IContext
   */
  validate(condition: Condition, data: any): Promise<boolean>;

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
   * check is task or not.
   *
   * @param {Type<IActivity>} task
   * @returns {boolean}
   * @memberof IContext
   */
  isTask(task: Type<IActivity>): boolean;
}
