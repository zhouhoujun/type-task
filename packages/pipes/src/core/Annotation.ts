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
     * @param {TransformActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof AnnotationActivity
     */
    protected async beforePipe(ctx: TransformActivityContext): Promise<void> {
        await super.beforePipe(ctx);
        if (this.annotationFramework) {
            let annotation = await this.context.exec(this, this.annotationFramework, ctx);
            ctx.data = await this.pipeStream(ctx.data, ctx, annotation);
        }
    }
}
