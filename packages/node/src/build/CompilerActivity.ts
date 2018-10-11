import { NodeActivity } from 'src/core';
import { CompilerActivityContext } from './CompilerActivityContext';
import { ShellActivity } from 'src/shells';

/**
 * compiler activity.
 *
 * @export
 * @abstract
 * @class CompilerActivity
 * @extends {NodeActivity}
 */
export abstract class CompilerActivity extends NodeActivity<CompilerActivityContext> {

}


/**
 * shell compiler activity.
 *
 * @export
 * @class ShellCompilerActivity
 * @extends {ShellActivity<CompilerActivityContext>}
 */
export class ShellCompilerActivity extends ShellActivity<CompilerActivityContext> {

}
