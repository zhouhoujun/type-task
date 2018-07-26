import { PipeActivity } from './PipeActivity';
import { TransformType } from './pipeTypes';
import { IActivity } from '@taskfr/core';
import { PipeTask } from '../decorators';
import { IPipeConfigure } from './IPipeConfigure';
import { InjectPipeActivityToken, InjectPipeAcitityBuilderToken } from './IPipeActivity';
import { PipeActivityBuilder } from './PipeActivityBuilder';
import { Injectable } from '@ts-ioc/core';
import { ITransform } from './ITransform';

/**
 * annotation activity token
 */
export const AnnotationAcitvityToken = new InjectPipeActivityToken<AnnotationActivity>('Annotation');
/**
 * annoation acitvity builder token.
 */
export const AnnotationAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<AnnotationActivityBuilder>('Annotation')

export interface AnnotationConfigure extends IPipeConfigure {
    /**
     * annotation framework.
     *
     * @type {TransformType}
     * @memberof AnnotationConfigure
     */
    annotationFramework: TransformType
}

/**
 * annotation activity.
 *
 * @export
 * @class AnnotationActivity
 * @extends {PipeActivity}
 */
@PipeTask(AnnotationAcitvityToken, AnnotationAcitvityBuilderToken)
export class AnnotationActivity extends PipeActivity {

    /**
     * annotation framework.
     *
     * @type {TransformType}
     * @memberof AssetActivity
     */
    annotationFramework: TransformType;

    /**
     * begin pipe.
     *
     * @protected
     * @param {ITransform} stream
     * @param {IActivity} [execute]
     * @returns {Promise<ITransform>}
     * @memberof AnnotationActivity
     */
    protected async beforePipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        stream = await super.beforePipe(stream, execute);
        if (this.annotationFramework) {
            let annotation = await this.context.exec(this, this.annotationFramework);
            stream = await this.pipe(stream, annotation);
        }
        return stream;
    }
}

/**
 * annotation activity builder.
 *
 * @export
 * @class AnnotationActivityBuilder
 * @extends {PipeActivityBuilder}
 */
@Injectable(AnnotationAcitvityBuilderToken)
export class AnnotationActivityBuilder extends PipeActivityBuilder {

    createBuilder() {
        return this.container.get(AnnotationAcitvityBuilderToken);
    }

    /**
     * annoation acitvity build strategy.
     *
     * @param {IActivity} activity
     * @param {AnnotationConfigure} config
     * @returns {Promise<IActivity>}
     * @memberof AnnotationActivityBuilder
     */
    async buildStrategy(activity: IActivity, config: AnnotationConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof AnnotationActivity) {
            activity.annotationFramework = await this.toExpression(config.annotationFramework, activity);
        }
        return activity;
    }
}

