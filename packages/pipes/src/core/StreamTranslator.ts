import { TranslatorActivity, Task, InjectAcitityToken, IActivityContext } from '@taskfr/core';
import { FileChanged } from '@taskfr/node';
import { ITransform } from './ITransform';
import { src } from 'vinyl-fs';

export const DefaultTranslatorToken = new InjectAcitityToken('Translator Stream');

@Task(DefaultTranslatorToken)
export class StreamTranslator extends TranslatorActivity<FileChanged, ITransform> {
    protected async execute(ctx: IActivityContext<ITransform>) {
        let chg = ctx.input as FileChanged;
        if (chg.removed.length) {
            ctx.data = src(chg.watch);
        } else {
            let srcs = chg.changed();
            if (srcs.length) {
                ctx.data = src(srcs);
            }
        }
    }
}
