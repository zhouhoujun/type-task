import { IActivity } from './IActivity';
import { Token, Type, IContainer, Inject, ContainerToken, Injectable } from '@ts-ioc/core';
import { InjectActivityContextToken, ActivityContextToken, InputDataToken, ActivityContext } from './ActivityContext';

@Injectable
export class ContextFactory {

    @Inject(ContainerToken)
    container: IContainer;

    constructor(private type: Type<IActivity>) {

    }

    create(data?: any, type?: Token<IActivity>, defCtx?: Token<ActivityContext>) {
        type = type || this.type;
        return this.container.getRefService(InjectActivityContextToken, type, defCtx || ActivityContextToken, { provide: InputDataToken, useValue: data });
    }
}
