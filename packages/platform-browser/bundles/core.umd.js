(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tslib'), require('@ts-ioc/core'), require('@ts-ioc/aop'), require('@ts-ioc/logs'), require('@taskfr/core')) :
	typeof define === 'function' && define.amd ? define(['tslib', '@ts-ioc/core', '@ts-ioc/aop', '@ts-ioc/logs', '@taskfr/core'], factory) :
	(global.core = global.core || {}, global.core.umd = global.core.umd || {}, global.core.umd.js = factory(global.tslib_1,global.core_1,global.aop_1,global.logs,global.core_1$1));
}(this, (function (tslib_1,core_1,aop_1,logs,core_1$1) { 'use strict';

tslib_1 = tslib_1 && tslib_1.hasOwnProperty('default') ? tslib_1['default'] : tslib_1;
core_1 = core_1 && core_1.hasOwnProperty('default') ? core_1['default'] : core_1;
aop_1 = aop_1 && aop_1.hasOwnProperty('default') ? aop_1['default'] : aop_1;
logs = logs && logs.hasOwnProperty('default') ? logs['default'] : logs;
core_1$1 = core_1$1 && core_1$1.hasOwnProperty('default') ? core_1$1['default'] : core_1$1;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var TaskLogAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskLogAspect=function(r){function t(t){var e=r.call(this,t)||this;return e.startHrts={}, e}return tslib_1.__extends(t,r), t.prototype.logging=function(t){var e,r,a=this.logger,s=t.target.name;s||(s=t.targetType.classAnnations?t.targetType.classAnnations.name:t.targetType.name);var o="'"+s+"'";t.state===aop_1.JoinpointState.Before&&(e=new Date, this.startHrts[s]=e, a.log("["+e.toString()+"]","Starting",o,"...")), t.state===aop_1.JoinpointState.AfterReturning&&(e=this.startHrts[s], r=new Date, delete this.startHrts[s], a.log("["+r.toString()+"]","Finished",o," after ",r.getTime()-e.getTime())), t.state===aop_1.JoinpointState.AfterThrowing&&(e=this.startHrts[s], r=new Date, delete this.startHrts[s], a.log("["+r.toString()+"]","Finished",o,"errored after",r.getTime()-e.getTime()));}, tslib_1.__decorate([aop_1.Around("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"logging",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core_1$1.Task,singleton:!0}),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],t)}(logs.LoggerAspect);exports.TaskLogAspect=TaskLogAspect;

});

unwrapExports(TaskLogAspect_1);
var TaskLogAspect_2 = TaskLogAspect_1.TaskLogAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(TaskLogAspect_1,exports);

});

unwrapExports(aop);

var TaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskContainer=function(o){function a(e){var t=o.call(this,e)||this;return t.logAspect=aop.TaskLogAspect, t}return tslib_1.__extends(a,o), a.create=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=new a(e);return t&&n.useModules.apply(n,t), n}, a.prototype.bootstrap=function(){for(var t,e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var n=new Date;return console.log("["+n.toString()+"]","Starting","..."), o.prototype.bootstrap.apply(this,e).then(function(e){return e.stateChanged.subscribe(function(e){switch(e){case core_1$1.RunState.running:n||(n=new Date);break;case core_1$1.RunState.complete:t=new Date, console.log("["+t.toString()+"]","Finished"," after ",t.getTime()-n.getTime()), n=null;break;case core_1$1.RunState.stop:t=new Date, console.log("["+t.toString()+"]","Stopped"," after ",t.getTime()-n.getTime()), n=null;break;case core_1$1.RunState.pause:t=new Date, console.log("["+t.toString()+"]","Paused"," after ",t.getTime()-n.getTime());}}), e},function(e){return t=new Date, console.log("["+t.toString()+"]","Finished","errored after",t.getTime()-n.getTime()), console.error(e), e})}, a}(core_1$1.DefaultTaskContainer);exports.TaskContainer=TaskContainer;

});

unwrapExports(TaskContainer_1);
var TaskContainer_2 = TaskContainer_1.TaskContainer;

var D__Workspace_Projects_modules_typeTask_packages_platformBrowser_lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(aop,exports), tslib_1.__exportStar(TaskContainer_1,exports);

});

var index$1 = unwrapExports(D__Workspace_Projects_modules_typeTask_packages_platformBrowser_lib);

return index$1;

})));
