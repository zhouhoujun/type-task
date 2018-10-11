import { NodeActivityContext, NodeContextToken, INodeContext } from '../core';
import { BuildActivity } from './BuildActivity';
import { Inject, Injectable } from '@ts-ioc/core';
import { InputDataToken, InjectActivityContextToken } from '@taskfr/core';
import { CompilerActivity, ShellCompilerActivity } from './CompilerActivity';
import { BuildHandleActivity } from './BuildHandleActivity';


export const CompilerContextToken = new InjectActivityContextToken(CompilerActivity);
export const ShellCompilerContextToken = new InjectActivityContextToken(ShellCompilerActivity);

/**
 * build handle activity context.
 *
 * @export
 * @class BuidHandleActivityContext
 * @extends {NodeActivityContext}
 */
@Injectable(CompilerContextToken)
@Injectable(ShellCompilerContextToken)
export class CompilerActivityContext extends NodeActivityContext {

    /**
     * the builder
     *
     * @type {BuildActivity}
     * @memberof BuidActivityContext
     */
    builder: BuildActivity;
    handle: BuildHandleActivity;
    input: string[];

    constructor(@Inject(InputDataToken) input: any, @Inject(NodeContextToken) context: INodeContext) {
        super(input, context);
    }

}
