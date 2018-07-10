import { IActivity, ITaskBuilder, TaskBuilderToken } from '@taskfr/core';
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
export interface IPipeTask extends IActivity {

    /**
     * pipe task
     *
     * @param {any} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeTask
     */
    run(data?: any): Promise<ITransform>;
}

export const PipeToken = new InjectToken<IPipeTask>('__Task_Pipe');

/**
 * pipe task builder token.
 */
export const PipeTaskBuilderToken = new Registration<ITaskBuilder>(TaskBuilderToken, 'pipe');

/**
 * asset task builder token.
 */
export const AssetTaskBuilderToken = new Registration<ITaskBuilder>(TaskBuilderToken, 'Asset');


/**
 * package task builder token.
 */
export const PackageBuilderToken = new Registration<ITaskBuilder>(TaskBuilderToken, 'package');
