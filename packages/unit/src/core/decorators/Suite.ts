import { TypeMetadata, IClassMethodDecorator, MetadataAdapter, MetadataExtends, createClassDecorator, IClassDecorator } from '@ts-ioc/core';
import { SuiteMetadata } from '../metadata';
import { isString } from 'util';


/**
 * Suite decorator type define.
 *
 * @export
 * @interface ISuiteDecorator
 * @template T
 */
export interface ISuiteDecorator<T extends SuiteMetadata> extends IClassDecorator<T> {
    (dbtable?: string): ClassDecorator;
}

/**
 * create filed decorator.
 *
 * @export
 * @template T
 * @param {string} [SuiteType]
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metaExtends]
 * @returns {IFiledDecorator<T>}
 */
export function createSuiteDecorator<T extends SuiteMetadata>(
    suiteType = 'Suite',
    adapter?: MetadataAdapter,
    metaExtends?: MetadataExtends<T>): ISuiteDecorator<T> {
    return createClassDecorator<SuiteMetadata>('Suite',
        args => {
            if (adapter) {
                adapter(args);
            }
            args.next<SuiteMetadata>({
                match: (arg) => isString(arg),
                setMetadata: (metadata, arg) => {
                    metadata.describe = arg;
                }
            });
        },
        metadata => {
            if (metaExtends) {
                metadata = metaExtends(metadata as T);
            }
            metadata.suiteType = suiteType;
            return metadata;
        }) as ISuiteDecorator<T>;
}

export const Suite: IClassMethodDecorator<TypeMetadata> = createSuiteDecorator<TypeMetadata>();
