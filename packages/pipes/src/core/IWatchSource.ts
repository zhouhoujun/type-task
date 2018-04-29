import { TransformSource } from './pipeTypes';
import { Src } from '@taskp/core';
import { IPipeComponent } from './IPipeComponent';

export interface IWatchSource extends IPipeComponent {
    src?: TransformSource;
    watchSrc?: TransformSource;
}