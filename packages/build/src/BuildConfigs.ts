import { CoreActivityConfigs } from '@taskfr/core';
import { BuildConfigure, AssetConfigure, ITransformConfigure, DestConfigure, SourceConfigure, AnnotationsConfigure, BuildHandleConfigure, TestConfigure, UglifyConfigure, WatchConfigure, CleanConfigure } from './core';
import { TsConfigure } from './assets';
import { ShellActivityConfig, ExecFileActivityConfig } from '@taskfr/node';

export type BuildConfigures = CoreActivityConfigs | AssetConfigure | ITransformConfigure | BuildHandleConfigure | BuildConfigure
| TsConfigure | DestConfigure | SourceConfigure | TestConfigure | UglifyConfigure
| WatchConfigure | AnnotationsConfigure | CleanConfigure | ShellActivityConfig | ExecFileActivityConfig;
