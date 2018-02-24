import { TaskComposite } from './TaskComposite';
import { TaskComponent } from './TaskComponent';
import { ITask } from './ITask';
import { Component } from 'tsioc';


@Component
export class TaskElement extends TaskComposite<TaskComponent> implements ITask {

}
