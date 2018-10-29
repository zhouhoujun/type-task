import { NodeActivityContext, NodeContextToken, INodeContext } from '../core';
import { Inject, Injectable } from '@ts-ioc/core';
import { InputDataToken, InjectActivityContextToken } from '@taskfr/core';
import { BuildActivity } from './BuildActivity';

export const BuidActivityContextToken = new InjectActivityContextToken(BuildActivity);

/**
 * build activity context.
 *
 * @export
 * @class BuidActivityContext
 * @extends {NodeActivityContext}
 */
@Injectable(BuidActivityContextToken)
export class BuidActivityContext extends NodeActivityContext {

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
    protected data: string[];
    /**
     * the builder
     *
     * @type {BuildActivity}
     * @memberof BuidActivityContext
     */
    builder: BuildActivity;

    constructor(@Inject(InputDataToken) input: any, @Inject(NodeContextToken) context: INodeContext) {
        super(input, context);
    }

    get result(): string[] {
        return this.data;
    }

    /**
     * is completed or not.
     *
     * @returns {boolean}
     * @memberof BuidActivityContext
     */
    isCompleted(): boolean {
        return !this.result || this.result.length < 1;
    }

    /**
     * set complete files.
     *
     * @param {string[]} files
     * @memberof BuidActivityContext
     */
    complete(files: string[]) {
        this.data = this.result.filter(f => files.indexOf(f) < 0);
    }

}
