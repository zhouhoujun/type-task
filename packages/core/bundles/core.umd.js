(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tslib'), require('@ts-ioc/core'), require('rxjs/BehaviorSubject'), require('rxjs/add/operator/filter'), require('@ts-ioc/aop'), require('@ts-ioc/logs')) :
	typeof define === 'function' && define.amd ? define(['tslib', '@ts-ioc/core', 'rxjs/BehaviorSubject', 'rxjs/add/operator/filter', '@ts-ioc/aop', '@ts-ioc/logs'], factory) :
	(global.core = global.core || {}, global.core.umd = global.core.umd || {}, global.core.umd.js = factory(global.tslib_1,global.core_1,global.BehaviorSubject_1,global.filter,global.aop_1,global.logs_1));
}(this, (function (tslib_1,core_1,BehaviorSubject_1,filter,aop_1,logs_1) { 'use strict';

tslib_1 = tslib_1 && tslib_1.hasOwnProperty('default') ? tslib_1['default'] : tslib_1;
core_1 = core_1 && core_1.hasOwnProperty('default') ? core_1['default'] : core_1;
BehaviorSubject_1 = BehaviorSubject_1 && BehaviorSubject_1.hasOwnProperty('default') ? BehaviorSubject_1['default'] : BehaviorSubject_1;
filter = filter && filter.hasOwnProperty('default') ? filter['default'] : filter;
aop_1 = aop_1 && aop_1.hasOwnProperty('default') ? aop_1['default'] : aop_1;
logs_1 = logs_1 && logs_1.hasOwnProperty('default') ? logs_1['default'] : logs_1;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var ITaskContainer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.TaskContainerToken=new core_1.InjectToken("__TASK_TaskContainer");

});

unwrapExports(ITaskContainer);
var ITaskContainer_1 = ITaskContainer.TaskContainerToken;

var ITaskBuilder = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.TaskBuilderToken=new core_1.InjectToken("__TASK_Builder");

});

unwrapExports(ITaskBuilder);
var ITaskBuilder_1 = ITaskBuilder.TaskBuilderToken;

var ITask = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.TaskToken=new core_1.InjectToken("__TASK_Task");

});

unwrapExports(ITask);
var ITask_1 = ITask.TaskToken;

var RunWay_1 = createCommonjsModule(function (module, exports) {
var RunWay;Object.defineProperty(exports,"__esModule",{value:!0}), function(e){e[e.sequence=1]="sequence", e[e.parallel=2]="parallel", e[e.nodeFirst=4]="nodeFirst", e[e.nodeLast=8]="nodeLast", e[e.seqFirst=5]="seqFirst", e[e.seqLast=9]="seqLast", e[e.paraFirst=6]="paraFirst", e[e.paraLast=10]="paraLast";}(RunWay=exports.RunWay||(exports.RunWay={}));

});

unwrapExports(RunWay_1);
var RunWay_2 = RunWay_1.RunWay;

var IContext = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.ContextToken=new core_1.InjectToken("__TASK_Context");

});

unwrapExports(IContext);
var IContext_1 = IContext.ContextToken;

var TaskComponent_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskComponent=function(n){function t(t){var e=n.call(this,t)||this;return e.runWay=RunWay_1.RunWay.seqFirst, e}return tslib_1.__extends(t,n), t.prototype.run=function(t){var n,r=this;return n=this.runWay&RunWay_1.RunWay.nodeFirst?this.execute(t):Promise.resolve(t), this.runWay&RunWay_1.RunWay.sequence?this.each(function(e){n=n.then(function(t){return e.run(t)});},core_1.Mode.children):this.runWay&RunWay_1.RunWay.parallel&&(n=n.then(function(e){return Promise.all(r.children.map(function(t){return t.run(e)}))})), this.runWay&RunWay_1.RunWay.nodeLast&&(n=n.then(function(t){return r.execute(t)})), n}, t.prototype.getRoot=function(){return this.find(function(t){return!t.parent},core_1.Mode.route)}, t.classAnnations={name:"TaskComponent",params:{constructor:["name"],run:["data"],getRoot:[],execute:["data"]}}, tslib_1.__decorate([core_1.Inject(IContext.ContextToken),tslib_1.__metadata("design:type",Object)],t.prototype,"context",void 0), t=tslib_1.__decorate([core_1.Abstract(),tslib_1.__metadata("design:paramtypes",[String])],t)}(core_1.GComposite);exports.TaskComponent=TaskComponent;

});

unwrapExports(TaskComponent_1);
var TaskComponent_2 = TaskComponent_1.TaskComponent;

var Task = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function createTaskDecorator(a,r,t,n,s){return core_1.createClassDecorator("Task",function(e){n&&n(e), e.next({match:function(e){return e&&(core_1.isString(e)||core_1.isObject(e)&&e instanceof core_1.Registration)},setMetadata:function(e,a){core_1.isString(a)?e.name=a:(e.provide=a)instanceof core_1.Registration&&(e.name=a.getDesc());}}), e.next({match:function(e){return e&&core_1.isString(e)},setMetadata:function(e,a){e.name=a;}});},function(e){(s&&(e=s(e)), !e.name&&core_1.isClass(e.type))&&(/^[a-z]$/.test(e.type.name)&&e.type.classAnnations?e.name=e.type.classAnnations.name:e.name=e.type.name);return e.provide=e.provide||t, e.alias=e.alias||e.name, e.taskType=a, e.builder||(e.builder=r), e})}exports.createTaskDecorator=createTaskDecorator, exports.Task=createTaskDecorator("Task",ITaskBuilder.TaskBuilderToken,ITask.TaskToken);

});

unwrapExports(Task);
var Task_1 = Task.createTaskDecorator;
var Task_2 = Task.Task;

var Runner = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.Runner=core_1.createClassDecorator("Runner");

});

unwrapExports(Runner);
var Runner_1 = Runner.Runner;

var decorators = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(Task,exports), tslib_1.__exportStar(Runner,exports);

});

unwrapExports(decorators);

var TaskElement_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskElement=function(t){function e(e){return t.call(this,e)||this}return tslib_1.__extends(e,t), e.prototype.execute=function(e){return Promise.resolve(e)}, e.classAnnations={name:"TaskElement",params:{constructor:["name"],execute:["data"]}}, e=tslib_1.__decorate([decorators.Task,tslib_1.__metadata("design:paramtypes",[String])],e)}(TaskComponent_1.TaskComponent);exports.TaskElement=TaskElement;

});

unwrapExports(TaskElement_1);
var TaskElement_2 = TaskElement_1.TaskElement;

var TaskBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskBuilder=function(o){function e(e){return o.call(this,e)||this}return tslib_1.__extends(e,o), (t=e).prototype.build=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,r,n;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,o.prototype.build.call(this,i)];case 1:if(!(t=e.sent()))throw new Error("builder task instance failed.");return r=this.getConfigure(i), n=this.getBuilderToken(r), core_1.isFunction(t.onTaskInit)&&t.onTaskInit(r), [4,n.buildWithConfigure(t,r)];case 2:return e.sent(), [2,t]}})})}, e.prototype.buildWithConfigure=function(t,r){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.beforeBindConfig(t,r)];case 1:return e.sent(), t instanceof TaskComponent_1.TaskComponent&&r.children&&r.children.length?[4,this.buildChildren(t,r.children)]:[3,3];case 2:e.sent(), e.label=3;case 3:return[4,this.afterBindConfig(t,r)];case 4:return e.sent(), [2,t]}})})}, e.prototype.beforeBindConfig=function(t,r){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return r.name&&(t.name=r.name), r.runWay&&(t.runWay=r.runWay), [2,t]})})}, e.prototype.afterBindConfig=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,t]})})}, e.prototype.buildChildren=function(r,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var t=this;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return core_1.isFunction(r.add)?[4,Promise.all(n.map(function(r){return tslib_1.__awaiter(t,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.build(r)];case 1:return(t=e.sent())?t instanceof TaskComponent_1.TaskComponent&&!core_1.isToken(r)&&r.children&&r.children.length?[4,this.buildChildren(t,r.children)]:[3,3]:[2,null];case 2:e.sent(), e.label=3;case 3:return[2,t]}})})}))]:[2];case 1:return e.sent().forEach(function(e){e&&r.add(e);}), [2]}})})}, e.prototype.buildComponent=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,r,n;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return core_1.isToken(i)?[4,this.build(i).catch(function(e){return console.error(e), null})]:[3,2];case 1:return t=e.sent(), [3,7];case 2:return core_1.isMetadataObject(i)?(r=i).imports?[4,(n=this.container).loadModule.apply(n,r.imports)]:[3,4]:[3,6];case 3:e.sent(), e.label=4;case 4:return r.children||r.task||r.bootstrap?(r.bootstrap||(r.task=r.task||TaskElement_1.TaskElement), [4,this.build(r).catch(function(e){return console.error(e), null})]):[2,null];case 5:return t=e.sent(), [3,7];case 6:t=null, e.label=7;case 7:return[2,t]}})})}, e.prototype.getConfigure=function(e,t){return o.prototype.getConfigure.call(this,e,t||decorators.Task)}, e.prototype.getBootstrapToken=function(e,t){var r=e.task||e.bootstrap||t;return core_1.isString(r)&&(r=this.traslateStrToken(r)), r}, e.prototype.traslateStrToken=function(e){var t=new core_1.Registration(ITask.TaskToken,e);return this.container.has(t)?t:e}, e.prototype.getBuilderToken=function(e){var t;return e.builder&&(t=this.getBuilderTokenViaConfig(e.builder)), !t&&e.task&&(t=this.getBuilderTokenViaTask(e.task)), t||this}, e.prototype.getBuilderTokenViaConfig=function(e){return core_1.isToken(e)?this.container.resolve(e):e instanceof t?e:null}, e.prototype.getBuilderTokenViaTask=function(e){if(core_1.isToken(e)){var t=core_1.isClass(e)?e:this.container.getTokenImpl(e);if(t){var r=core_1.lang.first(core_1.getTypeMetadata(decorators.Task,t));if(r&&r.builder)return core_1.isToken(r.builder)?this.container.resolve(r.builder):r.builder}}return null}, e.classAnnations={name:"TaskBuilder",params:{constructor:["container"],build:["task"],buildWithConfigure:["taskInst","config"],beforeBindConfig:["taskInst","config"],afterBindConfig:["taskInst","config"],buildChildren:["parent","configs"],buildComponent:["child"],getConfigure:["token","moduleDecorator"],getBootstrapToken:["cfg","token"],traslateStrToken:["token"],getBuilderToken:["cfg"],getBuilderTokenViaConfig:["builder"],getBuilderTokenViaTask:["task"]}}, e=t=tslib_1.__decorate([core_1.Singleton(ITaskBuilder.TaskBuilderToken),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],e);var t;}(core_1.ModuleBuilder);exports.TaskBuilder=TaskBuilder;

});

unwrapExports(TaskBuilder_1);
var TaskBuilder_2 = TaskBuilder_1.TaskBuilder;

var uuid = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.UUIDToken=new core_1.InjectToken("uuid_factory");var RandomUUIDFactory=function(){function t(){}return t.prototype.generate=function(){return this.randomS4()+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+this.randomS4()+this.randomS4()}, t.prototype.randomS4=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)}, t.classAnnations={name:"RandomUUIDFactory",params:{constructor:[],generate:[],randomS4:[]}}, t=tslib_1.__decorate([core_1.Singleton(exports.UUIDToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.RandomUUIDFactory=RandomUUIDFactory;

});

unwrapExports(uuid);
var uuid_1 = uuid.UUIDToken;
var uuid_2 = uuid.RandomUUIDFactory;

var AbstractTask_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var AbstractTask=function(){function t(t){this.name=t, this.runWay=RunWay_1.RunWay.sequence;}return t.classAnnations={name:"AbstractTask",params:{constructor:["name"],run:["data"]}}, tslib_1.__decorate([core_1.Inject(IContext.ContextToken),tslib_1.__metadata("design:type",Object)],t.prototype,"context",void 0), t=tslib_1.__decorate([core_1.Abstract(),tslib_1.__metadata("design:paramtypes",[String])],t)}();exports.AbstractTask=AbstractTask;

});

unwrapExports(AbstractTask_1);
var AbstractTask_2 = AbstractTask_1.AbstractTask;

var ITaskRunner = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunState;exports.TaskRunnerToken=new core_1.InjectToken("__TASK_TaskRunner"), function(e){e[e.init=0]="init", e[e.running=1]="running", e[e.pause=2]="pause", e[e.stop=3]="stop", e[e.complete=4]="complete";}(RunState=exports.RunState||(exports.RunState={}));

});

unwrapExports(ITaskRunner);
var ITaskRunner_1 = ITaskRunner.TaskRunnerToken;
var ITaskRunner_2 = ITaskRunner.RunState;

var Context_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var Context=function(){function t(){}return t.prototype.getContainer=function(){return this.container}, t.prototype.getTaskContiner=function(){return this.container.resolve(ITaskContainer.TaskContainerToken)}, t.prototype.getRootPath=function(){return this.getTaskContiner().getRootPath()}, t.prototype.getRunner=function(t,e,n,r){var o;return core_1.isToken(n)?o=this.container.resolve(n):n instanceof TaskBuilder_1.TaskBuilder&&(o=n), this.container.resolve(ITaskRunner.TaskRunnerToken,{work:t,uuid:e,instance:r,taskBuilder:o})}, t.prototype.getEnvArgs=function(){return{}}, t.prototype.to=function(t,e){return core_1.isFunction(t)?t(this,e):t}, t.prototype.isTask=function(t){return core_1.hasOwnClassMetadata(decorators.Task,t)}, t.classAnnations={name:"Context",params:{constructor:[],getContainer:[],getTaskContiner:[],getRootPath:[],getRunner:["task","uuid","builder","instance"],getEnvArgs:[],to:["target","config"],isTask:["task"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=tslib_1.__decorate([core_1.Singleton(IContext.ContextToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.Context=Context;

});

unwrapExports(Context_1);
var Context_2 = Context_1.Context;

var TaskRunner_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskRunner=function(){function t(t,e,r,n){this.work=t, this.uuid=e, this.instance=r, this.taskBuilder=n, this._result=new BehaviorSubject_1.BehaviorSubject(null), this.stateChanged=new BehaviorSubject_1.BehaviorSubject(ITaskRunner.RunState.init);}return Object.defineProperty(t.prototype,"task",{get:function(){return this.work},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"taskInstance",{get:function(){return this.instance},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"result",{get:function(){return this._result.filter(function(t){return!t})},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"resultValue",{get:function(){return this._resultValue},enumerable:!0,configurable:!0}), t.prototype.onInit=function(){this.uuid||(core_1.isToken(this.work)?this.uuid=this.createUUID():this.work&&(this.uuid=this.work.uuid||this.createUUID())), this.container.bindProvider(this.uuid,this);}, t.prototype.createUUID=function(){return this.container.has(uuid.UUIDToken)||this.container.register(uuid.RandomUUIDFactory), this.container.get(uuid.UUIDToken).generate()}, t.prototype.getBuilder=function(){return this.taskBuilder||(this.taskBuilder=this.container.resolve(ITaskBuilder.TaskBuilderToken)), this.taskBuilder}, t.prototype.getInstance=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return this.instance?[3,2]:[4,(e=this).getBuilder().build(this.task)];case 1:e.instance=t.sent(), t.label=2;case 2:return this.instance.workflowId||(this.instance.workflowId=this.uuid), [2,this.instance]}})})}, t.prototype.start=function(r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.getInstance()];case 1:return[2,t.sent().run(r).then(function(t){return e.state=ITaskRunner.RunState.complete, e.stateChanged.next(e.state), e._resultValue=t, e._result.next(t), t})]}})})}, t.prototype.saveState=function(t){this._currState=t;}, t.prototype.stop=function(){this.state=ITaskRunner.RunState.stop, this.stateChanged.next(this.state);}, t.prototype.pause=function(){this.state=ITaskRunner.RunState.pause, this.stateChanged.next(this.state);}, t.classAnnations={name:"TaskRunner",params:{constructor:["work","uuid","instance","taskBuilder"],onInit:[],createUUID:[],getBuilder:[],getInstance:[],start:["data"],saveState:["state"],stop:[],pause:[]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=tslib_1.__decorate([decorators.Runner(ITaskRunner.TaskRunnerToken),tslib_1.__metadata("design:paramtypes",[Object,String,Object,Object])],t)}();exports.TaskRunner=TaskRunner;

});

unwrapExports(TaskRunner_1);
var TaskRunner_2 = TaskRunner_1.TaskRunner;

var core = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(ITaskBuilder,exports), tslib_1.__exportStar(TaskBuilder_1,exports), tslib_1.__exportStar(ITask,exports), tslib_1.__exportStar(uuid,exports), tslib_1.__exportStar(AbstractTask_1,exports), tslib_1.__exportStar(TaskComponent_1,exports), tslib_1.__exportStar(TaskElement_1,exports), tslib_1.__exportStar(decorators,exports), tslib_1.__exportStar(RunWay_1,exports), tslib_1.__exportStar(IContext,exports), tslib_1.__exportStar(Context_1,exports), tslib_1.__exportStar(ITaskRunner,exports), tslib_1.__exportStar(TaskRunner_1,exports);

});

unwrapExports(core);

var RunAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunAspect=function(){function t(){}return t.prototype.beforeRun=function(t){var e=this.getRunner(t.target);if(e)switch(e.saveState(t), e.state){case core.RunState.pause:throw new Error("workflow paused!");case core.RunState.stop:throw new Error("workflow stop!")}}, t.prototype.afterRun=function(t){var e=this.getRunner(t.target);if(e)switch(e.saveState(t), e.state){case core.RunState.pause:throw new Error("workflow paused!");case core.RunState.stop:throw new Error("workflow stop!")}}, t.prototype.getRunner=function(t){if(t instanceof core.TaskComponent){var e=t.getRoot();if(e.workflowId&&this.container.has(e.workflowId))return this.container.resolve(e.workflowId)}return null}, t.classAnnations={name:"RunAspect",params:{constructor:[],beforeRun:["joinPoint"],afterRun:["joinPoint"],getRunner:["task"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), tslib_1.__decorate([aop_1.Before("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"beforeRun",null), tslib_1.__decorate([aop_1.AfterReturning("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"afterRun",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core.Task,singleton:!0}),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.RunAspect=RunAspect;

});

unwrapExports(RunAspect_1);
var RunAspect_2 = RunAspect_1.RunAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(RunAspect_1,exports);

});

unwrapExports(aop);

var CoreModule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var CoreModule=function(){function e(e){this.container=e;}return e.prototype.setup=function(){var e=this.container,o=e.getLifeScope();o.registerDecorator(core.Runner,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), o.registerDecorator(core.Task,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), e.register(core.TaskElement), e.register(core.TaskBuilder), e.register(core.TaskRunner), e.register(aop.RunAspect);}, e.classAnnations={name:"CoreModule",params:{constructor:["container"],setup:[]}}, e=tslib_1.__decorate([core_1.IocExt("setup"),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],e)}();exports.CoreModule=CoreModule;

});

unwrapExports(CoreModule_1);
var CoreModule_2 = CoreModule_1.CoreModule;

var DefaultTaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var DefaultTaskContainer=function(n){function e(e){var t=n.call(this,e)||this;return t.rootPath=e, t.logAspects=[], t}return tslib_1.__extends(e,n), e.prototype.useLog=function(e){return core_1.hasClassMetadata(aop_1.Aspect,e)?this.logAspects.push(e):console.error("logAspect param is not right aspect"), this}, e.prototype.createRunner=function(e,t){return this.getContainer().resolve(core.TaskRunnerToken,{work:e,instance:t,taskBuilder:this.getModuleBuilder()})}, e.prototype.createWorkflow=function(){for(var t=this,e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var o=1<e.length?{children:e,task:core.TaskElement}:core_1.lang.first(e);return n.prototype.bootstrap.call(this,o).then(function(e){return t.createRunner(o,e)})}, e.prototype.bootstrap=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.createWorkflow.apply(this,r)];case 1:return[4,(t=e.sent()).start()];case 2:return e.sent(), [2,t]}})})}, e.prototype.getRootPath=function(){return this.rootPath}, e.prototype.createModuleBuilder=function(){return this.getContainer().get(core.TaskBuilderToken)}, e.prototype.registerExts=function(t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return t.has(aop_1.AopModule)||t.register(aop_1.AopModule), t.has(logs_1.LogModule)||t.register(logs_1.LogModule), t.bindProvider(ITaskContainer.TaskContainerToken,this), t.has(CoreModule_1.CoreModule)||t.register(CoreModule_1.CoreModule), this.beforRegister(t), [4,n.prototype.registerExts.call(this,t)];case 1:return e.sent(), [2,t]}})})}, e.prototype.beforRegister=function(t){this.logAspects.forEach(function(e){e&&t.register(e);});}, e.prototype.setConfigRoot=function(e){e.rootdir=this.rootPath;}, e.classAnnations={name:"DefaultTaskContainer",params:{constructor:["rootPath"],useLog:["logAspect"],createRunner:["task","instance"],createWorkflow:["tasks"],bootstrap:["tasks"],getRootPath:[],createModuleBuilder:[],registerExts:["container"],beforRegister:["container"],setConfigRoot:["config"]}}, e}(core_1.ApplicationBuilder);exports.DefaultTaskContainer=DefaultTaskContainer;

});

unwrapExports(DefaultTaskContainer_1);
var DefaultTaskContainer_2 = DefaultTaskContainer_1.DefaultTaskContainer;

var objectUtil = createCommonjsModule(function (module, exports) {
function pick(r){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];var c={};return e.forEach(function(e){c[e]=r[e];}), c}Object.defineProperty(exports,"__esModule",{value:!0}), exports.pick=pick;

});

unwrapExports(objectUtil);
var objectUtil_1 = objectUtil.pick;

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(objectUtil,exports);

});

unwrapExports(utils);

var D__workspace_github_typeTask_packages_core_lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(ITaskContainer,exports), tslib_1.__exportStar(DefaultTaskContainer_1,exports), tslib_1.__exportStar(utils,exports), tslib_1.__exportStar(core,exports), tslib_1.__exportStar(aop,exports);

});

var index$4 = unwrapExports(D__workspace_github_typeTask_packages_core_lib);

return index$4;

})));
