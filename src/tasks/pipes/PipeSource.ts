import { Task, TaskElement, ITaskProvider, RunWay, AbstractTask } from '../../core/index';
import { Src } from '../../utils/index';
import { ITransform } from './ITransform';
import { TaskSource } from './pipeTypes';
import { isFunction, isString, isArray } from 'tsioc';
import { ITaskContext } from '../../ITaskContext';
import { src, SrcOptions } from 'vinyl-fs';
import { IPipeComponent } from './IPipeComponent';

@Task
export class PipeSource extends TaskElement implements IPipeComponent<Src>  {

    constructor(name: string, runWay = RunWay.seqFirst, protected src: TaskSource<ITaskContext>, protected options?: SrcOptions) {
        super(name, runWay);
        this.options = Object.assign({ allowEmpty: true }, this.options || {});
    }

    execute(data?: Src): Promise<ITransform> {
        let source = isFunction(this.src) ? this.src(this.context) : this.src;
        if (data && (isArray(data) || isString(data))) {
            let srcs = isArray(source) ? source : [source];
            let datas = isArray(data) ? data : [data];
            datas.forEach(data => {
                if (isString(data)) {
                    srcs.push(data);
                }
            });
            source = srcs.filter(src => !!src);
        }
        return Promise.resolve(src(source, this.options));
    }
}
