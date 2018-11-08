import { Task } from '@taskfr/core';
import { InjectTransformActivityToken, TransformActivity, ITransformConfigure, TransformType, TransformActivityContext } from '@taskfr/node';

/**
 * annotation activity token
 */
export const AnnotationAcitvityToken = new InjectTransformActivityToken<AnnotationActivity>('Annotation');


export interface AnnotationsConfigure extends ITransformConfigure {
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
@Task(AnnotationAcitvityToken)
export class AnnotationActivity extends TransformActivity {

    /**
     * annotation framework.
     *
     * @type {TransformType}
     * @memberof AssetActivity
     */
    annotationFramework: TransformType;

    async onActivityInit(config: AnnotationsConfigure) {
        await super.onActivityInit(config);
        this.annotationFramework = await this.toExpression(config.annotationFramework);
    }

    /**
     * begin pipe.
     *
     * @protected
     * @returns {Promise<ITransform>}
     * @memberof AnnotationActivity
     */
    protected async beforePipe(): Promise<void> {
        await super.beforePipe();
        if (this.annotationFramework) {
            let ctx = this.getContext();
            let annotation = await ctx.exec(this, this.annotationFramework);
            ctx.result = await this.pipeStream(ctx.result, annotation);
        }
    }
}
