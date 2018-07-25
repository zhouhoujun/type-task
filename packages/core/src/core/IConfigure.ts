import { IActivity, GActivity } from './IActivity';
import { Token, isToken, isMetadataObject, isString } from '@ts-ioc/core';
import { ModuleConfiguration } from '@ts-ioc/bootstrap';
import { IActivityRunner } from './ITaskRunner';


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
export type AsyncResult<T> = (activity?: GActivity<T>, data?: any) => Promise<T>;

/**
 * activity result.
 */
export type ActivityResult<T> = Promise<T> | AsyncResult<T> | GActivity<T> | IActivityRunner<T>;


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
 * ActivityResult type
 */
export type ActivityResultType<T> = Token<GActivity<T>> | IActivityConfigure<GActivity<T>>;

/**
 * expression type.
 */
export type ExpressionType<T> = Expression<T> | ActivityResultType<T>;

/**
 * core activities configures.
 */
export type CoreActivityConfigure = IConfigure | ConfirmConfigure | DelayConfigure | DoWhileConfigure
    | IfConfigure | IntervalConfigure | ParallelConfigure | SequenceConfigure | SwitchConfigure
    | ThrowConfigure | TryCatchConfigure | WhileConfigure;

/**
 * activity type.
 */
export type ActivityType<T extends IActivity> = Token<T> | CoreActivityConfigure;
/**
 * activity configure type.
 */
export type ConfigureType<T extends IActivity, TC extends IConfigure> = Token<T> | TC;

/**
 * check target is activity type or not.
 *
 * @export
 * @param {*} target
 * @returns {target is ActivityType<any>}
 */
export function isActivityType(target: any, check = true): target is ActivityResultType<any> {
    if (!target) {
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
            return !!(target.task || target.bootstrap);
        }
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
export interface IActivityConfigure<T> extends ModuleConfiguration<T> {

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
     * task module.
     *
     * @type {Token<T>}
     * @memberof ITaskConfigure
     */
    task?: Token<T>;

}

/**
 * task configure.
 *
 * @export
 * @interface IConfigure
 * @extends {IActivityConfigure<IActivity<any>>}
 */
export interface IConfigure extends IActivityConfigure<IActivity> {

}

/**
 * Confirm activity configure.
 *
 * @export
 * @interface ConfirmConfigure
 * @extends {IConfigure}
 */
export interface ConfirmConfigure extends IConfigure {
    /**
     * confirm expression.
     *
     * @type {ExpressionType<boolean>}
     * @memberof ConfirmConfigure
     */
    confirm?: ExpressionType<boolean>;
}


/**
 * delay activity configure.
 *
 * @export
 * @interface DelayConfigure
 * @extends {IConfigure}
 */
export interface DelayConfigure extends IConfigure {
    /**
     * delay ms.
     *
     * @type {ExpressionType<number>}
     * @memberof DelayConfigure
     */
    delay?: ExpressionType<number>;
}

/**
 * DoWhile activity configure.
 *
 * @export
 * @interface DoWhileConfigure
 * @extends {IConfigure}
 */
export interface DoWhileConfigure extends IConfigure {
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


/**
 * If activity configure.
 *
 * @export
 * @interface IfConfigure
 * @extends {IConfigure}
 */
export interface IfConfigure extends IConfigure {

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



/**
 * Interval activity configure.
 *
 * @export
 * @interface IntervalConfigure
 * @extends {IConfigure}
 */
export interface IntervalConfigure extends IConfigure {
    /**
     * Interval ms.
     *
     * @type {ExpressionType<number>}
     * @memberof IntervalConfigure
     */
    interval: ExpressionType<number>;

    /**
     * while body.
     *
     * @type {ActivityType<IActivity>}
     * @memberof WhileConfigure
     */
    body?: ActivityType<IActivity>
}

/**
 * Parallel activity configure.
 *
 * @export
 * @interface ParallelConfigure
 * @extends {IConfigure}
 */
export interface ParallelConfigure extends IConfigure {
    /**
     * parallel activities.
     *
     * @type {ActivityType<IActivity>[]}
     * @memberof ParallelConfigure
     */
    parallel?: ActivityType<IActivity>[];
}

/**
 * sequence activity configure.
 *
 * @export
 * @interface SequenceConfigure
 * @extends {IConfigure}
 */
export interface SequenceConfigure extends IConfigure {
    /**
     * sequence activities.
     *
     * @type {ActivityType<IActivity>[]}
     * @memberof IConfigure
     */
    sequence?: ActivityType<IActivity>[];
}

/**
 * Switch activity configure.
 *
 * @export
 * @interface SwitchConfigure
 * @extends {IConfigure}
 */
export interface SwitchConfigure extends IConfigure {

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
 * @extends {IConfigure}
 */
export interface ThrowConfigure extends IConfigure {
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
 * @extends {IConfigure}
 */
export interface TryCatchConfigure extends IConfigure {
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
 * @extends {IConfigure}
 */
export interface WhileConfigure extends IConfigure {

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
