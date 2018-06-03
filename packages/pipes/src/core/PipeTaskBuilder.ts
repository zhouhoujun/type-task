import { TaskBuilder, ITask, IConfigure, TaskBuilderToken, ITaskComponent } from '@taskp/core';
import { Inject, ContainerToken, IContainer, Singleton, Token } from '@ts-ioc/core';
import { IPipeConfigure, IPipeSourceConfigure, IPipeDestConfigure } from './IPipeConfigure';
import { PipeDest } from './PipeDest';
import { PipeSource } from './PipeSource';

@Singleton(TaskBuilderToken, 'pipe')
export class PipeTaskBuilder extends TaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        await super.beforeBindConfig(taskInst, config);
        if (config.src) {
            let srcCfg = config as IPipeSourceConfigure;
            await this.buildChildren(taskInst as ITaskComponent, [{
                src: srcCfg.src,
                srcOptions: srcCfg.srcOptions,
                task: PipeSource
            }]);
        }
        return taskInst;
    }

    async afterBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        if (config.dest) {
            let srcCfg = config as IPipeDestConfigure;
            await this.buildChildren(taskInst as ITaskComponent, [{
                dest: srcCfg.dest,
                destOptions: srcCfg.destOptions,
                task: PipeDest
            }]);
        }
        return taskInst;
    }


    getConfigure(modules?: Token<any> | IConfigure, moduleDecorator?: Function | string): IConfigure {
        let cfg: IConfigure = super.getConfigure(modules, moduleDecorator);
        if (cfg.src) {
            let source = cfg as IPipeSourceConfigure;
            cfg.children = cfg.children || [];
            cfg.children.unshift({
                src: source.src,
                task: PipeSource
            })

        }
        return cfg;
    }
}
