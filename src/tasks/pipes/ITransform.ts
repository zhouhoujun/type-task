import { ObjectMap } from 'tsioc';

/**
 * transform interface.
 * 
 * @export
 * @interface ITransform
 * @extends {ObjectMap<any>}
 * @extends {NodeJS.ReadWriteStream}
 */
export interface ITransform extends ObjectMap<any>, NodeJS.ReadWriteStream {

}