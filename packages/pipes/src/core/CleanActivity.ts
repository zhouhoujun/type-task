import {
    Src, Activity, InjectAcitityToken, Task, ActivityConfigure,
    Expression, InjectAcitityBuilderToken,
    IActivity, ExpressionType, ActivityBuilder
} from '@taskfr/core';
import { Inject, Injectable } from '@ts-ioc/core';
import { PipeContextToken, IPipeContext } from './IPipeContext';
const del = require('del');


/**
 * clean task token.
 */
export const CleanToken = new InjectAcitityToken<CleanActivity>('clean');
/**
 * clean activity builder token
 */
export const CleanActivityBuilderToken = new InjectAcitityBuilderToken<CleanActivityBuilder>('clean');

/**
 * clean configure
 *
 * @export
 * @interface ICleanConfigure
 * @extends {ActivityConfigure}
 */
export interface CleanConfigure extends ActivityConfigure {
    /**
     * clean match.
     *
     * @type {ExpressionType<Src>}
     * @memberof ICleanConfigure
     */
    clean: ExpressionType<Src>;
}


/**
 * clean task.
 */
@Task(CleanToken, CleanActivityBuilderToken)
export class CleanActivity extends Activity<any> {

    /**
     * context.
     *
     * @type {IPipeContext}
     * @memberof BaseTask
     */
    @Inject(PipeContextToken)
    context: IPipeContext;
    /**
     * clean source.
     *
     * @type {Expression<Src>}
     * @memberof CleanActivity
     */
    clean: Expression<Src>;
    /**
     * run clean.
     *
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof CleanActivity
     */
    async run(data?: any): Promise<any> {
        let clean = await this.context.exec(this, this.clean, data);
        return await del(clean);
    }
}

/**
 * clean activity builder.
 *
 * @export
 * @class CleanActivityBuilder
 * @extends {ActivityBuilder}
 */
@Injectable(CleanActivityBuilderToken)
export class CleanActivityBuilder extends ActivityBuilder {

    /**
     * clean build startegy.
     *
     * @param {IActivity} activity
     * @param {CleanConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof CleanActivityBuilder
     */
    async buildStrategy(activity: IActivity, config: CleanConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof CleanActivity) {
            activity.clean = await this.toExpression(config.clean, activity);
        }
        return activity;
    }
}
