import { IActivity, Src } from '@taskfr/core';
import { isBoolean, isString, Injectable } from '@ts-ioc/core';
import { AssetConfigure, AssetBuilderToken } from './AssetConfigure';
import { AssetActivity } from './AssetActivity';
import { SourceActivity, SourceConfigure } from './SourceActivity';
import { DestActivity, DestConfigure } from './DestActivity';
import { WatchActivity, WatchConfigure } from './WatchActivity';
import { UglifyActivity, UglifyConfigure } from './UglifyActivity';
import { SourceMapsActivity, SourceMapsConfigure } from './SourceMapsActivity';
import { AnnotationActivity, AnnotationsConfigure } from './Annotation';
import { PipeActivityBuilder } from './PipeActivityBuilder';
import { TestActivity, TestConfigure } from './TestActivity';


/**
 * Asset task builder
 *
 * @export
 * @class AssetTaskBuilder
 * @extends {DestTaskBuilder}
 */
@Injectable(AssetBuilderToken)
export class AssetBuilder extends PipeActivityBuilder {

    /**
     * asset build strategy.
     *
     * @param {IActivity} activity
     * @param {AssetConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof AssetBuilder
     */
    async buildStrategy(activity: IActivity, config: AssetConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        console.log('AssetBuilder:', config);
        if (activity instanceof AssetActivity) {
            activity.src = await this.toActivity<Src, SourceActivity, SourceConfigure>(config.src, activity,
                act => act instanceof SourceActivity,
                src => {
                    return { src: src, task: SourceActivity };
                });

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

            if (config.dest) {
                activity.dest = await this.toActivity<string, DestActivity, DestConfigure>(config.dest, activity,
                    act => act instanceof DestActivity,
                    dest => {
                        return { dest: dest, task: DestActivity };
                    });
            }

            if (config.annotation) {
                activity.annotation = await this.toActivity<string | boolean, AnnotationActivity, AnnotationsConfigure>(config.annotation, activity,
                    act => act instanceof AnnotationActivity,
                    dest => {
                        if (isBoolean(dest)) {
                            if (dest) {
                                return this.getDefaultAnnotation(activity);
                            }
                            return null;
                        }
                        return <AnnotationsConfigure>{ annotationFramework: require(dest), task: AnnotationActivity };
                    },
                    cfg => {
                        if (isString(cfg)) {
                            <AnnotationsConfigure>{ annotationFramework: require(cfg), task: AnnotationActivity };
                        }
                        return cfg;
                    });
            }

            if (config.watch) {
                activity.watch = await this.toActivity<Src | boolean, WatchActivity, WatchConfigure>(config.watch, activity,
                    act => act instanceof WatchActivity,
                    watch => {
                        if (isBoolean(watch)) {
                            if (watch && activity.src) {
                                return <WatchConfigure>{ src: activity.src.src, task: WatchActivity };
                            }
                            return null;
                        }
                        return <WatchConfigure>{ src: watch, task: WatchActivity };
                    });
            }

            if (config.sourcemaps) {
                activity.sourcemaps = await this.toActivity<boolean | string, SourceMapsActivity, SourceMapsConfigure>(config.sourcemaps, activity,
                    act => act instanceof SourceMapsActivity,
                    sourcemaps => {
                        if (isBoolean(sourcemaps)) {
                            if (sourcemaps) {
                                return { sourcemaps: '', task: SourceMapsActivity };
                            }
                            return null;
                        }
                        return { sourcemaps: sourcemaps, task: SourceMapsActivity };
                    });
            }

            if (config.uglify) {
                activity.uglify = await this.toActivity<any, UglifyActivity, UglifyConfigure>(config.uglify, activity,
                    act => act instanceof UglifyActivity,
                    uglify => {
                        if (isBoolean(uglify)) {
                            if (uglify) {
                                return { task: UglifyActivity };
                            }
                            return null;
                        }
                        return <UglifyConfigure>{ uglifyOtions: uglify, task: UglifyActivity };
                    });
            }
        }

        return activity;
    }

    /**
     * get default activity.
     *
     * @returns
     * @memberof AssetBuilder
     */
    getDefaultAcitvity() {
        return AssetActivity;
    }

    /**
     * get default annotation.
     *
     * @protected
     * @param {AssetActivity} activity
     * @returns {AnnotationsConfigure}
     * @memberof AssetBuilder
     */
    protected getDefaultAnnotation(activity: AssetActivity): AnnotationsConfigure {
        return activity.defaultAnnotation;
    }

}
