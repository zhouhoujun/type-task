# packaged type-task

This repo is for distribution on `npm`. The source for this module is in the
[main repo](https://github.com/zhouhoujun/type-task).
Please file issues and pull requests against that repo.

`type-task` is task manager via AOP, IOC.

## Install

1. install modules:

```shell
npm install -g type-task
```

2. install cil:

```shell
npm install type-task
```

use command: `type-task [task names] [--param param]`

taskname: decorator class with `@Task('taskname')` or `@TaskModule({name:'taskname'})`.


You can `import` modules:


## Doc

### Define Task

* Single task

```ts
@Task('test')
class SimpleTask extends AbstractTask implements ITask {

    constructor(name: string) {
        super(name);
    }

    run(): Promise<any> {
        // console.log('before simple task:', this.name);
        return Promise.resolve('simple task')
            .then(val => {
                console.log('return simple task:', val);
                return val;
            });
    }
}

```

* Component task

```ts
@Task
class DelComponentTask extends TaskElement {
    execute(data?: any): Promise<any> {
        return del(['lib/**']);
    }
}

```

* Task module

```ts
@TaskModule({
    providers: <IPipeElementProvider>{
        name: 'tscomplie',
        src: 'src/**/*.ts',
        dest: 'lib',
        pipes: [
            (ctx) => cache('typescript'),
            (ctx) => classAnnotations(),
            sourcemaps.init,
            (ctx) => tsProject()
        ]
    },
    task: PipeElement
})
class TsCompile extends TaskElement {
}

```

### Run task

see [interface](https://github.com/zhouhoujun/type-task/blob/master/src/ITaskContainer.ts)

```ts
1.
let container = new TaskContainer(__dirname, moudles)
2.
TaskContainer.create(__dirname, moudles)
    .bootstrap(<IConfigure>{
        ...
        task:...
    });
3.
TaskContainer.create(__dirname)
    .bootstrap([TestTask, TsCompile, <IConfigure>{
        ...
        task: ...
    }]);

```

## Simples

more simples [see](https://github.com/zhouhoujun/type-task/blob/master/test/simples.task.ts)

```ts
import { Task, ITask, taskSymbols, TaskContainer, AbstractTask, TaskElement, PipeElement, ITaskComponent, IConfigure, PipeComponent, IPipeElementProvider, TaskModule, ITransform, Src } from 'type-task';
import * as mocha from 'gulp-mocha';

const del = require('del');
const cache = require('gulp-cached');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
let tsProject = ts.createProject('tsconfig.json');
const uglify = require('gulp-uglify');
import { classAnnotations } from 'typescript-class-annotations';



@TaskModule({
    providers: <IPipeElementProvider>{
        name: 'TsCompile',
        pipes: [
            () => cache('typescript'),
            sourcemaps.init,
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
class TsCompile extends TaskElement {

    constructor(name: string, public src?: Src, public dest?: Src, private tsPipes?: TransformExpress, private jsPipes?: TransformExpress, public tsconfigFile?: string, public tsconfig?: ObjectMap<any>, public uglify?: boolean | ObjectMap<any>) {
        super(name);
    }

    onInit() {
        let providers = this.config.providers as IPipeElementProvider;
        if (this.src) {
            providers.src = this.src;
        }
        if (this.dest) {
            providers.dest = this.dest;
        }
        if (this.tsPipes) {
            let pipes: (ITransform | PipeExpress)[] = isFunction(providers.pipes) ? providers.pipes(this.context, this.getConfig()) : providers.pipes;
            let tsPipes: (ITransform | PipeExpress)[] = isFunction(this.tsPipes) ? this.tsPipes(this.context, this.config) : this.tsPipes;
            pipes.splice(1, 0, ...tsPipes);
            providers.pipes = pipes;
        }

        if (this.jsPipes) {
            let destPipes: any = isFunction(providers.destPipes) ? providers.destPipes(this.context, this.getConfig()) : providers.destPipes;
            destPipes.js = isFunction(destPipes.js) ? destPipes.js(this.context, this.config) : destPipes.js;
            let jsPipes: (ITransform | PipeExpress)[] = isFunction(this.jsPipes) ? this.jsPipes(this.context, this.config) : this.jsPipes;
            destPipes.js.splice(1, 0, ...jsPipes);
            providers.destPipes = destPipes;
        }
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
    .bootstrap([TestTask, TsCompile, {
        providers: {
            src: 'src/cli/*.ts',
            dest: 'bin'
        },
        task: TsCompile
    }]);


```

## Documentation [github](https://github.com/zhouhoujun/type-task.git)

Documentation is available on the
[type-task docs site](https://github.com/zhouhoujun/type-task).

## License

MIT © [Houjun](https://github.com/zhouhoujun/)