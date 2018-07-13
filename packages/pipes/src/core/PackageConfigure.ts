import { CtxType, Src, ExpressionType, ActivityType } from '@taskfr/core';
import { ObjectMap } from '@ts-ioc/core';
import { DestType } from './AssetConfigure';
import { IPipeConfigure } from './IPipeConfigure';
import { TransformConfig } from './pipeTypes';
import { TestActivity } from './TestActivity';
import { AssetActivity } from './AssetActivity';
import { CleanActivity } from './CleanActivity';
import { DestActivity } from './DestActivity';
import { WatchActivity } from './WatchActivity';

export interface PackageConfigure extends IPipeConfigure {
    /**
     * src root path.
     *
     * @type {CtxType<string>}
     * @memberof PackageConfigure
     */
    src?: CtxType<string>;

    /**
     * watch activity.
     *
     * @type {(ExpressionType<Src> | ActivityType<WatchActivity>)}
     * @memberof PackageConfigure
     */
    watch?: ExpressionType<Src> | ActivityType<WatchActivity>;


    /**
     * clean task config.
     *
     * @type {(ExpressionType<Src> | ActivityType<CleanActivity>)}
     * @memberof PackageConfigure
     */
    clean?: ExpressionType<Src> | ActivityType<CleanActivity>;
    /**
     * assets.
     *
     * @type {ObjectMap<ExpressionType<Src> | ActivityType<AssetActivity>>}
     * @memberof PackageConfigure
     */
    assets: ObjectMap<ExpressionType<Src> | ActivityType<AssetActivity>>;

    /**
     * test config.
     *
     * @type {(ExpressionType<Src> | ActivityType<TestActivity>;)}
     * @memberof PackageConfigure
     */
    test?: ExpressionType<Src> | ActivityType<TestActivity>;

    /**
     * dest.
     *
     * @type {(ExpressionType<string> | ActivityType<DestActivity>)}
     * @memberof PackageConfigure
     */
    dest?: ExpressionType<string> | ActivityType<DestActivity>;
}
