import { NodeActivityContext, NodeContextToken, INodeContext } from '../core';
import { Inject } from '@ts-ioc/core';
import { InputDataToken } from '@taskfr/core';


/**
 * build activity context.
 *
 * @export
 * @class BuidActivityContext
 * @extends {NodeActivityContext}
 */
export class BuidActivityContext extends NodeActivityContext {

    constructor(@Inject(InputDataToken) input: any, @Inject(NodeContextToken) context: INodeContext) {
        super(input, context);
    }

    /**
     * all files input to handle.
     *
     * @type {string[]}
     * @memberof BuidActivityContext
     */
    input: string[];
    /**
     * unhandled files.
     *
     * @type {string[]}
     * @memberof BuidActivityContext
     */
    protected unhandleds: string[];

    /**
     * is completed or not.
     *
     * @returns {boolean}
     * @memberof BuidActivityContext
     */
    isCompleted(): boolean {
        return !this.unhandleds || this.unhandleds.length < 1;
    }

    /**
     * set complete files.
     *
     * @param {string[]} files
     * @memberof BuidActivityContext
     */
    complete(files: string[]) {
        this.unhandleds = this.unhandleds.filter(f => files.indexOf(f) < 0);
    }

    protected setState(chg: any) {
        this.unhandleds = chg;
    }

    getState() {
        return this.unhandleds;
    }

}
