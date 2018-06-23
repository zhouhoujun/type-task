import { PipeElement } from '../core/index';
import { Package } from '../decorators/index';
import { Src } from '@taskfr/core';

@Package
export class PackageTask extends PipeElement {

    /**
     * watch src
     *
     * @type {(boolean | Src)}
     * @memberof PipeSource
     */
    watch?: boolean | Src;

    constructor(name?: string) {
        super(name);
    }
}
