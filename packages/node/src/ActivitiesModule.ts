import { DIModule } from '@ts-ioc/bootstrap';
import * as core from './core';
import * as shells from './shells';
import * as activities from './activities';

@DIModule({
    imports: [
        core,
        shells,
        activities
    ],
    exports: [
        core,
        shells,
        activities
    ]
})
export class ActivitiesModule {
}
