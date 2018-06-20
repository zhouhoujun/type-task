import { IPipeSource } from '../core/index';
import { InjectToken } from '@ts-ioc/core';

/**
 * source provider.
 *
 * @export
 * @interface IAssetPipe
 * @extends {IPipeComponent}
 */
export interface IAssetPipe extends IPipeSource {

}

/**
 * asset task token.
 */
export const AssetToken = new InjectToken<IAssetPipe>('__Task_Asset');

