import { IActivity } from './IActivity';
import { Token, Type, AppConfiguration, isToken, isMetadataObject } from '@ts-ioc/core';
import { IActivityBuilder } from './IActivityBuilder';

/**
 * ActivityResult type
 */
export type ActivityResultType<T> = Token<IActivity<T>> | IActivityConfigure<IActivity<T>>;

/**
 * activity type.
 */
export type ActivityType<T extends IActivity<any>> = Token<T> | IActivityConfigure<T>; // | Type<any>

/**
 * check target is activity type or not.
 *
 * @export
 * @param {*} target
 * @returns {target is ActivityType<any>}
 */
export function isActivityType(target: any): target is ActivityResultType<any> {
    if (!target) {
        return false;
    }
    if (isToken(target)) {
        return true;
    }

    if (isMetadataObject(target) && (target.task || target.bootstrap)) {
        return true;
    }

    return false;
}

/**
 * task config.
 *
 * @export
 * @interface ITaskConfigure
 */
export interface IActivityConfigure<T> extends AppConfiguration<T> {

    /**
     * workflow uuid.
     *
     * @type {string}
     * @memberof ITaskConfigure
     */
    id?: string;

    /**
    * context tasks name.
    *
    * @type {string}
    * @memberof ITaskConfigure
    */
    name?: string;

    /**
     * root dir.
     *
     * @type {string}
     * @memberof ITaskConfigure
     */
    rootdir?: string;

    /**
     * task module.
     *
     * @type {Token<T>}
     * @memberof ITaskConfigure
     */
    task?: Token<T>;

    /**
     * the task builder.
     *
     * @type {(Token<IActivityBuilder> | IActivityBuilder)}
     * @memberof ITaskConfigure
     */
    builder?: Token<IActivityBuilder> | IActivityBuilder;

}

/**
 * task configure.
 *
 * @export
 * @interface IConfigure
 * @extends {IActivityConfigure<IActivity<any>>}
 */
export interface IConfigure extends IActivityConfigure<IActivity<any>> {

}
