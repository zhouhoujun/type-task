import { ITaskComponent } from './core/index';

export interface IWorkInstance {
    component: ITaskComponent;

    start();
    stop();
    pause();
    complete();
}