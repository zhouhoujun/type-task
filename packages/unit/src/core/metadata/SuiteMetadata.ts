import { ClassMetadata } from '@ts-ioc/core';


export interface SuiteMetadata extends ClassMetadata {
    /**
     * Suite type.
     *
     * @type {string}
     * @memberof SuiteMetadata
     */
    suiteType?: string;
    /**
     * db table name. default use class name.
     *
     * @type {string}
     * @memberof FieldMetadata
     */
    describe?: string;

}
