(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tslib'), require('@ts-ioc/core'), require('@ts-ioc/aop'), require('@ts-ioc/logs'), require('@taskfr/core')) :
	typeof define === 'function' && define.amd ? define(['tslib', '@ts-ioc/core', '@ts-ioc/aop', '@ts-ioc/logs', '@taskfr/core'], factory) :
	(global.core = global.core || {}, global.core.umd = global.core.umd || {}, global.core.umd.js = factory(global.tslib_1,global.core_1,global.aop_1,global.logs_1,global.core_2));
}(this, (function (tslib_1,core_1,aop_1,logs_1,core_2) { 'use strict';

tslib_1 = tslib_1 && tslib_1.hasOwnProperty('default') ? tslib_1['default'] : tslib_1;
core_1 = core_1 && core_1.hasOwnProperty('default') ? core_1['default'] : core_1;
aop_1 = aop_1 && aop_1.hasOwnProperty('default') ? aop_1['default'] : aop_1;
logs_1 = logs_1 && logs_1.hasOwnProperty('default') ? logs_1['default'] : logs_1;
core_2 = core_2 && core_2.hasOwnProperty('default') ? core_2['default'] : core_2;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var TaskLogAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskLogAspect=function(r){function t(t){var e=r.call(this,t)||this;return e.startHrts={}, e}return tslib_1.__extends(t,r), t.prototype.logging=function(t){var e,r,a=this.logger,s=t.target.name;s||(s=t.targetType.classAnnations?t.targetType.classAnnations.name:t.targetType.name);var o="'"+s+"'";t.state===aop_1.JoinpointState.Before&&(e=new Date, this.startHrts[s]=e, a.log("["+e.toString()+"]","Starting",o,"...")), t.state===aop_1.JoinpointState.AfterReturning&&(e=this.startHrts[s], r=new Date, delete this.startHrts[s], a.log("["+r.toString()+"]","Finished",o," after ",r.getTime()-e.getTime())), t.state===aop_1.JoinpointState.AfterThrowing&&(e=this.startHrts[s], r=new Date, delete this.startHrts[s], a.log("["+r.toString()+"]","Finished",o,"errored after",r.getTime()-e.getTime()));}, tslib_1.__decorate([aop_1.Around("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"logging",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core_2.Task,singleton:!0}),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],t)}(logs_1.LoggerAspect);exports.TaskLogAspect=TaskLogAspect;

});

unwrapExports(TaskLogAspect_1);
var TaskLogAspect_2 = TaskLogAspect_1.TaskLogAspect;

var RunnerLogAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunnerLogAspect=function(r){function t(t){var e=r.call(this,t)||this;return e.startHrts={}, e}return tslib_1.__extends(t,r), t.prototype.logStart=function(t){var e,r,o=this.logger,i=t.target.uuid,s="'"+i+"'";t.state===aop_1.JoinpointState.Before&&(e=new Date, this.startHrts[i]=e, o.log("["+e.toString()+"]","Starting workflow",s,"...")), t.state===aop_1.JoinpointState.AfterReturning&&(e=this.startHrts[i], r=new Date, delete this.startHrts[i], o.log("["+r.toString()+"]","Finished workflow",s," after ",r.getTime()-e.getTime())), t.state===aop_1.JoinpointState.AfterThrowing&&(e=this.startHrts[i], r=new Date, delete this.startHrts[i], o.log("["+r.toString()+"]","Finished workflow",s,"errored after",r.getTime()-e.getTime()));}, tslib_1.__decorate([aop_1.Around("execution(*.start)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"logStart",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core_2.Runner,singleton:!0}),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],t)}(logs_1.LoggerAspect);exports.RunnerLogAspect=RunnerLogAspect;

});

unwrapExports(RunnerLogAspect_1);
var RunnerLogAspect_2 = RunnerLogAspect_1.RunnerLogAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(TaskLogAspect_1,exports), tslib_1.__exportStar(RunnerLogAspect_1,exports);

});

unwrapExports(aop);

var TaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskContainer=function(t){function s(e){var r=t.call(this,e)||this;return r.useLog(aop.TaskLogAspect), r.useLog(aop.RunnerLogAspect), r}return tslib_1.__extends(s,t), s.create=function(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];var n=new s(e);return r&&n.useModules.apply(n,r), n}, s}(core_2.DefaultTaskContainer);exports.TaskContainer=TaskContainer;

});

unwrapExports(TaskContainer_1);
var TaskContainer_2 = TaskContainer_1.TaskContainer;

var D__workspace_github_typeTask_packages_platformBrowser_lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(aop,exports), tslib_1.__exportStar(TaskContainer_1,exports);

});

var index$1 = unwrapExports(D__workspace_github_typeTask_packages_platformBrowser_lib);

return index$1;

})));
