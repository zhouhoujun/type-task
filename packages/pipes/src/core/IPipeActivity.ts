import { IActivityBuilder, GActivity } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Registration } from '@ts-ioc/core';
import { InjectBootBuilder, IBootBuilder } from '@ts-ioc/bootstrap';

/**
 * pipe task.
 *
 * @export
 * @interface IPipeTask
 * @extends {GActivity}
 * @template T
 */
export interface IPipeActivity extends GActivity<ITransform> {
    /**
     * pipe task
     *
     * @param {any} [data]
     * @returns {Promise<ITransform>}
     * @memberof IPipeTask
     */
    run(data?: any): Promise<ITransform>;
}


/**
 * Inject Pipe Activity Token
 *
 * @export
 * @class InjectPipeActivityToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectPipeActivityToken<T extends IPipeActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PipeActivity', desc);
    }
}


/**
 * pipe activity token.
 */
export const PipeActivityToken = new InjectPipeActivityToken<IPipeActivity>('');



/**
 * Inject PipeAcitityBuilder Token
 *
 * @export
 * @class InjectPipeAcitityBuilderToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectPipeAcitityBuilderToken<T extends IActivityBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('PipeActivityBuilder', desc);
    }
}

/**
 * pipe activity builder token.
 */
export const PipeBootBuilderToken = new InjectBootBuilder<IBootBuilder<IPipeActivity>>('pipe');
