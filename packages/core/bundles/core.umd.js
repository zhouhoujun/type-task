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
Object.defineProperty(exports,"__esModule",{value:!0});var TaskComponent=function(n){function e(e){var t=n.call(this,e)||this;return t.runWay=RunWay_1.RunWay.seqFirst, t}return tslib_1.__extends(e,n), e.prototype.run=function(e){var n,r=this;return n=this.runWay&RunWay_1.RunWay.nodeFirst?this.execute(e):Promise.resolve(e), this.runWay&RunWay_1.RunWay.sequence?this.each(function(t){n=n.then(function(e){return t.run(e)});},core_1.Mode.children):this.runWay&RunWay_1.RunWay.parallel&&(n=n.then(function(t){return Promise.all(r.children.map(function(e){return e.run(t)}))})), this.runWay&RunWay_1.RunWay.nodeLast&&(n=n.then(function(e){return r.execute(e)})), n}, e.prototype.getRoot=function(){return this.find(function(e){return!e.parent},core_1.Mode.route)}, tslib_1.__decorate([core_1.Inject(IContext.ContextToken),tslib_1.__metadata("design:type",Object)],e.prototype,"context",void 0), e=tslib_1.__decorate([core_1.Abstract(),tslib_1.__metadata("design:paramtypes",[String])],e)}(core_1.GComposite);exports.TaskComponent=TaskComponent;

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
Object.defineProperty(exports,"__esModule",{value:!0});var TaskElement=function(t){function e(e){return t.call(this,e)||this}return tslib_1.__extends(e,t), e.prototype.execute=function(e){return Promise.resolve(e)}, e=tslib_1.__decorate([decorators.Task,tslib_1.__metadata("design:paramtypes",[String])],e)}(TaskComponent_1.TaskComponent);exports.TaskElement=TaskElement;

});

unwrapExports(TaskElement_1);
var TaskElement_2 = TaskElement_1.TaskElement;

var TaskBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskBuilder=function(o){function e(e){return o.call(this,e)||this}var t;return tslib_1.__extends(e,o), (t=e).prototype.build=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,r,n;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,o.prototype.build.call(this,i)];case 1:if(!(t=e.sent()))throw new Error("builder task instance failed.");return r=this.getConfigure(i), n=this.getBuilderToken(r), core_1.isFunction(t.onTaskInit)&&t.onTaskInit(r), [4,n.buildWithConfigure(t,r)];case 2:return e.sent(), [2,t]}})})}, e.prototype.buildWithConfigure=function(t,r){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.beforeBindConfig(t,r)];case 1:return e.sent(), t instanceof TaskComponent_1.TaskComponent&&r.children&&r.children.length?[4,this.buildChildren(t,r.children)]:[3,3];case 2:e.sent(), e.label=3;case 3:return[4,this.afterBindConfig(t,r)];case 4:return e.sent(), [2,t]}})})}, e.prototype.beforeBindConfig=function(t,r){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return r.name&&(t.name=r.name), r.runWay&&(t.runWay=r.runWay), [2,t]})})}, e.prototype.afterBindConfig=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,t]})})}, e.prototype.buildChildren=function(r,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var t=this;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return core_1.isFunction(r.add)?[4,Promise.all(n.map(function(r){return tslib_1.__awaiter(t,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.build(r)];case 1:return(t=e.sent())?t instanceof TaskComponent_1.TaskComponent&&!core_1.isToken(r)&&r.children&&r.children.length?[4,this.buildChildren(t,r.children)]:[3,3]:[2,null];case 2:e.sent(), e.label=3;case 3:return[2,t]}})})}))]:[2];case 1:return e.sent().forEach(function(e){e&&r.add(e);}), [2]}})})}, e.prototype.buildComponent=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,r,n;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return core_1.isToken(i)?[4,this.build(i).catch(function(e){return console.error(e), null})]:[3,2];case 1:return r=e.sent(), [3,7];case 2:return core_1.isMetadataObject(i)?(n=i).imports?[4,(t=this.container).loadModule.apply(t,n.imports)]:[3,4]:[3,6];case 3:e.sent(), e.label=4;case 4:return n.children||n.task||n.bootstrap?(n.bootstrap||(n.task=n.task||TaskElement_1.TaskElement), [4,this.build(n).catch(function(e){return console.error(e), null})]):[2,null];case 5:return r=e.sent(), [3,7];case 6:r=null, e.label=7;case 7:return[2,r]}})})}, e.prototype.getConfigure=function(e,t){return o.prototype.getConfigure.call(this,e,t||decorators.Task)}, e.prototype.getBootstrapToken=function(e,t){var r=e.task||e.bootstrap||t;return core_1.isString(r)&&(r=this.traslateStrToken(r)), r}, e.prototype.traslateStrToken=function(e){var t=new core_1.Registration(ITask.TaskToken,e);return this.container.has(t)?t:e}, e.prototype.getBuilderToken=function(e){var t;return e.builder&&(t=this.getBuilderTokenViaConfig(e.builder)), !t&&e.task&&(t=this.getBuilderTokenViaTask(e.task)), t||this}, e.prototype.getBuilderTokenViaConfig=function(e){return core_1.isToken(e)?this.container.resolve(e):e instanceof t?e:null}, e.prototype.getBuilderTokenViaTask=function(e){if(core_1.isToken(e)){var t=core_1.isClass(e)?e:this.container.getTokenImpl(e);if(t){var r=core_1.lang.first(core_1.getTypeMetadata(decorators.Task,t));if(r&&r.builder)return core_1.isToken(r.builder)?this.container.resolve(r.builder):r.builder}}return null}, e=t=tslib_1.__decorate([core_1.Singleton(ITaskBuilder.TaskBuilderToken),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],e)}(core_1.ModuleBuilder);exports.TaskBuilder=TaskBuilder;

});

unwrapExports(TaskBuilder_1);
var TaskBuilder_2 = TaskBuilder_1.TaskBuilder;

var AbstractTask_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var AbstractTask=function(){function t(t){this.name=t, this.runWay=RunWay_1.RunWay.sequence;}return tslib_1.__decorate([core_1.Inject(IContext.ContextToken),tslib_1.__metadata("design:type",Object)],t.prototype,"context",void 0), t=tslib_1.__decorate([core_1.Abstract(),tslib_1.__metadata("design:paramtypes",[String])],t)}();exports.AbstractTask=AbstractTask;

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
Object.defineProperty(exports,"__esModule",{value:!0});var Context=function(){function e(){}return e.prototype.getContainer=function(){return this.container}, e.prototype.getTaskContiner=function(){return this.container.resolve(ITaskContainer.TaskContainerToken)}, e.prototype.getRootPath=function(){return this.getTaskContiner().getRootPath()}, e.prototype.getRunner=function(e,t,r,n){var o;return core_1.isToken(r)?o=this.container.resolve(r):r instanceof TaskBuilder_1.TaskBuilder&&(o=r), this.container.resolve(ITaskRunner.TaskRunnerToken,{work:e,uuid:t,instance:n,taskBuilder:o})}, e.prototype.getEnvArgs=function(){return{}}, e.prototype.to=function(e,t){return core_1.isFunction(e)?e(this,t):e}, e.prototype.isTask=function(e){return core_1.hasOwnClassMetadata(decorators.Task,e)}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],e.prototype,"container",void 0), e=tslib_1.__decorate([core_1.Singleton(IContext.ContextToken),tslib_1.__metadata("design:paramtypes",[])],e)}();exports.Context=Context;

});

unwrapExports(Context_1);
var Context_2 = Context_1.Context;

var empty = {};


var empty$1 = Object.freeze({
	default: empty
});

var crypto = ( empty$1 && empty ) || empty$1;

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.



var rng = function nodeRNG() {
  return crypto.randomBytes(16);
};

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

var bytesToUuid_1 = bytesToUuid;

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid_1(b);
}

var v1_1 = v1;

var TaskRunner_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskRunner=function(){function t(t,e,r,n){this.work=t, this.uuid=e, this.instance=r, this.taskBuilder=n, this._result=new BehaviorSubject_1.BehaviorSubject(null), this.stateChanged=new BehaviorSubject_1.BehaviorSubject(ITaskRunner.RunState.init);}return Object.defineProperty(t.prototype,"task",{get:function(){return this.work},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"taskInstance",{get:function(){return this.instance},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"result",{get:function(){return this._result.filter(function(t){return!t})},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"resultValue",{get:function(){return this._resultValue},enumerable:!0,configurable:!0}), t.prototype.onInit=function(){this.uuid||(core_1.isToken(this.work)?this.uuid=v1_1():this.work&&(this.uuid=this.work.uuid||v1_1())), this.container.bindProvider(this.uuid,this);}, t.prototype.getBuilder=function(){return this.taskBuilder||(this.taskBuilder=this.container.resolve(ITaskBuilder.TaskBuilderToken)), this.taskBuilder}, t.prototype.getInstance=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return this.instance?[3,2]:[4,(e=this).getBuilder().build(this.task)];case 1:e.instance=t.sent(), t.label=2;case 2:return this.instance.workflowId||(this.instance.workflowId=this.uuid), [2,this.instance]}})})}, t.prototype.start=function(r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.getInstance()];case 1:return[2,t.sent().run(r).then(function(t){return e.state=ITaskRunner.RunState.complete, e.stateChanged.next(e.state), e._resultValue=t, e._result.next(t), t})]}})})}, t.prototype.saveState=function(t){this._currState=t;}, t.prototype.stop=function(){this.state=ITaskRunner.RunState.stop, this.stateChanged.next(this.state);}, t.prototype.pause=function(){this.state=ITaskRunner.RunState.pause, this.stateChanged.next(this.state);}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=tslib_1.__decorate([decorators.Runner(ITaskRunner.TaskRunnerToken),tslib_1.__metadata("design:paramtypes",[Object,String,Object,Object])],t)}();exports.TaskRunner=TaskRunner;

});

unwrapExports(TaskRunner_1);
var TaskRunner_2 = TaskRunner_1.TaskRunner;

var core = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(ITaskBuilder,exports), tslib_1.__exportStar(TaskBuilder_1,exports), tslib_1.__exportStar(ITask,exports), tslib_1.__exportStar(AbstractTask_1,exports), tslib_1.__exportStar(TaskComponent_1,exports), tslib_1.__exportStar(TaskElement_1,exports), tslib_1.__exportStar(decorators,exports), tslib_1.__exportStar(RunWay_1,exports), tslib_1.__exportStar(IContext,exports), tslib_1.__exportStar(Context_1,exports), tslib_1.__exportStar(ITaskRunner,exports), tslib_1.__exportStar(TaskRunner_1,exports);

});

unwrapExports(core);

var RunAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunAspect=function(){function t(){}return t.prototype.beforeRun=function(t){var e=this.getRunner(t.target);if(e)switch(e.saveState(t), e.state){case core.RunState.pause:throw new Error("workflow paused!");case core.RunState.stop:throw new Error("workflow stop!")}}, t.prototype.afterRun=function(t){var e=this.getRunner(t.target);if(e)switch(e.saveState(t), e.state){case core.RunState.pause:throw new Error("workflow paused!");case core.RunState.stop:throw new Error("workflow stop!")}}, t.prototype.getRunner=function(t){if(t instanceof core.TaskComponent){var e=t.getRoot();if(e.workflowId&&this.container.has(e.workflowId))return this.container.resolve(e.workflowId)}return null}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), tslib_1.__decorate([aop_1.Before("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"beforeRun",null), tslib_1.__decorate([aop_1.AfterReturning("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"afterRun",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core.Task,singleton:!0}),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.RunAspect=RunAspect;

});

unwrapExports(RunAspect_1);
var RunAspect_2 = RunAspect_1.RunAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(RunAspect_1,exports);

});

unwrapExports(aop);

var CoreModule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var CoreModule=function(){function e(e){this.container=e;}return e.prototype.setup=function(){var e=this.container,o=e.getLifeScope();o.registerDecorator(core.Runner,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), o.registerDecorator(core.Task,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), e.register(core.TaskElement), e.register(core.TaskBuilder), e.register(core.TaskRunner), e.register(aop.RunAspect);}, e=tslib_1.__decorate([core_1.IocExt("setup"),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],e)}();exports.CoreModule=CoreModule;

});

unwrapExports(CoreModule_1);
var CoreModule_2 = CoreModule_1.CoreModule;

var DefaultTaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var DefaultTaskContainer=function(i){function e(e){var t=i.call(this,e)||this;return t.rootPath=e, t}return tslib_1.__extends(e,i), e.prototype.useLog=function(e){return core_1.hasClassMetadata(aop_1.Aspect,e)?this.logAspect=e:console.error("logAspect param is not right aspect"), this}, e.prototype.bootstrap=function(){for(var r=this,e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o=1<e.length?{children:e,task:core.TaskElement}:core_1.lang.first(e);return i.prototype.bootstrap.call(this,o).then(function(e){var t=r.getContainer().resolve(core.TaskRunnerToken,{work:o,instance:e,taskBuilder:r.getModuleBuilder()});return t.start().then(function(){return t})})}, e.prototype.getRootPath=function(){return this.rootPath}, e.prototype.createModuleBuilder=function(){return this.getContainer().get(core.TaskBuilderToken)}, e.prototype.registerExts=function(t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return t.has(aop_1.AopModule)||t.register(aop_1.AopModule), t.has(logs_1.LogModule)||t.register(logs_1.LogModule), t.bindProvider(ITaskContainer.TaskContainerToken,this), t.has(CoreModule_1.CoreModule)||t.register(CoreModule_1.CoreModule), t.register(this.logAspect), [4,i.prototype.registerExts.call(this,t)];case 1:return e.sent(), [2,t]}})})}, e.prototype.setConfigRoot=function(e){e.rootdir=this.rootPath;}, e}(core_1.ApplicationBuilder);exports.DefaultTaskContainer=DefaultTaskContainer;

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
