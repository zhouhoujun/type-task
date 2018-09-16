import { TranslatorActivity, IActivity, Task, InjectAcitityToken } from '@taskfr/core';
import { FileChanged } from '@taskfr/node';
import { ITransform } from './ITransform';
import { src } from 'vinyl-fs';

export const DefaultTranslatorToken = new InjectAcitityToken('Translator Stream');

@Task(DefaultTranslatorToken)
export class StreamTranslator extends TranslatorActivity<FileChanged, ITransform> {
    protected async execute(chg: FileChanged, execute?: IActivity): Promise<ITransform> {
        if (chg.removed.length) {
            return src(chg.watch); // removed will build all.
        } else {
            let srcs = chg.changed();
            if (srcs.length) {
                return src(srcs);
            } else {
                return null;
            }
        }
    }
}
