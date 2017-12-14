import { RunWay } from './RunWay';
import { IOrder } from './IOrder';
import { ITaskContext } from './ITaskContext';
import { ITransform } from './ITransform';
import { IPipe } from './IPipe';
import { IOutputPipe } from './IOutputPipe';
import { IAssets } from './index';



/**
 * Order type.
 */
export type Order = number | IOrder | ((total: number, ctx?: ITaskContext) => number | IOrder);


/**
 * zip task name.
 */
export type ZipTaskName = (name: string, runWay?: RunWay, ctx?: ITaskContext) => string

/**
 * src
 */
export type Src = string | string[];

/**
 * async source.
 */
export type AsyncSrc = Src | Promise<Src>;

/**
 * context type
 */
export type CtxType<T> = T | ((ctx?: ITaskContext) => T);

/**
 * task execute result.
 */
export type TaskResult = Src | void;

/**
 * task source
 */
export type TaskSource = CtxType<Src>;

/**
 * task string
 */
export type TaskString = CtxType<string>;

/**
 * async task source.
 */
export type AsyncTaskSource = TaskSource | ((ctx?: ITaskContext) => Promise<Src>);


/**
 * transform source.
 */
export type TransformSource = ITransform | ITransform[];

/**
 * Pipe
 */
export type Pipe = IPipe | ((ctx?: ITaskContext, assets?: IAssets) => ITransform | Promise<ITransform>);

/**
 * output pipe
 */
export type OutputPipe = IOutputPipe | ((stream: ITransform, ctx?: ITaskContext, assets?: IAssets) => ITransform | Promise<ITransform>);


export type folderCallback = (folder: string, folderName?: string, ctx?: ITaskContext) => string;


export interface NodeCabllback {
    (err: Error, data?: any): Promise<any> | void
}
