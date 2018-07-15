import { PipeActivity } from './PipeActivity';
import { TransformType } from './pipeTypes';
import { IActivity } from '@taskfr/core';
import { PipeTask } from '../decorators';
import { IPipeConfigure } from './IPipeConfigure';
import { InjectPipeActivityToken } from './IPipeActivity';
import { InjectPipeAcitityBuilderToken, PipeActivityBuilder } from './PipeActivityBuilder';
import { Singleton } from '@ts-ioc/core';


export const AnnotationAcitvityToken = new InjectPipeActivityToken<AnnotationActivity>('Annotation');
export const AnnotationAcitvityBuilderToken = new InjectPipeAcitityBuilderToken<AnnotationActivityBuilder>('Annotation')

export interface AnnotationConfigure extends IPipeConfigure {
    annotationFramework: TransformType
}

@PipeTask
export class AnnotationActivity extends PipeActivity {

    /**
     * annotation framework.
     *
     * @type {TransformType}
     * @memberof AssetActivity
     */
    annotationFramework: TransformType;

    protected async getRunPipes(execute?: IActivity<any>): Promise<TransformType[]> {
        let annotation = await this.context.exec(this, this.annotationFramework);
        let pipes = await super.getRunPipes(execute);
        pipes.push(annotation);
        return pipes;
    }
}


@Singleton(AnnotationAcitvityBuilderToken)
export class AnnotationActivityBuilder extends PipeActivityBuilder {

    async buildStrategy<T>(activity: IActivity<T>, config: AnnotationConfigure): Promise<IActivity<T>> {
        await super.buildStrategy(activity, config);
        if (activity instanceof AnnotationActivity) {
            activity.annotationFramework = await this.toExpression(config.annotationFramework, activity);
        }
        return activity;
    }
}

