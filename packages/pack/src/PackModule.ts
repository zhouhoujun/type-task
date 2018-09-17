import { DIModule } from '@ts-ioc/bootstrap';
import { ActivitiesModule } from '@taskfr/node';
import * as build from './build';
import * as generate from './generate';

@DIModule({
    imports: [
        ActivitiesModule,
        build,
        generate
    ],
    exports: [
        build,
        generate
    ]
})
export class PackModule {

}
