import { PipeTask } from '../../decorators/index';
import { TaskElement } from '@taskp/core';
import { BaseTask, PipeElement } from '../../core/index';

@PipeTask({
    name: 'tscompile',
    src: '**/*.ts',
    pipes: [

    ]
})
export class TsCompile extends PipeElement {

}
