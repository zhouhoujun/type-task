import { Task, ITask, taskSymbols, TaskContainer, AbstractTask, TaskElement, TaskComponent, ITaskComponent, IConfigure, PipeComponent, IPipeTaskProvider, TaskModule, ITransform } from './src';
import * as mocha from 'gulp-mocha';

const del = require('del');
const cache = require('gulp-cached');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
let tsProject = ts.createProject('tsconfig.json');
const uglify = require('gulp-uglify');
import { classAnnotations } from 'typescript-class-annotations';

@TaskModule({
    providers: <IPipeTaskProvider>{
        name: 'tscomp',
        src: 'src/**/*.ts',
        dest: 'lib',
        pipes: [
            (ctx) => cache('typescript'),
            (ctx) => classAnnotations(),
            sourcemaps.init,
            (ctx) => tsProject()
        ],
        destPipes: {
            js: [
                (ctx, transform) => {
                    let trans: ITransform = transform.js;
                    trans.changeAsOrigin = true;
                    return trans;
                },
                (ctx) => uglify(),
                (ctx) => sourcemaps.write('./sourcemaps')
            ],
            dts: [
                (ctx, transform) => {
                    let tans: ITransform = transform.dts;
                    tans.changeAsOrigin = true;
                    return tans;
                }
            ]
        }
    },
    task: PipeComponent
})
class TsCompile extends TaskElement {
    execute(data?: any): Promise<any> {
        return del(['lib/**']);
    }
}


@TaskModule({
    providers: {
        name: 'test',
        src: 'test/**/*.spec.ts',
        pipes: [ ()=> mocha()]
    },
    task: PipeComponent
})
class TestTask extends TaskElement {
}

TaskContainer.create(__dirname)
    .bootstrap([TestTask, TsCompile]);
