import { PipeElement } from '../core/index';
import { Packager } from '../decorators/index';

@Packager
export class PackageTask extends PipeElement {
    constructor(name?: string) {
        super(name);
    }
}
