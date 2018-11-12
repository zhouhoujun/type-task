import { ITaskDecorator, createTaskDecorator, IActivity, InjectAcitityBuilderToken } from '@taskfr/core';
import { Registration } from '@ts-ioc/core';
import { PackConfigure } from '../core/PackConfigure';
import { IPackActivity } from '../core/IPackActivity';



/**
 * asset task metadata.
 *
 * @export
 * @interface PackMetadata
 * @extends {PackConfigure}
 */
export interface PackMetadata extends PackConfigure {

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
