import { TaskBuilder, ITask, IConfigure, TaskBuilderToken, TaskType, IContext } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, isClass, isMetadataObject, isUndefined, Token, Registration } from '@ts-ioc/core';
import { IPipeConfigure } from './IPipeConfigure';
import { IPipeComponent } from './IPipeComponent';
import { TransformMergerExpress, TransformMerger, TransformType, TransformExpress } from './pipeTypes';
import { IPipeTask, PipeToken } from './IPipeTask';

/**
 * pipe task builder.
 *
 * @export
 * @class PipeTaskBuilder
 * @extends {TaskBuilder}
 */
@Singleton(TaskBuilderToken, 'pipe')
export class PipeTaskBuilder extends TaskBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: ITask, config: IConfigure): Promise<ITask> {
        await super.beforeBindConfig(taskInst, config);
        let comp = taskInst as IPipeComponent;
        let pipeCfg = config as IPipeConfigure;
        if (!isUndefined(pipeCfg.awaitPiped)) {
            comp.awaitPiped = taskInst.context.to(pipeCfg.awaitPiped);
        }
        if (pipeCfg.pipes) {
            comp.pipes = this.translatePipes(taskInst.context, pipeCfg.pipes);
        }
        if (pipeCfg.merger) {
            comp.merger = this.translateMerger(taskInst.context, pipeCfg.merger);
        }
        return taskInst;
    }

    protected traslateStrToken(token: string): Token<ITask> {
        let taskToken = new Registration(PipeToken, token);
        if (this.container.has(token)) {
            return taskToken;
        }
        return super.traslateStrToken(token);
    }

    protected translatePipes(context: IContext, pipes: TransformExpress): TransformType[] {
        let trsfs: (TransformType | TaskType<IPipeTask>)[] = context.to(pipes);
        if (!trsfs || trsfs.length < 1) {
            return [];
        }
        return trsfs.map(p => {
            if (isClass(p) && context.isTask(p)) {
                return context.getRunner(p);
            }
            if (isMetadataObject(p)) {
                let cfg = p as IConfigure;
                if (cfg.task || cfg.bootstrap) {
                    return context.getRunner(cfg);
                } else {
                    throw new Error('pipe configure error');
                }
            }
            return p as TransformType;
        });
    }

    protected translateMerger(context: IContext, mergerExp: TransformMergerExpress): TransformMerger {
        let mt: (TransformMerger | TaskType<IPipeTask>) = context.to(mergerExp);
        if (!mt) {
            return null;
        }
        let merger: TransformMerger;

        if (isClass(mt) && context.isTask(mt)) {
            merger = context.getRunner(mt);
        } else if (isMetadataObject(mt)) {
            let cfg = mt as IConfigure;
            if (cfg.task || cfg.bootstrap) {
                merger = context.getRunner(cfg);
            } else {
                throw new Error('pipe configure error');
            }
        } else {
            merger = mt as TransformMerger;
        }

        return merger;
    }

}
