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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var TaskLogAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskLogAspect=function(r){function t(t){var e=r.call(this,t)||this;return e.startHrts={}, e}return tslib_1.__extends(t,r), t.prototype.logging=function(t){var e,r,a=this.logger,o=t.target.name;o||(o=t.targetType.classAnnations?t.targetType.classAnnations.name:t.targetType.name);var s="'"+o+"'";t.state===aop_1.JoinpointState.Before&&(e=new Date, this.startHrts[o]=e, a.log("["+e.toString()+"]","Starting",s,"...")), t.state===aop_1.JoinpointState.AfterReturning&&(e=this.startHrts[o], r=new Date, delete this.startHrts[o], a.log("["+r.toString()+"]","Finished",s," after ",r.getTime()-e.getTime())), t.state===aop_1.JoinpointState.AfterThrowing&&(e=this.startHrts[o], r=new Date, delete this.startHrts[o], a.log("["+r.toString()+"]","Finished",s,"errored after",r.getTime()-e.getTime()));}, t.classAnnations={name:"TaskLogAspect",params:{constructor:["container"],logging:["joinPoint"]}}, tslib_1.__decorate([aop_1.Around("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"logging",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core_2.Task,singleton:!0}),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],t)}(logs_1.LoggerAspect);exports.TaskLogAspect=TaskLogAspect;



});

unwrapExports(TaskLogAspect_1);
var TaskLogAspect_2 = TaskLogAspect_1.TaskLogAspect;

var RunnerLogAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunnerLogAspect=function(r){function t(t){var e=r.call(this,t)||this;return e.startHrts={}, e}return tslib_1.__extends(t,r), t.prototype.logStart=function(t){var e,r,o=this.logger,n=t.target.getUUID(),i="'"+n+"'";t.state===aop_1.JoinpointState.Before&&(e=new Date, this.startHrts[n]=e, o.log("["+e.toString()+"]","Starting workflow",i,"...")), t.state===aop_1.JoinpointState.AfterReturning&&(e=this.startHrts[n], r=new Date, delete this.startHrts[n], o.log("["+r.toString()+"]","Finished workflow",i," after ",r.getTime()-e.getTime())), t.state===aop_1.JoinpointState.AfterThrowing&&(e=this.startHrts[n], r=new Date, delete this.startHrts[n], o.log("["+r.toString()+"]","Finished workflow",i,"errored after",r.getTime()-e.getTime()));}, t.classAnnations={name:"RunnerLogAspect",params:{constructor:["container"],logStart:["joinPoint"]}}, tslib_1.__decorate([aop_1.Around("execution(*.start)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"logStart",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core_2.Runner,singleton:!0}),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],t)}(logs_1.LoggerAspect);exports.RunnerLogAspect=RunnerLogAspect;



});

unwrapExports(RunnerLogAspect_1);
var RunnerLogAspect_2 = RunnerLogAspect_1.RunnerLogAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(TaskLogAspect_1,exports), tslib_1.__exportStar(RunnerLogAspect_1,exports);



});

unwrapExports(aop);

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

var Build = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * create type builder decorator
 *
 * @export
 * @template T
 * @param {string} name
 * @param {string} [decorType]
 * @param {(Token<ITypeBuilder<any>> | ITypeBuilder<any>)} [builder]
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {IBuildDecorator<T>}
 */
function createBuildDecorator(name, builder, adapter, metadataExtends) {
    return core_1$$2.createClassDecorator(name, function (args) {
        if (adapter) {
            adapter(args);
        }
    }, function (metadata) {
        if (metadataExtends) {
            metadata = metadataExtends(metadata);
        }
        if (builder && !metadata.typeBuilder) {
            metadata.typeBuilder = builder;
        }
        return metadata;
    });
}
exports.createBuildDecorator = createBuildDecorator;
/**
 * Build decorator, use to define class build way via config.
 *
 * @Build
 */
exports.Build = createBuildDecorator('Build');


});

unwrapExports$$1(Build);
var Build_1 = Build.createBuildDecorator;
var Build_2 = Build.Build;

var DIModule = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * create bootstrap decorator.
 *
 * @export
 * @template T
 * @param {string} name decorator name.
 * @param {(Token<IModuleBuilder> | IModuleBuilder)} [builder]
 * @param {(Token<ITypeBuilder<any>> | ITypeBuilder<any>)} [typeBuilder]
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {IDIModuleDecorator<T>}
 */
function createDIModuleDecorator(name, builder, typeBuilder, adapter, metadataExtends) {
    return core_1$$2.createClassDecorator(name, function (args) {
        if (adapter) {
            adapter(args);
        }
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
        metadata.decorType = name;
        if (builder && !metadata.builder) {
            metadata.builder = builder;
        }
        if (typeBuilder && !metadata.typeBuilder) {
            metadata.typeBuilder = typeBuilder;
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
exports.DIModule = createDIModuleDecorator('DIModule');


});

unwrapExports$$1(DIModule);
var DIModule_1 = DIModule.createDIModuleDecorator;
var DIModule_2 = DIModule.DIModule;

var Bootstrap = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * create bootstrap decorator.
 *
 * @export
 * @template T
 * @param {string} name
 * @param {(Token<IApplicationBuilder> | IApplicationBuilder)} [builder] default builder
 * @param {(Token<ITypeBuilder<any>> | ITypeBuilder<Tany>)} [typeBuilder] default type builder.
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {IBootstrapDecorator<T>}
 */
function createBootstrapDecorator(name, builder, typeBuilder, adapter, metadataExtends) {
    return DIModule.createDIModuleDecorator(name, builder, typeBuilder, adapter, function (metadata) {
        if (metadataExtends) {
            metadataExtends(metadata);
        }
        setTimeout(function () {
            var builderType = metadata.builder;
            var builder;
            if (core_1$$2.isClass(builderType)) {
                builder = core_1$$2.isFunction(builderType['create']) ? builderType['create']() : new builderType();
            }
            else {
                builder = builderType;
            }
            builder.bootstrap(metadata.type);
        }, 800);
        return metadata;
    });
}
exports.createBootstrapDecorator = createBootstrapDecorator;
/**
 * Bootstrap Decorator, definde class as mvc bootstrap module.
 *
 * @Bootstrap
 */
exports.Bootstrap = createBootstrapDecorator('Bootstrap');


});

unwrapExports$$1(Bootstrap);
var Bootstrap_1 = Bootstrap.createBootstrapDecorator;
var Bootstrap_2 = Bootstrap.Bootstrap;

var decorators = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$2.__exportStar(Build, exports);
tslib_1$$2.__exportStar(DIModule, exports);
tslib_1$$2.__exportStar(Bootstrap, exports);


});

unwrapExports$$1(decorators);

var AppConfigure = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * application configuration token.
 */
exports.AppConfigureToken = new core_1$$2.InjectToken('DI_APP_Configuration');


});

unwrapExports$$1(AppConfigure);
var AppConfigure_1 = AppConfigure.AppConfigureToken;

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

var BootModule_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });





/**
 * Bootstrap ext for ioc. auto run setup after registered.
 * with @IocExt('setup') decorator.
 * @export
 * @class BootModule
 */
var BootModule = /** @class */ (function () {
    function BootModule(container) {
        this.container = container;
    }
    /**
     * register aop for container.
     *
     * @memberof AopModule
     */
    BootModule.prototype.setup = function () {
        var container = this.container;
        var lifeScope = container.get(core_1$$2.LifeScopeToken);
        lifeScope.registerDecorator(decorators.DIModule, core_1$$2.CoreActions.bindProvider, core_1$$2.CoreActions.cache, core_1$$2.CoreActions.componentBeforeInit, core_1$$2.CoreActions.componentInit, core_1$$2.CoreActions.componentAfterInit);
        lifeScope.registerDecorator(decorators.Bootstrap, core_1$$2.CoreActions.bindProvider, core_1$$2.CoreActions.cache, core_1$$2.CoreActions.componentBeforeInit, core_1$$2.CoreActions.componentInit, core_1$$2.CoreActions.componentAfterInit);
        container.register(ModuleBuilder_1.ModuleBuilder);
        // container.register(BootBuilder);
        container.register(ApplicationBuilder.DefaultApplicationBuilder);
    };
    BootModule.classAnnations = { "name": "BootModule", "params": { "constructor": ["container"], "setup": [] } };
    BootModule = tslib_1$$2.__decorate([
        core_1$$2.IocExt('setup'),
        tslib_1$$2.__param(0, core_1$$2.Inject(core_1$$2.ContainerToken)),
        tslib_1$$2.__metadata("design:paramtypes", [Object])
    ], BootModule);
    return BootModule;
}());
exports.BootModule = BootModule;


});

unwrapExports$$1(BootModule_1);
var BootModule_2 = BootModule_1.BootModule;

var ModuleType = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ioc DI loaded modules.
 *
 * @export
 * @interface IocModule
 * @template T
 */
var LoadedModule = /** @class */ (function () {
    function LoadedModule() {
    }
    LoadedModule.classAnnations = { "name": "LoadedModule", "params": {} };
    return LoadedModule;
}());
exports.LoadedModule = LoadedModule;


});

unwrapExports$$1(ModuleType);
var ModuleType_1 = ModuleType.LoadedModule;

var ITypeBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * inject token Bootstrap builder.
 *
 * @export
 * @class InjectBootstrapBuilder
 * @extends {Registration<T>}
 * @template T
 */
var InjectTypeBuilder = /** @class */ (function (_super) {
    tslib_1$$2.__extends(InjectTypeBuilder, _super);
    function InjectTypeBuilder(desc) {
        return _super.call(this, 'DI_TypeBuilder', desc) || this;
    }
    InjectTypeBuilder.classAnnations = { "name": "InjectTypeBuilder", "params": { "constructor": ["desc"] } };
    return InjectTypeBuilder;
}(core_1$$2.Registration));
exports.InjectTypeBuilder = InjectTypeBuilder;
/**
 * token bootstrap builder token.
 */
exports.TypeBuilderToken = new InjectTypeBuilder('');


});

unwrapExports$$1(ITypeBuilder);
var ITypeBuilder_1 = ITypeBuilder.InjectTypeBuilder;
var ITypeBuilder_2 = ITypeBuilder.TypeBuilderToken;

var TypeBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * token bootstrap builder. build class with metadata and config.
 *
 * @export
 * @class BootBuilder
 * @implements {implements ITypeBuilder<T>}
 * @template T
 */
var TypeBuilder = /** @class */ (function () {
    function TypeBuilder() {
    }
    TypeBuilder_1 = TypeBuilder;
    TypeBuilder.prototype.build = function (token, config, data) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var builder, instance;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!config) {
                            config = this.getTokenMetaConfig(token);
                        }
                        builder = this.getBuilder(config);
                        if (!(builder !== this)) return [3 /*break*/, 1];
                        return [2 /*return*/, builder.build(token, config, data)];
                    case 1: return [4 /*yield*/, this.createInstance(token, config, data)];
                    case 2:
                        instance = _a.sent();
                        return [4 /*yield*/, this.buildStrategy(instance, config)];
                    case 3:
                        instance = _a.sent();
                        return [2 /*return*/, instance];
                }
            });
        });
    };
    TypeBuilder.prototype.buildByConfig = function (config, data) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1$$2.__generator(this, function (_a) {
                if (core_1$$2.isToken(config)) {
                    token = config;
                    return [2 /*return*/, this.build(token, this.getTokenMetaConfig(token), data)];
                }
                else {
                    token = this.getBootstrapToken(config);
                    return [2 /*return*/, this.build(token, this.getTokenMetaConfig(token, config), data)];
                }
                return [2 /*return*/];
            });
        });
    };
    TypeBuilder.prototype.createInstance = function (token, config, data) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var instance;
            return tslib_1$$2.__generator(this, function (_a) {
                if (!token) {
                    throw new Error('cant not find bootstrap token.');
                }
                if (!this.container.has(token)) {
                    if (core_1$$2.isClass(token)) {
                        this.container.register(token);
                    }
                    else {
                        console.log("cant not find token " + token.toString() + " in container.");
                        return [2 /*return*/, null];
                    }
                }
                instance = this.resolveToken(token, data);
                return [2 /*return*/, instance];
            });
        });
    };
    TypeBuilder.prototype.getBuilder = function (config) {
        if (config && config.typeBuilder) {
            if (core_1$$2.isClass(config.typeBuilder)) {
                if (!this.container.has(config.typeBuilder)) {
                    this.container.register(config.typeBuilder);
                }
            }
            if (core_1$$2.isToken(config.typeBuilder)) {
                return this.container.resolve(config.typeBuilder);
            }
            else if (config.typeBuilder instanceof TypeBuilder_1) {
                return config.typeBuilder;
            }
        }
        return this;
    };
    /**
     * bundle instance via config.
     *
     * @param {T} instance
     * @param {TypeConfigure} config
     * @param {IContainer} [container]
     * @returns {Promise<T>}
     * @memberof BootBuilder
     */
    TypeBuilder.prototype.buildStrategy = function (instance, config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$2.__generator(this, function (_a) {
                return [2 /*return*/, instance];
            });
        });
    };
    TypeBuilder.prototype.getBootstrapToken = function (config) {
        return config.bootstrap;
    };
    TypeBuilder.prototype.getTokenMetaConfig = function (token, config) {
        var cfg;
        if (core_1$$2.isClass(token)) {
            cfg = this.getMetaConfig(token);
        }
        else if (core_1$$2.isToken(token)) {
            var tokenType = this.container ? this.container.getTokenImpl(token) : token;
            if (core_1$$2.isClass(tokenType)) {
                cfg = this.getMetaConfig(tokenType);
            }
        }
        if (cfg) {
            return core_1$$2.lang.assign({}, cfg, config || {});
        }
        else {
            return config || {};
        }
    };
    TypeBuilder.prototype.getDecorator = function () {
        return decorators.Build.toString();
    };
    TypeBuilder.prototype.getMetaConfig = function (token) {
        var decorator = this.getDecorator();
        if (core_1$$2.hasOwnClassMetadata(decorator, token)) {
            var metas = core_1$$2.getTypeMetadata(decorator, token);
            if (metas && metas.length) {
                return metas[0];
            }
        }
        return null;
    };
    TypeBuilder.prototype.resolveToken = function (token, data) {
        return this.container.resolve(token, data);
    };
    var TypeBuilder_1;
    TypeBuilder.classAnnations = { "name": "TypeBuilder", "params": { "constructor": [], "build": ["token", "config", "data"], "buildByConfig": ["config", "data"], "createInstance": ["token", "config", "data"], "getBuilder": ["config"], "buildStrategy": ["instance", "config"], "getBootstrapToken": ["config"], "getTokenMetaConfig": ["token", "config"], "getDecorator": [], "getMetaConfig": ["token"], "resolveToken": ["token", "data"] } };
    tslib_1$$2.__decorate([
        core_1$$2.Inject(core_1$$2.ContainerToken),
        tslib_1$$2.__metadata("design:type", Object)
    ], TypeBuilder.prototype, "container", void 0);
    TypeBuilder = TypeBuilder_1 = tslib_1$$2.__decorate([
        core_1$$2.Singleton(ITypeBuilder.TypeBuilderToken),
        tslib_1$$2.__metadata("design:paramtypes", [])
    ], TypeBuilder);
    return TypeBuilder;
}());
exports.TypeBuilder = TypeBuilder;


});

unwrapExports$$1(TypeBuilder_1);
var TypeBuilder_2 = TypeBuilder_1.TypeBuilder;

var ContainerPool_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * container pool
 *
 * @export
 * @class ContainerPool
 */
var ContainerPool = /** @class */ (function () {
    function ContainerPool() {
        this.pools = new core_1$$2.MapSet();
    }
    ContainerPool.prototype.getTokenKey = function (token) {
        if (token instanceof core_1$$2.Registration) {
            return token.toString();
        }
        return token;
    };
    ContainerPool.prototype.isDefault = function (container) {
        return container === this.defaults;
    };
    ContainerPool.prototype.hasDefault = function () {
        return !!this.defaults;
    };
    ContainerPool.prototype.setDefault = function (container) {
        this.defaults = container;
    };
    ContainerPool.prototype.getDefault = function () {
        return this.defaults;
    };
    ContainerPool.prototype.set = function (token, container) {
        var key = this.getTokenKey(token);
        if (this.pools.has(token)) {
            console.log(token.toString() + " module has loaded");
        }
        this.pools.set(token, container);
    };
    ContainerPool.prototype.get = function (token) {
        var key = this.getTokenKey(token);
        if (!this.has(key)) {
            return null;
        }
        return this.pools.get(token);
    };
    ContainerPool.prototype.has = function (token) {
        return this.pools.has(this.getTokenKey(token));
    };
    ContainerPool.classAnnations = { "name": "ContainerPool", "params": { "constructor": [], "getTokenKey": ["token"], "isDefault": ["container"], "hasDefault": [], "setDefault": ["container"], "getDefault": [], "set": ["token", "container"], "get": ["token"], "has": ["token"] } };
    return ContainerPool;
}());
exports.ContainerPool = ContainerPool;
exports.ContainerPoolToken = new core_1$$2.InjectToken('ContainerPool');
/**
 *  global container pools.
 */
exports.containerPools = new ContainerPool();


});

unwrapExports$$1(ContainerPool_1);
var ContainerPool_2 = ContainerPool_1.ContainerPool;
var ContainerPool_3 = ContainerPool_1.ContainerPoolToken;
var ContainerPool_4 = ContainerPool_1.containerPools;

var ModuleBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });









var exportsProvidersFiled = '__exportProviders';
var InjectModuleLoadToken = /** @class */ (function (_super) {
    tslib_1$$2.__extends(InjectModuleLoadToken, _super);
    function InjectModuleLoadToken(token) {
        return _super.call(this, token, 'module_loader') || this;
    }
    InjectModuleLoadToken.classAnnations = { "name": "InjectModuleLoadToken", "params": { "constructor": ["token"] } };
    return InjectModuleLoadToken;
}(core_1$$2.Registration));
exports.InjectModuleLoadToken = InjectModuleLoadToken;
/**
 * module builder
 *
 * @export
 * @class ModuleBuilder
 * @implements {IModuleBuilder}
 * @template T
 */
var ModuleBuilder = /** @class */ (function () {
    function ModuleBuilder() {
    }
    ModuleBuilder_1 = ModuleBuilder;
    ModuleBuilder.prototype.getPools = function () {
        if (!this.pools) {
            this.pools = ContainerPool_1.containerPools;
        }
        if (!this.pools.hasDefault()) {
            this.regDefaultContainer();
        }
        return this.pools;
    };
    ModuleBuilder.prototype.setPools = function (pools) {
        this.pools = pools;
    };
    ModuleBuilder.prototype.regDefaultContainer = function () {
        var container = this.createContainer();
        container.register(BootModule_1.BootModule);
        this.pools.setDefault(container);
        return container;
    };
    /**
     * get container of the module.
     *
     * @param {(ModuleType | ModuleConfigure)} token module type or module configuration.
     * @param {IContainer} [defaultContainer] set default container or not. not set will create new container.
     * @param {IContainer} [parent] set the container parent, default will set root default container.
     * @returns {IContainer}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.getContainer = function (token, defaultContainer, parent) {
        var container;
        var pools = this.getPools();
        if (core_1$$2.isToken(token)) {
            if (pools.has(token)) {
                return pools.get(token);
            }
            else {
                var cfg = this.getConfigure(token, defaultContainer);
                container = cfg.container || defaultContainer;
                if (!container) {
                    container = this.isDIModule(token) ? this.createContainer() : pools.getDefault();
                }
                this.setParent(container, parent);
                pools.set(token, container);
                return container;
            }
        }
        else {
            if (token.name && pools.has(token.name)) {
                return pools.get(token.name);
            }
            if (token.container) {
                container = token.container;
            }
            else {
                container = token.container = defaultContainer || pools.getDefault();
            }
            if (token.name) {
                pools.set(token.name, container);
            }
            this.setParent(container, parent);
            return container;
        }
    };
    ModuleBuilder.prototype.setParent = function (container, parent) {
        var pools = this.getPools();
        if (pools.isDefault(container)) {
            return;
        }
        if (!container.parent) {
            if (parent && parent !== container) {
                container.parent = parent;
            }
            else {
                container.parent = pools.getDefault();
            }
        }
    };
    ModuleBuilder.prototype.createContainer = function () {
        return this.getContainerBuilder().create();
    };
    ModuleBuilder.prototype.getContainerBuilder = function () {
        if (!this.containerBuilder) {
            this.containerBuilder = this.createContainerBuilder();
        }
        return this.containerBuilder;
    };
    ModuleBuilder.prototype.createContainerBuilder = function () {
        return new core_1$$2.DefaultContainerBuilder();
    };
    ModuleBuilder.prototype.load = function (token, defaultContainer, parent) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var container, tk, mdToken, cfg, loadmdl;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        container = this.getContainer(token, defaultContainer, parent);
                        tk = core_1$$2.isToken(token) ? token : token.name;
                        mdToken = new InjectModuleLoadToken(tk);
                        if (core_1$$2.isToken(mdToken) && container.has(mdToken)) {
                            return [2 /*return*/, container.resolve(mdToken)];
                        }
                        cfg = this.getConfigure(token, container);
                        return [4 /*yield*/, this.registerDepdences(container, cfg)];
                    case 1:
                        cfg = _a.sent();
                        loadmdl = {
                            moduleToken: core_1$$2.isToken(token) ? token : null,
                            container: container,
                            moduleConfig: cfg
                        };
                        if (tk) {
                            container.bindProvider(mdToken, function () { return loadmdl; });
                        }
                        return [2 /*return*/, loadmdl];
                }
            });
        });
    };
    /**
     * build module.
     *
     * @param {(Token<T> | ModuleConfig<T>)} token
     * @param {(IContainer | LoadedModule)} [defaults]
     * @param {*} [data]
     * @returns {Promise<T>}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.build = function (token, defaults, data) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var loadmdl, container, cfg, builder, boot, bootBuilder, instance, bootbuilder, instance, mdlInst;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadByDefaults(token, defaults)];
                    case 1:
                        loadmdl = _a.sent();
                        container = loadmdl.container;
                        cfg = loadmdl.moduleConfig;
                        builder = this.getBuilder(container, cfg);
                        if (!(builder && builder !== this)) return [3 /*break*/, 3];
                        return [4 /*yield*/, builder.build(token, container, data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        boot = loadmdl.moduleToken;
                        if (!!boot) return [3 /*break*/, 5];
                        bootBuilder = this.getTypeBuilder(container, cfg.typeBuilder);
                        return [4 /*yield*/, bootBuilder.buildByConfig(cfg, data)];
                    case 4:
                        instance = _a.sent();
                        return [2 /*return*/, instance];
                    case 5:
                        bootbuilder = this.getTypeBuilder(container, cfg.typeBuilder);
                        return [4 /*yield*/, bootbuilder.build(boot, cfg, data)];
                    case 6:
                        instance = _a.sent();
                        mdlInst = instance;
                        if (core_1$$2.isFunction(mdlInst.mdOnInit)) {
                            mdlInst.mdOnInit(loadmdl);
                        }
                        return [2 /*return*/, instance];
                }
            });
        });
    };
    /**
    * bootstrap module's main.
    *
    * @param {(Token<T> | ModuleConfig<T>)} token
    * @param {(IContainer | LoadedModule)} [defaults]
    * @param {*} [data]
    * @returns {Promise<MdlInstance<T>>}
    * @memberof ModuleBuilder
    */
    ModuleBuilder.prototype.bootstrap = function (token, defaults, data) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var loadmdl, cfg, builder, md, bootInstance, builder_1;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadByDefaults(token, defaults)];
                    case 1:
                        loadmdl = _a.sent();
                        cfg = loadmdl.moduleConfig;
                        builder = this.getBuilder(loadmdl.container, cfg);
                        if (!(builder && builder !== this)) return [3 /*break*/, 3];
                        return [4 /*yield*/, builder.bootstrap(token, loadmdl, data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.build(token, loadmdl, data)];
                    case 4:
                        md = _a.sent();
                        bootInstance = void 0;
                        if (!loadmdl.moduleToken) return [3 /*break*/, 8];
                        if (md && core_1$$2.isFunction(md.btBeforeCreate)) {
                            md.btBeforeCreate(loadmdl);
                        }
                        builder_1 = this.getTypeBuilder(loadmdl.container, cfg.typeBuilder);
                        return [4 /*yield*/, builder_1.buildByConfig(cfg, data)];
                    case 5:
                        bootInstance = _a.sent();
                        if (core_1$$2.isFunction(md.btAfterCreate)) {
                            md.btAfterCreate(bootInstance);
                        }
                        if (!core_1$$2.isFunction(md.mdOnStart)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Promise.resolve(md.mdOnStart(bootInstance))];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (core_1$$2.isFunction(md.mdOnStarted)) {
                            md.mdOnStarted(bootInstance);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        bootInstance = md;
                        _a.label = 9;
                    case 9: return [2 /*return*/, bootInstance];
                }
            });
        });
    };
    ModuleBuilder.prototype.loadByDefaults = function (token, defaults) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var loadmdl;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(defaults instanceof ModuleType.LoadedModule)) return [3 /*break*/, 1];
                        loadmdl = defaults;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.load(token, defaults)];
                    case 2:
                        loadmdl = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, loadmdl];
                }
            });
        });
    };
    ModuleBuilder.prototype.getBuilder = function (container, cfg) {
        var builder;
        if (core_1$$2.isClass(cfg.builder)) {
            if (!container.has(cfg.builder)) {
                container.register(cfg.builder);
            }
        }
        if (core_1$$2.isToken(cfg.builder)) {
            builder = container.resolve(cfg.builder);
        }
        else if (cfg.builder instanceof ModuleBuilder_1) {
            builder = cfg.builder;
        }
        return builder;
    };
    ModuleBuilder.prototype.getTypeBuilder = function (container, typeBuilder) {
        var builder;
        if (core_1$$2.isClass(typeBuilder)) {
            if (!container.has(typeBuilder)) {
                container.register(typeBuilder);
            }
        }
        if (core_1$$2.isToken(typeBuilder)) {
            builder = container.resolve(typeBuilder);
        }
        else if (typeBuilder instanceof TypeBuilder_1.TypeBuilder) {
            builder = typeBuilder;
        }
        if (!builder) {
            builder = this.getDefaultTypeBuilder(container);
        }
        return builder;
    };
    ModuleBuilder.prototype.getDefaultTypeBuilder = function (container) {
        return container.resolve(ITypeBuilder.TypeBuilderToken);
    };
    ModuleBuilder.prototype.importModule = function (token, container) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var imp;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (container && core_1$$2.isClass(token) && !this.isDIModule(token)) {
                            container.register(token);
                            return [2 /*return*/, container];
                        }
                        return [4 /*yield*/, this.load(token, null, container)];
                    case 1:
                        imp = _a.sent();
                        if (!!container.has(imp.moduleToken)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.importConfigExports(container, imp.container, imp.moduleConfig)];
                    case 2:
                        _a.sent();
                        imp.container.parent = container;
                        if (imp.moduleToken) {
                            container.bindProvider(imp.moduleToken, imp);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, container];
                }
            });
        });
    };
    ModuleBuilder.prototype.getDecorator = function () {
        return decorators.DIModule.toString();
    };
    /**
     * get configuration.
     *
     * @returns {ModuleConfigure}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.getConfigure = function (token, container) {
        var cfg;
        if (core_1$$2.isClass(token)) {
            cfg = this.getMetaConfig(token);
        }
        else if (core_1$$2.isToken(token)) {
            var tokenType = container ? container.getTokenImpl(token) : token;
            if (core_1$$2.isClass(tokenType)) {
                cfg = this.getMetaConfig(tokenType);
            }
        }
        else {
            cfg = token;
            var bootToken = this.getBootstrapToken(cfg);
            if (bootToken) {
                var typeTask = core_1$$2.isClass(bootToken) ? bootToken : (container ? container.getTokenImpl(bootToken) : bootToken);
                if (core_1$$2.isClass(typeTask)) {
                    cfg = core_1$$2.lang.assign({}, this.getMetaConfig(typeTask), cfg || {});
                }
            }
        }
        return cfg || {};
    };
    ModuleBuilder.prototype.registerDepdences = function (container, config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerExts(container, config)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.registerConfgureDepds(container, config)];
                    case 2:
                        config = _a.sent();
                        return [2 /*return*/, config];
                }
            });
        });
    };
    ModuleBuilder.prototype.getBootstrapToken = function (cfg) {
        return cfg.bootstrap;
    };
    ModuleBuilder.prototype.importConfigExports = function (container, providerContainer, cfg) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var expProviders;
            var _this = this;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(cfg.exports && cfg.exports.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(cfg.exports.map(function (tk) { return tslib_1$$2.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1$$2.__generator(this, function (_a) {
                                    container.bindProvider(tk, function () {
                                        var providers = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            providers[_i] = arguments[_i];
                                        }
                                        return providerContainer.resolve.apply(providerContainer, [tk].concat(providers));
                                    });
                                    return [2 /*return*/, tk];
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        expProviders = cfg[exportsProvidersFiled];
                        if (expProviders && expProviders.length) {
                            expProviders.forEach(function (tk) {
                                container.bindProvider(tk, function () { return providerContainer.get(tk); });
                            });
                        }
                        return [2 /*return*/, container];
                }
            });
        });
    };
    ModuleBuilder.prototype.registerConfgureDepds = function (container, config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var buider, mdls;
            var _this = this;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(core_1$$2.isArray(config.imports) && config.imports.length)) return [3 /*break*/, 3];
                        buider = container.get(core_1$$2.ContainerBuilderToken);
                        return [4 /*yield*/, buider.loader.loadTypes(config.imports, function (it) { return _this.isIocExt(it) || _this.isDIModule(it); })];
                    case 1:
                        mdls = _a.sent();
                        return [4 /*yield*/, Promise.all(mdls.map(function (md) { return _this.importModule(md, container); }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (core_1$$2.isArray(config.providers) && config.providers.length) {
                            config[exportsProvidersFiled] = this.bindProvider(container, config.providers);
                        }
                        return [2 /*return*/, config];
                }
            });
        });
    };
    ModuleBuilder.prototype.getMetaConfig = function (bootModule) {
        var decorator = this.getDecorator();
        if (this.isDIModule(bootModule)) {
            var metas = core_1$$2.getTypeMetadata(decorator, bootModule);
            if (metas && metas.length) {
                var meta = metas[0];
                // meta.bootstrap = meta.bootstrap || bootModule;
                return core_1$$2.lang.omit(meta, 'builder');
            }
        }
        return null;
    };
    ModuleBuilder.prototype.isIocExt = function (token) {
        return core_1$$2.hasOwnClassMetadata(core_1$$2.IocExt, token);
    };
    ModuleBuilder.prototype.isDIModule = function (token) {
        if (!core_1$$2.isClass(token)) {
            return false;
        }
        if (core_1$$2.hasOwnClassMetadata(this.getDecorator(), token)) {
            return true;
        }
        return core_1$$2.hasOwnClassMetadata(decorators.DIModule, token);
    };
    ModuleBuilder.prototype.registerExts = function (container, config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$2.__generator(this, function (_a) {
                // register for each container.
                if (!container.hasRegister(TypeBuilder_1.TypeBuilder)) {
                    container.register(TypeBuilder_1.TypeBuilder);
                }
                return [2 /*return*/, container];
            });
        });
    };
    ModuleBuilder.prototype.bindProvider = function (container, providers) {
        var tokens = [];
        providers.forEach(function (p, index) {
            if (core_1$$2.isUndefined(p) || core_1$$2.isNull(p)) {
                return;
            }
            if (core_1$$2.isProviderMap(p)) {
                p.forEach(function (k, f) {
                    tokens.push(k);
                    container.bindProvider(k, f);
                });
            }
            else if (p instanceof core_1$$2.Provider) {
                tokens.push(p.type);
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
                    tokens.push(p);
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
                        tokens.push(pr_1.provide);
                        container.bindProvider(pr_1.provide, function () { return pr_1.useValue; });
                    }
                    else if (core_1$$2.isClass(pr_1.useClass)) {
                        if (!container.has(pr_1.useClass)) {
                            container.register(pr_1.useClass);
                        }
                        tokens.push(pr_1.provide);
                        container.bindProvider(pr_1.provide, pr_1.useClass);
                    }
                    else if (core_1$$2.isFunction(pr_1.useFactory)) {
                        tokens.push(pr_1.provide);
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
                            tokens.push(pr_1.provide);
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
                            tokens.push(name);
                        }
                    });
                }
            }
            else if (core_1$$2.isFunction(p)) {
                tokens.push(name);
                container.bindProvider(name, function () { return p; });
            }
        });
        return tokens;
    };
    var ModuleBuilder_1;
    ModuleBuilder.classAnnations = { "name": "ModuleBuilder", "params": { "constructor": [], "getPools": [], "setPools": ["pools"], "regDefaultContainer": [], "getContainer": ["token", "defaultContainer", "parent"], "setParent": ["container", "parent"], "createContainer": [], "getContainerBuilder": [], "createContainerBuilder": [], "load": ["token", "defaultContainer", "parent"], "build": ["token", "defaults", "data"], "bootstrap": ["token", "defaults", "data"], "loadByDefaults": ["token", "defaults"], "getBuilder": ["container", "cfg"], "getTypeBuilder": ["container", "typeBuilder"], "getDefaultTypeBuilder": ["container"], "importModule": ["token", "container"], "getDecorator": [], "getConfigure": ["token", "container"], "registerDepdences": ["container", "config"], "getBootstrapToken": ["cfg"], "importConfigExports": ["container", "providerContainer", "cfg"], "registerConfgureDepds": ["container", "config"], "getMetaConfig": ["bootModule"], "isIocExt": ["token"], "isDIModule": ["token"], "registerExts": ["container", "config"], "bindProvider": ["container", "providers"] } };
    tslib_1$$2.__decorate([
        core_1$$2.Inject(core_1$$2.ContainerBuilderToken),
        tslib_1$$2.__metadata("design:type", Object)
    ], ModuleBuilder.prototype, "containerBuilder", void 0);
    ModuleBuilder = ModuleBuilder_1 = tslib_1$$2.__decorate([
        core_1$$2.Singleton(IModuleBuilder.ModuleBuilderToken),
        tslib_1$$2.__metadata("design:paramtypes", [])
    ], ModuleBuilder);
    return ModuleBuilder;
}());
exports.ModuleBuilder = ModuleBuilder;


});

unwrapExports$$1(ModuleBuilder_1);
var ModuleBuilder_2 = ModuleBuilder_1.InjectModuleLoadToken;
var ModuleBuilder_3 = ModuleBuilder_1.ModuleBuilder;

var ApplicationBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });






/**
 * application builder.
 *
 * @export
 * @class Default ApplicationBuilder
 * @extends {ModuleBuilder}
 * @template T
 */
var DefaultApplicationBuilder = /** @class */ (function (_super) {
    tslib_1$$2.__extends(DefaultApplicationBuilder, _super);
    function DefaultApplicationBuilder(baseURL) {
        var _this = _super.call(this) || this;
        _this.baseURL = baseURL;
        _this.globalModules = [];
        _this.customRegs = [];
        _this.pools = new ContainerPool_1.ContainerPool();
        return _this;
    }
    DefaultApplicationBuilder.create = function (baseURL) {
        return new DefaultApplicationBuilder(baseURL);
    };
    /**
     * use configuration.
     *
     * @param {(string | AppConfigure)} [config]
     * @returns {this} global config for this application.
     * @memberof Bootstrap
     */
    DefaultApplicationBuilder.prototype.useConfiguration = function (config, container) {
        if (!this.globalConfig) {
            this.globalConfig = Promise.resolve(this.getDefaultConfig());
        }
        var pcfg;
        if (core_1$$2.isString(config)) {
            if (container) {
                var builder = container.resolve(core_1$$2.ContainerBuilderToken);
                pcfg = builder.loader.load([config])
                    .then(function (rs) {
                    return rs.length ? rs[0] : null;
                });
            }
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
     * use module as global Depdences module.
     *
     * @param {...LoadType[]} modules
     * @returns {this}
     * @memberof PlatformServer
     */
    DefaultApplicationBuilder.prototype.use = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        this.globalModules = this.globalModules.concat(modules);
        return this;
    };
    DefaultApplicationBuilder.prototype.registerConfgureDepds = function (container, config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var globalCfg;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.globalConfig) {
                            this.useConfiguration();
                        }
                        return [4 /*yield*/, this.globalConfig];
                    case 1:
                        globalCfg = _a.sent();
                        config = this.mergeGlobalConfig(globalCfg, config);
                        this.bindAppConfig(config);
                        return [4 /*yield*/, _super.prototype.registerConfgureDepds.call(this, container, config)];
                    case 2:
                        config = _a.sent();
                        container.bindProvider(AppConfigure.AppConfigureToken, config);
                        return [2 /*return*/, config];
                }
            });
        });
    };
    DefaultApplicationBuilder.prototype.mergeGlobalConfig = function (globalCfg, moduleCfg) {
        return core_1$$2.lang.assign({}, globalCfg, moduleCfg);
    };
    DefaultApplicationBuilder.prototype.regDefaultContainer = function () {
        var _this = this;
        var container = _super.prototype.regDefaultContainer.call(this);
        container.bindProvider(ContainerPool_1.ContainerPoolToken, function () { return _this.getPools(); });
        container.resolve(IModuleBuilder.ModuleBuilderToken).setPools(this.getPools());
        return container;
    };
    /**
     * register ioc exts
     *
     * @protected
     * @param {IContainer} container
     * @param {AppConfigure} config
     * @returns {Promise<IContainer>}
     * @memberof ApplicationBuilder
     */
    DefaultApplicationBuilder.prototype.registerExts = function (container, config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var usedModules;
            var _this = this;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.registerExts.call(this, container, config)];
                    case 1:
                        _a.sent();
                        if (!this.globalModules.length) return [3 /*break*/, 3];
                        usedModules = this.globalModules;
                        return [4 /*yield*/, container.loadModule.apply(container, usedModules)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!this.customRegs.length) return [3 /*break*/, 5];
                        return [4 /*yield*/, Promise.all(this.customRegs.map(function (cs) { return tslib_1$$2.__awaiter(_this, void 0, void 0, function () {
                                var tokens;
                                return tslib_1$$2.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, cs(container, config, this)];
                                        case 1:
                                            tokens = _a.sent();
                                            return [2 /*return*/, tokens];
                                    }
                                });
                            }); }))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, container];
                }
            });
        });
    };
    DefaultApplicationBuilder.prototype.bindAppConfig = function (config) {
        if (this.baseURL) {
            config.baseURL = this.baseURL;
        }
        return config;
    };
    DefaultApplicationBuilder.prototype.getDefaultConfig = function () {
        return { debug: false };
    };
    DefaultApplicationBuilder.classAnnations = { "name": "DefaultApplicationBuilder", "params": { "constructor": ["baseURL"], "create": ["baseURL"], "useConfiguration": ["config", "container"], "use": ["modules"], "registerConfgureDepds": ["container", "config"], "mergeGlobalConfig": ["globalCfg", "moduleCfg"], "regDefaultContainer": [], "registerExts": ["container", "config"], "bindAppConfig": ["config"], "getDefaultConfig": [] } };
    return DefaultApplicationBuilder;
}(ModuleBuilder_1.ModuleBuilder));
exports.DefaultApplicationBuilder = DefaultApplicationBuilder;


});

unwrapExports$$1(ApplicationBuilder);
var ApplicationBuilder_1 = ApplicationBuilder.DefaultApplicationBuilder;

var IApplicationBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.ApplicationBuilderToken = new core_1$$2.InjectToken('DI_AppBuilder');


});

unwrapExports$$1(IApplicationBuilder);
var IApplicationBuilder_1 = IApplicationBuilder.ApplicationBuilderToken;

var D__workspace_github_tsioc_packages_bootstrap_lib = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$2.__exportStar(decorators, exports);
tslib_1$$2.__exportStar(AppConfigure, exports);
tslib_1$$2.__exportStar(ApplicationBuilder, exports);
tslib_1$$2.__exportStar(IApplicationBuilder, exports);
tslib_1$$2.__exportStar(IModuleBuilder, exports);
tslib_1$$2.__exportStar(ModuleBuilder_1, exports);
tslib_1$$2.__exportStar(ContainerPool_1, exports);
tslib_1$$2.__exportStar(BootModule_1, exports);
tslib_1$$2.__exportStar(ITypeBuilder, exports);
tslib_1$$2.__exportStar(TypeBuilder_1, exports);
tslib_1$$2.__exportStar(ModuleType, exports);


});

var index$1 = unwrapExports$$1(D__workspace_github_tsioc_packages_bootstrap_lib);

return index$1;

})));
});

unwrapExports(bootstrap_umd);

var platformBrowser_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory(tslib_1, core_1);
}(commonjsGlobal, (function (tslib_1$$2,core_1$$2) { tslib_1$$2 = tslib_1$$2 && tslib_1$$2.hasOwnProperty('default') ? tslib_1$$2['default'] : tslib_1$$2;
core_1$$2 = core_1$$2 && core_1$$2.hasOwnProperty('default') ? core_1$$2['default'] : core_1$$2;

function commonjsRequire$$1 () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports$$1 (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var BrowserModuleLoader_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


var BrowserModuleLoader = /** @class */ (function (_super) {
    tslib_1$$2.__extends(BrowserModuleLoader, _super);
    function BrowserModuleLoader() {
        return _super.call(this) || this;
    }
    BrowserModuleLoader.prototype.createLoader = function () {
        if (typeof System !== 'undefined') {
            return function (modulepath) {
                return System.import(modulepath);
            };
        }
        else if (typeof commonjsRequire$$1 !== 'undefined') {
            return function (modulepath) {
                return new Promise(function (resolve, reject) {
                    commonjsRequire$$1([modulepath], function (mud) {
                        resolve(mud);
                    }, function (err) {
                        reject(err);
                    });
                });
            };
        }
        else {
            throw new Error('has not module loader');
        }
    };
    BrowserModuleLoader.classAnnations = { "name": "BrowserModuleLoader", "params": { "constructor": [], "createLoader": [] } };
    return BrowserModuleLoader;
}(core_1$$2.DefaultModuleLoader));
exports.BrowserModuleLoader = BrowserModuleLoader;


});

unwrapExports$$1(BrowserModuleLoader_1);
var BrowserModuleLoader_2 = BrowserModuleLoader_1.BrowserModuleLoader;

var ContainerBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * container builder for browser.
 *
 * @export
 * @class ContainerBuilder
 * @extends {DefaultContainerBuilder}
 */
var ContainerBuilder = /** @class */ (function (_super) {
    tslib_1$$2.__extends(ContainerBuilder, _super);
    function ContainerBuilder(loader, filter) {
        return _super.call(this, loader || new BrowserModuleLoader_1.BrowserModuleLoader(), filter) || this;
    }
    ContainerBuilder.classAnnations = { "name": "ContainerBuilder", "params": { "constructor": ["loader", "filter"] } };
    return ContainerBuilder;
}(core_1$$2.DefaultContainerBuilder));
exports.ContainerBuilder = ContainerBuilder;


});

unwrapExports$$1(ContainerBuilder_1);
var ContainerBuilder_2 = ContainerBuilder_1.ContainerBuilder;

var D__workspace_github_tsioc_packages_platformBrowser_lib = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$2.__exportStar(BrowserModuleLoader_1, exports);
tslib_1$$2.__exportStar(ContainerBuilder_1, exports);


});

var index = unwrapExports$$1(D__workspace_github_tsioc_packages_platformBrowser_lib);

return index;

})));
});

unwrapExports(platformBrowser_umd);

var platformBrowserBootstrap_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory(tslib_1, core_1, bootstrap_umd, platformBrowser_umd);
}(commonjsGlobal, (function (tslib_1$$2,core_1$$2,bootstrap,platformBrowser) { tslib_1$$2 = tslib_1$$2 && tslib_1$$2.hasOwnProperty('default') ? tslib_1$$2['default'] : tslib_1$$2;
core_1$$2 = core_1$$2 && core_1$$2.hasOwnProperty('default') ? core_1$$2['default'] : core_1$$2;
bootstrap = bootstrap && bootstrap.hasOwnProperty('default') ? bootstrap['default'] : bootstrap;
platformBrowser = platformBrowser && platformBrowser.hasOwnProperty('default') ? platformBrowser['default'] : platformBrowser;

function unwrapExports$$1 (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var ApplicationBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * default app configuration.
 */
var defaultAppConfig = {
    baseURL: '',
    debug: false,
    connections: {},
    setting: {}
};
/**
 * application builder for browser side.
 *
 * @export
 * @class ApplicationBuilder
 * @extends {DefaultApplicationBuilder}
 * @implements {IBroserApplicationBuilder<T>}
 */
var ApplicationBuilder = /** @class */ (function (_super) {
    tslib_1$$2.__extends(ApplicationBuilder, _super);
    function ApplicationBuilder(baseURL) {
        return _super.call(this, baseURL || !core_1$$2.isUndefined(System) ? System.baseURL : location.href) || this;
    }
    /**
     * create instance.
     *
     * @static
     * @param {string} [baseURL] application start up base path.
     * @returns {AnyApplicationBuilderBroser} ApplicationBuilder instance.
     * @memberof ApplicationBuilder
     */
    ApplicationBuilder.create = function (baseURL) {
        return new ApplicationBuilder(baseURL);
    };
    ApplicationBuilder.prototype.createContainerBuilder = function () {
        return new platformBrowser.ContainerBuilder();
    };
    ApplicationBuilder.prototype.createBuilder = function () {
        return this;
    };
    ApplicationBuilder.prototype.getDefaultConfig = function () {
        return core_1$$2.lang.assign({}, defaultAppConfig);
    };
    ApplicationBuilder.classAnnations = { "name": "ApplicationBuilder", "params": { "constructor": ["baseURL"], "create": ["baseURL"], "createContainerBuilder": [], "createBuilder": [], "getDefaultConfig": [] } };
    return ApplicationBuilder;
}(bootstrap.DefaultApplicationBuilder));
exports.ApplicationBuilder = ApplicationBuilder;


});

unwrapExports$$1(ApplicationBuilder_1);
var ApplicationBuilder_2 = ApplicationBuilder_1.ApplicationBuilder;

var D__workspace_github_tsioc_packages_platformBrowser_bootstrap_lib = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$2.__exportStar(ApplicationBuilder_1, exports);


});

var index = unwrapExports$$1(D__workspace_github_tsioc_packages_platformBrowser_bootstrap_lib);

return index;

})));
});

unwrapExports(platformBrowserBootstrap_umd);

var TaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var TaskContainer=function(t){function o(e){var r=t.call(this,e)||this;return r.use(aop.TaskLogAspect).use(aop.RunnerLogAspect), r}return tslib_1.__extends(o,t), o.prototype.createAppBuilder=function(){return new platformBrowserBootstrap_umd.ApplicationBuilder(this.baseURL)}, o.create=function(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];var n=new o(e);return r&&n.use.apply(n,r), n}, o.classAnnations={name:"TaskContainer",params:{constructor:["baseURL"],createAppBuilder:[],create:["root","modules"]}}, o}(core_2.DefaultTaskContainer);exports.TaskContainer=TaskContainer;



});

unwrapExports(TaskContainer_1);
var TaskContainer_2 = TaskContainer_1.TaskContainer;

var D__workspace_github_typeTask_packages_platformBrowser_lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(aop,exports), tslib_1.__exportStar(TaskContainer_1,exports);



});

var index$1 = unwrapExports(D__workspace_github_typeTask_packages_platformBrowser_lib);

return index$1;

})));
