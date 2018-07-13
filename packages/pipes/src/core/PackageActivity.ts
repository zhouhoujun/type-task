import { SequenceActivity, ParallelActivity } from '@taskfr/core';
import { Package } from '../decorators';
import { WatchActivity } from './WatchActivity';
import { DestActivity } from './DestActivity';
import { TestActivity } from './TestActivity';
import { CleanActivity } from './CleanActivity';
import { AssetActivity } from './AssetActivity';

/**
 * package activity.
 *
 * @export
 * @class PackageActivity
 * @extends {SequenceActivity}
 */
@Package
export class PackageActivity extends SequenceActivity {

    watch: WatchActivity;

    dest: DestActivity;

    test: TestActivity;

    clean: CleanActivity;

    /**
     * src root pacth.
     *
     * @type {string}
     * @memberof PackageActivity
     */
    src: string;

    /**
     * assets activities.
     *
     * @type {AssetActivity[]}
     * @memberof PackageActivity
     */
    assets: AssetActivity[] = [];


    assetExecute: SequenceActivity | ParallelActivity;




}
