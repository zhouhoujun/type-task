import { IConfigure } from './IConfigure';

/**
 * on task init.
 *
 * @export
 * @interface OnTaskInit
 */
export interface OnTaskInit {
    /**
     * task init via config.
     *
     * @param {IConfigure} config
     * @memberof OnTaskInit
     */
    onTaskInit(config: IConfigure);
}
