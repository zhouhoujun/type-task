import { IPipeContext, PipeContextToken } from './IPipeContext';
import { Inject } from '@ts-ioc/core';
import { IPipeTask } from '../IPipeTask';
import { Activity } from '@taskfr/core';
import { PipeTask } from '../decorators';

/**
 * base task.
 *
 * @export
 * @class BaseTask
 * @implements {ITask}
 */
@PipeTask
export class AbstractPipe extends Activity implements IPipeTask {
    /**
     * context.
     *
     * @type {IPipeContext}
     * @memberof BaseTask
     */
    @Inject(PipeContextToken)
    context: IPipeContext;
}
