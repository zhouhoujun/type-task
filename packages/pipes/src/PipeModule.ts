import * as cores from './core';
import { DIModule } from '@ts-ioc/bootstrap';
import { PipeSetup } from './PipeSetup';
import { NodejsModule } from '@taskfr/node';
import { BuildModule } from '@taskfr/build';


/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
@DIModule({
    imports: [
        PipeSetup,
        NodejsModule,
        BuildModule,
        cores
    ],
    exports: [
        NodejsModule,
        BuildModule,
        cores
    ]
})
export class PipeModule {
}
