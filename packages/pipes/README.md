# packaged @taskp/core

This repo is for distribution on `npm`. The source for this module is in the
[main repo](https://github.com/zhouhoujun/type-task).

`@taskp/core` is Task manager, base on AOP, Ioc container, via [@ts-ioc/core](https://www.npmjs.com/package/@ts-ioc/core).


## Install

1. install cil:

```shell
npm install -g @taskp/cil
```

use command: `taskp [task names] [--param param]`

taskname: decorator class with `@Task('taskname')` or `@TaskModule({name:'taskname'})`.

2. install modules:

```shell
npm install @taskp/core

//in borwser
npm install @taskp/platform-browser

//in server
npm install @taskp/platform-server
```

* use pipes task

```shell
npm install @taskp/pipes
```

```ts
//in borwser
import { TaskContainer } from '@taskp/platform-browser';
//in server
import { TaskContainer } from '@taskp/platform-server';

import { PipeModule, PipeTask, PipeElement } from '@taskp/pipes';

let container = new TaskContainer(__dirname);
container
    .use(PipeModule)
    .bootstrap(([TestTask, TsCompile, <IConfigure>{
        ...
        task: ...
    }])

//or --------------
TaskContainer.create(__dirname, PipeModule)
    // .use(PipeModule)
    .bootstrap([TestTask, TsCompile, <IConfigure>{
        ...
        task: ...
    }]);

```



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
class TsCompile extends PipeTask {
}

```

### Run task

see [interface](https://github.com/zhouhoujun/type-task/blob/master/src/ITaskContainer.ts)

```ts
1.
let container = new TaskContainer(__dirname, container)
2.
TaskContainer.create(__dirname, moudles)
    .bootstrap(<IConfigure>{
        ...
        task:...
    });
3.
TaskContainer.create(__dirname, moudles)
    .bootstrap(TestTask);
4.
TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap([TestTask, TsCompile, <IConfigure>{
        ...
        task: ...
    }]);

```



Documentation is available on the
[@taskp/core docs site](https://github.com/zhouhoujun/type-task).

## License

MIT © [Houjun](https://github.com/zhouhoujun/)