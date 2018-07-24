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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



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
Object.defineProperty(exports,"__esModule",{value:!0});function createTaskDecorator(t,r,i,a,n){return core_1.createClassDecorator("Task",function(e){a&&a(e), e.next({match:function(e){return e&&(core_1.isString(e)||core_1.isObject(e)&&e instanceof core_1.Registration)},setMetadata:function(e,t){core_1.isString(t)?e.name=t:e.provide=t;}}), e.next({match:function(e){return core_1.isString(e)||core_1.isToken(e)},setMetadata:function(e,t){core_1.isString(t)?e.name=t:e.builder=t;}}), e.next({match:function(e){return core_1.isString(e)},setMetadata:function(e,t){e.name=t;}});},function(e){(n&&(e=n(e)), !e.name&&core_1.isClass(e.type))&&(/^[a-z]$/.test(e.type.name)&&e.type.classAnnations?e.name=e.type.classAnnations.name:e.name=e.type.name);return e.provide=e.provide||i, e.alias=e.alias||e.name, e.decorType=t, e.builder||(e.builder=r), e})}exports.createTaskDecorator=createTaskDecorator, exports.Task=createTaskDecorator("Task",IActivityBuilder.ActivityBuilderToken,IActivity.ActivityToken);



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

var bootstrap_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory(tslib_1, core_1);
}(commonjsGlobal, (function (tslib_1$$2,core_1$$2) { tslib_1$$2 = tslib_1$$2 && tslib_1$$2.hasOwnProperty('default') ? tslib_1$$2['default'] : tslib_1$$2;
core_1$$2 = core_1$$2 && core_1$$2.hasOwnProperty('default') ? core_1$$2['default'] : core_1$$2;

function unwrapExports$$1 (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var IModuleBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * inject module builder.
 *
 * @export
 * @class InjectModuleBuilder
 * @extends {Registration<T>}
 * @template T
 */
var InjectModuleBuilder = /** @class */ (function (_super) {
    tslib_1$$2.__extends(InjectModuleBuilder, _super);
    function InjectModuleBuilder(desc) {
        return _super.call(this, 'DI_ModuleBuilder', desc) || this;
    }
    InjectModuleBuilder.classAnnations = { "name": "InjectModuleBuilder", "params": { "constructor": ["desc"] } };
    return InjectModuleBuilder;
}(core_1$$2.Registration));
exports.InjectModuleBuilder = InjectModuleBuilder;
/**
 * module builder token.
 */
exports.ModuleBuilderToken = new InjectModuleBuilder('');


});

unwrapExports$$1(IModuleBuilder);
var IModuleBuilder_1 = IModuleBuilder.InjectModuleBuilder;
var IModuleBuilder_2 = IModuleBuilder.ModuleBuilderToken;

var DIModule = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * create bootstrap decorator.
 *
 * @export
 * @template T
 * @param {string} decorType
 * @param {(Token<IModuleBuilder<T>> | IModuleBuilder<T>)} builder
 * @param {InjectToken<IApplication>} provideType default provide type.
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {IDIModuleDecorator<T>}
 */
function createDIModuleDecorator(decorType, builder, provideType, adapter, metadataExtends) {
    return core_1$$2.createClassDecorator('DIModule', function (args) {
        if (adapter) {
            adapter(args);
        }
        args.next({
            match: function (arg) { return arg && (core_1$$2.isString(arg) || (core_1$$2.isObject(arg) && arg instanceof core_1$$2.Registration)); },
            setMetadata: function (metadata, arg) {
                if (core_1$$2.isString(arg)) {
                    metadata.name = arg;
                }
                else {
                    metadata.provide = arg;
                }
            }
        });
        args.next({
            match: function (arg) { return core_1$$2.isString(arg) || core_1$$2.isToken(arg); },
            setMetadata: function (metadata, arg) {
                if (core_1$$2.isString(arg)) {
                    metadata.name = arg;
                }
                else {
                    metadata.builder = arg;
                }
            }
        });
        args.next({
            match: function (arg) { return core_1$$2.isString(arg) || core_1$$2.isBoolean(arg); },
            setMetadata: function (metadata, arg) {
                if (core_1$$2.isString(arg)) {
                    metadata.name = arg;
                }
                else if (core_1$$2.isBoolean(arg)) {
                    metadata.singleton = arg;
                }
            }
        });
    }, function (metadata) {
        if (metadataExtends) {
            metadata = metadataExtends(metadata);
        }
        if (!metadata.name && core_1$$2.isClass(metadata.type)) {
            var isuglify = /^[a-z]$/.test(metadata.type.name);
            if (isuglify && metadata.type.classAnnations) {
                metadata.name = metadata.type.classAnnations.name;
            }
            else {
                metadata.name = metadata.type.name;
            }
        }
        metadata.provide = metadata.provide || provideType;
        metadata.alias = metadata.alias || metadata.name;
        metadata.decorType = decorType;
        if (!metadata.builder) {
            metadata.builder = builder;
        }
        return metadata;
    });
}
exports.createDIModuleDecorator = createDIModuleDecorator;
/**
 * DIModule Decorator, definde class as DI module.
 *
 * @DIModule
 */
exports.DIModule = createDIModuleDecorator('module', IModuleBuilder.ModuleBuilderToken);


});

unwrapExports$$1(DIModule);
var DIModule_1 = DIModule.createDIModuleDecorator;
var DIModule_2 = DIModule.DIModule;

var IApplication = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Inject ApplicationToken
 *
 * @export
 * @class InjectApplicationToken
 * @extends {Registration<T>}
 * @template T
 */
var InjectApplicationToken = /** @class */ (function (_super) {
    tslib_1$$2.__extends(InjectApplicationToken, _super);
    function InjectApplicationToken(desc) {
        return _super.call(this, 'DI_Application', desc) || this;
    }
    InjectApplicationToken.classAnnations = { "name": "InjectApplicationToken", "params": { "constructor": ["desc"] } };
    return InjectApplicationToken;
}(core_1$$2.Registration));
exports.InjectApplicationToken = InjectApplicationToken;
/**
 * Default Application Token.
 */
exports.ApplicationToken = new InjectApplicationToken('');


});

unwrapExports$$1(IApplication);
var IApplication_1 = IApplication.InjectApplicationToken;
var IApplication_2 = IApplication.ApplicationToken;

var Bootstrap = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * create bootstrap decorator.
 *
 * @export
 * @template T
 * @param {string} decorType
 * @param {(Token<IModuleBuilder<T>> | IModuleBuilder<T>)} builder
 * @param {InjectToken<IApplication>} provideType default provide type.
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {IBootstrapDecorator<T>}
 */
function createBootstrapDecorator(decorType, builder, provideType, adapter, metadataExtends) {
    return DIModule.createDIModuleDecorator(decorType, builder, provideType, adapter, metadataExtends);
}
exports.createBootstrapDecorator = createBootstrapDecorator;
/**
 * Bootstrap Decorator, definde class as mvc bootstrap module.
 *
 * @Bootstrap
 */
exports.Bootstrap = createBootstrapDecorator('bootstrap', IModuleBuilder.ModuleBuilderToken, IApplication.ApplicationToken);


});

unwrapExports$$1(Bootstrap);
var Bootstrap_1 = Bootstrap.createBootstrapDecorator;
var Bootstrap_2 = Bootstrap.Bootstrap;

var decorators = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$2.__exportStar(DIModule, exports);
tslib_1$$2.__exportStar(Bootstrap, exports);


});

unwrapExports$$1(decorators);

var IApplicationBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.ApplicationBuilderToken = new core_1$$2.InjectToken('DI_AppBuilder');
exports.ApplicationBuilderFactoryToken = new core_1$$2.InjectToken('DI_AppBuilder_Factory');


});

unwrapExports$$1(IApplicationBuilder);
var IApplicationBuilder_1 = IApplicationBuilder.ApplicationBuilderToken;
var IApplicationBuilder_2 = IApplicationBuilder.ApplicationBuilderFactoryToken;

var ModuleBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });





/**
 * server app bootstrap
 *
 * @export
 * @class ModuleBuilder
 */
var ModuleBuilder = /** @class */ (function () {
    function ModuleBuilder() {
    }
    ModuleBuilder_1 = ModuleBuilder;
    /**
     * build module.
     *
     * @param {(Token<T>| ModuleConfiguration<T>)} [token]
     * @returns {Promise<any>}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.build = function (token, data) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var cfg, buider, instacnce;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cfg = this.getConfigure(token);
                        buider = this.getBuilder(cfg);
                        return [4 /*yield*/, buider.createInstance(core_1$$2.isToken(token) ? token : null, cfg, data)];
                    case 1:
                        instacnce = _a.sent();
                        return [4 /*yield*/, buider.buildStrategy(instacnce, cfg)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, instacnce];
                }
            });
        });
    };
    /**
     * bundle instance via config.
     *
     * @param {T} instance
     * @param {ModuleConfiguration<T>} config
     * @returns {Promise<T>}
     * @memberof IModuleBuilder
     */
    ModuleBuilder.prototype.buildStrategy = function (instance, config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$2.__generator(this, function (_a) {
                return [2 /*return*/, instance];
            });
        });
    };
    ModuleBuilder.prototype.getBuilder = function (config) {
        var builder;
        if (config.builder) {
            builder = this.getBuilderViaConfig(config.builder);
        }
        else {
            var token = this.getBootstrapToken(config);
            if (token) {
                builder = this.getBuilderViaToken(token);
            }
        }
        return builder || this;
    };
    ModuleBuilder.prototype.getDecorator = function () {
        return decorators.DIModule.toString();
    };
    /**
     * get configuration.
     *
     * @returns {ModuleConfiguration<T>}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.getConfigure = function (token) {
        var cfg;
        if (core_1$$2.isClass(token)) {
            cfg = this.getMetaConfig(token);
        }
        else if (core_1$$2.isToken(token)) {
            var tokenType = this.container.getTokenImpl(token);
            if (core_1$$2.isClass(tokenType)) {
                cfg = this.getMetaConfig(tokenType);
            }
        }
        else {
            cfg = token;
            var bootToken = this.getBootstrapToken(cfg);
            var typeTask = core_1$$2.isClass(bootToken) ? bootToken : this.container.getTokenImpl(bootToken);
            if (core_1$$2.isClass(typeTask)) {
                cfg = core_1$$2.lang.assign({}, this.getMetaConfig(typeTask), cfg || {});
            }
        }
        return cfg || {};
    };
    ModuleBuilder.prototype.createInstance = function (token, cfg, data) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var bootToken;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bootToken = this.getBootstrapToken(cfg, token);
                        if (!bootToken) {
                            throw new Error('not find bootstrap token.');
                        }
                        return [4 /*yield*/, this.registerDepdences(cfg)];
                    case 1:
                        _a.sent();
                        if (core_1$$2.isClass(bootToken)) {
                            if (!this.container.has(bootToken)) {
                                this.container.register(bootToken);
                            }
                            return [2 /*return*/, this.container.resolve(bootToken)];
                        }
                        else {
                            return [2 /*return*/, this.container.resolve(bootToken)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ModuleBuilder.prototype.getBootstrapToken = function (cfg, token) {
        return cfg.bootstrap || token;
    };
    ModuleBuilder.prototype.getBuilderViaConfig = function (builder) {
        if (core_1$$2.isToken(builder)) {
            return this.container.resolve(builder);
        }
        else if (builder instanceof ModuleBuilder_1) {
            return builder;
        }
        return null;
    };
    ModuleBuilder.prototype.getBuilderViaToken = function (mdl) {
        if (core_1$$2.isToken(mdl)) {
            var taskType = core_1$$2.isClass(mdl) ? mdl : this.container.getTokenImpl(mdl);
            if (taskType) {
                var meta = core_1$$2.lang.first(core_1$$2.getTypeMetadata(this.getDecorator(), taskType));
                if (meta && meta.builder) {
                    return core_1$$2.isToken(meta.builder) ? this.container.resolve(meta.builder) : meta.builder;
                }
            }
        }
        return null;
    };
    ModuleBuilder.prototype.getMetaConfig = function (bootModule) {
        var decorator = this.getDecorator();
        if (core_1$$2.hasClassMetadata(decorator, bootModule)) {
            var metas = core_1$$2.getTypeMetadata(decorator, bootModule);
            if (metas && metas.length) {
                var meta = metas[0];
                meta.bootstrap = meta.bootstrap || bootModule;
                return core_1$$2.lang.omit(meta, 'builder');
            }
        }
        return null;
    };
    ModuleBuilder.prototype.registerDepdences = function (config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var buider, decorator_1, mdls, _a;
            return tslib_1$$2.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(core_1$$2.isArray(config.imports) && config.imports.length)) return [3 /*break*/, 3];
                        buider = this.container.get(core_1$$2.ContainerBuilderToken);
                        decorator_1 = this.getDecorator();
                        return [4 /*yield*/, buider.loader.loadTypes(config.imports, function (it) { return core_1$$2.hasOwnClassMetadata(core_1$$2.IocExt, it) || core_1$$2.hasOwnClassMetadata(decorator_1, it); })];
                    case 1:
                        mdls = _b.sent();
                        mdls.forEach(function (md) { return tslib_1$$2.__awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var dimd, subApp_1;
                            return tslib_1$$2.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(this.container.has(IApplicationBuilder.ApplicationBuilderFactoryToken) && core_1$$2.hasClassMetadata(decorator_1, md))) return [3 /*break*/, 3];
                                        dimd = core_1$$2.lang.first(core_1$$2.getTypeMetadata(decorator_1, md));
                                        if (!dimd) return [3 /*break*/, 2];
                                        subApp_1 = this.container.get(IApplicationBuilder.ApplicationBuilderFactoryToken);
                                        return [4 /*yield*/, subApp_1.build(md)];
                                    case 1:
                                        _a.sent();
                                        if (dimd.exports && dimd.exports.length) {
                                            dimd.exports.forEach(function (token) {
                                                _this.container.bindProvider(token, function () { return subApp_1.getContainer().resolve(token); });
                                            });
                                        }
                                        if (dimd.providers && dimd.providers.length) {
                                            this.bindProvider(this.container, config.providers);
                                        }
                                        this.container.bindProvider(md, function () { return subApp_1.build(md); });
                                        _a.label = 2;
                                    case 2: return [3 /*break*/, 4];
                                    case 3:
                                        this.container.register(md);
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, (_a = this.container).loadModule.apply(_a, config.imports)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (core_1$$2.isArray(config.providers) && config.providers.length) {
                            this.bindProvider(this.container, config.providers);
                        }
                        return [2 /*return*/, this.container];
                }
            });
        });
    };
    ModuleBuilder.prototype.bindProvider = function (container, providers) {
        providers.forEach(function (p, index) {
            if (core_1$$2.isUndefined(p) || core_1$$2.isNull(p)) {
                return;
            }
            if (core_1$$2.isProviderMap(p)) {
                p.forEach(function (k, f) {
                    container.bindProvider(k, f);
                });
            }
            else if (p instanceof core_1$$2.Provider) {
                container.bindProvider(p.type, function () {
                    var providers = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        providers[_i] = arguments[_i];
                    }
                    return p.resolve.apply(p, [container].concat(providers));
                });
            }
            else if (core_1$$2.isClass(p)) {
                if (!container.has(p)) {
                    container.register(p);
                }
            }
            else if (core_1$$2.isBaseObject(p)) {
                var pr_1 = p;
                var isobjMap = false;
                if (core_1$$2.isToken(pr_1.provide)) {
                    if (core_1$$2.isArray(pr_1.deps) && pr_1.deps.length) {
                        pr_1.deps.forEach(function (d) {
                            if (core_1$$2.isClass(d) && !container.has(d)) {
                                container.register(d);
                            }
                        });
                    }
                    if (!core_1$$2.isUndefined(pr_1.useValue)) {
                        container.bindProvider(pr_1.provide, function () { return pr_1.useValue; });
                    }
                    else if (core_1$$2.isClass(pr_1.useClass)) {
                        if (!container.has(pr_1.useClass)) {
                            container.register(pr_1.useClass);
                        }
                        container.bindProvider(pr_1.provide, pr_1.useClass);
                    }
                    else if (core_1$$2.isFunction(pr_1.useFactory)) {
                        container.bindProvider(pr_1.provide, function () {
                            var args = [];
                            if (core_1$$2.isArray(pr_1.deps) && pr_1.deps.length) {
                                args = pr_1.deps.map(function (d) {
                                    if (core_1$$2.isClass(d)) {
                                        return container.get(d);
                                    }
                                    else {
                                        return d;
                                    }
                                });
                            }
                            return pr_1.useFactory.apply(pr_1, args);
                        });
                    }
                    else if (core_1$$2.isToken(pr_1.useExisting)) {
                        if (container.has(pr_1.useExisting)) {
                            container.bindProvider(pr_1.provide, pr_1.useExisting);
                        }
                        else {
                            console.log('has not register:', pr_1.useExisting);
                        }
                    }
                    else {
                        isobjMap = true;
                    }
                }
                else {
                    isobjMap = true;
                }
                if (isobjMap) {
                    core_1$$2.lang.forIn(p, function (val, name) {
                        if (!core_1$$2.isUndefined(val)) {
                            if (core_1$$2.isClass(val)) {
                                container.bindProvider(name, val);
                            }
                            else if (core_1$$2.isFunction(val) || core_1$$2.isString(val)) {
                                container.bindProvider(name, function () { return val; });
                            }
                            else {
                                container.bindProvider(name, val);
                            }
                        }
                    });
                }
            }
            else if (core_1$$2.isFunction(p)) {
                container.bindProvider(name, function () { return p; });
            }
        });
    };
    ModuleBuilder.classAnnations = { "name": "ModuleBuilder", "params": { "constructor": [], "build": ["token", "data"], "buildStrategy": ["instance", "config"], "getBuilder": ["config"], "getDecorator": [], "getConfigure": ["token"], "createInstance": ["token", "cfg", "data"], "getBootstrapToken": ["cfg", "token"], "getBuilderViaConfig": ["builder"], "getBuilderViaToken": ["mdl"], "getMetaConfig": ["bootModule"], "registerDepdences": ["config"], "bindProvider": ["container", "providers"] } };
    tslib_1$$2.__decorate([
        core_1$$2.Inject(core_1$$2.ContainerToken),
        tslib_1$$2.__metadata("design:type", Object)
    ], ModuleBuilder.prototype, "container", void 0);
    ModuleBuilder = ModuleBuilder_1 = tslib_1$$2.__decorate([
        core_1$$2.Injectable(IModuleBuilder.ModuleBuilderToken),
        tslib_1$$2.__metadata("design:paramtypes", [])
    ], ModuleBuilder);
    return ModuleBuilder;
    var ModuleBuilder_1;
}());
exports.ModuleBuilder = ModuleBuilder;


});

unwrapExports$$1(ModuleBuilder_1);
var ModuleBuilder_2 = ModuleBuilder_1.ModuleBuilder;

var BootstrapModule_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });





/**
 * Bootstrap ext for ioc. auto run setup after registered.
 * with @IocExt('setup') decorator.
 * @export
 * @class BootstrapModule
 */
var BootstrapModule = /** @class */ (function () {
    function BootstrapModule(container) {
        this.container = container;
    }
    /**
     * register aop for container.
     *
     * @memberof AopModule
     */
    BootstrapModule.prototype.setup = function () {
        var container = this.container;
        var lifeScope = container.get(core_1$$2.LifeScopeToken);
        lifeScope.registerDecorator(decorators.DIModule, core_1$$2.CoreActions.bindProvider, core_1$$2.CoreActions.cache, core_1$$2.CoreActions.componentBeforeInit, core_1$$2.CoreActions.componentInit, core_1$$2.CoreActions.componentAfterInit);
        lifeScope.registerDecorator(decorators.Bootstrap, core_1$$2.CoreActions.bindProvider, core_1$$2.CoreActions.cache, core_1$$2.CoreActions.componentBeforeInit, core_1$$2.CoreActions.componentInit, core_1$$2.CoreActions.componentAfterInit);
        container.register(ModuleBuilder_1.ModuleBuilder);
        container.register(ApplicationBuilder_1.ApplicationBuilder);
    };
    BootstrapModule.classAnnations = { "name": "BootstrapModule", "params": { "constructor": ["container"], "setup": [] } };
    BootstrapModule = tslib_1$$2.__decorate([
        core_1$$2.IocExt('setup'),
        tslib_1$$2.__param(0, core_1$$2.Inject(core_1$$2.ContainerToken)),
        tslib_1$$2.__metadata("design:paramtypes", [Object])
    ], BootstrapModule);
    return BootstrapModule;
}());
exports.BootstrapModule = BootstrapModule;


});

unwrapExports$$1(BootstrapModule_1);
var BootstrapModule_2 = BootstrapModule_1.BootstrapModule;

var ApplicationBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });





/**
 * application builder.
 *
 * @export
 * @class ApplicationBuilder
 * @extends {ModuleBuilder<T>}
 * @template T
 */
var ApplicationBuilder = /** @class */ (function () {
    function ApplicationBuilder(baseURL) {
        this.baseURL = baseURL;
        this.usedModules = [];
        this.customRegs = [];
    }
    /**
     * get container
     *
     * @returns
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.getContainer = function () {
        if (!this.container) {
            this.container = this.getContainerBuilder().create();
        }
        return this.container;
    };
    /**
     * set container.
     *
     * @param {IContainer} container
     * @returns
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.setContainer = function (container) {
        if (container) {
            this.container = container;
            this.builder = container.get(core_1$$2.ContainerBuilderToken);
        }
        return this;
    };
    /**
     * get container builder.
     *
     * @returns
     * @memberof ModuleBuilder
     */
    ApplicationBuilder.prototype.getContainerBuilder = function () {
        if (!this.builder) {
            this.builder = this.createContainerBuilder();
        }
        return this.builder;
    };
    /**
     * use container builder
     *
     * @param {IContainerBuilder} builder
     * @returns
     * @memberof ModuleBuilder
     */
    ApplicationBuilder.prototype.setContainerBuilder = function (builder) {
        this.builder = builder;
        this.container = null;
        return this;
    };
    /**
     * get module builer.
     *
     * @returns {IModuleBuilder<T>}
     * @memberof IApplicationBuilder
     */
    ApplicationBuilder.prototype.getModuleBuilder = function () {
        if (!this.moduleBuilder) {
            this.moduleBuilder = this.createModuleBuilder();
        }
        return this.moduleBuilder;
    };
    /**
     * set module builder.
     *
     * @param {IModuleBuilder<T>} builder
     * @returns {this}
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.setModuleBuilder = function (builder) {
        this.moduleBuilder = builder;
        return this;
    };
    /**
     * use configuration.
     *
     * @param {(string | AppConfiguration<T>)} [config]
     * @returns {this} global config for this application.
     * @memberof Bootstrap
     */
    ApplicationBuilder.prototype.useConfiguration = function (config) {
        if (!this.globalConfig) {
            this.globalConfig = Promise.resolve(this.getDefaultConfig());
        }
        var pcfg;
        var builder = this.getContainerBuilder();
        if (core_1$$2.isString(config)) {
            pcfg = builder.loader.load([config])
                .then(function (rs) {
                return rs.length ? rs[0] : null;
            });
        }
        else if (config) {
            pcfg = Promise.resolve(config);
        }
        if (pcfg) {
            this.globalConfig = this.globalConfig
                .then(function (cfg) {
                return pcfg.then(function (rcfg) {
                    var excfg = (rcfg['default'] ? rcfg['default'] : rcfg);
                    cfg = core_1$$2.lang.assign(cfg || {}, excfg || {});
                    return cfg;
                });
            });
        }
        return this;
    };
    /**
     * use module, custom module.
     *
     * @param {...(LoadType | CustomRegister<T>)[]} modules
     * @returns {this}
     * @memberof PlatformServer
     */
    ApplicationBuilder.prototype.use = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        this.usedModules = this.usedModules.concat(modules);
        return this;
    };
    /**
     * register modules via custom.
     *
     * @param {...CustomRegister<T>[]} moduleRegs
     * @returns {this}
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.registerModules = function () {
        var moduleRegs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            moduleRegs[_i] = arguments[_i];
        }
        this.customRegs = this.customRegs.concat(moduleRegs);
        return this;
    };
    /**
     * build and bootstrap application.
     *
     * @param {(Token<T> | Type<any> | AppConfiguration<T>)} token
     * @returns {Promise<T>}
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.bootstrap = function (token) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var app, bootMd;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.build(token)];
                    case 1:
                        app = _a.sent();
                        if (app.config && core_1$$2.isToken(token)) {
                            if (app.config.bootstrap !== token) {
                                if (!this.container.has(token) && core_1$$2.isClass(token)) {
                                    this.container.register(token);
                                }
                                if (this.container.has(token)) {
                                    bootMd = this.container.resolve(token);
                                }
                            }
                        }
                        bootMd = bootMd || app;
                        if (!core_1$$2.isFunction(bootMd.onStart)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.resolve(bootMd.onStart(app))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (core_1$$2.isFunction(bootMd.onStarted)) {
                            bootMd.onStarted(app);
                        }
                        return [2 /*return*/, bootMd];
                }
            });
        });
    };
    /**
     * build application.
     *
     * @param {IModuleBuilder<T>} builder
     * @param {(Token<T> | Type<any> | AppConfiguration<T>)} token
     * @returns {Promise<any>}
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.build = function (token) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var container, builder, cfg, app;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        container = this.getContainer();
                        return [4 /*yield*/, this.registerExts(container)];
                    case 1:
                        _a.sent();
                        builder = this.getModuleBuilder();
                        return [4 /*yield*/, this.mergeConfigure(builder.getConfigure(token))];
                    case 2:
                        cfg = _a.sent();
                        this.bindConfiguration(container, cfg);
                        return [4 /*yield*/, this.initContainer(cfg, container)];
                    case 3:
                        _a.sent();
                        if (!cfg.bootstrap) {
                            cfg.bootstrap = (core_1$$2.isToken(token) ? token : null);
                        }
                        return [4 /*yield*/, this.createInstance(builder, cfg)];
                    case 4:
                        app = _a.sent();
                        return [2 /*return*/, app];
                }
            });
        });
    };
    ApplicationBuilder.prototype.createInstance = function (builder, config) {
        return builder.build(config);
    };
    /**
     * create default module builder.
     *
     * @protected
     * @returns
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.createModuleBuilder = function () {
        return this.getContainer().get(IModuleBuilder.ModuleBuilderToken);
    };
    /**
     * create default container builder.
     *
     * @protected
     * @returns
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.createContainerBuilder = function () {
        return new core_1$$2.DefaultContainerBuilder();
    };
    /**
     * register ioc exts
     *
     * @protected
     * @param {IContainer} container
     * @returns {Promise<IContainer>}
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.registerExts = function (container) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var usedModules;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.container.bindProvider(IApplicationBuilder.ApplicationBuilderToken, this);
                        this.container.bindProvider(IApplicationBuilder.ApplicationBuilderFactoryToken, function () { return _this.createContainerBuilder(); });
                        if (!container.has(BootstrapModule_1.BootstrapModule)) {
                            container.register(BootstrapModule_1.BootstrapModule);
                        }
                        if (!this.usedModules.length) return [3 /*break*/, 2];
                        usedModules = this.usedModules;
                        this.usedModules = [];
                        return [4 /*yield*/, container.loadModule.apply(container, [container].concat(usedModules))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, container];
                }
            });
        });
    };
    ApplicationBuilder.prototype.initContainer = function (config, container) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var customs;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.customRegs.length) return [3 /*break*/, 2];
                        customs = this.customRegs;
                        this.customRegs = [];
                        return [4 /*yield*/, Promise.all(customs.map(function (cs) {
                                return cs(container, config, _this);
                            }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, container];
                }
            });
        });
    };
    ApplicationBuilder.prototype.bindConfiguration = function (container, config) {
        if (this.baseURL) {
            config.baseURL = this.baseURL;
        }
    };
    /**
     * meger config configuration with global config.
     *
     * @protected
     * @param {AppConfiguration<T>} cfg
     * @returns {Promise<AppConfiguration<T>>}
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.prototype.mergeConfigure = function (cfg) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var gcfg;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.globalConfig) {
                            this.useConfiguration();
                        }
                        return [4 /*yield*/, this.globalConfig];
                    case 1:
                        gcfg = _a.sent();
                        return [2 /*return*/, core_1$$2.lang.assign({}, gcfg, cfg)];
                }
            });
        });
    };
    ApplicationBuilder.prototype.getDefaultConfig = function () {
        return { debug: false };
    };
    ApplicationBuilder.classAnnations = { "name": "ApplicationBuilder", "params": { "constructor": ["baseURL"], "getContainer": [], "setContainer": ["container"], "getContainerBuilder": [], "setContainerBuilder": ["builder"], "getModuleBuilder": [], "setModuleBuilder": ["builder"], "useConfiguration": ["config"], "use": ["modules"], "registerModules": ["moduleRegs"], "bootstrap": ["token"], "build": ["token"], "createInstance": ["builder", "config"], "createModuleBuilder": [], "createContainerBuilder": [], "registerExts": ["container"], "initContainer": ["config", "container"], "bindConfiguration": ["container", "config"], "mergeConfigure": ["cfg"], "getDefaultConfig": [] } };
    return ApplicationBuilder;
}());
exports.ApplicationBuilder = ApplicationBuilder;


});

unwrapExports$$1(ApplicationBuilder_1);
var ApplicationBuilder_2 = ApplicationBuilder_1.ApplicationBuilder;

var D__workspace_github_tsioc_packages_bootstrap_lib = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$2.__exportStar(decorators, exports);
tslib_1$$2.__exportStar(ApplicationBuilder_1, exports);
tslib_1$$2.__exportStar(IApplication, exports);
tslib_1$$2.__exportStar(IApplicationBuilder, exports);
tslib_1$$2.__exportStar(IModuleBuilder, exports);
tslib_1$$2.__exportStar(ModuleBuilder_1, exports);
tslib_1$$2.__exportStar(BootstrapModule_1, exports);


});

var index$1 = unwrapExports$$1(D__workspace_github_tsioc_packages_bootstrap_lib);

return index$1;

})));
});

unwrapExports(bootstrap_umd);

var ActivityBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var ActivityBuilder=function(o){function t(){return o.call(this)||this}return tslib_1.__extends(t,o), t.prototype.build=function(t,e){return o.prototype.build.call(this,t,e)}, t.prototype.createInstance=function(i,r,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,o.prototype.createInstance.call(this,i,r)];case 1:return(e=t.sent())&&e instanceof Activity_1.Activity?[3,3]:(r.task=this.getDefaultAcitvity(), console.log("try load default activity:",core_1.getClassName(r.task)), [4,this.build(r,n)]);case 2:e=t.sent(), t.label=3;case 3:return e.id=n, core_1.isFunction(e.onTaskInit)&&e.onTaskInit(r), [2,e]}})})}, t.prototype.buildStrategy=function(e,i){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return i.name&&(e.name=i.name), e.config=i, [2,e]})})}, t.prototype.getDecorator=function(){return decorators.Task.toString()}, t.prototype.getDefaultAcitvity=function(){return Activity_1.Activity}, t.prototype.toExpression=function(e,i){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return IConfigure.isActivityType(e)?[4,this.build(e,i.id)]:[3,2];case 1:return[2,t.sent()];case 2:return[2,e]}})})}, t.prototype.toActivity=function(n,o,s,a,c){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return IConfigure.isActivityType(n,!c)?c?[4,this.build(core_1.isToken(n)?n:c(n),o.id)]:[3,2]:[3,5];case 1:return e=t.sent(), [3,4];case 2:return[4,this.build(n,o.id)];case 3:e=t.sent(), t.label=4;case 4:return[3,6];case 5:e=n, t.label=6;case 6:return s(e)?[2,e]:core_1.isString(e)?(i=e, [3,9]):[3,7];case 7:return[4,o.context.exec(o,e)];case 8:i=t.sent(), t.label=9;case 9:return r=a(i), c&&(r=c(r)), r?[4,this.build(r,o.id)]:[3,11];case 10:return e=t.sent(), [3,12];case 11:e=null, t.label=12;case 12:return[2,e]}})})}, t.prototype.getBootstrapToken=function(t,e){var i=t.task||t.bootstrap||e;return core_1.isString(i)&&(i=this.traslateStrToken(i)), i}, t.prototype.traslateStrToken=function(t){var e=new core_1.Registration(IActivity.ActivityToken,t);return this.container.has(e)?e:t}, t.classAnnations={name:"ActivityBuilder",params:{constructor:[],build:["task","uuid"],createInstance:["token","config","uuid"],buildStrategy:["activity","config"],getDecorator:[],getDefaultAcitvity:[],toExpression:["exptype","target"],toActivity:["exptype","target","isRightActivity","toConfig","valify"],getBootstrapToken:["cfg","token"],traslateStrToken:["token"]}}, t=tslib_1.__decorate([core_1.Singleton(IActivityBuilder.ActivityBuilderToken),tslib_1.__metadata("design:paramtypes",[])],t)}(bootstrap_umd.ModuleBuilder);exports.ActivityBuilder=ActivityBuilder;



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
Object.defineProperty(exports,"__esModule",{value:!0});var Context=function(){function t(){}return t.prototype.getContainer=function(){return this.container}, t.prototype.getTaskContiner=function(){return this.container.resolve(ITaskContainer.TaskContainerToken)}, t.prototype.getRootPath=function(){return this.getTaskContiner().getRootPath()}, t.prototype.getRunner=function(t,e,n,r){var o;return core_1.isToken(n)?o=this.container.resolve(n):n instanceof ActivityBuilder_1.ActivityBuilder&&(o=n), this.container.resolve(ITaskRunner.TaskRunnerToken,{activity:t,uuid:e,instance:r,activityBuilder:o})}, t.prototype.getEnvArgs=function(){return{}}, t.prototype.to=function(t,e){return core_1.isFunction(t)?core_1.isClass(t)?t:t(this,e):t}, t.prototype.exec=function(t,e,n){return core_1.isFunction(e)?e(t,n):core_1.isPromise(e)?e:e instanceof Activity_1.Activity?e.run(n,t):e instanceof TaskRunner_1.TaskRunner?e.start(n):Promise.resolve(e)}, t.prototype.isTask=function(t){return core_1.hasOwnClassMetadata(decorators.Task,t)}, t.classAnnations={name:"Context",params:{constructor:[],getContainer:[],getTaskContiner:[],getRootPath:[],getRunner:["task","uuid","builder","instance"],getEnvArgs:[],to:["target","config"],exec:["target","expression","data"],isTask:["task"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=tslib_1.__decorate([core_1.Singleton(IContext.ContextToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.Context=Context;



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
Object.defineProperty(exports,"__esModule",{value:!0});var DefaultTaskContainer=function(o){function t(t){var e=o.call(this,t)||this;return e.rootPath=t, e.logAspects=[], e}return tslib_1.__extends(t,o), t.prototype.useLog=function(t){return core_1.hasClassMetadata(aop_1.Aspect,t)?this.logAspects.push(t):console.error("logAspect param is not right aspect"), this}, t.prototype.createWorkflow=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.build.apply(this,e)];case 1:return[2,t.sent()]}})})}, t.prototype.bootstrap=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.build.apply(this,r)];case 1:return[4,(e=t.sent()).start()];case 2:return t.sent(), [2,e]}})})}, t.prototype.getRootPath=function(){return this.rootPath}, t.prototype.build=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return e=1<r.length?{sequence:r,task:activities.SequenceActivity}:core_1.lang.first(r), [4,o.prototype.build.call(this,e)];case 1:return[2,t.sent()]}})})}, t.prototype.createInstance=function(e,r){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,this.getContainer().resolve(core.TaskRunnerToken,{activity:r,activityBuilder:e})]})})}, t.prototype.createModuleBuilder=function(){return this.getContainer().get(core.ActivityBuilderToken)}, t.prototype.registerExts=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return e.has(aop_1.AopModule)||e.register(aop_1.AopModule), e.has(logs_1.LogModule)||e.register(logs_1.LogModule), e.bindProvider(ITaskContainer.TaskContainerToken,this), e.has(CoreModule_1.CoreModule)||e.register(CoreModule_1.CoreModule), this.use(activities), this.beforRegister(e), [4,o.prototype.registerExts.call(this,e)];case 1:return t.sent(), [2,e]}})})}, t.prototype.beforRegister=function(e){this.logAspects.forEach(function(t){t&&e.register(t);});}, t.classAnnations={name:"DefaultTaskContainer",params:{constructor:["rootPath"],useLog:["logAspect"],createWorkflow:["tasks"],bootstrap:["tasks"],getRootPath:[],build:["tasks"],createInstance:["builder","config"],createModuleBuilder:[],registerExts:["container"],beforRegister:["container"]}}, t}(bootstrap_umd.ApplicationBuilder);exports.DefaultTaskContainer=DefaultTaskContainer;



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
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(ITaskContainer,exports), tslib_1.__exportStar(DefaultTaskContainer_1,exports), tslib_1.__exportStar(utils,exports), tslib_1.__exportStar(core,exports), tslib_1.__exportStar(aop,exports), tslib_1.__exportStar(activities,exports);



});

var index$5 = unwrapExports(D__workspace_github_typeTask_packages_core_lib);

return index$5;

})));
