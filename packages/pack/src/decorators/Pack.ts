import { ITaskDecorator, createTaskDecorator, ExpressionToken, Src, ConfigureType, IActivity, InjectAcitityBuilderToken } from '@taskfr/core';
import { BuildConfigure, CleanActivity, CleanConfigure, TestActivity, TestConfigure } from '@taskfr/build';
import { Registration } from '@ts-ioc/core';

export interface PackConfigure extends BuildConfigure {
    /**
     * clean task config.
     *
     * @type {(ExpressionToken<Src> | ConfigureType<CleanActivity, CleanConfigure>)}
     * @memberof PackConfigure
     */
    clean?: ExpressionToken<Src> | ConfigureType<CleanActivity, CleanConfigure>;

    /**
     * clean task config.
     *
     * @type {(ExpressionToken<Src> | ConfigureType<CleanActivity, CleanConfigure>)}
     * @memberof PackConfigure
     */
    test?: ExpressionToken<Src> | ConfigureType<TestActivity, TestConfigure>;
}

/**
 * package activity.
 *
 * @export
 * @interface IPackActivity
 * @extends {IActivity}
 */
export interface IPackActivity extends IActivity {

}

/**
 * inject package token.
 *
 * @export
 * @class InjectPackToken
 * @extends {Registration<T>}
 * @template T
 */
export class InjectPackToken<T extends IPackActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PackActivity', desc);
    }
}

/**
 * pack build activity token
 */
export const PackToken = new InjectPackToken<IPackActivity>('');

/**
 * pack build activity builder token.
 */
export const PackBuilderToken = new InjectAcitityBuilderToken<IActivity>(PackToken);

/**
 * package task decorator, use to define class is a asset task element.
 *
 * @Pack
 */
export const Pack: ITaskDecorator<PackConfigure> = createTaskDecorator<PackConfigure>('Pack', PackBuilderToken);
