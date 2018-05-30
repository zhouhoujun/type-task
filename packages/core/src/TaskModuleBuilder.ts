import { ModuleBuilder, Injectable, ModuleBuilderToken, Inject, ContainerToken, IContainer, Token, Type } from '@ts-ioc/core';
import { ITask, IConfigure } from './core/index';

@Injectable(ModuleBuilderToken, 'task')
export class TaskModuleBuilder extends ModuleBuilder<ITask> {

    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    protected getBootstrapToken(cfg: IConfigure, token?: Token<ITask> | Type<any>): Token<ITask> {
        return cfg.task || cfg.bootstrap || token;
    }

}
