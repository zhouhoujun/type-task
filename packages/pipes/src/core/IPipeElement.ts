import { IWatchSource } from './IWatchSource';
import { TransformSource } from './pipeTypes';

export interface IPipeElement extends IWatchSource {

    /**
     * watch
     *
     * @param {TransformSource} src
     * @memberof IPipeComponent
     */
    watch?(src: TransformSource);
}
