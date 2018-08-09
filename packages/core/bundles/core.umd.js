(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tslib'), require('@ts-ioc/core'), require('@ts-ioc/aop'), require('rxjs/BehaviorSubject'), require('@ts-ioc/logs'), require('rxjs/add/operator/filter')) :
	typeof define === 'function' && define.amd ? define(['tslib', '@ts-ioc/core', '@ts-ioc/aop', 'rxjs/BehaviorSubject', '@ts-ioc/logs', 'rxjs/add/operator/filter'], factory) :
	(global.core = global.core || {}, global.core.umd = global.core.umd || {}, global.core.umd.js = factory(global.tslib_1,global.core_1,global.aop_1,global.BehaviorSubject_1,global.logs_1,global.filter));
}(this, (function (tslib_1,core_1,aop_1,BehaviorSubject_1,logs_1,filter) { 'use strict';

tslib_1 = tslib_1 && tslib_1.hasOwnProperty('default') ? tslib_1['default'] : tslib_1;
core_1 = core_1 && core_1.hasOwnProperty('default') ? core_1['default'] : core_1;
aop_1 = aop_1 && aop_1.hasOwnProperty('default') ? aop_1['default'] : aop_1;
BehaviorSubject_1 = BehaviorSubject_1 && BehaviorSubject_1.hasOwnProperty('default') ? BehaviorSubject_1['default'] : BehaviorSubject_1;
logs_1 = logs_1 && logs_1.hasOwnProperty('default') ? logs_1['default'] : logs_1;
filter = filter && filter.hasOwnProperty('default') ? filter['default'] : filter;

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

var bootstrap_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory(tslib_1, core_1);
}(commonjsGlobal, (function (tslib_1$$1,core_1$$2) { tslib_1$$1 = tslib_1$$1 && tslib_1$$1.hasOwnProperty('default') ? tslib_1$$1['default'] : tslib_1$$1;
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

tslib_1$$1.__exportStar(Build, exports);
tslib_1$$1.__exportStar(DIModule, exports);
tslib_1$$1.__exportStar(Bootstrap, exports);


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
    tslib_1$$1.__extends(InjectModuleBuilder, _super);
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
    BootModule = tslib_1$$1.__decorate([
        core_1$$2.IocExt('setup'),
        tslib_1$$1.__param(0, core_1$$2.Inject(core_1$$2.ContainerToken)),
        tslib_1$$1.__metadata("design:paramtypes", [Object])
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
    tslib_1$$1.__extends(InjectTypeBuilder, _super);
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var builder, instance;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var instance;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
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
    tslib_1$$1.__decorate([
        core_1$$2.Inject(core_1$$2.ContainerToken),
        tslib_1$$1.__metadata("design:type", Object)
    ], TypeBuilder.prototype, "container", void 0);
    TypeBuilder = TypeBuilder_1 = tslib_1$$1.__decorate([
        core_1$$2.Singleton(ITypeBuilder.TypeBuilderToken),
        tslib_1$$1.__metadata("design:paramtypes", [])
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
    tslib_1$$1.__extends(InjectModuleLoadToken, _super);
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var container, tk, mdToken, cfg, loadmdl;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var loadmdl, container, cfg, builder, boot, bootBuilder, instance, bootbuilder, instance, mdlInst;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var loadmdl, cfg, builder, md, bootInstance, builder_1;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var loadmdl;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var imp;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var expProviders;
            var _this = this;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(cfg.exports && cfg.exports.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(cfg.exports.map(function (tk) { return tslib_1$$1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var buider, mdls;
            var _this = this;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
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
    tslib_1$$1.__decorate([
        core_1$$2.Inject(core_1$$2.ContainerBuilderToken),
        tslib_1$$1.__metadata("design:type", Object)
    ], ModuleBuilder.prototype, "containerBuilder", void 0);
    ModuleBuilder = ModuleBuilder_1 = tslib_1$$1.__decorate([
        core_1$$2.Singleton(IModuleBuilder.ModuleBuilderToken),
        tslib_1$$1.__metadata("design:paramtypes", [])
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
    tslib_1$$1.__extends(DefaultApplicationBuilder, _super);
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var globalCfg;
            return tslib_1$$1.__generator(this, function (_a) {
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
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var usedModules;
            var _this = this;
            return tslib_1$$1.__generator(this, function (_a) {
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
                        return [4 /*yield*/, Promise.all(this.customRegs.map(function (cs) { return tslib_1$$1.__awaiter(_this, void 0, void 0, function () {
                                var tokens;
                                return tslib_1$$1.__generator(this, function (_a) {
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

tslib_1$$1.__exportStar(decorators, exports);
tslib_1$$1.__exportStar(AppConfigure, exports);
tslib_1$$1.__exportStar(ApplicationBuilder, exports);
tslib_1$$1.__exportStar(IApplicationBuilder, exports);
tslib_1$$1.__exportStar(IModuleBuilder, exports);
tslib_1$$1.__exportStar(ModuleBuilder_1, exports);
tslib_1$$1.__exportStar(ContainerPool_1, exports);
tslib_1$$1.__exportStar(BootModule_1, exports);
tslib_1$$1.__exportStar(ITypeBuilder, exports);
tslib_1$$1.__exportStar(TypeBuilder_1, exports);
tslib_1$$1.__exportStar(ModuleType, exports);


});

var index$1 = unwrapExports$$1(D__workspace_github_tsioc_packages_bootstrap_lib);

return index$1;

})));
});

unwrapExports(bootstrap_umd);

var IActivityBuilder = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var InjectAcitityBuilderToken=function(t){function e(e){return t.call(this,"ActivityBuilder",e)||this}return tslib_1.__extends(e,t), e.classAnnations={name:"InjectAcitityBuilderToken",params:{constructor:["desc"]}}, e}(core_1.Registration);exports.InjectAcitityBuilderToken=InjectAcitityBuilderToken, exports.ActivityBuilderToken=new InjectAcitityBuilderToken("activity");



});

unwrapExports(IActivityBuilder);
var IActivityBuilder_1 = IActivityBuilder.InjectAcitityBuilderToken;
var IActivityBuilder_2 = IActivityBuilder.ActivityBuilderToken;

var IWorkflow = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunState,InjectWorkflowToken=function(t){function e(e){return t.call(this,"ActivityRunner",e)||this}return tslib_1.__extends(e,t), e.classAnnations={name:"InjectWorkflowToken",params:{constructor:["desc"]}}, e}(core_1.Registration);exports.InjectWorkflowToken=InjectWorkflowToken, exports.WorkflowToken=new InjectWorkflowToken(""), function(e){e[e.init=0]="init", e[e.running=1]="running", e[e.pause=2]="pause", e[e.stop=3]="stop", e[e.complete=4]="complete";}(RunState=exports.RunState||(exports.RunState={}));



});

unwrapExports(IWorkflow);
var IWorkflow_1 = IWorkflow.InjectWorkflowToken;
var IWorkflow_2 = IWorkflow.WorkflowToken;
var IWorkflow_3 = IWorkflow.RunState;

var IActivity = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var InjectAcitityToken=function(e){function t(t){return e.call(this,"Activity",t)||this}return tslib_1.__extends(t,e), t.classAnnations={name:"InjectAcitityToken",params:{constructor:["desc"]}}, t}(core_1.Registration);exports.InjectAcitityToken=InjectAcitityToken, exports.ActivityToken=new InjectAcitityToken("");



});

unwrapExports(IActivity);
var IActivity_1 = IActivity.InjectAcitityToken;
var IActivity_2 = IActivity.ActivityToken;

var Task = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function createTaskDecorator(t,r,i,a,n){return core_1.createClassDecorator("Task",function(e){a&&a(e), e.next({match:function(e){return e&&(core_1.isString(e)||core_1.isObject(e)&&e instanceof core_1.Registration)},setMetadata:function(e,t){core_1.isString(t)?e.name=t:e.provide=t;}}), e.next({match:function(e){return core_1.isString(e)||core_1.isToken(e)},setMetadata:function(e,t){core_1.isString(t)?e.name=t:e.typeBuilder=t;}}), e.next({match:function(e){return core_1.isString(e)},setMetadata:function(e,t){e.name=t;}});},function(e){(n&&(e=n(e)), !e.name&&core_1.isClass(e.type))&&(/^[a-z]$/.test(e.type.name)&&e.type.classAnnations?e.name=e.type.classAnnations.name:e.name=e.type.name);return e.provide=e.provide||i, e.alias=e.alias||e.name, e.decorType=t, r&&!e.typeBuilder&&(e.typeBuilder=r), e})}exports.createTaskDecorator=createTaskDecorator, exports.Task=createTaskDecorator("Task",IActivityBuilder.ActivityBuilderToken,IActivity.ActivityToken);



});

unwrapExports(Task);
var Task_1 = Task.createTaskDecorator;
var Task_2 = Task.Task;

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
Object.defineProperty(exports,"__esModule",{value:!0});var CoreModule=function(){function e(e){this.container=e;}return e.prototype.setup=function(){var e=this.container,o=e.getLifeScope();o.registerDecorator(core.Workflow,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), o.registerDecorator(core.Task,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), e.register(core.ActivityBuilder), e.register(core.DefaultWorkflow), e.register(core.Context), e.register(aop.RunAspect), e.register(core.Activity), e.register(WorkflowBuilder_1.WorkflowBuilder), e.use(activities);}, e.classAnnations={name:"CoreModule",params:{constructor:["container"],setup:[]}}, e=tslib_1.__decorate([core_1.IocExt("setup"),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],e)}();exports.CoreModule=CoreModule;



});

unwrapExports(CoreModule_1);
var CoreModule_2 = CoreModule_1.CoreModule;

var WorkflowBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.WorkflowBuilderToken=new bootstrap_umd.InjectModuleBuilder("Workflow");var WorkflowBuilder=function(a){function e(){return null!==a&&a.apply(this,arguments)||this}return tslib_1.__extends(e,a), e.prototype.bootstrap=function(i,n,s){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,o,r;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return t=this.getContainer(i,n), s=s||this.createUUID(t), [4,a.prototype.bootstrap.call(this,i,n,s)];case 1:return o=e.sent(), [4,(r=t.resolve(core.WorkflowToken,{activities:i,instance:o,uuid:s})).start()];case 2:return e.sent(), [2,r]}})})}, e.prototype.createUUID=function(e){return e.has(core.UUIDToken)||e.register(core.RandomUUIDFactory), e.get(core.UUIDToken).generate()}, e.prototype.registerExts=function(t,o){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,a.prototype.registerExts.call(this,t,o)];case 1:return e.sent(), t.has(aop_1.AopModule)||t.register(aop_1.AopModule), t.has(logs_1.LogModule)||t.register(logs_1.LogModule), t.has(CoreModule_1.CoreModule)||t.register(CoreModule_1.CoreModule), [2,t]}})})}, e.prototype.getBootstrapToken=function(e){return e.activity||e.task||e.bootstrap}, e.prototype.getDefaultTypeBuilder=function(e){return e.resolve(core.ActivityBuilderToken)}, e.prototype.getDecorator=function(){return core.Task.toString()}, e.classAnnations={name:"WorkflowBuilder",params:{bootstrap:["activity","defaultContainer","workflowId"],createUUID:["container"],registerExts:["container","config"],getBootstrapToken:["config"],getDefaultTypeBuilder:["container"],getDecorator:[]}}, e=tslib_1.__decorate([core_1.Singleton(exports.WorkflowBuilderToken)],e)}(bootstrap_umd.ModuleBuilder);exports.WorkflowBuilder=WorkflowBuilder;



});

unwrapExports(WorkflowBuilder_1);
var WorkflowBuilder_2 = WorkflowBuilder_1.WorkflowBuilderToken;
var WorkflowBuilder_3 = WorkflowBuilder_1.WorkflowBuilder;

var Workflow = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function createWorkflowDecorator(e,r,t,o,i){return bootstrap_umd.createDIModuleDecorator(e,r,t,function(e){o&&o(e), e.next({match:function(e){return e&&(core_1.isString(e)||core_1.isObject(e)&&e instanceof core_1.Registration)},setMetadata:function(e,r){core_1.isString(r)?e.name=r:e.provide=r;}}), e.next({match:function(e){return core_1.isString(e)||core_1.isToken(e)},setMetadata:function(e,r){core_1.isString(r)?e.name=r:e.typeBuilder=r;}}), e.next({match:function(e){return core_1.isString(e)},setMetadata:function(e,r){e.name=r;}});},i)}exports.createWorkflowDecorator=createWorkflowDecorator, exports.Workflow=createWorkflowDecorator("Workflow",WorkflowBuilder_1.WorkflowBuilderToken,IActivityBuilder.ActivityBuilderToken);



});

unwrapExports(Workflow);
var Workflow_1 = Workflow.createWorkflowDecorator;
var Workflow_2 = Workflow.Workflow;

var decorators = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(Task,exports), tslib_1.__exportStar(Workflow,exports);



});

unwrapExports(decorators);

var uuid = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.UUIDToken=new core_1.InjectToken("uuid_factory");var RandomUUIDFactory=function(){function t(){}return t.prototype.generate=function(){return this.randomS4()+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+this.randomS4()+this.randomS4()}, t.prototype.randomS4=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)}, t.classAnnations={name:"RandomUUIDFactory",params:{constructor:[],generate:[],randomS4:[]}}, t=tslib_1.__decorate([core_1.Singleton(exports.UUIDToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.RandomUUIDFactory=RandomUUIDFactory;



});

unwrapExports(uuid);
var uuid_1 = uuid.UUIDToken;
var uuid_2 = uuid.RandomUUIDFactory;

var DefaultWorkflow_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var DefaultWorkflow=function(){function t(t,e,i,r){this.activities=t, this.uuid=e, this.instance=i, this.activityBuilder=r, this._result=new BehaviorSubject_1.BehaviorSubject(null), this.stateChanged=new BehaviorSubject_1.BehaviorSubject(IWorkflow.RunState.init);}return Object.defineProperty(t.prototype,"activity",{get:function(){return this.activities},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"activityInstance",{get:function(){return this.instance},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"result",{get:function(){return this._result.filter(function(t){return!t})},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"resultValue",{get:function(){return this._resultValue},enumerable:!0,configurable:!0}), t.prototype.onInit=function(){this.container.bindProvider(this.getUUID(),this);}, t.prototype.getUUID=function(){return this.uuid||(this.instance&&this.instance.id?this.uuid=this.instance.id:core_1.isToken(this.activity)&&(this.uuid=this.createUUID()), this.uuid=this.uuid||this.createUUID()), this.uuid}, t.prototype.getBuilder=function(){return this.activityBuilder||(this.activityBuilder=this.container.resolve(IActivityBuilder.ActivityBuilderToken)), this.activityBuilder}, t.prototype.getInstance=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return this.instance?[3,2]:[4,(e=this).getBuilder().buildByConfig(this.activity,this.getUUID())];case 1:e.instance=t.sent(), t.label=2;case 2:return[2,this.instance]}})})}, t.prototype.getBaseURL=function(){return this.instance?this.instance.config.baseURL:"."}, t.prototype.start=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var e=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.getInstance()];case 1:return[2,t.sent().run(i).then(function(t){return e.state=IWorkflow.RunState.complete, e.stateChanged.next(e.state), e._resultValue=t, e._result.next(t), t})]}})})}, t.prototype.saveState=function(t){this._currState=t;}, t.prototype.stop=function(){this.state=IWorkflow.RunState.stop, this.stateChanged.next(this.state);}, t.prototype.pause=function(){this.state=IWorkflow.RunState.pause, this.stateChanged.next(this.state);}, t.prototype.createUUID=function(){return this.container.has(uuid.UUIDToken)||this.container.register(uuid.RandomUUIDFactory), this.container.get(uuid.UUIDToken).generate()}, t.classAnnations={name:"DefaultWorkflow",params:{constructor:["activities","uuid","instance","activityBuilder"],onInit:[],getUUID:[],getBuilder:[],getInstance:[],getBaseURL:[],start:["data"],saveState:["state"],stop:[],pause:[],createUUID:[]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=tslib_1.__decorate([decorators.Workflow(IWorkflow.WorkflowToken),tslib_1.__metadata("design:paramtypes",[Object,String,Object,Object])],t)}();exports.DefaultWorkflow=DefaultWorkflow;



});

unwrapExports(DefaultWorkflow_1);
var DefaultWorkflow_2 = DefaultWorkflow_1.DefaultWorkflow;

var ActivityConfigure = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function isActivityRunner(t){return t instanceof DefaultWorkflow_1.DefaultWorkflow}function isActivityType(t,e){return void 0===e&&(e=!0), !!t&&(!isActivityRunner(t)&&(!core_1.isString(t)&&(!!core_1.isToken(t)||!!core_1.isMetadataObject(t)&&(!e||!!(t.activity||t.task||t.bootstrap)))))}exports.isActivityRunner=isActivityRunner, exports.isActivityType=isActivityType;



});

unwrapExports(ActivityConfigure);
var ActivityConfigure_1 = ActivityConfigure.isActivityRunner;
var ActivityConfigure_2 = ActivityConfigure.isActivityType;

var IContext = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var InjectContextToken=function(t){function e(e){return t.call(this,"ActivityContext",e)||this}return tslib_1.__extends(e,t), e.classAnnations={name:"InjectContextToken",params:{constructor:["desc"]}}, e}(core_1.Registration);exports.InjectContextToken=InjectContextToken, exports.ContextToken=new InjectContextToken("");



});

unwrapExports(IContext);
var IContext_1 = IContext.InjectContextToken;
var IContext_2 = IContext.ContextToken;

var Activity_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var Activity=function(){function t(){}return t.prototype.onActivityInit=function(t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2]})})}, t.prototype.run=function(t,i){return Promise.resolve(t)}, t.prototype.toExpression=function(t,i){return this.context.builder.toExpression(t,i||this)}, t.prototype.toActivity=function(t,i,e,o,r){return this.context.builder.toActivity(t,r||this,i,e,o)}, t.prototype.buildActivity=function(t){return this.context.builder.buildByConfig(t,this.id)}, t.classAnnations={name:"Activity",params:{constructor:[],onActivityInit:["config"],run:["data","execute"],toExpression:["exptype","target"],toActivity:["exptype","isRightActivity","toConfig","valify","target"],buildActivity:["config"]}}, tslib_1.__decorate([core_1.Inject(IContext.ContextToken),tslib_1.__metadata("design:type",Object)],t.prototype,"context",void 0), t=tslib_1.__decorate([decorators.Task,tslib_1.__metadata("design:paramtypes",[])],t)}();exports.Activity=Activity;



});

unwrapExports(Activity_1);
var Activity_2 = Activity_1.Activity;

var ActivityBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var ActivityBuilder=function(c){function t(){return null!==c&&c.apply(this,arguments)||this}return tslib_1.__extends(t,c), t.prototype.build=function(t,e,i){return c.prototype.build.call(this,t,e,i)}, t.prototype.buildByConfig=function(t,e){return c.prototype.buildByConfig.call(this,t,e)}, t.prototype.createInstance=function(r,n,o){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return core_1.isString(r)&&(r=this.traslateStrToken(r)), [4,c.prototype.createInstance.call(this,r,n,o)];case 1:return(e=t.sent())&&e instanceof Activity_1.Activity?[3,3]:(i=this.getDefaultAcitvity(), console.log("try load default activity:",core_1.getClassName(i)), [4,this.build(i,n,o)]);case 2:e=t.sent(), t.label=3;case 3:return core_1.isString(o)&&(e.id=o), core_1.isFunction(e.onActivityInit)?[4,Promise.resolve(e.onActivityInit(n))]:[3,5];case 4:t.sent(), t.label=5;case 5:return[2,e]}})})}, t.prototype.buildStrategy=function(e,i,t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return i.name&&(e.name=i.name), e.config=i, [2,e]})})}, t.prototype.getDefaultAcitvity=function(){return Activity_1.Activity}, t.prototype.getBootstrapToken=function(t){var e=t.activity||t.task||t.bootstrap;return core_1.isString(e)&&(e=this.traslateStrToken(e)), e}, t.prototype.getDecorator=function(){return decorators.Task.toString()}, t.prototype.resolveToken=function(t,e){var i=this.container.resolve(t);return i.id=e, i}, t.prototype.traslateStrToken=function(t){var e=new core_1.Registration(IActivity.ActivityToken,t);return this.container.has(e)?e:t}, t.prototype.toExpression=function(e,i){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return ActivityConfigure.isActivityType(e)?[4,this.buildByConfig(e,i.id)]:[3,2];case 1:return[2,t.sent()];case 2:return[2,e]}})})}, t.prototype.toActivity=function(n,o,c,s,a){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return ActivityConfigure.isActivityType(n,!a)?a?[4,this.buildByConfig(core_1.isToken(n)?n:a(n),o.id)]:[3,2]:[3,5];case 1:return e=t.sent(), [3,4];case 2:return[4,this.buildByConfig(n,o.id)];case 3:e=t.sent(), t.label=4;case 4:return[3,6];case 5:e=n, t.label=6;case 6:return c(e)?[2,e]:core_1.isString(e)?(i=e, [3,9]):[3,7];case 7:return[4,o.context.exec(o,e)];case 8:i=t.sent(), t.label=9;case 9:return r=s(i), a&&(r=a(r)), r?[4,this.buildByConfig(r,o.id)]:[3,11];case 10:return e=t.sent(), [3,12];case 11:e=null, t.label=12;case 12:return[2,e]}})})}, t.classAnnations={name:"ActivityBuilder",params:{build:["token","config","data"],buildByConfig:["activity","data"],createInstance:["token","config","uuid"],buildStrategy:["activity","config","container"],getDefaultAcitvity:[],getBootstrapToken:["config"],getDecorator:[],resolveToken:["token","uuid"],traslateStrToken:["token"],toExpression:["exptype","target"],toActivity:["exptype","target","isRightActivity","toConfig","valify"]}}, t=tslib_1.__decorate([core_1.Singleton(IActivityBuilder.ActivityBuilderToken)],t)}(bootstrap_umd.TypeBuilder);exports.ActivityBuilder=ActivityBuilder;



});

unwrapExports(ActivityBuilder_1);
var ActivityBuilder_2 = ActivityBuilder_1.ActivityBuilder;

var ExpressionActivity_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var ExpressionActivity=function(t){function i(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(i,t), i.classAnnations={name:"ExpressionActivity",params:{}}, i=tslib_1.__decorate([decorators.Task],i)}(Activity_1.Activity);exports.ExpressionActivity=ExpressionActivity;var AssignActivity=function(t){function i(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(i,t), i.classAnnations={name:"AssignActivity",params:{}}, i=tslib_1.__decorate([decorators.Task],i)}(Activity_1.Activity);exports.AssignActivity=AssignActivity;



});

unwrapExports(ExpressionActivity_1);
var ExpressionActivity_2 = ExpressionActivity_1.ExpressionActivity;
var ExpressionActivity_3 = ExpressionActivity_1.AssignActivity;

var Context_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var Context=function(){function t(){}return t.prototype.getContainer=function(){return this.container}, t.prototype.getRootPath=function(){return(this.getContainer().get(bootstrap_umd.AppConfigureToken)||{}).baseURL||"."}, t.prototype.createRunner=function(t,e,r,o){var i;return core_1.isToken(r)?i=this.container.resolve(r):r instanceof ActivityBuilder_1.ActivityBuilder&&(i=r), this.container.resolve(IWorkflow.WorkflowToken,{activity:t,uuid:e,instance:o,activityBuilder:i})}, t.prototype.getEnvArgs=function(){return{}}, t.prototype.to=function(t,e){return core_1.isFunction(t)?core_1.isClass(t)?t:t(this,e):t}, t.prototype.exec=function(t,e,r){return core_1.isFunction(e)?e(t,r):core_1.isPromise(e)?e:e instanceof Activity_1.Activity?e.run(r,t):e instanceof DefaultWorkflow_1.DefaultWorkflow?e.start(r):Promise.resolve(e)}, t.prototype.isTask=function(t){return core_1.hasOwnClassMetadata(decorators.Task,t)}, t.classAnnations={name:"Context",params:{constructor:[],getContainer:[],getRootPath:[],createRunner:["task","uuid","builder","instance"],getEnvArgs:[],to:["target","config"],exec:["target","expression","data"],isTask:["task"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), tslib_1.__decorate([core_1.Inject(IActivityBuilder.ActivityBuilderToken),tslib_1.__metadata("design:type",ActivityBuilder_1.ActivityBuilder)],t.prototype,"builder",void 0), t=tslib_1.__decorate([core_1.Singleton(IContext.ContextToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.Context=Context;



});

unwrapExports(Context_1);
var Context_2 = Context_1.Context;

var core = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(IActivityBuilder,exports), tslib_1.__exportStar(ActivityBuilder_1,exports), tslib_1.__exportStar(IActivity,exports), tslib_1.__exportStar(Activity_1,exports), tslib_1.__exportStar(ExpressionActivity_1,exports), tslib_1.__exportStar(ActivityConfigure,exports), tslib_1.__exportStar(uuid,exports), tslib_1.__exportStar(decorators,exports), tslib_1.__exportStar(IContext,exports), tslib_1.__exportStar(Context_1,exports), tslib_1.__exportStar(IWorkflow,exports), tslib_1.__exportStar(DefaultWorkflow_1,exports);



});

unwrapExports(core);

var Delay = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.DelayActivityToken=new core.InjectAcitityToken("delay");var DelayActivity=function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return tslib_1.__extends(t,r), t.prototype.onActivityInit=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,r.prototype.onActivityInit.call(this,i)];case 1:return t.sent(), [4,(e=this).toExpression(i.delay,this)];case 2:return e.delay=t.sent(), [2]}})})}, t.prototype.run=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.delay,n)];case 1:return e=t.sent(), i=new core_1.Defer, r=setTimeout(function(){i.resolve(n), clearTimeout(r);},e), [4,i.promise];case 2:return[2,t.sent()]}})})}, t.classAnnations={name:"DelayActivity",params:{onActivityInit:["config"],run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.DelayActivityToken)],t)}(core.Activity);exports.DelayActivity=DelayActivity;



});

unwrapExports(Delay);
var Delay_1 = Delay.DelayActivityToken;
var Delay_2 = Delay.DelayActivity;

var Interval = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.IntervalActivityToken=new core.InjectAcitityToken("interval");var IntervalActivity=function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return tslib_1.__extends(t,r), t.prototype.onActivityInit=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,r.prototype.onActivityInit.call(this,n)];case 1:return t.sent(), [4,(e=this).toExpression(n.interval)];case 2:return e.interval=t.sent(), [4,(i=this).buildActivity(n.body)];case 3:return i.body=t.sent(), [2]}})})}, t.prototype.run=function(r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,n=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.interval,r)];case 1:return e=t.sent(), i=r, setInterval(function(){n.body.run(i);},e), [2,r]}})})}, t.classAnnations={name:"IntervalActivity",params:{onActivityInit:["config"],run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.IntervalActivityToken)],t)}(core.Activity);exports.IntervalActivity=IntervalActivity;



});

unwrapExports(Interval);
var Interval_1 = Interval.IntervalActivityToken;
var Interval_2 = Interval.IntervalActivity;

var DoWhile = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.DoWhileActivityToken=new core.InjectAcitityToken("dowhile");var DoWhileActivity=function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return tslib_1.__extends(t,r), t.prototype.onActivityInit=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,r.prototype.onActivityInit.call(this,n)];case 1:return t.sent(), [4,(e=this).buildActivity(n.do)];case 2:return e.body=t.sent(), [4,(i=this).toExpression(n.while)];case 3:return i.condition=t.sent(), [2]}})})}, t.prototype.run=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.body.run(n)];case 1:return e=t.sent(), [4,this.context.exec(this,this.condition,e)];case 2:i=t.sent(), t.label=3;case 3:return i?[4,this.body.run(e||n)]:[3,6];case 4:return e=t.sent(), [4,this.context.exec(this,this.condition,e)];case 5:return i=t.sent(), [3,3];case 6:return[2,e]}})})}, t.classAnnations={name:"DoWhileActivity",params:{onActivityInit:["config"],run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.DoWhileActivityToken)],t)}(core.Activity);exports.DoWhileActivity=DoWhileActivity;



});

unwrapExports(DoWhile);
var DoWhile_1 = DoWhile.DoWhileActivityToken;
var DoWhile_2 = DoWhile.DoWhileActivity;

var If = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.IfActivityToken=new core.InjectAcitityToken("if");var IfActivity=function(s){function t(){return null!==s&&s.apply(this,arguments)||this}return tslib_1.__extends(t,s), t.prototype.onActivityInit=function(r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,n;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,s.prototype.onActivityInit.call(this,r)];case 1:return t.sent(), [4,(e=this).buildActivity(r.ifBody)];case 2:return e.ifBody=t.sent(), [4,(i=this).toExpression(r.if)];case 3:return i.condition=t.sent(), r.elseBody?[4,(n=this).buildActivity(r.elseBody)]:[3,5];case 4:n.elseBody=t.sent(), t.label=5;case 5:return[2]}})})}, t.prototype.run=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.condition,e)];case 1:return t.sent()?[2,this.execIf(e)]:this.elseBody?[2,this.execElse(e)]:[2,Promise.resolve(e)]}})})}, t.prototype.execIf=function(t){return this.ifBody.run(t)}, t.prototype.execElse=function(t){return this.elseBody.run(t)}, t.classAnnations={name:"IfActivity",params:{onActivityInit:["config"],run:["data"],execIf:["data"],execElse:["data"]}}, t=tslib_1.__decorate([core.Task(exports.IfActivityToken)],t)}(core.Activity);exports.IfActivity=IfActivity;



});

unwrapExports(If);
var If_1 = If.IfActivityToken;
var If_2 = If.IfActivity;

var Invoke = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.InvokeActivityToken=new core.InjectAcitityToken("invoke");var InvokeActivity=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return tslib_1.__extends(e,t), e.prototype.run=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,this.context.getContainer().invoke(this.targetType,this.target,this.args,{data:e})]})})}, e.classAnnations={name:"InvokeActivity",params:{run:["data"]}}, e=tslib_1.__decorate([core.Task(exports.InvokeActivityToken)],e)}(core.Activity);exports.InvokeActivity=InvokeActivity;



});

unwrapExports(Invoke);
var Invoke_1 = Invoke.InvokeActivityToken;
var Invoke_2 = Invoke.InvokeActivity;

var Parallel = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.ParallelActivityToken=new core.InjectAcitityToken("parallel");var ParallelActivity=function(r){function t(){var t=null!==r&&r.apply(this,arguments)||this;return t.activites=[], t}var a;return tslib_1.__extends(t,r), (a=t).prototype.onActivityInit=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,r.prototype.onActivityInit.call(this,e)];case 1:return t.sent(), e.parallel&&e.parallel.length?[4,this.buildChildren(this,e.parallel)]:[3,3];case 2:t.sent(), t.label=3;case 3:return[2]}})})}, t.prototype.buildChildren=function(r,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,Promise.all(n.map(function(r){return tslib_1.__awaiter(i,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.buildActivity(r)];case 1:return(e=t.sent())?e instanceof a&&!core_1.isToken(r)&&r.parallel&&r.parallel.length?[4,e.buildChildren(e,r.parallel)]:[3,3]:[2,null];case 2:t.sent(), t.label=3;case 3:return[2,e]}})})}))];case 1:return e=t.sent(), r.activites=e, [2,r]}})})}, t.prototype.run=function(r,i){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.before(r,i)];case 1:return e=t.sent(), [4,this.execute(e,i)];case 2:return e=t.sent(), [4,this.after(e,i)];case 3:return[2,e=t.sent()]}})})}, t.prototype.before=function(e,t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,e]})})}, t.prototype.execute=function(e,t){return Promise.all(this.activites.map(function(t){return t.run(e)}))}, t.prototype.after=function(e,t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return[2,e]})})}, t.classAnnations={name:"ParallelActivity",params:{onActivityInit:["config"],buildChildren:["activity","configs"],run:["data","execute"],before:["data","execute"],execute:["data","execute"],after:["data","execute"]}}, t=a=tslib_1.__decorate([core.Task(exports.ParallelActivityToken)],t)}(core.Activity);exports.ParallelActivity=ParallelActivity;



});

unwrapExports(Parallel);
var Parallel_1 = Parallel.ParallelActivityToken;
var Parallel_2 = Parallel.ParallelActivity;

var Sequence = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.SequenceActivityToken=new core.InjectAcitityToken("sequence");var SequenceActivity=function(i){function e(){var e=null!==i&&i.apply(this,arguments)||this;return e.activites=[], e}var c;return tslib_1.__extends(e,i), (c=e).prototype.onActivityInit=function(t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,i.prototype.onActivityInit.call(this,t)];case 1:return e.sent(), t.sequence&&t.sequence.length?[4,this.buildChildren(this,t.sequence)]:[3,3];case 2:e.sent(), e.label=3;case 3:return[2]}})})}, e.prototype.buildChildren=function(i,r){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,n=this;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,Promise.all(r.map(function(i){return tslib_1.__awaiter(n,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.buildActivity(i)];case 1:return(t=e.sent())?t instanceof c&&!core_1.isToken(i)&&i.sequence&&i.sequence.length?[4,t.buildChildren(t,i.sequence)]:[3,3]:[2,null];case 2:e.sent(), e.label=3;case 3:return[2,t]}})})}))];case 1:return t=e.sent(), i.activites=t, [2,i]}})})}, e.prototype.run=function(i,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.before(i,n)];case 1:return t=e.sent(), [4,this.execute(t,n)];case 2:return t=e.sent(), [4,this.after(t,n)];case 3:return[2,t=e.sent()]}})})}, e.prototype.before=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,t]})})}, e.prototype.execute=function(e,t){var i=Promise.resolve(e);return this.activites.forEach(function(t){i=i.then(function(e){return t.run(e)});}), i}, e.prototype.after=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,t]})})}, e.classAnnations={name:"SequenceActivity",params:{onActivityInit:["config"],buildChildren:["activity","configs"],run:["data","execute"],before:["data","execute"],execute:["data","execute"],after:["data","execute"]}}, e=c=tslib_1.__decorate([core.Task(exports.SequenceActivityToken)],e)}(core.Activity);exports.SequenceActivity=SequenceActivity;



});

unwrapExports(Sequence);
var Sequence_1 = Sequence.SequenceActivityToken;
var Sequence_2 = Sequence.SequenceActivity;

var Switch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.SwitchActivityToken=new core.InjectAcitityToken("switch");var SwitchActivity=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.cases=new core_1.MapSet, t}return tslib_1.__extends(t,n), t.prototype.onActivityInit=function(r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,s=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,n.prototype.onActivityInit.call(this,r)];case 1:return t.sent(), [4,(e=this).toExpression(r.expression)];case 2:return e.expression=t.sent(), r.cases&&r.cases.length?[4,Promise.all(r.cases.map(function(i){return tslib_1.__awaiter(s,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.buildActivity(i.value)];case 1:return e=t.sent(), this.cases.set(i.key,e), [2,e]}})})}))]:[3,4];case 3:t.sent(), t.label=4;case 4:return r.defaultBody?[4,(i=this).buildActivity(r.defaultBody)]:[3,6];case 5:i.defaultBody=t.sent(), t.label=6;case 6:return[2]}})})}, t.prototype.run=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.expression,i)];case 1:return e=t.sent(), !core_1.isUndefined(e)&&this.cases.has(e)?[2,this.cases.get(e).run(i)]:this.defaultBody?[2,this.defaultBody.run(i)]:[2,Promise.resolve(i)]}})})}, t.classAnnations={name:"SwitchActivity",params:{onActivityInit:["config"],run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.SwitchActivityToken)],t)}(core.Activity);exports.SwitchActivity=SwitchActivity;



});

unwrapExports(Switch);
var Switch_1 = Switch.SwitchActivityToken;
var Switch_2 = Switch.SwitchActivity;

var Throw = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.ThrowActivityToken=new core.InjectAcitityToken("throw");var ThrowActivity=function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return tslib_1.__extends(t,r), t.prototype.onActivityInit=function(i){return tslib_1.__awaiter(this,void 0,void 0,function(){var e;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,r.prototype.onActivityInit.call(this,i)];case 1:return t.sent(), [4,(e=this).toExpression(i.exception)];case 2:return e.exception=t.sent(), [2]}})})}, t.prototype.run=function(e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.exception,e)];case 1:throw t.sent()}})})}, t.classAnnations={name:"ThrowActivity",params:{onActivityInit:["config"],run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.ThrowActivityToken)],t)}(core.Activity);exports.ThrowActivity=ThrowActivity;



});

unwrapExports(Throw);
var Throw_1 = Throw.ThrowActivityToken;
var Throw_2 = Throw.ThrowActivity;

var TryCatch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.TryCatchActivityToken=new core.InjectAcitityToken("trycatch");var TryCatchActivity=function(a){function t(){var t=null!==a&&a.apply(this,arguments)||this;return t.catchs=[], t}return tslib_1.__extends(t,a), t.prototype.onActivityInit=function(c){return tslib_1.__awaiter(this,void 0,void 0,function(){var i,r,n,e=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,a.prototype.onActivityInit.call(this,c)];case 1:return t.sent(), [4,(i=this).buildActivity(c.try)];case 2:return i.try=t.sent(), c.catchs&&c.catchs.length?[4,Promise.all(c.catchs.map(function(t){return e.buildActivity(t)}))]:[3,4];case 3:r=t.sent(), this.catchs=r, t.label=4;case 4:return c.finally?[4,(n=this).buildActivity(c.finally)]:[3,6];case 5:n.finally=t.sent(), t.label=6;case 6:return[2]}})})}, t.prototype.run=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var r,i=this;return tslib_1.__generator(this,function(t){try{r=this.try.run(n), this.catchs.forEach(function(i){r=r.catch(function(t){return i.run(t)});}), this.finally&&r.then(function(t){return i.finally.run(t)});}catch(t){r=Promise.resolve(n), this.finally&&r.then(function(t){return i.finally.run(t)});}return[2,r]})})}, t.classAnnations={name:"TryCatchActivity",params:{onActivityInit:["config"],run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.TryCatchActivityToken)],t)}(Activity_1.Activity);exports.TryCatchActivity=TryCatchActivity;



});

unwrapExports(TryCatch);
var TryCatch_1 = TryCatch.TryCatchActivityToken;
var TryCatch_2 = TryCatch.TryCatchActivity;

var While = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.WhileActivityToken=new core.InjectAcitityToken("while");var WhileActivity=function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return tslib_1.__extends(t,r), t.prototype.onActivityInit=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,r.prototype.onActivityInit.call(this,n)];case 1:return t.sent(), [4,(e=this).buildActivity(n.body)];case 2:return e.body=t.sent(), [4,(i=this).toExpression(n.while)];case 3:return i.condition=t.sent(), [2]}})})}, t.prototype.run=function(n){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.context.exec(this,this.condition,n)];case 1:e=t.sent(), t.label=2;case 2:return e?[4,this.body.run(i||n)]:[3,5];case 3:return i=t.sent(), [4,this.context.exec(this,this.condition,i)];case 4:return e=t.sent(), [3,2];case 5:return[2,i]}})})}, t.classAnnations={name:"WhileActivity",params:{onActivityInit:["config"],run:["data"]}}, t=tslib_1.__decorate([core.Task(exports.WhileActivityToken)],t)}(core.Activity);exports.WhileActivity=WhileActivity;



});

unwrapExports(While);
var While_1 = While.WhileActivityToken;
var While_2 = While.WhileActivity;

var activities = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(Delay,exports), tslib_1.__exportStar(Interval,exports), tslib_1.__exportStar(DoWhile,exports), tslib_1.__exportStar(If,exports), tslib_1.__exportStar(Invoke,exports), tslib_1.__exportStar(Parallel,exports), tslib_1.__exportStar(Sequence,exports), tslib_1.__exportStar(Switch,exports), tslib_1.__exportStar(Throw,exports), tslib_1.__exportStar(TryCatch,exports), tslib_1.__exportStar(While,exports);



});

unwrapExports(activities);

var DefaultTaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var DefaultTaskContainer=function(){function e(e){this.baseURL=e;}return e.prototype.getContainer=function(){return this.container||(this.container=this.getBuilder().getPools().getDefault()), this.container}, e.prototype.getBuilder=function(){return this.builder||(this.builder=this.createAppBuilder(), this.builder.use(aop_1.AopModule).use(logs_1.LogModule).use(CoreModule_1.CoreModule)), this.builder}, e.prototype.createAppBuilder=function(){return new bootstrap_umd.DefaultApplicationBuilder(this.baseURL)}, e.prototype.useConfiguration=function(e,t){return this.getBuilder().useConfiguration(e,t), this}, e.prototype.use=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return(e=this.getBuilder()).use.apply(e,t), this}, e.prototype.useLog=function(e){return core_1.hasClassMetadata(aop_1.Aspect,e)?this.getBuilder().use(e):console.error("logAspect param is not right aspect"), this}, e.prototype.getWorkflow=function(e){return this.getContainer().resolve(e)}, e.prototype.createWorkflow=function(o,i){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,r;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return core_1.isToken(o)?t={bootstrap:o,builder:WorkflowBuilder_1.WorkflowBuilderToken}:(t=o).builder=WorkflowBuilder_1.WorkflowBuilderToken, [4,this.getBuilder().bootstrap(t,null,i)];case 1:return r=e.sent(), this.getContainer().bindProvider(r.getUUID(),r), [2,r]}})})}, e.prototype.bootstrap=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return t=1<r.length?{sequence:r,task:activities.SequenceActivity}:core_1.lang.first(r), [4,this.createWorkflow(t)];case 1:return[2,e.sent()]}})})}, e.classAnnations={name:"DefaultTaskContainer",params:{constructor:["baseURL"],getContainer:[],getBuilder:[],createAppBuilder:[],useConfiguration:["config","container"],use:["modules"],useLog:["logAspect"],getWorkflow:["workflowId"],createWorkflow:["activity","workflowId"],bootstrap:["activites"]}}, e}();exports.DefaultTaskContainer=DefaultTaskContainer;



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
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(ITaskContainer,exports), tslib_1.__exportStar(DefaultTaskContainer_1,exports), tslib_1.__exportStar(WorkflowBuilder_1,exports), tslib_1.__exportStar(utils,exports), tslib_1.__exportStar(core,exports), tslib_1.__exportStar(aop,exports), tslib_1.__exportStar(activities,exports), tslib_1.__exportStar(CoreModule_1,exports);



});

var index$5 = unwrapExports(D__workspace_github_typeTask_packages_core_lib);

return index$5;

})));
