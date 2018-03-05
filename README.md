# packaged type-task

This repo is for distribution on `npm`. The source for this module is in the
[main repo](https://github.com/zhouhoujun/type-task).
Please file issues and pull requests against that repo.

`type-task` is task manager via AOP, IOC.

## Install

```shell

npm install type-task

```

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

``` ts
@TaskModule({
    providers: <IPipeTaskProvider>{
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
    task: PipeComponent
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


```



## Documentation [github](https://github.com/zhouhoujun/type-task.git)

Documentation is available on the
[type-task docs site](https://github.com/zhouhoujun/type-task).

## License

MIT © [Houjun](https://github.com/zhouhoujun/)