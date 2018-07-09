import { IPipeSource } from '../core';
import { InjectToken } from '@ts-ioc/core';

/**
 * source provider.
 *
 * @export
 * @interface IAssetPipe
 * @extends {IPipeComponent}
 */
export interface IAsset extends IPipeSource {

}

/**
 * asset task token.
 */
export const AssetToken = new InjectToken<IAsset>('__Task_Asset');

