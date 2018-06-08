import { TaskBuilder, ITask, IConfigure, TaskBuilderToken } from '@taskp/core';
import { Inject, ContainerToken, IContainer, Singleton } from '@ts-ioc/core';
import { IPipeConfigure } from './IPipeConfigure';
import { IPipeComponent } from './IPipeComponent';

@Singleton(TaskBuilderToken, 'pipe')
export class PipeTaskBuilder extends TaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        await super.beforeBindConfig(taskInst, config);
        let comp = taskInst as IPipeComponent;
        let pipeCfg = config as IPipeConfigure;
        if (pipeCfg.pipes) {
            comp.setPipes(pipeCfg.pipes);
        }
        if (pipeCfg.merger) {
            comp.setMerger(pipeCfg.merger);
        }
        return taskInst;
    }

}
