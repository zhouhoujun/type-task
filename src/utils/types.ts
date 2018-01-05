

/**
 * src
 */
export type Src = string | string[];

/**
 * async source.
 */
export type AsyncSrc = Src | Promise<Src>;


export interface NodeCabllback {
    (err: Error, data?: any): Promise<any> | void
}
