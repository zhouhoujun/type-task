import { IComponent, Composite } from 'tsioc';


export class TaskComposite extends Composite {
    constructor(taskName: string) {
        super(taskName)
    }
}
