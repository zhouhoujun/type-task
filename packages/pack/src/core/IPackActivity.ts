import { CleanActivity, TestActivity, IBuildActivity } from '@taskfr/build';

/**
 * package activity.
 *
 * @export
 * @interface IPackActivity
 * @extends {IActivity}
 */
export interface IPackActivity extends IBuildActivity {

    /**
     * clean activity.
     *
     * @type {CleanActivity}
     * @memberof PackActivity
     */
    clean: CleanActivity;

    /**
     * test activity.
     *
     * @type {TestActivity}
     * @memberof PackActivity
     */
    test: TestActivity;

}
