import { TaskComponent } from './TaskComponent';
import { ITask } from './ITask';
import { Component, Abstract } from 'tsioc';
import { RunWay } from './RunWay';
import { ITaskComponent } from './ITaskComponent';


@Abstract()
export abstract class TaskElement extends TaskComponent<ITaskComponent> implements ITask {
    constructor(name: string, runWay = RunWay.seqFirst) {
        super(name, runWay);
    }

    protected abstract execute(data: any): Promise<any>;
}
