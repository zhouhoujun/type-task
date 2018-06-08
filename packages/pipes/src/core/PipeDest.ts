import { DestOptions, dest } from 'vinyl-fs';
import { TransformType, IPipeComponent, PipeComponent, ITransform } from '../core/index';
import { PipeTask } from '../decorators/index';


/**
 * pipe dest provider.
 *
 * @export
 * @interface IPipeDest
 * @extends {IPipeComponent}
 */
export interface IPipeDest extends IPipeComponent {
    /**
     * dest source.
     *
     * @type {string}
     * @memberof IPipeDest
     */
    dest?: string;

    /**
     * source options.
     *
     * @type {DestOptions}
     * @memberof IPipeDestProvider
     */
    destOptions?: DestOptions;
}

@PipeTask('dest')
export class PipeDest extends PipeComponent<IPipeDest> implements IPipeDest {

    dest: string;
    destOptions: DestOptions;

    constructor(name?: string) {
        super(name);
    }

    protected pipesToPromise(source: ITransform, pipes: TransformType[]): Promise<ITransform> {
        return super.pipesToPromise(source, pipes)
            .then(stream => {
                return this.writeStream(stream)
            })
    }

    protected writeStream(stream: ITransform): Promise<ITransform> {
        let dist = this.dest;
        let output = stream.pipe(dest(this.context.toRootPath(dist), this.destOptions));
        if (!output) {
            return null;
        }

        return new Promise((resolve, reject) => {
            output
                .once('end', () => {
                    resolve();
                })
                .once('error', reject);

        }).then(() => {
            output.removeAllListeners('error');
            output.removeAllListeners('end');
            return stream;
        }, err => {
            output.removeAllListeners('error');
            output.removeAllListeners('end');
            process.exit(1);
            return err;
        });


    }
}
