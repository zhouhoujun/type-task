import { IActivity, IActivityBuilder, ActivityBuilderToken } from '@taskfr/core';
import { ITransform } from './ITransform';
import { InjectToken, Registration } from '@ts-ioc/core';


/**
 * pipe task.
 *
 * @export
 * @interface IPipeTask
 * @extends {IActivity}
 * @template T
 */
export interface IPipeActivity extends IActivity<ITransform> {

    /**
     * pipe task
     *
     * @param {any} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeTask
     */
    run(data?: any): Promise<ITransform>;
}

export const PipeToken = new InjectToken<IPipeActivity>('__Task_Pipe');

/**
 * pipe task builder token.
 */
export const PipeTaskBuilderToken = new Registration<IActivityBuilder>(ActivityBuilderToken, 'pipe');

/**
 * asset task builder token.
 */
export const AssetTaskBuilderToken = new Registration<IActivityBuilder>(ActivityBuilderToken, 'Asset');


/**
 * package task builder token.
 */
export const PackageBuilderToken = new Registration<IActivityBuilder>(ActivityBuilderToken, 'package');
