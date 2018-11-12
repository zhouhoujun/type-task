import { DIModule } from '@ts-ioc/bootstrap';
import * as core from './core';
import { BuildSetup } from './BuildSetup';
import { NodejsModule } from '@taskfr/node';

@DIModule({
    imports: [
        NodejsModule,
        BuildSetup,
        core
    ],
    exports: [
        NodejsModule,
        core
    ]
})
export class BuildModule {
}
