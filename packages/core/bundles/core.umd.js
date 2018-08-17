(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tslib'), require('@ts-ioc/core'), require('reflect-metadata'), require('rxjs/BehaviorSubject'), require('rxjs/add/operator/filter'), require('@ts-ioc/aop'), require('@ts-ioc/logs')) :
	typeof define === 'function' && define.amd ? define(['tslib', '@ts-ioc/core', 'reflect-metadata', 'rxjs/BehaviorSubject', 'rxjs/add/operator/filter', '@ts-ioc/aop', '@ts-ioc/logs'], factory) :
	(global.core = global.core || {}, global.core.umd = global.core.umd || {}, global.core.umd.js = factory(global.tslib_1,global.core_1,global.Reflect,global.BehaviorSubject_1,global.filter,global.aop_1,global.logs));
}(this, (function (tslib_1,core_1,reflectMetadata,BehaviorSubject_1,filter,aop_1,logs) { 'use strict';

tslib_1 = tslib_1 && tslib_1.hasOwnProperty('default') ? tslib_1['default'] : tslib_1;
core_1 = core_1 && core_1.hasOwnProperty('default') ? core_1['default'] : core_1;
reflectMetadata = reflectMetadata && reflectMetadata.hasOwnProperty('default') ? reflectMetadata['default'] : reflectMetadata;
BehaviorSubject_1 = BehaviorSubject_1 && BehaviorSubject_1.hasOwnProperty('default') ? BehaviorSubject_1['default'] : BehaviorSubject_1;
filter = filter && filter.hasOwnProperty('default') ? filter['default'] : filter;
aop_1 = aop_1 && aop_1.hasOwnProperty('default') ? aop_1['default'] : aop_1;
logs = logs && logs.hasOwnProperty('default') ? logs['default'] : logs;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var bootstrap_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory(tslib_1, core_1, reflectMetadata);
}(commonjsGlobal, (function (tslib_1$$1,core_1$$1,reflectMetadata$$1) { tslib_1$$1 = tslib_1$$1 && tslib_1$$1.hasOwnProperty('default') ? tslib_1$$1['default'] : tslib_1$$1;
core_1$$1 = core_1$$1 && core_1$$1.hasOwnProperty('default') ? core_1$$1['default'] : core_1$$1;
reflectMetadata$$1 = reflectMetadata$$1 && reflectMetadata$$1.hasOwnProperty('default') ? reflectMetadata$$1['default'] : reflectMetadata$$1;

function unwrapExports$$1 (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var Annotation = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * create type builder decorator
 *
 * @export
 * @template T
 * @param {string} name
 * @param {string} [decorType]
 * @param {(Token<IAnnotationBuilder<any>> | IAnnotationBuilder<any>)} [builder]
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {IAnnotationDecorator<T>}
 */
function createAnnotationDecorator(name, builder, adapter, metadataExtends) {
    return core_1$$1.createClassDecorator(name, function (args) {
        if (adapter) {
            adapter(args);
        }
    }, function (metadata) {
        if (metadataExtends) {
            metadata = metadataExtends(metadata);
        }
        if (builder && !metadata.annotationBuilder) {
            metadata.annotationBuilder = builder;
        }
        return metadata;
    });
}
exports.createAnnotationDecorator = createAnnotationDecorator;
/**
 * Annotation decorator, use to define class build way via config.
 *
 * @Annotation
 */
exports.Annotation = createAnnotationDecorator('Annotation');


});

unwrapExports$$1(Annotation);
var Annotation_1 = Annotation.createAnnotationDecorator;
var Annotation_2 = Annotation.Annotation;

var DIModule = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * create bootstrap decorator.
 *
 * @export
 * @template T
 * @param {string} name decorator name.
 * @param {(Token<IModuleBuilder> | IModuleBuilder)} [builder]
 * @param {(Token<IAnnotationBuilder<any>> | IAnnotationBuilder<any>)} [annotationBuilder]
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {IDIModuleDecorator<T>}
 */
function createDIModuleDecorator(name, builder, annotationBuilder, adapter, metadataExtends) {
    return core_1$$1.createClassDecorator(name, function (args) {
        if (adapter) {
            adapter(args);
        }
    }, function (metadata) {
        if (metadataExtends) {
            metadata = metadataExtends(metadata);
        }
        if (!metadata.name && core_1$$1.isClass(metadata.token)) {
            var isuglify = /^[a-z]$/.test(metadata.token.name);
            if (isuglify && metadata.token.classAnnations) {
                metadata.name = metadata.token.classAnnations.name;
            }
            else {
                metadata.name = metadata.token.name;
            }
        }
        metadata.decorType = name;
        if (builder && !metadata.builder) {
            metadata.builder = builder;
        }
        if (annotationBuilder && !metadata.annotationBuilder) {
            metadata.annotationBuilder = annotationBuilder;
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
 * @param {(Token<IAnnotationBuilder<any>> | IAnnotationBuilder<Tany>)} [annotationBuilder] default type builder.
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {IBootstrapDecorator<T>}
 */
function createBootstrapDecorator(name, builder, annotationBuilder, adapter, metadataExtends) {
    return DIModule.createDIModuleDecorator(name, builder, annotationBuilder, adapter, function (metadata) {
        if (metadataExtends) {
            metadataExtends(metadata);
        }
        setTimeout(function () {
            var builderType = metadata.builder;
            var builder;
            if (core_1$$1.isClass(builderType)) {
                builder = core_1$$1.isFunction(builderType['create']) ? builderType['create']() : new builderType();
            }
            else {
                builder = builderType;
            }
            builder.bootstrap(metadata.token);
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

tslib_1$$1.__exportStar(Annotation, exports);
tslib_1$$1.__exportStar(DIModule, exports);
tslib_1$$1.__exportStar(Bootstrap, exports);


});

unwrapExports$$1(decorators);

var AppConfigure = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * application configuration token.
 */
exports.AppConfigureToken = new core_1$$1.InjectToken('DI_APP_Configuration');


});

unwrapExports$$1(AppConfigure);
var AppConfigure_1 = AppConfigure.AppConfigureToken;

var IModuleBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


var moduleBuilderDesc = 'DI_ModuleBuilder';
/**
 * inject module builder token.
 *
 * @export
 * @class InjectModuleBuilder
 * @extends {Registration<T>}
 * @template T
 */
var InjectModuleBuilderToken = /** @class */ (function (_super) {
    tslib_1$$1.__extends(InjectModuleBuilderToken, _super);
    function InjectModuleBuilderToken(type) {
        return _super.call(this, type, moduleBuilderDesc) || this;
    }
    InjectModuleBuilderToken.classAnnations = { "name": "InjectModuleBuilderToken", "params": { "constructor": ["type"] } };
    return InjectModuleBuilderToken;
}(core_1$$1.Registration));
exports.InjectModuleBuilderToken = InjectModuleBuilderToken;
/**
 * module builder token.
 */
exports.ModuleBuilderToken = new core_1$$1.Registration(Object, moduleBuilderDesc);


});

unwrapExports$$1(IModuleBuilder);
var IModuleBuilder_1 = IModuleBuilder.InjectModuleBuilderToken;
var IModuleBuilder_2 = IModuleBuilder.ModuleBuilderToken;

var IAnnotationBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


var annoBuilderDesc = 'DI_AnnotationBuilder';
/**
 * inject Annotation class builder.
 *
 * @export
 * @class InjectBootstrapBuilder
 * @extends {Registration<T>}
 * @template T
 */
var InjectAnnotationBuilder = /** @class */ (function (_super) {
    tslib_1$$1.__extends(InjectAnnotationBuilder, _super);
    function InjectAnnotationBuilder(type) {
        return _super.call(this, type, annoBuilderDesc) || this;
    }
    InjectAnnotationBuilder.classAnnations = { "name": "InjectAnnotationBuilder", "params": { "constructor": ["type"] } };
    return InjectAnnotationBuilder;
}(core_1$$1.Registration));
exports.InjectAnnotationBuilder = InjectAnnotationBuilder;
/**
 * Annotation class builder token.
 */
exports.AnnotationBuilderToken = new core_1$$1.Registration(Object, annoBuilderDesc);


});

unwrapExports$$1(IAnnotationBuilder);
var IAnnotationBuilder_1 = IAnnotationBuilder.InjectAnnotationBuilder;
var IAnnotationBuilder_2 = IAnnotationBuilder.AnnotationBuilderToken;

var AnnotationBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * Annotation class builder. build class with metadata and config.
 *
 * @export
 * @class AnnotationBuilder
 * @implements {implements IAnnotationBuilder<T>}
 * @template T
 */
var AnnotationBuilder = /** @class */ (function () {
    function AnnotationBuilder() {
    }
    AnnotationBuilder_1 = AnnotationBuilder;
    AnnotationBuilder.prototype.build = function (token, config, data) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var builder, instance;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!config) {
                            config = this.getTokenMetaConfig(token);
                        }
                        builder = this.getBuilder(token, config);
                        if (!!this.isEqual(builder)) return [3 /*break*/, 1];
                        return [2 /*return*/, builder.build(token, config, data)];
                    case 1: return [4 /*yield*/, this.createInstance(token, config, data)];
                    case 2:
                        instance = _a.sent();
                        if (!instance) {
                            return [2 /*return*/, null];
                        }
                        if (!core_1$$1.isFunction(instance.anBeforeInit)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.resolve(instance.anBeforeInit(config))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.buildStrategy(instance, config)];
                    case 5:
                        instance = (_a.sent());
                        if (!core_1$$1.isFunction(instance.anAfterInit)) return [3 /*break*/, 7];
                        return [4 /*yield*/, Promise.resolve(instance.anAfterInit(config))];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, instance];
                }
            });
        });
    };
    AnnotationBuilder.prototype.buildByConfig = function (config, data) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1$$1.__generator(this, function (_a) {
                if (core_1$$1.isToken(config)) {
                    token = config;
                    return [2 /*return*/, this.build(token, this.getTokenMetaConfig(token), data)];
                }
                else {
                    token = this.getType(config);
                    return [2 /*return*/, this.build(token, this.getTokenMetaConfig(token, config), data)];
                }
                return [2 /*return*/];
            });
        });
    };
    AnnotationBuilder.prototype.createInstance = function (token, config, data) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var instance;
            return tslib_1$$1.__generator(this, function (_a) {
                if (!token) {
                    throw new Error('can not find annotation token.');
                }
                if (!this.container.has(token)) {
                    if (core_1$$1.isClass(token)) {
                        this.container.register(token);
                    }
                    else {
                        console.log("can not find token " + (token ? token.toString() : null) + " in container.");
                        return [2 /*return*/, null];
                    }
                }
                instance = this.resolveToken(token, data);
                return [2 /*return*/, instance];
            });
        });
    };
    AnnotationBuilder.prototype.getBuilder = function (token, config) {
        var _this = this;
        var builder;
        if (config && config.annotationBuilder) {
            if (core_1$$1.isClass(config.annotationBuilder)) {
                if (!this.container.has(config.annotationBuilder)) {
                    this.container.register(config.annotationBuilder);
                }
            }
            if (core_1$$1.isToken(config.annotationBuilder)) {
                builder = this.container.resolve(config.annotationBuilder, { container: this.container });
            }
            else if (config.annotationBuilder instanceof AnnotationBuilder_1) {
                builder = config.annotationBuilder;
            }
        }
        if (!builder && token) {
            this.container.getTokenExtendsChain(token).forEach(function (tk) {
                if (builder) {
                    return false;
                }
                var buildToken = new IAnnotationBuilder.InjectAnnotationBuilder(tk);
                if (_this.container.has(buildToken)) {
                    builder = _this.container.resolve(buildToken, { container: _this.container });
                }
                return true;
            });
        }
        if (builder && !builder.container) {
            builder.container = this.container;
        }
        return builder || this;
    };
    /**
     * bundle instance via config.
     *
     * @param {T} instance
     * @param {AnnotationConfigure} config
     * @param {IContainer} [container]
     * @returns {Promise<T>}
     * @memberof BootBuilder
     */
    AnnotationBuilder.prototype.buildStrategy = function (instance, config) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
                return [2 /*return*/, instance];
            });
        });
    };
    AnnotationBuilder.prototype.getType = function (config) {
        return config.token || config.type;
    };
    AnnotationBuilder.prototype.getTokenMetaConfig = function (token, config) {
        var cfg;
        if (core_1$$1.isClass(token)) {
            cfg = this.getMetaConfig(token);
        }
        else if (core_1$$1.isToken(token)) {
            var tokenType = this.container ? this.container.getTokenImpl(token) : token;
            if (core_1$$1.isClass(tokenType)) {
                cfg = this.getMetaConfig(tokenType);
            }
        }
        if (cfg) {
            return core_1$$1.lang.assign({}, cfg, config || {});
        }
        else {
            return config || {};
        }
    };
    AnnotationBuilder.prototype.getDecorator = function () {
        return decorators.Annotation.toString();
    };
    AnnotationBuilder.prototype.getMetaConfig = function (token) {
        var decorator = this.getDecorator();
        if (core_1$$1.hasOwnClassMetadata(decorator, token)) {
            var metas = core_1$$1.getTypeMetadata(decorator, token);
            if (metas && metas.length) {
                return metas[0];
            }
        }
        return null;
    };
    AnnotationBuilder.prototype.isEqual = function (build) {
        if (!build) {
            return false;
        }
        if (build === this) {
            return true;
        }
        if (build.constructor === this.constructor) {
            return true;
        }
        return false;
    };
    AnnotationBuilder.prototype.resolveToken = function (token, data) {
        return this.container.resolve(token, data);
    };
    var AnnotationBuilder_1;
    AnnotationBuilder.classAnnations = { "name": "AnnotationBuilder", "params": { "constructor": [], "build": ["token", "config", "data"], "buildByConfig": ["config", "data"], "createInstance": ["token", "config", "data"], "getBuilder": ["token", "config"], "buildStrategy": ["instance", "config"], "getType": ["config"], "getTokenMetaConfig": ["token", "config"], "getDecorator": [], "getMetaConfig": ["token"], "isEqual": ["build"], "resolveToken": ["token", "data"] } };
    tslib_1$$1.__decorate([
        core_1$$1.Inject(core_1$$1.ContainerToken),
        tslib_1$$1.__metadata("design:type", Object)
    ], AnnotationBuilder.prototype, "container", void 0);
    AnnotationBuilder = AnnotationBuilder_1 = tslib_1$$1.__decorate([
        core_1$$1.Injectable(IAnnotationBuilder.AnnotationBuilderToken),
        tslib_1$$1.__metadata("design:paramtypes", [])
    ], AnnotationBuilder);
    return AnnotationBuilder;
}());
exports.AnnotationBuilder = AnnotationBuilder;


});

unwrapExports$$1(AnnotationBuilder_1);
var AnnotationBuilder_2 = AnnotationBuilder_1.AnnotationBuilder;

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
        var lifeScope = container.get(core_1$$1.LifeScopeToken);
        lifeScope.registerDecorator(decorators.DIModule, core_1$$1.CoreActions.bindProvider, core_1$$1.CoreActions.cache, core_1$$1.CoreActions.componentBeforeInit, core_1$$1.CoreActions.componentInit, core_1$$1.CoreActions.componentAfterInit);
        lifeScope.registerDecorator(decorators.Bootstrap, core_1$$1.CoreActions.bindProvider, core_1$$1.CoreActions.cache, core_1$$1.CoreActions.componentBeforeInit, core_1$$1.CoreActions.componentInit, core_1$$1.CoreActions.componentAfterInit);
        container.register(ModuleBuilder_1.ModuleBuilder);
        container.register(AnnotationBuilder_1.AnnotationBuilder);
        container.register(ApplicationBuilder.DefaultApplicationBuilder);
    };
    BootModule.classAnnations = { "name": "BootModule", "params": { "constructor": ["container"], "setup": [] } };
    BootModule = tslib_1$$1.__decorate([
        core_1$$1.IocExt('setup'),
        tslib_1$$1.__param(0, core_1$$1.Inject(core_1$$1.ContainerToken)),
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
        this.pools = new core_1$$1.MapSet();
    }
    ContainerPool.prototype.getTokenKey = function (token) {
        if (token instanceof core_1$$1.Registration) {
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
exports.ContainerPoolToken = new core_1$$1.InjectToken('ContainerPool');
/**
 *  global container pools.
 */
exports.containerPools = new ContainerPool();


});

unwrapExports$$1(ContainerPool_1);
var ContainerPool_2 = ContainerPool_1.ContainerPool;
var ContainerPool_3 = ContainerPool_1.ContainerPoolToken;
var ContainerPool_4 = ContainerPool_1.containerPools;

var Service_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * base service.
 *
 * @export
 * @abstract
 * @class Service
 * @implements {IService}
 */
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.classAnnations = { "name": "Service", "params": { "start": [], "stop": [] } };
    return Service;
}());
exports.Service = Service;
/**
 * application service token.
 *
 * @export
 * @class InjectServiceToken
 * @extends {Registration<IService<T>>}
 * @template T
 */
var InjectServiceToken = /** @class */ (function (_super) {
    tslib_1$$1.__extends(InjectServiceToken, _super);
    function InjectServiceToken(type) {
        return _super.call(this, type, 'boot__service') || this;
    }
    InjectServiceToken.classAnnations = { "name": "InjectServiceToken", "params": { "constructor": ["type"] } };
    return InjectServiceToken;
}(core_1$$1.Registration));
exports.InjectServiceToken = InjectServiceToken;


});

unwrapExports$$1(Service_1);
var Service_2 = Service_1.Service;
var Service_3 = Service_1.InjectServiceToken;

var IRunner = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * boot element.
 *
 * @export
 * @abstract
 * @class Boot
 * @implements {IBoot}
 */
var Boot = /** @class */ (function () {
    function Boot() {
    }
    Boot.classAnnations = { "name": "Boot", "params": { "run": ["app"] } };
    return Boot;
}());
exports.Boot = Boot;
/**
 * application runner token.
 *
 * @export
 * @class InjectRunnerToken
 * @extends {Registration<IRunner<T>>}
 * @template T
 */
var InjectRunnerToken = /** @class */ (function (_super) {
    tslib_1$$1.__extends(InjectRunnerToken, _super);
    function InjectRunnerToken(type) {
        return _super.call(this, type, 'boot__runner') || this;
    }
    InjectRunnerToken.classAnnations = { "name": "InjectRunnerToken", "params": { "constructor": ["type"] } };
    return InjectRunnerToken;
}(core_1$$1.Registration));
exports.InjectRunnerToken = InjectRunnerToken;


});

unwrapExports$$1(IRunner);
var IRunner_1 = IRunner.Boot;
var IRunner_2 = IRunner.InjectRunnerToken;

var ModuleBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });












var exportsProvidersFiled = '__exportProviders';
/**
 * inject module load token.
 *
 * @export
 * @class InjectModuleLoadToken
 * @extends {Registration<T>}
 * @template T
 */
var InjectModuleLoadToken = /** @class */ (function (_super) {
    tslib_1$$1.__extends(InjectModuleLoadToken, _super);
    function InjectModuleLoadToken(token) {
        return _super.call(this, token, 'module_loader') || this;
    }
    InjectModuleLoadToken.classAnnations = { "name": "InjectModuleLoadToken", "params": { "constructor": ["token"] } };
    return InjectModuleLoadToken;
}(core_1$$1.Registration));
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
     * @param {ModuleEnv} [env] set loadedModule will return loaded container; set default container or not. not set will create new container.
     * @param {IContainer} [parent] set the container parent, default will set root default container.
     * @returns {IContainer}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.getContainer = function (token, env, parent) {
        var container;
        var defaultContainer;
        if (env instanceof ModuleType.LoadedModule) {
            if (env.token === token) {
                container = env.container;
                this.setParent(container, parent);
                return container;
            }
            else {
                defaultContainer = env.container;
            }
        }
        else if (defaultContainer instanceof core_1$$1.Container) {
            defaultContainer = env;
        }
        var pools = this.getPools();
        if (core_1$$1.isToken(token)) {
            if (pools.has(token)) {
                return pools.get(token);
            }
            else {
                var cfg = this.getConfigure(token, defaultContainer);
                container = cfg.container || defaultContainer;
                if (!container || !(defaultContainer instanceof core_1$$1.Container)) {
                    container = this.isDIModule(token) ? this.createContainer() : pools.getDefault();
                }
                this.setParent(container, parent);
                pools.set(token, container);
                return container;
            }
        }
        else {
            var id = this.getConfigId(token);
            if (id && pools.has(id)) {
                return pools.get(id);
            }
            container = token.container || defaultContainer;
            if (!container || !(defaultContainer instanceof core_1$$1.Container)) {
                container = id ? this.createContainer() : pools.getDefault();
                token.container = container;
            }
            this.setParent(container, parent);
            if (id || !token.container) {
                pools.set(id, container);
            }
            else {
                token.container = container;
            }
            return container;
        }
    };
    ModuleBuilder.prototype.getConfigId = function (cfg) {
        return cfg.name;
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
        return new core_1$$1.DefaultContainerBuilder();
    };
    ModuleBuilder.prototype.load = function (token, env, parent) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var container, tk, mdToken, cfg, mToken, loadmdl;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (env instanceof ModuleType.LoadedModule && env.token === token) {
                            return [2 /*return*/, env];
                        }
                        container = this.getContainer(token, env, parent);
                        tk = core_1$$1.isToken(token) ? token : this.getConfigId(token);
                        mdToken = new InjectModuleLoadToken(tk);
                        if (tk && container.has(mdToken)) {
                            return [2 /*return*/, container.resolve(mdToken)];
                        }
                        cfg = this.getConfigure(token, container);
                        return [4 /*yield*/, this.registerDepdences(container, cfg)];
                    case 1:
                        cfg = _a.sent();
                        mToken = core_1$$1.isToken(token) ? token : this.getType(cfg);
                        if (core_1$$1.isClass(mToken) && !container.has(mToken)) {
                            container.register(mToken);
                        }
                        loadmdl = {
                            token: token,
                            moduleToken: mToken,
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
     * @param {ModuleEnv} [env]
     * @param {*} [data]
     * @returns {Promise<T>}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.build = function (token, env, data) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var loadmdl, container, cfg, builder, annBuilder, instance, instance, mdlInst;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(token, env)];
                    case 1:
                        loadmdl = _a.sent();
                        container = loadmdl.container;
                        cfg = loadmdl.moduleConfig;
                        builder = this.getBuilder(container, loadmdl.moduleToken, cfg);
                        if (!(builder && builder !== this)) return [3 /*break*/, 3];
                        return [4 /*yield*/, builder.build(token, env, data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        annBuilder = this.getAnnoBuilder(container, loadmdl.moduleToken, cfg.annotationBuilder);
                        if (!!loadmdl.moduleToken) return [3 /*break*/, 5];
                        return [4 /*yield*/, annBuilder.buildByConfig(cfg, data)];
                    case 4:
                        instance = _a.sent();
                        return [2 /*return*/, instance];
                    case 5: return [4 /*yield*/, annBuilder.build(loadmdl.moduleToken, cfg, data)];
                    case 6:
                        instance = _a.sent();
                        mdlInst = instance;
                        if (mdlInst && core_1$$1.isFunction(mdlInst.mdOnInit)) {
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
    * @param {ModuleEnv} [env]
    * @param {*} [data]
    * @returns {Promise<MdInstance<T>>}
    * @memberof ModuleBuilder
    */
    ModuleBuilder.prototype.bootstrap = function (token, env, data) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var loadmdl, cfg, container, builder, md, bootToken, anBuilder, bootInstance, runable;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(token, env)];
                    case 1:
                        loadmdl = _a.sent();
                        cfg = loadmdl.moduleConfig;
                        container = loadmdl.container;
                        builder = this.getBuilder(container, loadmdl.moduleToken, cfg);
                        if (!(builder && builder !== this)) return [3 /*break*/, 3];
                        return [4 /*yield*/, builder.bootstrap(token, loadmdl, data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.build(token, loadmdl, data)];
                    case 4:
                        md = _a.sent();
                        bootToken = this.getBootType(cfg);
                        anBuilder = this.getAnnoBuilder(container, bootToken, cfg.annotationBuilder);
                        return [4 /*yield*/, (bootToken ? anBuilder.build(bootToken, cfg, data) : anBuilder.buildByConfig(cfg, data))];
                    case 5:
                        bootInstance = _a.sent();
                        runable = void 0;
                        if (!bootInstance) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.autoRun(container, bootToken ? bootToken : anBuilder.getType(cfg), cfg, bootInstance)];
                    case 6:
                        runable = _a.sent();
                        if (!(md && core_1$$1.isFunction(md.mdOnStart))) return [3 /*break*/, 8];
                        return [4 /*yield*/, Promise.resolve(md.mdOnStart(bootInstance))];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.autoRun(container, loadmdl.moduleToken, cfg, md)];
                    case 10:
                        runable = _a.sent();
                        _a.label = 11;
                    case 11: return [2 /*return*/, runable];
                }
            });
        });
    };
    ModuleBuilder.prototype.getBuilder = function (container, token, cfg) {
        var builder;
        if (cfg) {
            if (core_1$$1.isClass(cfg.builder)) {
                if (!container.has(cfg.builder)) {
                    container.register(cfg.builder);
                }
            }
            if (core_1$$1.isToken(cfg.builder)) {
                builder = container.resolve(cfg.builder);
            }
            else if (cfg.builder instanceof ModuleBuilder_1) {
                builder = cfg.builder;
            }
        }
        if (!builder && token) {
            container.getTokenExtendsChain(token).forEach(function (tk) {
                if (builder) {
                    return false;
                }
                var buildToken = new IModuleBuilder.InjectModuleBuilderToken(tk);
                if (container.has(buildToken)) {
                    builder = container.get(buildToken);
                }
                return true;
            });
        }
        if (builder) {
            builder.setPools(this.getPools());
        }
        return builder || this;
    };
    ModuleBuilder.prototype.autoRun = function (container, token, cfg, instance) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var runner_1, service_1, provider_1;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!instance) {
                            return [2 /*return*/, null];
                        }
                        if (!(instance instanceof IRunner.Boot)) return [3 /*break*/, 2];
                        return [4 /*yield*/, instance.run()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, instance];
                    case 2:
                        if (!(instance instanceof Service_1.Service)) return [3 /*break*/, 4];
                        return [4 /*yield*/, instance.start()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, instance];
                    case 4:
                        provider_1 = { token: token, instance: instance, config: cfg };
                        container.getTokenExtendsChain(token).forEach(function (tk) {
                            if (runner_1 || service_1) {
                                return false;
                            }
                            var runnerToken = new IRunner.InjectRunnerToken(tk);
                            if (container.has(runnerToken)) {
                                runner_1 = container.resolve(runnerToken, provider_1);
                            }
                            var serviceToken = new Service_1.InjectServiceToken(tk);
                            if (container.has(serviceToken)) {
                                service_1 = container.resolve(serviceToken, provider_1);
                            }
                            return true;
                        });
                        if (!runner_1) {
                            this.getDefaultRunner(container, provider_1);
                        }
                        if (!runner_1 && !service_1) {
                            this.getDefaultService(container, provider_1);
                        }
                        if (!runner_1) return [3 /*break*/, 6];
                        return [4 /*yield*/, runner_1.run(instance)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, runner_1];
                    case 6:
                        if (!service_1) return [3 /*break*/, 8];
                        return [4 /*yield*/, service_1.start()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, service_1];
                    case 8:
                        if (!(token && cfg.autorun)) return [3 /*break*/, 10];
                        return [4 /*yield*/, container.invoke(token, cfg.autorun, instance)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, instance];
                    case 10: return [2 /*return*/, instance];
                }
            });
        });
    };
    ModuleBuilder.prototype.getDefaultRunner = function (container) {
        var provider = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            provider[_i - 1] = arguments[_i];
        }
        return null;
    };
    ModuleBuilder.prototype.getDefaultService = function (container) {
        var provider = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            provider[_i - 1] = arguments[_i];
        }
        return null;
    };
    ModuleBuilder.prototype.getAnnoBuilder = function (container, token, annBuilder) {
        var builder;
        if (core_1$$1.isClass(annBuilder)) {
            if (!container.has(annBuilder)) {
                container.register(annBuilder);
            }
        }
        if (core_1$$1.isToken(annBuilder)) {
            builder = container.resolve(annBuilder);
        }
        else if (annBuilder instanceof AnnotationBuilder_1.AnnotationBuilder) {
            builder = annBuilder;
        }
        if (!builder && token) {
            container.getTokenExtendsChain(token).forEach(function (tk) {
                if (builder) {
                    return false;
                }
                var buildToken = new IAnnotationBuilder.InjectAnnotationBuilder(tk);
                if (container.has(buildToken)) {
                    builder = container.resolve(buildToken);
                }
                return true;
            });
        }
        if (!builder) {
            builder = this.getDefaultAnnBuilder(container);
        }
        if (builder) {
            builder.container = container;
        }
        return builder;
    };
    ModuleBuilder.prototype.getDefaultAnnBuilder = function (container) {
        return container.resolve(IAnnotationBuilder.AnnotationBuilderToken);
    };
    ModuleBuilder.prototype.importModule = function (token, container) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var imp;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (container && core_1$$1.isClass(token) && !this.isDIModule(token)) {
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
        if (core_1$$1.isClass(token)) {
            cfg = this.getMetaConfig(token);
        }
        else if (core_1$$1.isToken(token)) {
            var tokenType = container ? container.getTokenImpl(token) : token;
            if (core_1$$1.isClass(tokenType)) {
                cfg = this.getMetaConfig(tokenType);
            }
        }
        else if (core_1$$1.isMetadataObject(token)) {
            cfg = token;
            var type = this.getType(cfg);
            if (type) {
                var typeTask = core_1$$1.isClass(type) ? type : (container ? container.getTokenImpl(type) : type);
                if (core_1$$1.isClass(typeTask)) {
                    cfg = core_1$$1.lang.assign({}, this.getMetaConfig(typeTask), cfg || {});
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
    /**
     * get module type
     *
     * @protected
     * @param {ModuleConfigure} cfg
     * @returns {Token<T>}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.getType = function (cfg) {
        return cfg.token || cfg.type;
    };
    /**
     * get boot type.
     *
     * @protected
     * @param {ModuleConfigure} cfg
     * @returns {Token<T>}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.getBootType = function (cfg) {
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
                        if (!(core_1$$1.isArray(config.imports) && config.imports.length)) return [3 /*break*/, 3];
                        buider = container.get(core_1$$1.ContainerBuilderToken);
                        return [4 /*yield*/, buider.loader.loadTypes(config.imports, function (it) { return _this.isIocExt(it) || _this.isDIModule(it); })];
                    case 1:
                        mdls = _a.sent();
                        return [4 /*yield*/, Promise.all(mdls.map(function (md) { return _this.importModule(md, container); }))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (core_1$$1.isArray(config.providers) && config.providers.length) {
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
            var metas = core_1$$1.getTypeMetadata(decorator, bootModule);
            if (metas && metas.length) {
                var meta = metas[0];
                return core_1$$1.lang.omit(meta, 'builder');
            }
        }
        return null;
    };
    ModuleBuilder.prototype.isIocExt = function (token) {
        return core_1$$1.hasOwnClassMetadata(core_1$$1.IocExt, token);
    };
    ModuleBuilder.prototype.isDIModule = function (token) {
        if (!core_1$$1.isClass(token)) {
            return false;
        }
        if (core_1$$1.hasOwnClassMetadata(this.getDecorator(), token)) {
            return true;
        }
        return core_1$$1.hasOwnClassMetadata(decorators.DIModule, token);
    };
    ModuleBuilder.prototype.registerExts = function (container, config) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
                // register for each container.
                // if (!container.hasRegister(AnnotationBuilder)) {
                //     container.register(AnnotationBuilder);
                // }
                return [2 /*return*/, container];
            });
        });
    };
    ModuleBuilder.prototype.bindProvider = function (container, providers) {
        var tokens = [];
        providers.forEach(function (p, index) {
            if (core_1$$1.isUndefined(p) || core_1$$1.isNull(p)) {
                return;
            }
            if (core_1$$1.isProviderMap(p)) {
                p.forEach(function (k, f) {
                    tokens.push(k);
                    container.bindProvider(k, f);
                });
            }
            else if (p instanceof core_1$$1.Provider) {
                tokens.push(p.type);
                container.bindProvider(p.type, function () {
                    var providers = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        providers[_i] = arguments[_i];
                    }
                    return p.resolve.apply(p, [container].concat(providers));
                });
            }
            else if (core_1$$1.isClass(p)) {
                if (!container.has(p)) {
                    tokens.push(p);
                    container.register(p);
                }
            }
            else if (core_1$$1.isBaseObject(p)) {
                var pr_1 = p;
                var isobjMap = false;
                if (core_1$$1.isToken(pr_1.provide)) {
                    if (core_1$$1.isArray(pr_1.deps) && pr_1.deps.length) {
                        pr_1.deps.forEach(function (d) {
                            if (core_1$$1.isClass(d) && !container.has(d)) {
                                container.register(d);
                            }
                        });
                    }
                    if (!core_1$$1.isUndefined(pr_1.useValue)) {
                        tokens.push(pr_1.provide);
                        container.bindProvider(pr_1.provide, function () { return pr_1.useValue; });
                    }
                    else if (core_1$$1.isClass(pr_1.useClass)) {
                        if (!container.has(pr_1.useClass)) {
                            container.register(pr_1.useClass);
                        }
                        tokens.push(pr_1.provide);
                        container.bindProvider(pr_1.provide, pr_1.useClass);
                    }
                    else if (core_1$$1.isFunction(pr_1.useFactory)) {
                        tokens.push(pr_1.provide);
                        container.bindProvider(pr_1.provide, function () {
                            var args = [];
                            if (core_1$$1.isArray(pr_1.deps) && pr_1.deps.length) {
                                args = pr_1.deps.map(function (d) {
                                    if (core_1$$1.isClass(d)) {
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
                    else if (core_1$$1.isToken(pr_1.useExisting)) {
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
                    core_1$$1.lang.forIn(p, function (val, name) {
                        if (!core_1$$1.isUndefined(val)) {
                            if (core_1$$1.isClass(val)) {
                                container.bindProvider(name, val);
                            }
                            else if (core_1$$1.isFunction(val) || core_1$$1.isString(val)) {
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
            else if (core_1$$1.isFunction(p)) {
                tokens.push(name);
                container.bindProvider(name, function () { return p; });
            }
        });
        return tokens;
    };
    var ModuleBuilder_1;
    ModuleBuilder.classAnnations = { "name": "ModuleBuilder", "params": { "constructor": [], "getPools": [], "setPools": ["pools"], "regDefaultContainer": [], "getContainer": ["token", "env", "parent"], "getConfigId": ["cfg"], "setParent": ["container", "parent"], "createContainer": [], "getContainerBuilder": [], "createContainerBuilder": [], "load": ["token", "env", "parent"], "build": ["token", "env", "data"], "bootstrap": ["token", "env", "data"], "getBuilder": ["container", "token", "cfg"], "autoRun": ["container", "token", "cfg", "instance"], "getDefaultRunner": ["container", "provider"], "getDefaultService": ["container", "provider"], "getAnnoBuilder": ["container", "token", "annBuilder"], "getDefaultAnnBuilder": ["container"], "importModule": ["token", "container"], "getDecorator": [], "getConfigure": ["token", "container"], "registerDepdences": ["container", "config"], "getType": ["cfg"], "getBootType": ["cfg"], "importConfigExports": ["container", "providerContainer", "cfg"], "registerConfgureDepds": ["container", "config"], "getMetaConfig": ["bootModule"], "isIocExt": ["token"], "isDIModule": ["token"], "registerExts": ["container", "config"], "bindProvider": ["container", "providers"] } };
    tslib_1$$1.__decorate([
        core_1$$1.Inject(core_1$$1.ContainerBuilderToken),
        tslib_1$$1.__metadata("design:type", Object)
    ], ModuleBuilder.prototype, "containerBuilder", void 0);
    ModuleBuilder = ModuleBuilder_1 = tslib_1$$1.__decorate([
        core_1$$1.Singleton(IModuleBuilder.ModuleBuilderToken),
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
        if (core_1$$1.isString(config)) {
            if (container) {
                var builder = container.resolve(core_1$$1.ContainerBuilderToken);
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
                    cfg = core_1$$1.lang.assign(cfg || {}, excfg || {});
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
        return core_1$$1.lang.assign({}, globalCfg, moduleCfg);
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

exports.ApplicationBuilderToken = new core_1$$1.InjectToken('DI_AppBuilder');


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
tslib_1$$1.__exportStar(IAnnotationBuilder, exports);
tslib_1$$1.__exportStar(AnnotationBuilder_1, exports);
tslib_1$$1.__exportStar(IRunner, exports);
tslib_1$$1.__exportStar(Service_1, exports);
tslib_1$$1.__exportStar(ModuleType, exports);


});

var index$1 = unwrapExports$$1(D__workspace_github_tsioc_packages_bootstrap_lib);

return index$1;

})));
});

unwrapExports(bootstrap_umd);

var Task = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function createTaskDecorator(t,r,n,i,o){return core_1.createClassDecorator("Task",function(e){i&&i(e), e.next({match:function(e){return e&&(core_1.isString(e)||core_1.isObject(e)&&e instanceof core_1.Registration)},setMetadata:function(e,t){core_1.isString(t)&&(e.name=t), e.provide=t;}}), e.next({match:function(e){return core_1.isString(e)||core_1.isToken(e)},setMetadata:function(e,t){core_1.isString(t)?e.name=t:e.annotationBuilder=t;}}), e.next({match:function(e){return core_1.isString(e)},setMetadata:function(e,t){e.name=t;}});},function(e){(o&&(e=o(e)), !e.name&&core_1.isClass(e.type))&&(/^[a-z]$/.test(e.type.name)&&e.type.classAnnations?e.name=e.type.classAnnations.name:e.name=e.type.name);return e.provide||(e.provide=e.name), n&&(e.provide=new core_1.Registration(n,e.provide.toString())), e.decorType=t, r&&!e.annotationBuilder&&(e.annotationBuilder=r), e})}exports.createTaskDecorator=createTaskDecorator, exports.Task=createTaskDecorator("Task",IActivityBuilder.ActivityBuilderToken);



});

unwrapExports(Task);
var Task_1 = Task.createTaskDecorator;
var Task_2 = Task.Task;

var Workflow = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function createWorkflowDecorator(e,r,t,o,i){return bootstrap_umd.createDIModuleDecorator(e,r,t,function(e){o&&o(e), e.next({match:function(e){return e&&(core_1.isString(e)||core_1.isObject(e)&&e instanceof core_1.Registration)},setMetadata:function(e,r){core_1.isString(r)?e.name=r:e.provide=r;}}), e.next({match:function(e){return core_1.isString(e)||core_1.isToken(e)},setMetadata:function(e,r){core_1.isString(r)?e.name=r:e.annotationBuilder=r;}}), e.next({match:function(e){return core_1.isString(e)},setMetadata:function(e,r){e.name=r;}});},i)}exports.createWorkflowDecorator=createWorkflowDecorator, exports.Workflow=createWorkflowDecorator("Workflow",ITaskContainer.WorkflowBuilderToken,IActivityBuilder.ActivityBuilderToken);



});

unwrapExports(Workflow);
var Workflow_1 = Workflow.createWorkflowDecorator;
var Workflow_2 = Workflow.Workflow;

var decorators = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(Task,exports), tslib_1.__exportStar(Workflow,exports);



});

unwrapExports(decorators);

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

var IActivityBuilder = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var InjectAcitityBuilderToken=function(e){function t(t){return e.call(this,t)||this}return tslib_1.__extends(t,e), t.classAnnations={name:"InjectAcitityBuilderToken",params:{constructor:["type"]}}, t}(bootstrap_umd.InjectAnnotationBuilder);exports.InjectAcitityBuilderToken=InjectAcitityBuilderToken, exports.ActivityBuilderToken=new InjectAcitityBuilderToken(Activity_1.Activity);



});

unwrapExports(IActivityBuilder);
var IActivityBuilder_1 = IActivityBuilder.InjectAcitityBuilderToken;
var IActivityBuilder_2 = IActivityBuilder.ActivityBuilderToken;

var IActivityRunner = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunState;exports.ActivityRunnerToken=new bootstrap_umd.InjectServiceToken(Activity_1.Activity), function(t){t[t.init=0]="init", t[t.running=1]="running", t[t.pause=2]="pause", t[t.stop=3]="stop", t[t.complete=4]="complete";}(RunState=exports.RunState||(exports.RunState={}));



});

unwrapExports(IActivityRunner);
var IActivityRunner_1 = IActivityRunner.ActivityRunnerToken;
var IActivityRunner_2 = IActivityRunner.RunState;

var uuid = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.UUIDToken=new core_1.InjectToken("uuid_factory");var RandomUUIDFactory=function(){function t(){}return t.prototype.generate=function(){return this.randomS4()+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+"-"+this.randomS4()+this.randomS4()+this.randomS4()}, t.prototype.randomS4=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)}, t.classAnnations={name:"RandomUUIDFactory",params:{constructor:[],generate:[],randomS4:[]}}, t=tslib_1.__decorate([core_1.Singleton(exports.UUIDToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.RandomUUIDFactory=RandomUUIDFactory;



});

unwrapExports(uuid);
var uuid_1 = uuid.UUIDToken;
var uuid_2 = uuid.RandomUUIDFactory;

var ActivityRunner_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var ActivityRunner=function(){function t(t,e,r){this.token=t, this.config=e, this.instance=r, this._result=new BehaviorSubject_1.BehaviorSubject(null), this.stateChanged=new BehaviorSubject_1.BehaviorSubject(IActivityRunner.RunState.init);}return Object.defineProperty(t.prototype,"activity",{get:function(){return this.token},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"configure",{get:function(){return this.config},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"result",{get:function(){return this._result.filter(function(t){return!t})},enumerable:!0,configurable:!0}), Object.defineProperty(t.prototype,"resultValue",{get:function(){return this._resultValue},enumerable:!0,configurable:!0}), t.prototype.start=function(r){return tslib_1.__awaiter(this,void 0,void 0,function(){var e=this;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return[4,this.instance.run(r).then(function(t){return e.state=IActivityRunner.RunState.complete, e.stateChanged.next(e.state), e._resultValue=t, e._result.next(t), t})];case 1:return[2,t.sent()]}})})}, t.prototype.saveState=function(t){this._currState=t;}, t.prototype.stop=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return this.state=IActivityRunner.RunState.stop, this.stateChanged.next(this.state), [2]})})}, t.prototype.pause=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return this.state=IActivityRunner.RunState.pause, this.stateChanged.next(this.state), [2]})})}, t.prototype.createUUID=function(){return this.container.has(uuid.UUIDToken)||this.container.register(uuid.RandomUUIDFactory), this.container.get(uuid.UUIDToken).generate()}, t.classAnnations={name:"ActivityRunner",params:{constructor:["token","config","instance"],start:["data"],saveState:["state"],stop:[],pause:[],createUUID:[]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), t=tslib_1.__decorate([decorators.Workflow(IActivityRunner.ActivityRunnerToken),tslib_1.__metadata("design:paramtypes",[Object,Object,Object])],t)}();exports.ActivityRunner=ActivityRunner;



});

unwrapExports(ActivityRunner_1);
var ActivityRunner_2 = ActivityRunner_1.ActivityRunner;

var ActivityConfigure = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});function isActivityRunner(i){return i instanceof ActivityRunner_1.ActivityRunner}function isActivityType(i,t){return void 0===t&&(t=!0), !!i&&(!isActivityRunner(i)&&(!core_1.isString(i)&&(!!core_1.isToken(i)||!!core_1.isMetadataObject(i)&&(!t||!!(i.activity||i.task||i.bootstrap)))))}exports.isActivityRunner=isActivityRunner, exports.isActivityType=isActivityType;



});

unwrapExports(ActivityConfigure);
var ActivityConfigure_1 = ActivityConfigure.isActivityRunner;
var ActivityConfigure_2 = ActivityConfigure.isActivityType;

var IActivity = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var InjectAcitityToken=function(e){function t(t){return e.call(this,"Activity",t)||this}return tslib_1.__extends(t,e), t.classAnnations={name:"InjectAcitityToken",params:{constructor:["desc"]}}, t}(core_1.Registration);exports.InjectAcitityToken=InjectAcitityToken, exports.ActivityToken=new InjectAcitityToken("");



});

unwrapExports(IActivity);
var IActivity_1 = IActivity.InjectAcitityToken;
var IActivity_2 = IActivity.ActivityToken;

var ActivityBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var ActivityBuilder=function(c){function t(){return null!==c&&c.apply(this,arguments)||this}return tslib_1.__extends(t,c), t.prototype.build=function(t,e,i){return c.prototype.build.call(this,t,e,i)}, t.prototype.buildByConfig=function(t,e){return c.prototype.buildByConfig.call(this,t,e)}, t.prototype.createInstance=function(r,n,o){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return core_1.isString(r)&&(r=this.traslateStrToken(r)), [4,c.prototype.createInstance.call(this,r,n,o)];case 1:return(e=t.sent())&&e instanceof Activity_1.Activity?[3,3]:(i=this.getDefaultAcitvity(), console.log(core_1.isClass(r)?core_1.getClassName(r):r.toString(),"is not right Activity, try load default activity:",core_1.getClassName(i)), n.token=i, [4,this.build(i,n,o)]);case 2:return[2,t.sent()];case 3:return core_1.isString(o)&&(e.id=o), core_1.isFunction(e.onActivityInit)?[4,Promise.resolve(e.onActivityInit(n))]:[3,5];case 4:t.sent(), t.label=5;case 5:return[2,e]}})})}, t.prototype.buildStrategy=function(e,i,t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return i.name&&(e.name=i.name), e.config=i, [2,e]})})}, t.prototype.getDefaultAcitvity=function(){return Activity_1.Activity}, t.prototype.getType=function(t){var e=t.activity||t.task||t.token||t.type;return core_1.isString(e)&&(e=this.traslateStrToken(e)), e}, t.prototype.getDecorator=function(){return decorators.Task.toString()}, t.prototype.resolveToken=function(t,e){var i=this.container.resolve(t);return i.id=e, i}, t.prototype.traslateStrToken=function(t){var e=new IActivity.InjectAcitityToken(t);return this.container.has(e)?e:t}, t.prototype.toExpression=function(e,i){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){switch(t.label){case 0:return ActivityConfigure.isActivityType(e)?[4,this.buildByConfig(e,i.id)]:[3,2];case 1:return[2,t.sent()];case 2:return[2,e]}})})}, t.prototype.toActivity=function(n,o,c,s,a){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,r;return tslib_1.__generator(this,function(t){switch(t.label){case 0:return ActivityConfigure.isActivityType(n,!a)?a?[4,this.buildByConfig(core_1.isToken(n)?n:a(n),o.id)]:[3,2]:[3,5];case 1:return e=t.sent(), [3,4];case 2:return[4,this.buildByConfig(n,o.id)];case 3:e=t.sent(), t.label=4;case 4:return[3,6];case 5:e=n, t.label=6;case 6:return c(e)?[2,e]:core_1.isString(e)?(i=e, [3,9]):[3,7];case 7:return[4,o.context.exec(o,e)];case 8:i=t.sent(), t.label=9;case 9:return r=s(i), a&&(r=a(r)), r?[4,this.buildByConfig(r,o.id)]:[3,11];case 10:return e=t.sent(), [3,12];case 11:e=null, t.label=12;case 12:return[2,e]}})})}, t.classAnnations={name:"ActivityBuilder",params:{build:["token","config","data"],buildByConfig:["activity","data"],createInstance:["token","config","uuid"],buildStrategy:["activity","config","container"],getDefaultAcitvity:[],getType:["config"],getDecorator:[],resolveToken:["token","uuid"],traslateStrToken:["token"],toExpression:["exptype","target"],toActivity:["exptype","target","isRightActivity","toConfig","valify"]}}, t=tslib_1.__decorate([core_1.Injectable(IActivityBuilder.ActivityBuilderToken)],t)}(bootstrap_umd.AnnotationBuilder);exports.ActivityBuilder=ActivityBuilder;



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
Object.defineProperty(exports,"__esModule",{value:!0});var Context=function(){function t(){}return t.prototype.getContainer=function(){return this.container}, t.prototype.getRootPath=function(){return(this.getContainer().get(bootstrap_umd.AppConfigureToken)||{}).baseURL||"."}, t.prototype.getEnvArgs=function(){return{}}, t.prototype.to=function(t,e){return core_1.isFunction(t)?core_1.isClass(t)?t:t(this,e):t}, t.prototype.exec=function(t,e,r){return core_1.isFunction(e)?e(t,r):core_1.isPromise(e)?e:e instanceof Activity_1.Activity?e.run(r,t):e instanceof ActivityRunner_1.ActivityRunner?e.start(r):Promise.resolve(e)}, t.prototype.isTask=function(t){return core_1.hasOwnClassMetadata(decorators.Task,t)}, t.classAnnations={name:"Context",params:{constructor:[],getContainer:[],getRootPath:[],getEnvArgs:[],to:["target","config"],exec:["target","expression","data"],isTask:["task"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), tslib_1.__decorate([core_1.Inject(IActivityBuilder.ActivityBuilderToken),tslib_1.__metadata("design:type",ActivityBuilder_1.ActivityBuilder)],t.prototype,"builder",void 0), t=tslib_1.__decorate([core_1.Singleton(IContext.ContextToken),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.Context=Context;



});

unwrapExports(Context_1);
var Context_2 = Context_1.Context;

var core = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(IActivityBuilder,exports), tslib_1.__exportStar(ActivityBuilder_1,exports), tslib_1.__exportStar(IActivity,exports), tslib_1.__exportStar(Activity_1,exports), tslib_1.__exportStar(ExpressionActivity_1,exports), tslib_1.__exportStar(ActivityConfigure,exports), tslib_1.__exportStar(decorators,exports), tslib_1.__exportStar(IContext,exports), tslib_1.__exportStar(Context_1,exports), tslib_1.__exportStar(IActivityRunner,exports), tslib_1.__exportStar(ActivityRunner_1,exports), tslib_1.__exportStar(uuid,exports);



});

unwrapExports(core);

var ITaskContainer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});exports.WorkflowBuilderToken=new bootstrap_umd.InjectModuleBuilderToken(core.Activity), exports.TaskContainerToken=new core_1.InjectToken("__TASK_TaskContainer");



});

unwrapExports(ITaskContainer);
var ITaskContainer_1 = ITaskContainer.WorkflowBuilderToken;
var ITaskContainer_2 = ITaskContainer.TaskContainerToken;

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
Object.defineProperty(exports,"__esModule",{value:!0});exports.SequenceActivityToken=new core.InjectAcitityToken("sequence");var SequenceActivity=function(i){function e(){var e=i.call(this)||this;return e.activites=[], e}var c;return tslib_1.__extends(e,i), (c=e).prototype.onActivityInit=function(t){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,i.prototype.onActivityInit.call(this,t)];case 1:return e.sent(), t.sequence&&t.sequence.length?[4,this.buildChildren(this,t.sequence)]:[3,3];case 2:e.sent(), e.label=3;case 3:return[2]}})})}, e.prototype.buildChildren=function(i,r){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,n=this;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,Promise.all(r.map(function(i){return tslib_1.__awaiter(n,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.buildActivity(i)];case 1:return(t=e.sent())?t instanceof c&&!core_1.isToken(i)&&i.sequence&&i.sequence.length?[4,t.buildChildren(t,i.sequence)]:[3,3]:[2,null];case 2:e.sent(), e.label=3;case 3:return[2,t]}})})}))];case 1:return t=e.sent(), i.activites=t, [2,i]}})})}, e.prototype.run=function(i,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return[4,this.before(i,n)];case 1:return t=e.sent(), [4,this.execute(t,n)];case 2:return t=e.sent(), [4,this.after(t,n)];case 3:return[2,t=e.sent()]}})})}, e.prototype.before=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,t]})})}, e.prototype.execute=function(e,t){var i=Promise.resolve(e);return this.activites.forEach(function(t){i=i.then(function(e){return t.run(e)});}), i}, e.prototype.after=function(t,e){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(e){return[2,t]})})}, e.classAnnations={name:"SequenceActivity",params:{constructor:[],onActivityInit:["config"],buildChildren:["activity","configs"],run:["data","execute"],before:["data","execute"],execute:["data","execute"],after:["data","execute"]}}, e=c=tslib_1.__decorate([core.Task(exports.SequenceActivityToken),tslib_1.__metadata("design:paramtypes",[])],e)}(core.Activity);exports.SequenceActivity=SequenceActivity;



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

var RunAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var RunAspect=function(){function t(){}return t.prototype.beforeRun=function(t){var e=this.getRunner(t.target);if(e)switch(e.saveState(t), e.state){case core.RunState.pause:throw new Error("workflow paused!");case core.RunState.stop:throw new Error("workflow stop!")}}, t.prototype.afterRun=function(t){var e=this.getRunner(t.target);if(e)switch(e.saveState(t), e.state){case core.RunState.pause:throw new Error("workflow paused!");case core.RunState.stop:throw new Error("workflow stop!")}}, t.prototype.getRunner=function(t){return t instanceof core.Activity&&t.id&&this.container.has(t.id)?this.container.resolve(t.id):null}, t.classAnnations={name:"RunAspect",params:{constructor:[],beforeRun:["joinPoint"],afterRun:["joinPoint"],getRunner:["task"]}}, tslib_1.__decorate([core_1.Inject(core_1.ContainerToken),tslib_1.__metadata("design:type",Object)],t.prototype,"container",void 0), tslib_1.__decorate([aop_1.Before("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"beforeRun",null), tslib_1.__decorate([aop_1.AfterReturning("execution(*.run)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"afterRun",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core.Task,singleton:!0}),tslib_1.__metadata("design:paramtypes",[])],t)}();exports.RunAspect=RunAspect;



});

unwrapExports(RunAspect_1);
var RunAspect_2 = RunAspect_1.RunAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(RunAspect_1,exports);



});

unwrapExports(aop);

var DefaultWorkflowBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var DefaultWorkflowBuilder=function(i){function e(){return null!==i&&i.apply(this,arguments)||this}return tslib_1.__extends(e,i), e.prototype.bootstrap=function(r,o,n){return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return t=this.getContainer(r,o), n=n||this.createUUID(t), [4,i.prototype.bootstrap.call(this,r,o,n)];case 1:return[2,e.sent()]}})})}, e.prototype.getDefaultTypeBuilder=function(e){return e.resolve(core.ActivityBuilderToken)}, e.prototype.getDecorator=function(){return core.Task.toString()}, e.prototype.createUUID=function(e){return e.has(core.UUIDToken)||e.register(core.RandomUUIDFactory), e.get(core.UUIDToken).generate()}, e.prototype.getBootTyp=function(e){return e.activity||e.task||i.prototype.getBootType.call(this,e)}, e.prototype.getConfigId=function(e){return e.id||e.name}, e.prototype.getDefaultService=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return e.resolve.apply(e,[core.ActivityRunnerToken].concat(t))}, e.classAnnations={name:"DefaultWorkflowBuilder",params:{bootstrap:["activity","env","workflowId"],getDefaultTypeBuilder:["container"],getDecorator:[],createUUID:["container"],getBootTyp:["config"],getConfigId:["config"],getDefaultService:["container","providers"]}}, e=tslib_1.__decorate([core_1.Singleton(ITaskContainer.WorkflowBuilderToken)],e)}(bootstrap_umd.ModuleBuilder);exports.DefaultWorkflowBuilder=DefaultWorkflowBuilder;



});

unwrapExports(DefaultWorkflowBuilder_1);
var DefaultWorkflowBuilder_2 = DefaultWorkflowBuilder_1.DefaultWorkflowBuilder;

var CoreModule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var CoreModule=function(){function e(e){this.container=e;}return e.prototype.setup=function(){var e=this.container,r=e.getLifeScope();r.registerDecorator(core.Workflow,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), r.registerDecorator(core.Task,core_1.CoreActions.bindProvider,core_1.CoreActions.cache,core_1.CoreActions.componentBeforeInit,core_1.CoreActions.componentInit,core_1.CoreActions.componentAfterInit), e.register(core.ActivityBuilder), e.register(core.ActivityRunner), e.register(core.Context), e.register(aop.RunAspect), e.register(core.Activity), e.register(DefaultWorkflowBuilder_1.DefaultWorkflowBuilder), e.use(activities);}, e.classAnnations={name:"CoreModule",params:{constructor:["container"],setup:[]}}, e=tslib_1.__decorate([core_1.IocExt("setup"),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],e)}();exports.CoreModule=CoreModule;



});

unwrapExports(CoreModule_1);
var CoreModule_2 = CoreModule_1.CoreModule;

var DefaultTaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});var DefaultTaskContainer=function(){function e(e){this.baseURL=e;}return e.prototype.getContainer=function(){return this.container||(this.container=this.getBuilder().getPools().getDefault()), this.container}, e.prototype.getBuilder=function(){return this.builder||(this.builder=this.createAppBuilder(), this.builder.use(aop_1.AopModule).use(logs.LogModule).use(CoreModule_1.CoreModule)), this.builder}, e.prototype.createAppBuilder=function(){return new bootstrap_umd.DefaultApplicationBuilder(this.baseURL)}, e.prototype.useConfiguration=function(e,t){return this.getBuilder().useConfiguration(e,t), this}, e.prototype.use=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return(e=this.getBuilder()).use.apply(e,t), this}, e.prototype.useLog=function(e){return core_1.hasClassMetadata(aop_1.Aspect,e)?this.getBuilder().use(e):console.error("logAspect param is not right aspect"), this}, e.prototype.getWorkflow=function(e){return this.getContainer().resolve(e)}, e.prototype.createActivity=function(o,i){return tslib_1.__awaiter(this,void 0,void 0,function(){var t,r;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return i=i||this.createUUID(), core_1.isToken(o)?t={id:i,token:o,builder:ITaskContainer.WorkflowBuilderToken,annotationBuilder:core.ActivityBuilderToken}:((t=o||{}).id=i, t.builder=t.builder||ITaskContainer.WorkflowBuilderToken, t.annotationBuilder=t.annotationBuilder||core.ActivityBuilderToken), [4,this.getBuilder().bootstrap(t,null,i)];case 1:return r=e.sent(), this.getContainer().bindProvider(i,r), [2,r]}})})}, e.prototype.createUUID=function(){var e=this.getContainer();return e.has(core.UUIDToken)||e.register(core.RandomUUIDFactory), e.get(core.UUIDToken).generate()}, e.prototype.bootstrap=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return tslib_1.__awaiter(this,void 0,void 0,function(){var t;return tslib_1.__generator(this,function(e){switch(e.label){case 0:return t=1<r.length?{sequence:r,task:activities.SequenceActivity}:core_1.lang.first(r), [4,this.createActivity(t)];case 1:return[2,e.sent()]}})})}, e.classAnnations={name:"DefaultTaskContainer",params:{constructor:["baseURL"],getContainer:[],getBuilder:[],createAppBuilder:[],useConfiguration:["config","container"],use:["modules"],useLog:["logAspect"],getWorkflow:["workflowId"],createActivity:["activity","workflowId"],createUUID:[],bootstrap:["activites"]}}, e}();exports.DefaultTaskContainer=DefaultTaskContainer;



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
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(ITaskContainer,exports), tslib_1.__exportStar(DefaultTaskContainer_1,exports), tslib_1.__exportStar(DefaultWorkflowBuilder_1,exports), tslib_1.__exportStar(utils,exports), tslib_1.__exportStar(core,exports), tslib_1.__exportStar(aop,exports), tslib_1.__exportStar(activities,exports), tslib_1.__exportStar(CoreModule_1,exports);



});

var index$5 = unwrapExports(D__workspace_github_typeTask_packages_core_lib);

return index$5;

})));
