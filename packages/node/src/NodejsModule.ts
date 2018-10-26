import { DIModule } from '@ts-ioc/bootstrap';
import * as core from './core';
import * as build from './build';
import * as shells from './shells';
import * as activities from './activities';
import * as transform from './transform';
@DIModule({
    imports: [
        core,
        activities,
        transform,
        shells,
        build
    ],
    exports: [
        core,
        activities,
        transform,
        shells,
        build
    ]
})
export class NodejsModule {
}
