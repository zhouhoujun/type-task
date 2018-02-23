import { TaskComposite } from './TaskComposite';
import { TaskComponent } from './TaskComponent';
import { ITask } from './ITask';



export class TaskElement extends TaskComposite<TaskComponent> implements ITask {
    
}