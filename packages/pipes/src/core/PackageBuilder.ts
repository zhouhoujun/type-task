import { IActivity, IConfigure, SequenceActivityBuilder } from '@taskfr/core';
import { Inject, ContainerToken, IContainer, Singleton, isArray, isString, lang, Registration, isBoolean, isToken } from '@ts-ioc/core';
import { TestActivity, CleanActivity, CleanConfigure, TestAcitvityToken, CleanToken, InjectPipeAcitityBuilderToken } from '.';
import { PackageConfigure } from './PackageConfigure';
import { AssetConfigure } from './AssetConfigure';
import { IPipeActivity } from './IPipeActivity';


export interface IPackageActivity extends IPipeActivity  {

}

export class InjectPackageToken<T extends IPackageActivity> extends Registration<T> {
    constructor(desc: string) {
        super('PackageActivity', desc);
    }
}

export class InjectPackageBuilderToken<T extends PackageBuilder> extends Registration<T> {
    constructor(desc: string) {
        super('PackageActivityBuilder', desc);
    }
}

export const PackageToken = new InjectPackageToken<IPackageActivity>('');
export const PackageBuilderToken = new InjectPackageBuilderToken<PackageBuilder>('')

/**
 * Asset task builder
 *
 * @export
 * @class AssetsBuilder
 * @extends {DestTaskBuilder}
 */
@Singleton(PackageBuilderToken)
export class PackageBuilder extends SequenceActivityBuilder {
    constructor(@Inject(ContainerToken) container: IContainer) {
        super(container)
    }

    async beforeBindConfig(taskInst: IPipeComponent, config: IConfigure): Promise<IActivity> {
        await super.beforeBindConfig(taskInst, config);
        let packCfg = config as PackageConfigure;
        let subs: IConfigure[] = [];

        if (packCfg.test && !(taskInst instanceof TestActivity)) {
            let test = taskInst.context.to(packCfg.test);
            let testCfg;
            if (isBoolean(test)) {
                testCfg = {};
            } else if (isArray(test) || isString(test)) {
                testCfg = { test: test };
            } else if (isToken(test)) {
                testCfg = { task: test };
            } else {
                testCfg = test;
            }
            testCfg.task = testCfg.task || TestAcitvityToken;
            subs.push(testCfg);
        }

        if (packCfg.clean && !(taskInst instanceof CleanActivity)) {
            let val = packCfg.clean;
            let cleanCfg: CleanConfigure
            if (isArray(val) || isString(val)) {
                cleanCfg = { clean: val };
            } else if (isToken(val)) {
                cleanCfg = { task: val };
            } else {
                cleanCfg = val;
            }
            if (!cleanCfg.task) {
                cleanCfg.task = CleanToken;
            }
            subs.push(cleanCfg);
        }

        if (packCfg.assets) {
            let srcRoot = taskInst.context.to(packCfg.src);
            lang.forIn(packCfg.assets, (val, key: string) => {
                let assCfg: AssetConfigure;
                if (isArray(val) || isString(val)) {
                    assCfg = { src: val };
                } else if (isToken(val)) {
                    assCfg = { task: val };
                } else {
                    assCfg = val;
                }

                if (!assCfg.task) {
                    assCfg.task = new Registration(AssetToken, key);
                } else if (isString(assCfg.task)) {
                    assCfg.builder = AssetTaskBuilderToken;
                }

                if (srcRoot && !assCfg.src) {
                    assCfg.src = `${srcRoot}/**/*.${key}`;
                }
                subs.push(assCfg);
            });
        }

        if (subs.length) {
            await this.buildChildren(taskInst as ITaskComponent, subs);
        }
        return taskInst;
    }
}
