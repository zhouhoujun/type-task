import { DIModule } from '@ts-ioc/bootstrap';
import * as core from './core';
import * as build from './build';
import * as shells from './shells';
import * as activities from './activities';

@DIModule({
    imports: [
        core,
        activities,
        shells,
        build
    ],
    exports: [
        core,
        activities,
        shells,
        build
    ]
})
export class NodejsModule {
}
