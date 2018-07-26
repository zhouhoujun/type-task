import { IConfigure } from './IConfigure';

/**
 * on task init.
 *
 * @export
 * @interface OnTaskInit
 */
export interface OnActivityInit {
    /**
     * activity init via config.
     *
     * @param {IConfigure} config
     * @memberof OnTaskInit
     */
    activityInit(config: IConfigure): void | Promise<any>;
}
