import { AbstractActivity, Task, IActivity } from '../core';


@Task
export class Activity extends AbstractActivity implements IActivity {

    constructor() {
        super();
    }

    run(data?: any): Promise<any> {
        return Promise.resolve(data);
    }

}
