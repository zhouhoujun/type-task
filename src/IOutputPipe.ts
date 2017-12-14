
import { ITransform } from './ITransform';
import { ITaskContext } from './ITaskContext';
/**
 * output pipe
 *
 * @export
 * @interface IOutputPipe
 */
export interface IOutputPipe extends IOperate {
    /**
     * output pipes
     *
     * @param {ITransform} stream
     * @param {ITaskContext} context
     * @param {IAssertDist} [dist]
     * @returns {(ITransform | Promise<ITransform>)}
     *
     * @memberof IOutputPipe
     */
    toTransform?(stream: ITransform, context: ITaskContext, dist?: IAssertDist): ITransform | Promise<ITransform>;
}
