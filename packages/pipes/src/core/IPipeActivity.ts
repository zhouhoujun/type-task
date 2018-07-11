import { IActivity, CtxType, Src } from '@taskfr/core';
import { ITransform } from './ITransform';
import { Registration } from '@ts-ioc/core';
import { IPipeConfigure } from './IPipeConfigure';
import { SrcOptions } from 'vinyl-fs';

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

/**
 * source pipe configure.
 *
 * @export
 * @interface IPipeSourceConfigure
 * @extends {IPipeConfigure}
 */
export interface ISourceConfigure extends IPipeConfigure {

    /**
     * transform source.
     *
     * @type {TransformSource}
     * @memberof IPipeConfigure
     */
    src?: CtxType<Src>;

    /**
     * src options.
     *
     * @type {CtxType<SrcOptions>}
     * @memberof IPipeConfigure
     */
    srcOptions?: CtxType<SrcOptions>;

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
 * Inject Pipe Activity Token
 *
 * @export
 * @class InjectPipeActivityToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectAssetActivityToken<T extends IPipeActivity> extends Registration<T> {
    constructor(desc: string) {
        super('AssetActivity', desc);
    }
}


/**
 * pipe activity token.
 */
export const PipeActivityToken = new InjectPipeActivityToken<IPipeActivity>('');
