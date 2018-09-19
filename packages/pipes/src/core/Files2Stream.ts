import { Translator } from '@taskfr/core';
import { FileChanged } from '@taskfr/node';
import { ITransform } from './ITransform';
import { src } from 'vinyl-fs';
import { Injectable, InjectToken } from '@ts-ioc/core';

export const Files2StreamToken = new InjectToken<Files2StreamTranslator>('Files2Stream');

@Injectable(Files2StreamToken)
export class Files2StreamTranslator extends Translator<FileChanged, ITransform> {
    translate(target: FileChanged): ITransform {
        let chg = target as FileChanged;
        if (chg.removed.length) {
            return src(chg.watch);
        } else {
            let srcs = chg.changed();
            if (srcs.length) {
                return src(srcs);
            }
        }
        return null;
    }
}
