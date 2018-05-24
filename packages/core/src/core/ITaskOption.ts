import { Type, Token, ObjectMap } from '@ts-ioc/core';
import { ITaskProvider } from './ITaskProvider';
import { ITaskBuilder } from './IBuilder';
import { TaskType } from '../utils/index';
import { ITask } from './ITask';
import { ITaskOption } from './ITaskOption';

/**
 * task options.
 *
 * @export
 * @interface ITaskOption
 * @template T
 */
export interface ITaskOption<T extends ITask> {

    /**
     * task providers
     *
     * @type {ITaskProvider}
     * @memberof ITaskOption
     */
    providers?: ITaskProvider;

    /**
     * builder
     *
     * @type {ITaskBuilder}
     * @memberof IContext
     */
    builder?: Token<ITaskBuilder>;

    /**
     * boostrap tasks.
     *
     * @type {Type<T>}
     * @memberof IContext
     */
    task?: Type<T>;


    /**
     * config module target instance.
     *
     * @type {ITask}
     * @memberof ITaskOption
     */
    moduleTarget?: T;

    /**
     * load task modules.
     *
     * @type {AsyncLoadOptions}
     * @memberof ITaskContext
     */
    loader?: TaskType | TaskType[];

    /**
     * children.
     *
     * @type {((ITaskOption<T> | Type<T>)[])}
     * @memberof ITaskOption
     */
    children?: (ITaskOption<T> | Type<T>)[];
}
