import * as cores from './core';
import * as assets from './assets';
import { DIModule } from '@ts-ioc/bootstrap';
import { PipeSetup } from './PipeSetup';
import { NodejsModule } from '@taskfr/node';


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
        cores,
        assets
    ],
    exports: [
        NodejsModule,
        cores,
        assets
    ]
})
export class PipeModule {
}
