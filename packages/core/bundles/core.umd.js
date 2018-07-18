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

var IActivityBuilder = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var InjectAcitityBuilderToken=function(t){function e(e){return t.call(this,"ActivityBuilder",e)||this}return tslib_1.__extends(e,t), e.classAnnations={name:"InjectAcitityBuilderToken",params:{constructor:["desc"]}}, e}(core_1.Registration);exports.InjectAcitityBuilderToken=InjectAcitityBuilderToken, exports.ActivityBuilderToken=new core_1.InjectToken("__TASK_Builder");
});

unwrapExports(IActivityBuilder);
var IActivityBuilder_1 = IActivityBuilder.InjectAcitityBuilderToken;
var IActivityBuilder_2 = IActivityBuilder.ActivityBuilderToken;

var IConfigure = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function isActivityType(e,t){return void 0===t&&(t=!0), !!e&&(!core_1.isString(e)&&(!!core_1.isToken(e)||!!core_1.isMetadataObject(e)&&(!t||!(!e.task&&!e.bootstrap))))}exports.isActivityType=isActivityType;
});

unwrapExports(IConfigure);
var IConfigure_1 = IConfigure.isActivityType;

var IActivity = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var InjectAcitityToken=function(e){function t(t){return e.call(this,"Activity",t)||this}return tslib_1.__extends(t,e), t.classAnnations={name:"InjectAcitityToken",params:{constructor:["desc"]}}, t}(core_1.Registration);exports.InjectAcitityToken=InjectAcitityToken, exports.ActivityToken=new InjectAcitityToken("");
});

unwrapExports(IActivity);
var IActivity_1 = IActivity.InjectAcitityToken;
var IActivity_2 = IActivity.ActivityToken;

var Task = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function createTaskDecorator(t,r,i,a,n){return core_1.createClassDecorator("Task",function(e){a&&a(e), e.next({match:function(e){return e&&(core_1.isString(e)||core_1.isObject(e)&&e instanceof core_1.Registration)},setMetadata:function(e,t){core_1.isString(t)?e.name=t:e.provide=t;}}), e.next({match:function(e){return core_1.isString(e)||core_1.isToken(e)},setMetadata:function(e,t){core_1.isString(t)?e.name=t:e.builder=t;}}), e.next({match:function(e){return core_1.isString(e)},setMetadata:function(e,t){console.log(t), e.name=t;}});},function(e){(n&&(e=n(e)), !e.name&&core_1.isClass(e.type))&&(/^[a-z]$/.test(e.type.name)&&e.type.classAnnations?e.name=e.type.classAnnations.name:e.name=e.type.name);return e.provide=e.provide||i, e.alias=e.alias||e.name, e.taskType=t, e.builder||(e.builder=r), e})}exports.createTaskDecorator=createTaskDecorator, exports.Task=createTaskDecorator("Task",IActivityBuilder.ActivityBuilderToken,IActivity.ActivityToken);
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

var IContext = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var InjectContextToken=function(t){function e(e){return t.call(this,"ActivityContext",e)||this}return tslib_1.__extends(e,t), e.classAnnations={name:"InjectContextToken",params:{constructor:["desc"]}}, e}(core_1.Registration);exports.InjectContextToken=InjectContextToken, exports.ContextToken=new InjectContextToken("");
});

unwrapExports(IContext);
var IContext_1 = IContext.InjectContextToken;
var IContext_2 = IContext.ContextToken;

var Activity_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var Activity=function(){function t(){}return t.prototype.run=function(t,e){return Promise.resolve(t)}, t.classAnnations={name:"Activity",params:{constructor:[],run:["data","execute"]}}, tslib_1.__decorate([core_1.Inject(IContext.ContextToken),tslib_1.__metadata("design:type",Object)],t.prototype,"context",void 0), t=tslib_1.__decorate([decorators.Task,tslib_1.__metadata("design:paramtypes",[])],t)}();exports.Activity=Activity;
});

unwrapExports(Activity_1);
var Activity_2 = Activity_1.Activity;

var ActivityBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var ActivityBuilder=function(a){function t(){return a.call(this)||this}var e;return tslib_1.__extends(t,a), (e=t).prototype.build=function(o,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,a.prototype.build.call(this,o)];case 1:return e=t.sent(), i=this.getConfigure(o), r=this.getBuilder(i), e&&e instanceof Activity_1.Activity?[3,3]:(i.task=r.getDefaultAcitvity(), console.log("try load default activity:",core_1.getClassName(i.task)), [4,r.build(i,n)]);case 2:e=t.sent(), t.label=3;case 3:return e.id=n, core_1.isFunction(e.onTaskInit)&&e.onTaskInit(i), [4,r.buildStrategy(e,i)];case 4:return t.sent(), [2,e]}})})}, t.prototype.buildStrategy=function(e,i){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return i.name&&(e.name=i.name), e.config=i, [2,e]})})}, t.prototype.getConfigure=function(t,e){return a.prototype.getConfigure.call(this,t,e||decorators.Task)}, t.prototype.getBuilder=function(t){var e;if(t.builder)e=this.getBuilderViaConfig(t.builder);else{var i=this.getBootstrapToken(t);i&&(e=this.getBuilderViaTask(i));}return e||this}, t.prototype.getDefaultAcitvity=function(){return Activity_1.Activity}, t.prototype.getMetaConfig=function(t,e){return core_1.lang.omit(a.prototype.getMetaConfig.call(this,t,e||decorators.Task),"builder")}, t.prototype.toExpression=function(e,i){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return IConfigure.isActivityType(e)?[4,this.build(e,i.id)]:[3,2];case 1:return[2,t.sent()];case 2:return[2,e]}})})}, t.prototype.toActivity=function(o,n,a,s,c){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return IConfigure.isActivityType(o,!c)?c?[4,this.build(core_1.isToken(o)?o:c(o),n.id)]:[3,2]:[3,5];case 1:return e=t.sent(), [3,4];case 2:return[4,this.build(o,n.id)];case 3:e=t.sent(), t.label=4;case 4:return[3,6];case 5:e=o, t.label=6;case 6:return a(e)?[2,e]:core_1.isString(e)?(i=e, [3,9]):[3,7];case 7:return[4,n.context.exec(n,e)];case 8:i=t.sent(), t.label=9;case 9:return r=s(i), c&&(r=c(r)), r?[4,this.build(r,n.id)]:[3,11];case 10:return e=t.sent(), [3,12];case 11:e=null, t.label=12;case 12:return[2,e]}})})}, t.prototype.getBuilderViaConfig=function(t){return core_1.isToken(t)?this.container.resolve(t):t instanceof e?t:null}, t.prototype.getBuilderViaTask=function(t){if(core_1.isToken(t)){var e=core_1.isClass(t)?t:this.container.getTokenImpl(t);if(e){var i=core_1.lang.first(core_1.getTypeMetadata(decorators.Task,e));if(i&&i.builder)return core_1.isToken(i.builder)?this.container.resolve(i.builder):i.builder}}return null}, t.prototype.getBootstrapToken=function(t,e){var i=t.task||t.bootstrap||e;return core_1.isString(i)&&(i=this.traslateStrToken(i)), i}, t.prototype.traslateStrToken=function(t){var e=new core_1.Registration(IActivity.ActivityToken,t);return this.container.has(e)?e:t}, t.classAnnations={name:"ActivityBuilder",params:{constructor:[],build:["task","uuid"],buildStrategy:["activity","config"],getConfigure:["token","moduleDecorator"],getBuilder:["cfg"],getDefaultAcitvity:[],getMetaConfig:["token","moduleDecorator"],toExpression:["exptype","target"],toActivity:["exptype","target","isRightActivity","toConfig","valify"],getBuilderViaConfig:["builder"],getBuilderViaTask:["task"],getBootstrapToken:["cfg","token"],traslateStrToken:["token"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=e=tslib_1.__decorate([core_1.Singleton(IActivityBuilder.ActivityBuilderToken),tslib_1.__metadata("design:paramtypes",[])],t)}(core_1.ModuleBuilder);exports.ActivityBuilder=ActivityBuilder;
});

unwrapExports(ActivityBuilder_1);
var ActivityBuilder_2 = ActivityBuilder_1.ActivityBuilder;

var uuid = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.UUIDToken=new core_1.InjectToken("uuid_factory");var RandomUUIDFactory=function(){function t(){}return t.prototype.generate=function(){return this.randomS4()+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+this.randomS4()+this.randomS4()}, t.prototype.randomS4=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)}, t.classAnnations={name:"RandomUUIDFactory",params:{constructor:[],generate:[],randomS4:[]}}, t=tslib_1.__decorate([core_1.Singleton(exports.UUIDToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.RandomUUIDFactory=RandomUUIDFactory;
});

unwrapExports(uuid);
var uuid_1 = uuid.UUIDToken;
var uuid_2 = uuid.RandomUUIDFactory;

var ITaskRunner = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunState,InjectTaskRunnerToken=function(n){function e(e){return n.call(this,"TaskRunner",e)||this}return tslib_1.__extends(e,n), e.classAnnations={name:"InjectTaskRunnerToken",params:{constructor:["desc"]}}, e}(core_1.Registration);exports.InjectTaskRunnerToken=InjectTaskRunnerToken, exports.TaskRunnerToken=new InjectTaskRunnerToken(""), function(e){e[e.init=0]="init", e[e.running=1]="running", e[e.pause=2]="pause", e[e.stop=3]="stop", e[e.complete=4]="complete";}(RunState=exports.RunState||(exports.RunState={}));
});

unwrapExports(ITaskRunner);
var ITaskRunner_1 = ITaskRunner.InjectTaskRunnerToken;
var ITaskRunner_2 = ITaskRunner.TaskRunnerToken;
var ITaskRunner_3 = ITaskRunner.RunState;

var TaskRunner_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskRunner=function(){function t(t,e,i,n){this.activity=t, this.uuid=e, this.instance=i, this.activityBuilder=n, this._result=new BehaviorSubject_1.BehaviorSubject(null), this.stateChanged=new BehaviorSubject_1.BehaviorSubject(ITaskRunner.RunState.init);}return Object.defineProperty(t.prototype,"task",{get:function(){return this.activity},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"taskInstance",{get:function(){return this.instance},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"result",{get:function(){return this._result.filter(function(t){return!t})},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"resultValue",{get:function(){return this._resultValue},enumerable:!0,configurable:!0}), t.prototype.onInit=function(){this.container.bindProvider(this.getUUID(),this);}, t.prototype.getUUID=function(){return this.uuid||(this.instance&&this.instance.id?this.uuid=this.instance.id:core_1.isToken(this.activity)&&(this.uuid=this.createUUID()), this.uuid=this.uuid||this.createUUID()), this.uuid}, t.prototype.getBuilder=function(){return this.activityBuilder||(this.activityBuilder=this.container.resolve(IActivityBuilder.ActivityBuilderToken)), this.activityBuilder}, t.prototype.getInstance=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return this.instance?[3,2]:[4,(e=this).getBuilder().build(this.task,this.getUUID())];case 1:e.instance=t.sent(), t.label=2;case 2:return[2,this.instance]}})})}, t.prototype.start=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var e=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.getInstance()];case 1:return[2,t.sent().run(i).then(function(t){return e.state=ITaskRunner.RunState.complete, e.stateChanged.next(e.state), e._resultValue=t, e._result.next(t), t})]}})})}, t.prototype.saveState=function(t){this._currState=t;}, t.prototype.stop=function(){this.state=ITaskRunner.RunState.stop, this.stateChanged.next(this.state);}, t.prototype.pause=function(){this.state=ITaskRunner.RunState.pause, this.stateChanged.next(this.state);}, t.prototype.createUUID=function(){return this.container.has(uuid.UUIDToken)||this.container.register(uuid.RandomUUIDFactory), this.container.get(uuid.UUIDToken).generate()}, t.classAnnations={name:"TaskRunner",params:{constructor:["activity","uuid","instance","activityBuilder"],onInit:[],getUUID:[],getBuilder:[],getInstance:[],start:["data"],saveState:["state"],stop:[],pause:[],createUUID:[]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=tslib_1.__decorate([decorators.Runner(ITaskRunner.TaskRunnerToken),tslib_1.__metadata("design:paramtypes",[Object,String,Object,Object])],t)}();exports.TaskRunner=TaskRunner;
});

unwrapExports(TaskRunner_1);
var TaskRunner_2 = TaskRunner_1.TaskRunner;

var Context_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var Context=function(){function t(){}return t.prototype.getContainer=function(){return this.container}, t.prototype.getTaskContiner=function(){return this.container.resolve(ITaskContainer.TaskContainerToken)}, t.prototype.getRootPath=function(){return this.getTaskContiner().getRootPath()}, t.prototype.getRunner=function(t,e,n,r){var o;return core_1.isToken(n)?o=this.container.resolve(n):n instanceof ActivityBuilder_1.ActivityBuilder&&(o=n), this.container.resolve(ITaskRunner.TaskRunnerToken,{activity:t,uuid:e,instance:r,activityBuilder:o})}, t.prototype.getEnvArgs=function(){return{}}, t.prototype.to=function(t,e){return core_1.isFunction(t)?core_1.isClass(t)?t:t(this,e):t}, t.prototype.exec=function(t,e,n){return core_1.isFunction(e)?e(t,n):core_1.isPromise(e)?e:e instanceof Activity_1.Activity?e.run(n,t):e instanceof TaskRunner_1.TaskRunner?e.start(n):core_1.isUndefined(e)?Promise.resolve(void 0):Promise.resolve(e)}, t.prototype.isTask=function(t){return core_1.hasOwnClassMetadata(decorators.Task,t)}, t.classAnnations={name:"Context",params:{constructor:[],getContainer:[],getTaskContiner:[],getRootPath:[],getRunner:["task","uuid","builder","instance"],getEnvArgs:[],to:["target","config"],exec:["target","expression","data"],isTask:["task"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=tslib_1.__decorate([core_1.Singleton(IContext.ContextToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.Context=Context;
});

unwrapExports(Context_1);
var Context_2 = Context_1.Context;

var core = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(IActivityBuilder,exports), tslib_1.__exportStar(ActivityBuilder_1,exports), tslib_1.__exportStar(IActivity,exports), tslib_1.__exportStar(Activity_1,exports), tslib_1.__exportStar(IConfigure,exports), tslib_1.__exportStar(uuid,exports), tslib_1.__exportStar(decorators,exports), tslib_1.__exportStar(IContext,exports), tslib_1.__exportStar(Context_1,exports), tslib_1.__exportStar(ITaskRunner,exports), tslib_1.__exportStar(TaskRunner_1,exports);
});

unwrapExports(core);

var RunAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunAspect=function(){function t(){}return t.prototype.beforeRun=function(t){var e=this.getRunner(t.target);if(e)switch(e.saveState(t), e.state){case core.RunState.pause:throw new Error("workflow paused!");case core.RunState.stop:throw new Error("workflow stop!")}}, t.prototype.afterRun=function(t){var e=this.getRunner(t.target);if(e)switch(e.saveState(t), e.state){case core.RunState.pause:throw new Error("workflow paused!");case core.RunState.stop:throw new Error("workflow stop!")}}, t.prototype.getRunner=function(t){return t instanceof core.Activity&&t.id&&this.container.has(t.id)?this.container.resolve(t.id):null}, t.classAnnations={name:"RunAspect",params:{constructor:[],beforeRun:["joinPoint"],afterRun:["joinPoint"],getRunner:["task"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), tslib_1.__decorate([aop_1.Before("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"beforeRun",null), tslib_1.__decorate([aop_1.AfterReturning("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"afterRun",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core.Task,singleton:!0}),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.RunAspect=RunAspect;
});

unwrapExports(RunAspect_1);
var RunAspect_2 = RunAspect_1.RunAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(RunAspect_1,exports);
});

unwrapExports(aop);

var CoreModule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var CoreModule=function(){function e(e){this.container=e;}return e.prototype.setup=function(){var e=this.container,o=e.getLifeScope();o.registerDecorator(core.Runner,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), o.registerDecorator(core.Task,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), e.register(core.ActivityBuilder), e.register(core.TaskRunner), e.register(aop.RunAspect), e.register(core.Activity);}, e.classAnnations={name:"CoreModule",params:{constructor:["container"],setup:[]}}, e=tslib_1.__decorate([core_1.IocExt("setup"),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],e)}();exports.CoreModule=CoreModule;
});

unwrapExports(CoreModule_1);
var CoreModule_2 = CoreModule_1.CoreModule;

var Delay = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.DelayActivityToken=new core.InjectAcitityToken("delay"), exports.DelayActivityBuilderToken=new core.InjectAcitityBuilderToken("delay");var DelayActivity=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return tslib_1.__extends(t,e), t.prototype.run=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,i,r;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.context.exec(this,this.delay,n)];case 1:return t=e.sent(), i=new core_1.Defer, r=setTimeout(function(){i.resolve(n), clearTimeout(r);},t), [4,i.promise];case 2:return[2,e.sent()]}})})}, t.classAnnations={name:"DelayActivity",params:{run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.DelayActivityToken,exports.DelayActivityBuilderToken)],t)}(core.Activity);exports.DelayActivity=DelayActivity;var DelayActivityBuilder=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return tslib_1.__extends(e,n), e.prototype.buildStrategy=function(i,r){return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,n.prototype.buildStrategy.call(this,i,r)];case 1:return e.sent(), i instanceof DelayActivity?(t=i, [4,this.toExpression(r.delay,i)]):[3,3];case 2:t.delay=e.sent(), e.label=3;case 3:return[2,i]}})})}, e.classAnnations={name:"DelayActivityBuilder",params:{buildStrategy:["activity","config"]}}, e=tslib_1.__decorate([core_1.Singleton(exports.DelayActivityBuilderToken)],e)}(core.ActivityBuilder);exports.DelayActivityBuilder=DelayActivityBuilder;
});

unwrapExports(Delay);
var Delay_1 = Delay.DelayActivityToken;
var Delay_2 = Delay.DelayActivityBuilderToken;
var Delay_3 = Delay.DelayActivity;
var Delay_4 = Delay.DelayActivityBuilder;

var Interval = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.IntervalActivityToken=new core.InjectAcitityToken("interval"), exports.IntervalActivityBuilderToken=new core.InjectAcitityBuilderToken("interval");var IntervalActivity=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(e,t), e.prototype.run=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.interval,n)];case 1:return e=t.sent(), i=n, setInterval(function(){r.body.run(i);},e), [2,n]}})})}, e.classAnnations={name:"IntervalActivity",params:{run:["data"]}}, e=tslib_1.__decorate([core.Task(exports.IntervalActivityToken,exports.IntervalActivityBuilderToken)],e)}(core.Activity);exports.IntervalActivity=IntervalActivity;var IntervalActivityBuilder=function(a){function t(){return null!==a&&a.apply(this,arguments)||this}return tslib_1.__extends(t,a), t.prototype.buildStrategy=function(r,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,a.prototype.buildStrategy.call(this,r,n)];case 1:return t.sent(), r instanceof IntervalActivity?(e=r, [4,this.toExpression(n.interval,r)]):[3,4];case 2:return e.interval=t.sent(), i=r, [4,this.build(n.body,r.id)];case 3:i.body=t.sent(), t.label=4;case 4:return[2,r]}})})}, t.classAnnations={name:"IntervalActivityBuilder",params:{buildStrategy:["activity","config"]}}, t=tslib_1.__decorate([core_1.Singleton(exports.IntervalActivityBuilderToken)],t)}(core.ActivityBuilder);exports.IntervalActivityBuilder=IntervalActivityBuilder;
});

unwrapExports(Interval);
var Interval_1 = Interval.IntervalActivityToken;
var Interval_2 = Interval.IntervalActivityBuilderToken;
var Interval_3 = Interval.IntervalActivity;
var Interval_4 = Interval.IntervalActivityBuilder;

var DoWhile = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.DoWhileActivityToken=new core.InjectAcitityToken("dowhile"), exports.DoWhileActivityBuilderToken=new core.InjectAcitityBuilderToken("delay");var DoWhileActivity=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(e,t), e.prototype.run=function(r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.body.run(r)];case 1:return e=t.sent(), [4,this.context.exec(this,this.condition,e)];case 2:i=t.sent(), t.label=3;case 3:return i?[4,this.body.run(e||r)]:[3,6];case 4:return e=t.sent(), [4,this.context.exec(this,this.condition,e)];case 5:return i=t.sent(), [3,3];case 6:return[2,e]}})})}, e.classAnnations={name:"DoWhileActivity",params:{run:["data"]}}, e=tslib_1.__decorate([core.Task(exports.DoWhileActivityToken,exports.DoWhileActivityBuilderToken)],e)}(core.Activity);exports.DoWhileActivity=DoWhileActivity;var DoWhileActivityBuilder=function(o){function t(){return null!==o&&o.apply(this,arguments)||this}return tslib_1.__extends(t,o), t.prototype.buildStrategy=function(r,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,o.prototype.buildStrategy.call(this,r,n)];case 1:return t.sent(), r instanceof DoWhileActivity?(e=r, [4,this.build(n.do,r.id)]):[3,4];case 2:return e.body=t.sent(), i=r, [4,this.toExpression(n.while,r)];case 3:i.condition=t.sent(), t.label=4;case 4:return[2,r]}})})}, t.classAnnations={name:"DoWhileActivityBuilder",params:{buildStrategy:["activity","config"]}}, t=tslib_1.__decorate([core_1.Singleton(exports.DoWhileActivityBuilderToken)],t)}(core.ActivityBuilder);exports.DoWhileActivityBuilder=DoWhileActivityBuilder;
});

unwrapExports(DoWhile);
var DoWhile_1 = DoWhile.DoWhileActivityToken;
var DoWhile_2 = DoWhile.DoWhileActivityBuilderToken;
var DoWhile_3 = DoWhile.DoWhileActivity;
var DoWhile_4 = DoWhile.DoWhileActivityBuilder;

var If = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.IfActivityToken=new core.InjectAcitityToken("if"), exports.IfActivityBuilderToken=new core.InjectAcitityBuilderToken("if");var IfActivity=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(e,t), e.prototype.run=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.condition,e)];case 1:return t.sent()?[2,this.execIf(e)]:this.elseBody?[2,this.execElse(e)]:[2,Promise.resolve(e)]}})})}, e.prototype.execIf=function(t){return this.ifBody.run(t)}, e.prototype.execElse=function(t){return this.elseBody.run(t)}, e.classAnnations={name:"IfActivity",params:{run:["data"],execIf:["data"],execElse:["data"]}}, e=tslib_1.__decorate([core.Task(exports.IfActivityToken,exports.IfActivityBuilderToken)],e)}(core.Activity);exports.IfActivity=IfActivity;var IfActivityBuilder=function(o){function t(){return null!==o&&o.apply(this,arguments)||this}return tslib_1.__extends(t,o), t.prototype.buildStrategy=function(n,s){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,o.prototype.buildStrategy.call(this,n,s)];case 1:return t.sent(), n instanceof IfActivity?(e=n, [4,this.build(s.ifBody,n.id)]):[3,5];case 2:return e.ifBody=t.sent(), i=n, [4,this.toExpression(s.if,n)];case 3:return i.condition=t.sent(), s.elseBody?(r=n, [4,this.build(s.elseBody,n.id)]):[3,5];case 4:r.elseBody=t.sent(), t.label=5;case 5:return[2,n]}})})}, t.classAnnations={name:"IfActivityBuilder",params:{buildStrategy:["activity","config"]}}, t=tslib_1.__decorate([core_1.Singleton(exports.IfActivityBuilderToken)],t)}(core.ActivityBuilder);exports.IfActivityBuilder=IfActivityBuilder;
});

unwrapExports(If);
var If_1 = If.IfActivityToken;
var If_2 = If.IfActivityBuilderToken;
var If_3 = If.IfActivity;
var If_4 = If.IfActivityBuilder;

var Invoke = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.InvokeActivityToken=new core.InjectAcitityToken("invoke");var InvokeActivity=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(e,t), e.prototype.run=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,this.context.getContainer().invoke(this.targetType,this.target,this.args,{data:e})]})})}, e.classAnnations={name:"InvokeActivity",params:{run:["data"]}}, e=tslib_1.__decorate([core.Task(exports.InvokeActivityToken)],e)}(core.Activity);exports.InvokeActivity=InvokeActivity;
});

unwrapExports(Invoke);
var Invoke_1 = Invoke.InvokeActivityToken;
var Invoke_2 = Invoke.InvokeActivity;

var Parallel = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.ParallelActivityToken=new core.InjectAcitityToken("parallel"), exports.ParallelActivityBuilderToken=new core.InjectAcitityBuilderToken("parallel");var ParallelActivity=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.activites=[], t}return tslib_1.__extends(t,e), t.prototype.run=function(r,i){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.before(r,i)];case 1:return e=t.sent(), [4,this.execute(e,i)];case 2:return e=t.sent(), [4,this.after(e,i)];case 3:return[2,e=t.sent()]}})})}, t.prototype.before=function(e,t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,e]})})}, t.prototype.execute=function(e,t){return Promise.all(this.activites.map(function(t){return t.run(e)}))}, t.prototype.after=function(e,t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,e]})})}, t.classAnnations={name:"ParallelActivity",params:{run:["data","execute"],before:["data","execute"],execute:["data","execute"],after:["data","execute"]}}, t=tslib_1.__decorate([core.Task(exports.ParallelActivityToken,exports.ParallelActivityBuilderToken)],t)}(core.Activity);exports.ParallelActivity=ParallelActivity;var ParallelActivityBuilder=function(i){function t(){return null!==i&&i.apply(this,arguments)||this}return tslib_1.__extends(t,i), t.prototype.buildStrategy=function(e,r){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,i.prototype.buildStrategy.call(this,e,r)];case 1:return t.sent(), e instanceof ParallelActivity&&r.parallel&&r.parallel.length?[4,this.buildChildren(e,r.parallel)]:[3,3];case 2:t.sent(), t.label=3;case 3:return[2,e]}})})}, t.prototype.buildChildren=function(l,r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,Promise.all(r.map(function(r){return tslib_1.__awaiter(i,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.build(r,l.id)];case 1:return(e=t.sent())?e instanceof ParallelActivity&&!core_1.isToken(r)&&r.parallel&&r.parallel.length?[4,this.buildChildren(e,r.parallel)]:[3,3]:[2,null];case 2:t.sent(), t.label=3;case 3:return[2,e]}})})}))];case 1:return e=t.sent(), l.activites=e, [2,l]}})})}, t.classAnnations={name:"ParallelActivityBuilder",params:{buildStrategy:["activity","config"],buildChildren:["activity","configs"]}}, t=tslib_1.__decorate([core_1.Singleton(exports.ParallelActivityBuilderToken)],t)}(core.ActivityBuilder);exports.ParallelActivityBuilder=ParallelActivityBuilder;
});

unwrapExports(Parallel);
var Parallel_1 = Parallel.ParallelActivityToken;
var Parallel_2 = Parallel.ParallelActivityBuilderToken;
var Parallel_3 = Parallel.ParallelActivity;
var Parallel_4 = Parallel.ParallelActivityBuilder;

var Sequence = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.SequenceActivityToken=new core.InjectAcitityToken("sequence"), exports.SequenceActivityBuilderToken=new core.InjectAcitityBuilderToken("sequence");var SequenceActivity=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.activites=[], e}return tslib_1.__extends(e,t), e.prototype.run=function(i,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.before(i,n)];case 1:return t=e.sent(), [4,this.execute(t,n)];case 2:return t=e.sent(), [4,this.after(t,n)];case 3:return[2,t=e.sent()]}})})}, e.prototype.before=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,t]})})}, e.prototype.execute=function(e,t){var i=Promise.resolve(e);return this.activites.forEach(function(t){i=i.then(function(e){return t.run(e)});}), i}, e.prototype.after=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,t]})})}, e.classAnnations={name:"SequenceActivity",params:{run:["data","execute"],before:["data","execute"],execute:["data","execute"],after:["data","execute"]}}, e=tslib_1.__decorate([core.Task(exports.SequenceActivityToken,exports.SequenceActivityBuilderToken)],e)}(core.Activity);exports.SequenceActivity=SequenceActivity;var SequenceActivityBuilder=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return tslib_1.__extends(e,n), e.prototype.buildStrategy=function(t,i){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,n.prototype.buildStrategy.call(this,t,i)];case 1:return e.sent(), t instanceof SequenceActivity&&i.sequence&&i.sequence.length?[4,this.buildChildren(t,i.sequence)]:[3,3];case 2:e.sent(), e.label=3;case 3:return[2,t]}})})}, e.prototype.buildChildren=function(r,i){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,n=this;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,Promise.all(i.map(function(i){return tslib_1.__awaiter(n,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.build(i,r.id)];case 1:return(t=e.sent())?t instanceof SequenceActivity&&!core_1.isToken(i)&&i.sequence&&i.sequence.length?[4,this.buildChildren(t,i.sequence)]:[3,3]:[2,null];case 2:e.sent(), e.label=3;case 3:return[2,t]}})})}))];case 1:return t=e.sent(), r.activites=t, [2,r]}})})}, e.classAnnations={name:"SequenceActivityBuilder",params:{buildStrategy:["activity","config"],buildChildren:["activity","configs"]}}, e=tslib_1.__decorate([core_1.Singleton(exports.SequenceActivityBuilderToken)],e)}(core.ActivityBuilder);exports.SequenceActivityBuilder=SequenceActivityBuilder;
});

unwrapExports(Sequence);
var Sequence_1 = Sequence.SequenceActivityToken;
var Sequence_2 = Sequence.SequenceActivityBuilderToken;
var Sequence_3 = Sequence.SequenceActivity;
var Sequence_4 = Sequence.SequenceActivityBuilder;

var Switch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.SwitchActivityToken=new core.InjectAcitityToken("switch"), exports.SwitchActivityBuilderToken=new core.InjectAcitityBuilderToken("switch");var SwitchActivity=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.cases=new core_1.MapSet, t}return tslib_1.__extends(t,e), t.prototype.run=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.expression,i)];case 1:return e=t.sent(), !core_1.isUndefined(e)&&this.cases.has(e)?[2,this.cases.get(e).run(i)]:this.defaultBody?[2,this.defaultBody.run(i)]:[2,Promise.resolve(i)]}})})}, t.classAnnations={name:"SwitchActivity",params:{run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.SwitchActivityToken,exports.SwitchActivityBuilderToken)],t)}(core.Activity);exports.SwitchActivity=SwitchActivity;var SwitchActivityBuilder=function(c){function t(){return null!==c&&c.apply(this,arguments)||this}return tslib_1.__extends(t,c), t.prototype.buildStrategy=function(s,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,c.prototype.buildStrategy.call(this,s,n)];case 1:return t.sent(), s instanceof SwitchActivity?(e=s, [4,this.toExpression(n.expression,s)]):[3,6];case 2:return e.expression=t.sent(), n.cases&&n.cases.length?[4,Promise.all(n.cases.map(function(i){return tslib_1.__awaiter(r,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.build(i.value,s.id)];case 1:return e=t.sent(), s.cases.set(i.key,e), [2,e]}})})}))]:[3,4];case 3:t.sent(), t.label=4;case 4:return n.defaultBody?(i=s, [4,this.build(n.defaultBody,s.id)]):[3,6];case 5:i.defaultBody=t.sent(), t.label=6;case 6:return[2,s]}})})}, t.classAnnations={name:"SwitchActivityBuilder",params:{buildStrategy:["activity","config"]}}, t=tslib_1.__decorate([core_1.Singleton(exports.SwitchActivityBuilderToken)],t)}(core.ActivityBuilder);exports.SwitchActivityBuilder=SwitchActivityBuilder;
});

unwrapExports(Switch);
var Switch_1 = Switch.SwitchActivityToken;
var Switch_2 = Switch.SwitchActivityBuilderToken;
var Switch_3 = Switch.SwitchActivity;
var Switch_4 = Switch.SwitchActivityBuilder;

var Throw = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.ThrowActivityToken=new core.InjectAcitityToken("throw"), exports.ThrowActivityBuilderToken=new core.InjectAcitityBuilderToken("delay");var ThrowActivity=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(e,t), e.prototype.run=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.exception,e)];case 1:throw t.sent()}})})}, e.classAnnations={name:"ThrowActivity",params:{run:["data"]}}, e=tslib_1.__decorate([core.Task(exports.ThrowActivityToken,exports.ThrowActivityBuilderToken)],e)}(core.Activity);exports.ThrowActivity=ThrowActivity;var ThrowActivityBuilder=function(o){function t(){return null!==o&&o.apply(this,arguments)||this}return tslib_1.__extends(t,o), t.prototype.buildStrategy=function(i,r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,o.prototype.buildStrategy.call(this,i,r)];case 1:return t.sent(), i instanceof ThrowActivity?(e=i, [4,this.toExpression(r.exception,i)]):[3,3];case 2:e.exception=t.sent(), t.label=3;case 3:return[2,i]}})})}, t.classAnnations={name:"ThrowActivityBuilder",params:{buildStrategy:["activity","config"]}}, t=tslib_1.__decorate([core_1.Singleton(exports.ThrowActivityBuilderToken)],t)}(core.ActivityBuilder);exports.ThrowActivityBuilder=ThrowActivityBuilder;
});

unwrapExports(Throw);
var Throw_1 = Throw.ThrowActivityToken;
var Throw_2 = Throw.ThrowActivityBuilderToken;
var Throw_3 = Throw.ThrowActivity;
var Throw_4 = Throw.ThrowActivityBuilder;

var TryCatch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.TryCatchActivityToken=new core.InjectAcitityToken("trycatch"), exports.TryCatchActivityBuilderToken=new core.InjectAcitityBuilderToken("delay");var TryCatchActivity=function(i){function t(){var t=null!==i&&i.apply(this,arguments)||this;return t.catchs=[], t}return tslib_1.__extends(t,i), t.prototype.run=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){var r,i=this;return tslib_1.__generator(this,function(t){try{r=this.try.run(e), this.catchs.forEach(function(i){r=r.catch(function(t){return i.run(t)});}), this.finally&&r.then(function(t){return i.finally.run(t)});}catch(t){r=Promise.resolve(e), this.finally&&r.then(function(t){return i.finally.run(t)});}return[2,r]})})}, t.classAnnations={name:"TryCatchActivity",params:{run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.TryCatchActivityToken,exports.TryCatchActivityBuilderToken)],t)}(Activity_1.Activity);exports.TryCatchActivity=TryCatchActivity;var TryCatchActivityBuilder=function(s){function t(){return null!==s&&s.apply(this,arguments)||this}return tslib_1.__extends(t,s), t.prototype.buildStrategy=function(n,a){return tslib_1.__awaiter(this,void 0,void 0,function(){var i,r,e,c=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,s.prototype.buildStrategy.call(this,n,a)];case 1:return t.sent(), n instanceof TryCatchActivity?(i=n, [4,this.build(a.try,n.id)]):[3,6];case 2:return i.try=t.sent(), a.catchs&&a.catchs.length?[4,Promise.all(a.catchs.map(function(t){return c.build(t,n.id)}))]:[3,4];case 3:r=t.sent(), n.catchs=r, t.label=4;case 4:return a.finally?(e=n, [4,this.build(a.finally,n.id)]):[3,6];case 5:e.finally=t.sent(), t.label=6;case 6:return[2,n]}})})}, t.classAnnations={name:"TryCatchActivityBuilder",params:{buildStrategy:["activity","config"]}}, t=tslib_1.__decorate([core_1.Singleton(exports.TryCatchActivityBuilderToken)],t)}(core.ActivityBuilder);exports.TryCatchActivityBuilder=TryCatchActivityBuilder;
});

unwrapExports(TryCatch);
var TryCatch_1 = TryCatch.TryCatchActivityToken;
var TryCatch_2 = TryCatch.TryCatchActivityBuilderToken;
var TryCatch_3 = TryCatch.TryCatchActivity;
var TryCatch_4 = TryCatch.TryCatchActivityBuilder;

var While = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.WhileActivityToken=new core.InjectAcitityToken("while"), exports.WhileActivityBuilderToken=new core.InjectAcitityBuilderToken("while");var WhileActivity=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(e,t), e.prototype.run=function(r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.condition,r)];case 1:e=t.sent(), t.label=2;case 2:return e?[4,this.body.run(i||r)]:[3,5];case 3:return i=t.sent(), [4,this.context.exec(this,this.condition,i)];case 4:return e=t.sent(), [3,2];case 5:return[2,i]}})})}, e.classAnnations={name:"WhileActivity",params:{run:["data"]}}, e=tslib_1.__decorate([core.Task(exports.WhileActivityToken,exports.WhileActivityBuilderToken)],e)}(core.Activity);exports.WhileActivity=WhileActivity;var WhileActivityBuilder=function(s){function t(){return null!==s&&s.apply(this,arguments)||this}return tslib_1.__extends(t,s), t.prototype.buildStrategy=function(r,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,s.prototype.buildStrategy.call(this,r,n)];case 1:return t.sent(), r instanceof WhileActivity?(e=r, [4,this.build(n.body,r.id)]):[3,4];case 2:return e.body=t.sent(), i=r, [4,this.toExpression(n.while,r)];case 3:i.condition=t.sent(), t.label=4;case 4:return[2,r]}})})}, t.classAnnations={name:"WhileActivityBuilder",params:{buildStrategy:["activity","config"]}}, t=tslib_1.__decorate([core_1.Singleton(exports.WhileActivityBuilderToken)],t)}(core.ActivityBuilder);exports.WhileActivityBuilder=WhileActivityBuilder;
});

unwrapExports(While);
var While_1 = While.WhileActivityToken;
var While_2 = While.WhileActivityBuilderToken;
var While_3 = While.WhileActivity;
var While_4 = While.WhileActivityBuilder;

var activities = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(Delay,exports), tslib_1.__exportStar(Interval,exports), tslib_1.__exportStar(DoWhile,exports), tslib_1.__exportStar(If,exports), tslib_1.__exportStar(Invoke,exports), tslib_1.__exportStar(Parallel,exports), tslib_1.__exportStar(Sequence,exports), tslib_1.__exportStar(Switch,exports), tslib_1.__exportStar(Throw,exports), tslib_1.__exportStar(TryCatch,exports), tslib_1.__exportStar(While,exports);
});

unwrapExports(activities);

var DefaultTaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var DefaultTaskContainer=function(o){function t(t){var e=o.call(this,t)||this;return e.rootPath=t, e.logAspects=[], e}return tslib_1.__extends(t,o), t.prototype.useLog=function(t){return core_1.hasClassMetadata(aop_1.Aspect,t)?this.logAspects.push(t):console.error("logAspect param is not right aspect"), this}, t.prototype.createWorkflow=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=1<t.length?{sequence:t,task:activities.SequenceActivity}:core_1.lang.first(t);return o.prototype.bootstrap.call(this,r)}, t.prototype.bootstrap=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.createWorkflow.apply(this,r)];case 1:return[4,(e=t.sent()).start()];case 2:return t.sent(), [2,e]}})})}, t.prototype.getRootPath=function(){return this.rootPath}, t.prototype.build=function(e,t,r){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,this.getContainer().resolve(core.TaskRunnerToken,{activity:r,activityBuilder:e})]})})}, t.prototype.createModuleBuilder=function(){return this.getContainer().get(core.ActivityBuilderToken)}, t.prototype.registerExts=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return e.has(aop_1.AopModule)||e.register(aop_1.AopModule), e.has(logs_1.LogModule)||e.register(logs_1.LogModule), e.bindProvider(ITaskContainer.TaskContainerToken,this), e.has(CoreModule_1.CoreModule)||e.register(CoreModule_1.CoreModule), this.use(activities), this.beforRegister(e), [4,o.prototype.registerExts.call(this,e)];case 1:return t.sent(), [2,e]}})})}, t.prototype.beforRegister=function(e){this.logAspects.forEach(function(t){t&&e.register(t);});}, t.prototype.setConfigRoot=function(t){t.rootdir=this.rootPath;}, t.classAnnations={name:"DefaultTaskContainer",params:{constructor:["rootPath"],useLog:["logAspect"],createWorkflow:["tasks"],bootstrap:["tasks"],getRootPath:[],build:["builder","token","config"],createModuleBuilder:[],registerExts:["container"],beforRegister:["container"],setConfigRoot:["config"]}}, t}(core_1.ApplicationBuilder);exports.DefaultTaskContainer=DefaultTaskContainer;
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

var D__Workspace_Projects_modules_typeTask_packages_core_lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(ITaskContainer,exports), tslib_1.__exportStar(DefaultTaskContainer_1,exports), tslib_1.__exportStar(utils,exports), tslib_1.__exportStar(core,exports), tslib_1.__exportStar(aop,exports), tslib_1.__exportStar(activities,exports);
});

var index$5 = unwrapExports(D__Workspace_Projects_modules_typeTask_packages_core_lib);

return index$5;

})));
