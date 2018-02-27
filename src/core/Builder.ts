import { IBuilder } from './IBuilder';
import { ITaskComponent } from './ITaskComponent';
import { Type, hasOwnClassMetadata, Singleton, Inject, symbols, IContainer } from 'tsioc';
import { Task } from './decorators/index';
import { IContext } from '.';

@Singleton
export class Builder implements IBuilder {

    @Inject(symbols.IContainer)
    container: IContainer;

    constructor() {

    }

    build(component: ITaskComponent, context: IContext, ...types: Type<any>[]): ITaskComponent {
        this.filterTask(types)
            .forEach(ty => {
                component.add(this.container.resolve(ty, context.getExecData(ty)));
            });
        return component;
    }


    filterTask(types: Type<any>[]) {
        return types.filter(ty => hasOwnClassMetadata(Task, ty))
    }
}
