import { PipeActivity } from './PipeActivity';
import { TransformType } from './pipeTypes';
import { IActivity } from '@taskfr/core';
import { PipeTask } from '../decorators';
import { IPipeConfigure } from './IPipeConfigure';
import { InjectPipeActivityToken, InjectPipeAcitityBuilderToken } from './IPipeActivity';
import { PipeActivityBuilder } from './PipeActivityBuilder';
import { Singleton } from '@ts-ioc/core';
import { ITransform } from './ITransform';


export const AnnotationAcitvityToken = new InjectPipeActivityToken<AnnotationActivity>('Annotation');
export const AnnotationAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<AnnotationActivityBuilder>('Annotation')

export interface AnnotationConfigure extends IPipeConfigure {
    annotationFramework: TransformType
}

@PipeTask(AnnotationAcitvityToken, AnnotationAcitvityBuilderToken)
export class AnnotationActivity extends PipeActivity {

    /**
     * annotation framework.
     *
     * @type {TransformType}
     * @memberof AssetActivity
     */
    annotationFramework: TransformType;

    protected async beginPipe(stream: ITransform, execute?: IActivity): Promise<ITransform> {
        stream = await super.beginPipe(stream, execute);
        if (this.annotationFramework) {
            let annotation = await this.context.exec(this, this.annotationFramework);
            stream = await this.pipe(stream, annotation);
        }
        return stream;
    }
}


@Singleton(AnnotationAcitvityBuilderToken)
export class AnnotationActivityBuilder extends PipeActivityBuilder {

    async buildStrategy(activity: IActivity, config: AnnotationConfigure): Promise<IActivity> {
        await super.buildStrategy(activity, config);
        if (activity instanceof AnnotationActivity) {
            activity.annotationFramework = await this.toExpression(config.annotationFramework, activity);
        }
        return activity;
    }
}

