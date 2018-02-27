import { ITaskComponent } from './ITaskComponent';
import { Token } from 'tsioc';
import { IContext } from './IContext';


export interface IBuilder {
    build(componet: ITaskComponent, context: IContext, ...types: Token<any>[]): ITaskComponent;
}
