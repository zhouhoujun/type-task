import * as cores from './core';
import * as assets from './assets';
import { DIModule } from '@ts-ioc/bootstrap';
import { PipeSetup } from './PipeSetup';
import { ActivitiesModule } from '@taskfr/node';


/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
@DIModule({
    imports: [
        PipeSetup,
        ActivitiesModule,
        cores,
        assets
    ],
    exports: [
        ActivitiesModule,
        cores,
        assets
    ]
})
export class PipeModule {
}
