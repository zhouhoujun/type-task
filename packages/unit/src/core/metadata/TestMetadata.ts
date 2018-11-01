import { PropertyMetadata } from '@ts-ioc/core';


export interface TestMetadata extends PropertyMetadata {
    /**
     * Filed entends Decorator type.
     *
     * @type {string}
     * @memberof TestMetadata
     */
    testType?: string;
    /**
     * db type.
     *
     * @type {string}
     * @memberof TestMetadata
     */
    dbtype?: string;
    /**
     * db filed name. default use Test name.
     *
     * @type {string}
     * @memberof TestMetadata
     */
    dbTest?: string;

    /**
     * Test can required or not.
     *
     * @type {boolean}
     * @memberof TestMetadata
     */
    required?: boolean;

    /**
     * column db default value.
     *
     * @type {*}
     * @memberof TestMetadata
     */
    defaultValue?: any;

}
