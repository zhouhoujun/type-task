
import { IPropertyDecorator, PropertyMetadata, createPropDecorator, MetadataExtends, MetadataAdapter, isString, isNumber, isUndefined, isBoolean } from '@ts-ioc/core';
import { TestMetadata } from '../metadata';


/**
 * Test decorator type define.
 *
 * @export
 * @interface ITestDecorator
 * @template T
 */
export interface ITestDecorator<T extends TestMetadata> extends IPropertyDecorator<T> {
    (dbtype?: string, dbTest?: string, defaultValue?: any, required?: boolean): PropertyDecorator;
}


/**
 * create Test decorator.
 *
 * @export
 * @template T
 * @param {string} [TestType]
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metaExtends]
 * @returns {ITestDecorator<T>}
 */
export function createTestDecorator<T extends TestMetadata>(
    testType = 'Test',
    adapter?: MetadataAdapter,
    metaExtends?: MetadataExtends<T>): ITestDecorator<T> {
    return createPropDecorator<TestMetadata>('Test',
        args => {
            if (adapter) {
                adapter(args);
            }
            args.next<TestMetadata>({
                match: (arg) => isString(arg),
                setMetadata: (metadata, arg) => {
                    metadata.dbtype = arg;
                }
            });

            args.next<TestMetadata>({
                match: (arg) => isString(arg),
                setMetadata: (metadata, arg) => {
                    metadata.dbTest = arg;
                }
            });

            args.next<TestMetadata>({
                match: (arg) => isUndefined(arg),
                setMetadata: (metadata, arg) => {
                    metadata.defaultValue = arg;
                }
            });

            args.next<TestMetadata>({
                match: args => isBoolean(args),
                setMetadata: (metadata, arg) => {
                    metadata.required = arg;
                }
            });
        },
        metadata => {
            if (metaExtends) {
                metadata = metaExtends(metadata as T);
            }
            metadata.testType = testType;
            return metadata;
        }) as ITestDecorator<T>;
}

export const Test: ITestDecorator<TestMetadata> = createTestDecorator<TestMetadata>();

