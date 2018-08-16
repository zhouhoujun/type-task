import { PipeActivity } from './PipeActivity';
import { TransformType } from './pipeTypes';
import { IActivity } from '@taskfr/core';
import { PipeTask } from '../decorators';
import { IPipeConfigure } from './IPipeConfigure';
import { InjectPipeActivityToken } from './IPipeActivity';
import { ITransform } from './ITransform';

/**
 * annotation activity token
 */
export const AnnotationAcitvityToken = new InjectPipeActivityToken<AnnotationActivity>('Annotation');

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
@PipeTask(AnnotationAcitvityToken)
export class AnnotationActivity extends PipeActivity {

    /**
     * annotation framework.
     *
     * @type {TransformType}
     * @memberof AssetActivity
     */
    annotationFramework: TransformType;

    async onActivityInit(config: AnnotationConfigure) {
        await super.onActivityInit(config);
        this.annotationFramework = await this.toExpression(config.annotationFramework);
    }

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
