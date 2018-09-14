import { DIModule } from '@ts-ioc/bootstrap';

import * as cores from './core';
import * as activities from './activities';
import { ActivitiesModule } from '@taskfr/node';

@DIModule({
    imports: [
        ActivitiesModule,
        cores,
        activities
    ],
    exports: [
        cores,
        activities
    ]
})
export class PackModule {

}
