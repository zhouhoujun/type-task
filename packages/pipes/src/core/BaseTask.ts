import { AbstractTask, Task } from '@taskp/core';
import { ITaskContext, TaskContextToken } from './ITaskContext';
import { Inject } from '@ts-ioc/core';

@Task
export class BaseTask extends AbstractTask {

    @Inject(TaskContextToken)
    context: ITaskContext;

    constructor(name: string) {
        super(name);
    }

    run(data?: any): Promise<any> {
        return Promise.resolve(data);
    }
}
