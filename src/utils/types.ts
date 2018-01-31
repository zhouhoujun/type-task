import { IContainer } from 'tsioc';



/**
 * source
 */
export type Src = string | string[];

/**
 * task source.
 */
export type TaskSrc = Src | ((container?: IContainer) => Src);


export interface NodeCabllback {
    (err: Error, data?: any): Promise<any> | void
}
