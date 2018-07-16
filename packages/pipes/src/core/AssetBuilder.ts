import { IActivity, Src, IActivityConfigure } from '@taskfr/core';
import { Singleton, isBoolean, isString } from '@ts-ioc/core';
import { AssetConfigure, AssetBuilderToken } from './AssetConfigure';
import { AssetActivity } from './AssetActivity';
import { SourceActivity } from './SourceActivity';
import { DestActivity } from './DestActivity';
import { WatchActivity } from './WatchActivity';
import { UglifyActivity, UglifyConfigure } from './UglifyActivity';
import { SourceMapsActivity } from './SourceMapsActivity';
import { AnnotationActivity, AnnotationConfigure } from './Annotation';
import { PipeActivityBuilder } from './PipeActivityBuilder';



/**
 * Asset task builder
 *
 * @export
 * @class AssetTaskBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(AssetBuilderToken)
export class AssetBuilder extends PipeActivityBuilder {

    async buildStrategy(activity: IActivity<any>, config: AssetConfigure): Promise<IActivity<any>> {
        await super.buildStrategy(activity, config);

        if (activity instanceof AssetActivity) {
            activity.src = await this.toActivity<Src, SourceActivity>(config.src, activity,
                act => act instanceof SourceActivity,
                src => {
                    return { src: src, task: SourceActivity };
                });

            if (config.dest) {
                activity.dest = await this.toActivity<string, DestActivity>(config.dest, activity,
                    act => act instanceof DestActivity,
                    dest => {
                        return { dest: dest, task: DestActivity };
                    });
            }

            if (config.annotation) {
                activity.annotation = await this.toActivity<string | boolean, AnnotationActivity>(config.annotation, activity,
                    act => act instanceof AnnotationActivity,
                    dest => {
                        if (isBoolean(dest)) {
                            if (dest) {
                                return this.getDefaultAnnotation(activity);
                            }
                            return null;
                        }
                        return <AnnotationConfigure>{ annotationFramework: require(dest), task: AnnotationActivity };
                    },
                    cfg => {
                        if (isString(cfg)) {
                            <AnnotationConfigure>{ annotationFramework: require(cfg), task: AnnotationActivity };
                        }
                        return cfg;
                    });
            }

            if (config.watch) {
                activity.watch = await this.toActivity<Src | boolean, WatchActivity>(config.watch, activity,
                    act => act instanceof WatchActivity,
                    watch => {
                        if (isBoolean(watch)) {
                            if (watch) {
                                return { watch: activity.src, task: WatchActivity };
                            }
                            return null;
                        }
                        return { watch: watch, task: WatchActivity };
                    });
            }

            if (config.sourcemaps) {
                activity.sourcemaps = await this.toActivity<boolean | string, SourceMapsActivity>(config.sourcemaps, activity,
                    act => act instanceof SourceMapsActivity,
                    sourcemaps => {
                        if (isBoolean(sourcemaps)) {
                            if (sourcemaps) {
                                return { sourcemaps: '', task: WatchActivity };
                            }
                            return null;
                        }
                        return { sourcemaps: sourcemaps, task: WatchActivity };
                    });
            }

            if (config.uglify) {
                activity.uglify = await this.toActivity<any, UglifyActivity>(config.uglify, activity,
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

    getDefaultAcitvity() {
        return AssetActivity;
    }

    protected getDefaultAnnotation(activity: AssetActivity): IActivityConfigure<AnnotationActivity> {
        return activity.defaultAnnotation;
    }

}
