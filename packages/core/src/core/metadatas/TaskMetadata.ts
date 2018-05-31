import { ClassMetadata } from '@ts-ioc/core';
import { Src } from '../../utils/index';
import { IConfigure } from '../IConfigure';

/**
 * task metadata.
 *
 * @export
 * @interface TaskMetadata
 * @extends {ClassMetadata}
 */
export interface TaskMetadata extends ClassMetadata, IConfigure {

}
