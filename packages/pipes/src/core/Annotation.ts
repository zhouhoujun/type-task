import { PipeActivity } from './PipeActivity';
import { TransformType } from './pipeTypes';
import { PipeTask } from '../decorators';
import { IPipeConfigure } from './IPipeConfigure';
import { InjectPipeActivityToken } from './IPipeActivity';
import { PipeActivityContext } from './PipeActivityContext';

/**
 * annotation activity token
 */
export const AnnotationAcitvityToken = new InjectPipeActivityToken<AnnotationActivity>('Annotation');


export interface AnnotationsConfigure extends IPipeConfigure {
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
@PipeTask(AnnotationAcitvityToken)
export class AnnotationActivity extends PipeActivity {

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
     * @param {PipeActivityContext} ctx
     * @returns {Promise<ITransform>}
     * @memberof AnnotationActivity
     */
    protected async beforePipe(ctx: PipeActivityContext): Promise<void> {
        await super.beforePipe(ctx);
        if (this.annotationFramework) {
            let annotation = await this.context.exec(this, this.annotationFramework, ctx);
            ctx.data = await this.pipeStream(ctx.data, ctx, annotation);
        }
    }
}
