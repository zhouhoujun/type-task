import { DIModule } from '@ts-ioc/bootstrap';
import { NodejsModule } from '@taskfr/node';
import * as builds from './build';
import * as generate from './generate';

@DIModule({
    imports: [
        NodejsModule,
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
