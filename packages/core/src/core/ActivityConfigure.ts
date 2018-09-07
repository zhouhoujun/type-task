import { IActivity, GActivity } from './IActivity';
import { Token, isToken, isMetadataObject, isString, isUndefined, isArray } from '@ts-ioc/core';
import { ModuleConfig } from '@ts-ioc/bootstrap';
import { IActivityRunner } from './IActivityRunner';
import { ExpressionActivity } from './ExpressionActivity';
import { ActivityRunner } from './ActivityRunner';


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
 * async result.
 */
export type AsyncResult<T> = (activity?: IActivity, data?: any) => Promise<T>;

/**
 * activity result.
 */
export type ActivityResult<T> = Promise<T> | AsyncResult<T> | ExpressionActivity<T> | IActivityRunner<T>;

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
export type ExpressionToken<T> = Expression<T> | Token<ExpressionActivity<T>>;

/**
 * ActivityResult type
 */
export type ActivityResultType<T> = Token<GActivity<T>> | Token<any> | IActivityConfigure<T>;

/**
 * expression type.
 */
export type ExpressionType<T> = Expression<T> | ActivityResultType<T>;

/**
 * core activities configures.
 */
export type CoreActivityConfigure = IActivityConfigure<any> | ActivityConfigure | ConfirmConfigure | DelayConfigure | DoWhileConfigure
    | IfConfigure | IntervalConfigure | ParallelConfigure | SequenceConfigure | SwitchConfigure
    | ThrowConfigure | TryCatchConfigure | WhileConfigure;

/**
 * activity type.
 */
export type ActivityType<T extends IActivity> = Token<T> | CoreActivityConfigure;

export type Active = ActivityType<IActivity>;

/**
 * activity configure type.
 */
export type ConfigureType<T extends IActivity, TC extends ActivityConfigure> = Token<T> | TC;

/**
 * target is activity runner.
 *
 * @export
 * @param {*} target
 * @returns {target is IActivityRunner<any>}
 */
export function isActivityRunner(target: any): target is IActivityRunner<any> {
    return target instanceof ActivityRunner;
}

/**
 * check target is activity type or not.
 *
 * @export
 * @param {*} target
 * @returns {target is ActivityType<any>}
 */
export function isActivityType(target: any, check = true): target is ActivityType<any> {
    if (!target) {
        return false;
    }

    if (isActivityRunner(target)) {
        return false;
    }

    // forbid string token for activity.
    if (isString(target)) {
        return false;
    }

    if (isToken(target)) {
        return true;
    }

    if (isMetadataObject(target)) {
        if (check) {
            return !!(target.activity || target.task || target.bootstrap);
        }
        return true;
    }

    return false;
}

/**
 * ActivityConfigure
 *
 * @export
 * @interface IActivityConfigure
 * @extends {ModuleConfig<T>}
 * @template T
 */
export interface IActivityConfigure<T> extends ModuleConfig<T> {

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
     * run baseURL.
     *
     * @type {string}
     * @memberof ITaskConfigure
     */
    baseURL?: string;

    /**
     * activity module.
     *
     * @type {Token<T>}
     * @memberof ITaskConfigure
     */
    task?: Token<T>;

    /**
     * activity module.
     *
     * @type {Token<T>}
     * @memberof ITaskConfigure
     */
    activity?: Token<T>;

}

/**
 * task configure.
 *
 * @export
 * @interface IConfigure
 * @extends {IActivityConfigure<IActivity>}
 */
export interface ActivityConfigure extends IActivityConfigure<IActivity> {

}

export function isConfirmConfigure(target: any): target is ConfirmConfigure {
    return isMetadataObject(target) && !isUndefined(target.confirm);
}
/**
 * Confirm activity configure.
 *
 * @export
 * @interface ConfirmConfigure
 * @extends {ActivityConfigure}
 */
export interface ConfirmConfigure extends ActivityConfigure {
    /**
     * confirm expression.
     *
     * @type {ExpressionType<boolean>}
     * @memberof ConfirmConfigure
     */
    confirm: ExpressionType<boolean>;
}


export function isDelayConfigure(target: any): target is DelayConfigure {
    return isMetadataObject(target) && !isUndefined(target.delay);
}

/**
 * delay activity configure.
 *
 * @export
 * @interface DelayConfigure
 * @extends {ActivityConfigure}
 */
export interface DelayConfigure extends ActivityConfigure {
    /**
     * delay ms.
     *
     * @type {ExpressionType<number>}
     * @memberof DelayConfigure
     */
    delay: ExpressionType<number>;
}


export function isDoWhileConfigure(target: any): target is DoWhileConfigure {
    return isMetadataObject(target) && !isUndefined(target.do) && !isUndefined(target.while);
}
/**
 * DoWhile activity configure.
 *
 * @export
 * @interface DoWhileConfigure
 * @extends {ActivityConfigure}
 */
export interface DoWhileConfigure extends ActivityConfigure {
    /**
     * do while
     *
     * @type {ActivityType<IActivity>}
     * @memberof DoWhileConfigure
     */
    do: ActivityType<IActivity>;

    /**
     * while condition
     *
     * @type {ExpressionType<boolean>}
     * @memberof DoWhileConfigure
     */
    while: ExpressionType<boolean>;
}


export function isIfConfigure(target: any): target is IfConfigure {
    return isMetadataObject(target) && !isUndefined(target.if) && !isUndefined(target.ifBody);
}
/**
 * If activity configure.
 *
 * @export
 * @interface IfConfigure
 * @extends {ActivityConfigure}
 */
export interface IfConfigure extends ActivityConfigure {

    /**
     * while condition
     *
     * @type {ExpressionType<boolean>}
     * @memberof IfConfigure
     */
    if: ExpressionType<boolean>;

    /**
     * if body
     *
     * @type {ActivityType<IActivity>}
     * @memberof IfConfigure
     */
    ifBody: ActivityType<IActivity>;

    /**
     * else body
     *
     * @type {ActivityType<IActivity>}
     * @memberof IfConfigure
     */
    elseBody?: ActivityType<IActivity>;

}




export function isIntervalConfigure(target: any): target is IntervalConfigure {
    return isMetadataObject(target) && !isUndefined(target.interval) && !isUndefined(target.body);
}

/**
 * Interval activity configure.
 *
 * @export
 * @interface IntervalConfigure
 * @extends {ActivityConfigure}
 */
export interface IntervalConfigure extends ActivityConfigure {
    /**
     * Interval ms.
     *
     * @type {ExpressionType<number>}
     * @memberof IntervalConfigure
     */
    interval: ExpressionType<number>;

    /**
     * Interval body.
     *
     * @type {ActivityType<IActivity>}
     * @memberof WhileConfigure
     */
    body: ActivityType<IActivity>
}


export function isParallelConfigure(target: any): target is ParallelConfigure {
    return isMetadataObject(target) && isArray(target.parallel);
}
/**
 * Parallel activity configure.
 *
 * @export
 * @interface ParallelConfigure
 * @extends {ActivityConfigure}
 */
export interface ParallelConfigure extends ActivityConfigure {
    /**
     * parallel activities.
     *
     * @type {ActivityType<IActivity>[]}
     * @memberof ParallelConfigure
     */
    parallel: ActivityType<IActivity>[];
}

export function isSequenceConfigure(target: any): target is SequenceConfigure {
    return isMetadataObject(target) && isArray(target.sequence);
}
/**
 * sequence activity configure.
 *
 * @export
 * @interface SequenceConfigure
 * @extends {ActivityConfigure}
 */
export interface SequenceConfigure extends ActivityConfigure {
    /**
     * sequence activities.
     *
     * @type {ActivityType<IActivity>[]}
     * @memberof IConfigure
     */
    sequence: ActivityType<IActivity>[];
}


export function isSwitchConfigure(target: any): target is SwitchConfigure {
    return isMetadataObject(target) && !isUndefined(target.cases);
}
/**
 * Switch activity configure.
 *
 * @export
 * @interface SwitchConfigure
 * @extends {ActivityConfigure}
 */
export interface SwitchConfigure extends ActivityConfigure {

    /**
     * while condition
     *
     * @type {ExpressionType<any>}
     * @memberof SwitchConfigure
     */
    expression: ExpressionType<any>;

    /**
     * if body
     *
     * @type {KeyValue<any, ActivityType<IActivity>>[]}
     * @memberof SwitchConfigure
     */
    cases: KeyValue<any, ActivityType<IActivity>>[];

    /**
     * default body
     *
     * @type {ActivityType<IActivity>}
     * @memberof SwitchConfigure
     */
    defaultBody?: ActivityType<IActivity>;
}


/**
 * Throw activity configure.
 *
 * @export
 * @interface ThrowConfigure
 * @extends {ActivityConfigure}
 */
export interface ThrowConfigure extends ActivityConfigure {
    /**
     * delay ms.
     *
     * @type {CtxType<number>}
     * @memberof ThrowConfigure
     */
    exception?: Expression<Error> | ActivityResultType<Error>;
}


/**
 * TryCatch activity configure.
 *
 * @export
 * @interface TryCatchConfigure
 * @extends {ActivityConfigure}
 */
export interface TryCatchConfigure extends ActivityConfigure {
    /**
     * try activity.
     *
     * @type {CtxType<number>}
     * @memberof TryCatchConfigure
     */
    try: ActivityType<IActivity>;

    /**
     * catchs activities.
     *
     * @type {ActivityType<IActivity>[]}
     * @memberof TryCatchConfigure
     */
    catchs: ActivityType<IActivity>[];

    /**
     * finally activity.
     *
     * @type {ActivityType<IActivity>}
     * @memberof TryCatchConfigure
     */
    finally?: ActivityType<IActivity>;
}


/**
 * While activity configure.
 *
 * @export
 * @interface WhileConfigure
 * @extends {ActivityConfigure}
 */
export interface WhileConfigure extends ActivityConfigure {

    /**
     * while condition
     *
     * @type {(ExpressionType<boolean>)}
     * @memberof WhileConfigure
     */
    while: ExpressionType<boolean>;

    /**
     * while body.
     *
     * @type {ActivityType<IActivity>}
     * @memberof WhileConfigure
     */
    body: ActivityType<IActivity>;
}
