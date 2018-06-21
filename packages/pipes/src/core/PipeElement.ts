import { IPipeComponent } from './IPipeComponent';
import { PipeTask } from '../decorators/index';
import { PipeComponent } from './PipeComponent';



/**
 * source provider.
 *
 * @export
 * @interface IPipeElement
 * @extends {IPipeComponent}
 */
export interface IPipeElement extends IPipeComponent {

}


/**
 * pipe component
 *
 * @export
 * @class PipeComponent
 * @extends {TaskElement}
 * @implements {IPipeComponent<ITransform>}
 */
@PipeTask
export class PipeElement extends PipeComponent<IPipeElement> implements IPipeElement {

    constructor(name?: string) {
        super(name);
    }
}
