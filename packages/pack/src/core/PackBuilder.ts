import { IActivity, Src, ActivityBuilder } from '@taskfr/core';
import { Injectable } from '@ts-ioc/core';
import { PackActivity } from './PackActivity';
import { CleanActivity, CleanConfigure, TestActivity, TestConfigure } from '@taskfr/node';
import { PackBuilderToken, PackConfigure } from './pack';


/**
 * pack activity builder
 *
 * @export
 * @class PackBuilder
 * @extends {ActivityBuilder}
 */
@Injectable(PackBuilderToken)
export class PackBuilder extends ActivityBuilder {

    /**
     * package build stragegy.
     *
     * @param {IActivity} activity
     * @param {PackConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof PackBuilder
     */
    async buildStrategy(activity: IActivity, config: PackConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof PackActivity) {
            let srcRoot = activity.src = activity.getContext().to(config.src);
            activity.dist = activity.getContext().to(config.dist);
            if (config.clean) {
                activity.clean = await this.toActivity<Src, CleanActivity, CleanConfigure>(config.clean, activity,
                    act => act instanceof CleanActivity,
                    src => {
                        return <CleanConfigure>{ clean: src, task: CleanActivity };
                    }
                );
            }

            if (config.test) {
                activity.test = await this.toActivity<Src, TestActivity, TestConfigure>(config.test, activity,
                    act => act instanceof TestActivity,
                    src => {
                        if (!src) {
                            return null;
                        }
                        return <TestConfigure>{ src: src, task: TestActivity };
                    }
                );
            }
        }

        return activity;
    }
}
