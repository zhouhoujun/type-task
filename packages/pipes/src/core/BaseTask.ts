import { Task, ITask, IConfigure, RunWay } from '@taskp/core';
import { ITaskContext, TaskContextToken } from './ITaskContext';
import { Inject } from '@ts-ioc/core';
import { CtxType } from './pipeTypes';

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

    protected to<T>(target: CtxType<T>): T {
        return this.context.to(target, this.config);
    }
}
