import { DIModule } from '@ts-ioc/bootstrap';
import { ActivitiesModule } from '@taskfr/node';
import * as builders from './builders';
import * as generate from './generate';

@DIModule({
    imports: [
        ActivitiesModule,
        builders,
        generate
    ],
    exports: [
        builders,
        generate
    ]
})
export class PackModule {

}
