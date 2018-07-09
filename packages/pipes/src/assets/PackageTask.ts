import { PipeElement } from '../core';
import { Package } from '../decorators';
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
