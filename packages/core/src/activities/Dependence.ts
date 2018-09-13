import { Activity, IActivity, InjectAcitityToken, DependenceConfigure } from '../core';
import { Registration, Type } from '@ts-ioc/core';
import { Task } from '../decorators';

/**
 * dependence activity inject token.
 *
 * @export
 * @class InjectDependenceActivity
 * @extends {Registration<T>}
 * @template T
 */
export class InjectDependenceActivity<T extends IActivity> extends Registration<T> {
    constructor(type: Type<T>) {
        super(type, 'DependenceActivity');
    }
}


/**
 * Dependence activity token.
 */
export const DependenceActivityToken = new InjectAcitityToken<DependenceActivity>('Dependence');

@Task(DependenceActivityToken)
export class DependenceActivity extends Activity<any> {

    /**
     * custom dependence
     *
     * @type {IActivity}
     * @memberof DependenceActivity
     */
    dependence: IActivity;

    /**
     * body
     *
     * @type {IActivity}
     * @memberof DependenceActivity
     */
    body: IActivity;

    async onActivityInit(config: DependenceConfigure): Promise<any> {
        await super.onActivityInit(config);
        this.dependence = await this.buildActivity(config.dependence);
        this.body = await this.buildActivity(config.body);
    }


    /**
     * execute body.
     *
     * @protected
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns
     * @memberof DependenceActivity
     */
    protected async execute(data?: any, execute?: IActivity) {
        if (this.dependence) {
            data = await this.dependence.run(data, execute);
        }
        return await this.body.run(data, execute);
    }

}
