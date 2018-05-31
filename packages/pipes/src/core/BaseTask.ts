import { Task, ITask, IConfigure, RunWay } from '@taskp/core';
import { ITaskContext, TaskContextToken } from './ITaskContext';
import { Inject } from '@ts-ioc/core';

@Task
export class BaseTask implements ITask {

    config: IConfigure;

    runWay = RunWay.seqFirst;

    @Inject(TaskContextToken)
    context: ITaskContext;

    constructor(public name: string) {

    }

    run(data?: any): Promise<any> {
        return Promise.resolve(data);
    }
}
