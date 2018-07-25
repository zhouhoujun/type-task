import { IConfigure, ActivityResultType, Expression } from './IConfigure';
import { IActivity } from './IActivity';
import { IActivityRunner } from './ITaskRunner';
import { IActivityBuilder } from './IActivityBuilder';
import { IContainer, Type, Token, ObjectMap, Registration } from '@ts-ioc/core';
import { ITaskContainer } from '../ITaskContainer';



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
   * get root container.
   *
   * @returns {IContainer}
   * @memberof IContext
   */
  getRootContainer(): IContainer;

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
   * check is task or not.
   *
   * @param {Type<IActivity>} task
   * @returns {boolean}
   * @memberof IContext
   */
  isTask(task: Type<IActivity>): boolean;
}
