import { Task, ITask, IConfigure, RunWay } from '@taskp/core';
import { IPipeContext, PipeContextToken } from './IPipeContext';
import { Inject } from '@ts-ioc/core';

@Task
export class BaseTask implements ITask {

    config: IConfigure;

    runWay = RunWay.seqFirst;

    @Inject(PipeContextToken)
    context: IPipeContext;

    constructor(public name: string) {

    }

    run(data?: any): Promise<any> {
        return Promise.resolve(data);
    }
}
