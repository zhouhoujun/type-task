import { Task, ITask, taskSymbols, AbstractTask, TaskElement, ITaskComponent, IConfigure, TaskModule, Src, RunWay } from '@taskp/core';
import { IPipeElementProvider, ITransform, PipeElement, TransformExpress, TransformType, PipeTask } from '@taskp/pipes';
import { TaskContainer } from '@taskp/platform-server';

import * as mocha from 'gulp-mocha';

const del = require('del');
const cache = require('gulp-cached');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
import { classAnnotations } from 'typescript-class-annotations';
import { isFunction, isBoolean, ObjectMap } from '@ts-ioc/core';


@TaskModule({
    providers: <IPipeElementProvider>{
        pipes: [
            // () => cache('typescript'),
            sourcemaps.init,
            () => classAnnotations(),
            (ctx, config) => {
                let target = config.moduleTarget as TsCompile;
                if (target.tsconfig) {
                    return ts(target.tsconfig);
                } else {
                    let tsProject = ts.createProject(ctx.toRootPath(target.tsconfigFile || './tsconfig.json'));
                    return tsProject();
                }
            }
        ],
        destPipes: {
            js: [
                (ctx, config, transform) => {
                    let trans: ITransform = transform.js;
                    trans.changeAsOrigin = true;
                    return trans;
                },
                (ctx, config) => {
                    let target = config.moduleTarget as TsCompile;
                    if (target.uglify) {
                        return isBoolean(target.uglify) ? uglify() : uglify(target.uglify);
                    }
                    return null;
                },
                (ctx) => sourcemaps.write('./sourcemaps')
            ],
            dts: [
                (ctx, config, transform) => {
                    let tans: ITransform = transform.dts;
                    tans.changeAsOrigin = true;
                    return tans;
                }
            ]
        }
    },
    task: PipeElement
})
export class TsCompile extends PipeTask {

    constructor(name: string, runWay?: RunWay, public src?: Src, public dest?: Src,
        private tsPipes?: TransformExpress, private jsPipes?: TransformExpress,
        public tsconfigFile?: string, public tsconfig?: ObjectMap<any>, public uglify?: boolean | ObjectMap<any>) {
        super(name, runWay);
    }

    onInit() {
        let providers = this.config.providers as IPipeElementProvider;

        console.log('src:', this.src, 'dest:', this.dest, 'providers:', providers);

        if (this.src) {
            providers.src = this.src;
        }

        if (this.dest) {
            providers.dest = this.dest;
        }

        if (this.tsPipes) {
            let pipes: TransformType[] = isFunction(providers.pipes) ? providers.pipes(this.context, this.config) : providers.pipes;
            let tsPipes: TransformType[] = isFunction(this.tsPipes) ? this.tsPipes(this.context, this.config) : this.tsPipes;
            pipes.splice(1, 0, ...tsPipes);
            providers.pipes = pipes;
        }

        if (this.jsPipes) {
            let destPipes: any = isFunction(providers.destPipes) ? providers.destPipes(this.context, this.config) : providers.destPipes;
            destPipes.js = isFunction(destPipes.js) ? destPipes.js(this.context, this.config) : destPipes.js;
            let jsPipes: TransformType[] = isFunction(this.jsPipes) ? this.jsPipes(this.context, this.config) : this.jsPipes;
            destPipes.js.splice(1, 0, ...jsPipes);
            providers.destPipes = destPipes;
        }
        this.config.providers = providers;
    }
}

@TaskModule({
    providers: {
        name: 'test',
        src: 'test/**/*.spec.ts',
        awaitPiped: true,
        pipes: [() => mocha()]
    },
    task: PipeElement
})
class TestTask extends TaskElement {
    execute(data?: any): Promise<any> {
        return del(['lib/**', 'bin/**']);
    }
}

TaskContainer.create(__dirname)
    .bootstrap([
        TestTask,
        {
            providers: {
                name: 'tscompLIB',
                src: ['src/**/*.ts', '!src/cli/**'],
                dest: 'lib',
                uglify: true
            },
            task: TsCompile
        },
        {
            providers: {
                name: 'tscompCLI',
                src: 'src/cli/*.ts',
                dest: 'bin',
                uglify: true
            },
            task: TsCompile
        }]);
