import { DIModule } from '@ts-ioc/bootstrap';
import { ActivitiesModule } from '@taskfr/node';
import * as builds from './build';
import * as generate from './generate';

@DIModule({
    imports: [
        ActivitiesModule,
        builds,
        generate
    ],
    exports: [
        builds,
        generate
    ]
})
export class PackModule {

}
