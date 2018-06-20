import { PipeElement } from '../core/index';
import { Package } from '../decorators/index';

@Package
export class PackageTask extends PipeElement {
    constructor(name?: string) {
        super(name);
    }
}
