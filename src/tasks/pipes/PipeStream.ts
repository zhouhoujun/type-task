import { Task, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { isArray, Abstract, isFunction, isClass } from 'tsioc';
import { ITransform } from './ITransform';
import { IPipeComponent, IPipeComponentProvider } from './IPipeComponent';
import { ITaskContext } from '../../ITaskContext';
import { PipeComponent } from './PipeComponent';
import { TransformExpress, TransformMerger } from './pipeTypes';
import { Observable } from 'rxjs/Observable';

/**
 * pipe stream provider
 *
 * @export
 * @interface IPipeStreamProvider
 * @extends {IPipeComponentProvider}
 */
export interface IPipeStreamProvider extends IPipeComponentProvider {
    /**
     * pipe stream.
     *
     * @type {TransformExpress}
     * @memberof IPipeStreamProvider
     */
    pipes?: TransformExpress;
    /**
     * await piped.
     *
     * @type {boolean}
     * @memberof IPipeStreamProvider
     */
    awaitPiped?: boolean;
}

@Task
export class PipeStream extends PipeComponent<IPipeComponent> implements IPipeComponent {

    constructor(name: string, runWay = RunWay.seqFirst, protected pipes: TransformExpress, merger?: TransformMerger, protected awaitPiped = false) {
        super(name, runWay, merger);
    }

    pipe(transform: ITransform): Observable<ITransform> {
        let pStream = this.pipeToObs(transform, this.pipes);
        if (this.awaitPiped) {
            pStream = pStream.flatMap(stream => {
                if (!stream) {
                    return Observable.of(null);
                }

                return new Promise((resolve, reject) => {
                    stream
                        .once('end', resolve)
                        .once('error', reject);
                }).then(() => {
                    stream.removeAllListeners('error');
                    stream.removeAllListeners('end');
                    return stream;
                }, err => {
                    stream.removeAllListeners('error');
                    stream.removeAllListeners('end');
                    process.exit(1);
                    return err;
                });
            });
        }
        return pStream;
    }
}
