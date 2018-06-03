import { TaskBuilder, ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskp/core';
import { Inject, ContainerToken, IContainer, Singleton, Token } from '@ts-ioc/core';
import { IPipeConfigure, IPipeSourceConfigure, IPipeDestConfigure } from './IPipeConfigure';
import { PipeDest } from './PipeDest';
import { PipeSource } from './PipeSource';
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
        if (config.src && !(taskInst instanceof PipeSource)) {
            let srcCfg = config as IPipeSourceConfigure;
            await this.buildChildren(taskInst as ITaskComponent, [{
                src: srcCfg.src,
                pipes: srcCfg.destPipes,
                srcOptions: srcCfg.srcOptions,
                task: PipeSource
            }]);
        }
        return taskInst;
    }

    async afterBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        if (config.dest && !(taskInst instanceof PipeDest)) {
            let destCfg = config as IPipeDestConfigure;
            await this.buildChildren(taskInst as ITaskComponent, [{
                dest: destCfg.dest,
                pipes: destCfg.destPipes,
                destOptions: destCfg.destOptions,
                task: PipeDest
            }]);
        }
        return taskInst;
    }
}
