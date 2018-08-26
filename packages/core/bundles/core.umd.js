(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tslib'), require('@ts-ioc/core'), require('reflect-metadata'), require('events'), require('rxjs/BehaviorSubject'), require('rxjs/add/operator/filter'), require('@ts-ioc/aop'), require('@ts-ioc/logs')) :
	typeof define === 'function' && define.amd ? define(['tslib', '@ts-ioc/core', 'reflect-metadata', 'events', 'rxjs/BehaviorSubject', 'rxjs/add/operator/filter', '@ts-ioc/aop', '@ts-ioc/logs'], factory) :
	(global.core = global.core || {}, global.core.umd = global.core.umd || {}, global.core.umd.js = factory(global.tslib_1,global.core_1,global.Reflect,global.events,global.BehaviorSubject_1,global.filter,global.aop_1,global.logs));
}(this, (function (tslib_1,core_1,reflectMetadata,events,BehaviorSubject_1,filter,aop_1,logs) { 'use strict';

tslib_1 = tslib_1 && tslib_1.hasOwnProperty('default') ? tslib_1['default'] : tslib_1;
core_1 = core_1 && core_1.hasOwnProperty('default') ? core_1['default'] : core_1;
reflectMetadata = reflectMetadata && reflectMetadata.hasOwnProperty('default') ? reflectMetadata['default'] : reflectMetadata;
events = events && events.hasOwnProperty('default') ? events['default'] : events;
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

var ITaskContainer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * TaskContainer token.
 */
exports.TaskContainerToken = new core_1.InjectToken('__TASK_TaskContainer');




});

unwrapExports(ITaskContainer);
var ITaskContainer_1 = ITaskContainer.TaskContainerToken;

var bootstrap_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory(tslib_1, core_1, reflectMetadata, events);
}(commonjsGlobal, (function (tslib_1$$1,core_1$$2,reflectMetadata$$1,events$$1) { tslib_1$$1 = tslib_1$$1 && tslib_1$$1.hasOwnProperty('default') ? tslib_1$$1['default'] : tslib_1$$1;
core_1$$2 = core_1$$2 && core_1$$2.hasOwnProperty('default') ? core_1$$2['default'] : core_1$$2;
reflectMetadata$$1 = reflectMetadata$$1 && reflectMetadata$$1.hasOwnProperty('default') ? reflectMetadata$$1['default'] : reflectMetadata$$1;
events$$1 = events$$1 && events$$1.hasOwnProperty('default') ? events$$1['default'] : events$$1;

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
    return core_1$$2.createClassDecorator(name, function (args) {
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
    return core_1$$2.createClassDecorator(name, function (args) {
        if (adapter) {
            adapter(args);
        }
    }, function (metadata) {
        if (metadataExtends) {
            metadata = metadataExtends(metadata);
        }
        if (!metadata.name && core_1$$2.isClass(metadata.token)) {
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
        if (metadata.builder) {
            setTimeout(function () {
                var builderType = metadata.builder;
                var builder;
                if (core_1$$2.isClass(builderType)) {
                    builder = core_1$$2.isFunction(builderType['create']) ? builderType['create']() : new builderType();
                }
                else if (core_1$$2.isObject(builderType)) {
                    builder = builderType;
                }
                if (builder) {
                    if (metadata.globals) {
                        builder.use.apply(builder, metadata.globals);
                    }
                    builder.bootstrap(metadata.type);
                }
            }, 500);
        }
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
exports.AppConfigureToken = new core_1$$2.InjectToken('DI_APP_Configuration');
/**
 * application default configuration token.
 */
exports.DefaultConfigureToken = new core_1$$2.InjectToken('DI_Default_Configuration');
/**
 *  app configure loader token.
 */
exports.AppConfigureLoaderToken = new core_1$$2.InjectToken('DI_Configure_Loader');


});

unwrapExports$$1(AppConfigure);
var AppConfigure_1 = AppConfigure.AppConfigureToken;
var AppConfigure_2 = AppConfigure.DefaultConfigureToken;
var AppConfigure_3 = AppConfigure.AppConfigureLoaderToken;

var DIModuleValidate = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * DIModuel Validate Token
 */
exports.DIModuelValidateToken = new core_1$$2.InjectModuleValidateToken(decorators.DIModule.toString());
/**
 * DIModuel Validate
 *
 * @export
 * @class DIModuelValidate
 * @extends {BaseModuelValidate}
 */
var DIModuelValidate = /** @class */ (function (_super) {
    tslib_1$$1.__extends(DIModuelValidate, _super);
    function DIModuelValidate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DIModuelValidate.prototype.getDecorator = function () {
        return decorators.DIModule.toString();
    };
    DIModuelValidate.classAnnations = { "name": "DIModuelValidate", "params": { "getDecorator": [] } };
    DIModuelValidate = tslib_1$$1.__decorate([
        core_1$$2.Singleton(exports.DIModuelValidateToken)
    ], DIModuelValidate);
    return DIModuelValidate;
}(core_1$$2.BaseModuelValidate));
exports.DIModuelValidate = DIModuelValidate;


});

unwrapExports$$1(DIModuleValidate);
var DIModuleValidate_1 = DIModuleValidate.DIModuelValidateToken;
var DIModuleValidate_2 = DIModuleValidate.DIModuelValidate;

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
    ContainerPool.prototype.create = function (parent) {
        parent = parent || this.getDefault();
        var container = parent.getBuilder().create();
        this.setParent(container, parent);
        return container;
    };
    ContainerPool.prototype.setParent = function (container, parent) {
        if (this.isDefault(container)) {
            return;
        }
        // if (!container.parent) {
        if (parent && parent !== container) {
            container.parent = parent;
        }
        else {
            container.parent = this.getDefault();
        }
        // }
    };
    ContainerPool.classAnnations = { "name": "ContainerPool", "params": { "constructor": [], "getTokenKey": ["token"], "isDefault": ["container"], "hasDefault": [], "setDefault": ["container"], "getDefault": [], "set": ["token", "container"], "get": ["token"], "has": ["token"], "create": ["parent"], "setParent": ["container", "parent"] } };
    return ContainerPool;
}());
exports.ContainerPool = ContainerPool;
exports.ContainerPoolToken = new core_1$$2.InjectToken('ContainerPool');
// /**
//  *  global container pools.
//  */
// export const containerPools = new ContainerPool();


});

unwrapExports$$1(ContainerPool_1);
var ContainerPool_2 = ContainerPool_1.ContainerPool;
var ContainerPool_3 = ContainerPool_1.ContainerPoolToken;

var utils = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$1.__exportStar(ContainerPool_1, exports);


});

unwrapExports$$1(utils);

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
}(core_1$$2.Registration));
exports.InjectAnnotationBuilder = InjectAnnotationBuilder;
/**
 * Annotation class builder token.
 */
exports.AnnotationBuilderToken = new core_1$$2.Registration(Object, annoBuilderDesc);
/**
 * Default Annotation class builder token.
 */
exports.DefaultAnnotationBuilderToken = new InjectAnnotationBuilder('default');


});

unwrapExports$$1(IAnnotationBuilder);
var IAnnotationBuilder_1 = IAnnotationBuilder.InjectAnnotationBuilder;
var IAnnotationBuilder_2 = IAnnotationBuilder.AnnotationBuilderToken;
var IAnnotationBuilder_3 = IAnnotationBuilder.DefaultAnnotationBuilderToken;

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
                        if (core_1$$2.isClass(token) && !this.container.hasRegister(token)) {
                            this.container.register(token);
                        }
                        config = this.getTokenMetaConfig(token, config);
                        builder = this.getBuilder(token, config);
                        if (!!this.isEqual(builder)) return [3 /*break*/, 1];
                        return [2 /*return*/, builder.build(token, config, data)];
                    case 1: return [4 /*yield*/, this.createInstance(token, config, data)];
                    case 2:
                        instance = _a.sent();
                        if (!instance) {
                            return [2 /*return*/, null];
                        }
                        if (!core_1$$2.isFunction(instance.anBeforeInit)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.resolve(instance.anBeforeInit(config))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.buildStrategy(instance, config)];
                    case 5:
                        instance = (_a.sent());
                        if (!core_1$$2.isFunction(instance.anAfterInit)) return [3 /*break*/, 7];
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
                if (core_1$$2.isToken(config)) {
                    token = config;
                    return [2 /*return*/, this.build(token, null, data)];
                }
                else {
                    token = this.getType(config);
                    return [2 /*return*/, this.build(token, config, data)];
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
                    console.log('can not find annotation token.');
                    return [2 /*return*/, null];
                }
                if (!this.container.has(token)) {
                    console.log("can not find token " + (token ? token.toString() : null) + " in container.");
                    return [2 /*return*/, null];
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
            if (core_1$$2.isClass(config.annotationBuilder)) {
                if (!this.container.has(config.annotationBuilder)) {
                    this.container.register(config.annotationBuilder);
                }
            }
            if (core_1$$2.isToken(config.annotationBuilder)) {
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
    AnnotationBuilder.prototype.getDecorator = function () {
        return decorators.Annotation.toString();
    };
    AnnotationBuilder.prototype.getMetaConfig = function (token) {
        var decorator = this.getDecorator();
        if (core_1$$2.hasOwnClassMetadata(decorator, token)) {
            var metas = core_1$$2.getTypeMetadata(decorator, token);
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
        core_1$$2.Inject(core_1$$2.ContainerToken),
        tslib_1$$1.__metadata("design:type", Object)
    ], AnnotationBuilder.prototype, "container", void 0);
    AnnotationBuilder = AnnotationBuilder_1 = tslib_1$$1.__decorate([
        core_1$$2.Injectable(IAnnotationBuilder.AnnotationBuilderToken),
        tslib_1$$1.__metadata("design:paramtypes", [])
    ], AnnotationBuilder);
    return AnnotationBuilder;
}());
exports.AnnotationBuilder = AnnotationBuilder;


});

unwrapExports$$1(AnnotationBuilder_1);
var AnnotationBuilder_2 = AnnotationBuilder_1.AnnotationBuilder;

var MetaAccessor_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * application service token.
 *
 * @export
 * @class InjectMetaAccessorToken
 * @extends {Registration<MetaAccessor<T>>}
 * @template T
 */
var InjectMetaAccessorToken = /** @class */ (function (_super) {
    tslib_1$$1.__extends(InjectMetaAccessorToken, _super);
    function InjectMetaAccessorToken(type) {
        return _super.call(this, type, 'boot__metaAccessor') || this;
    }
    InjectMetaAccessorToken.classAnnations = { "name": "InjectMetaAccessorToken", "params": { "constructor": ["type"] } };
    return InjectMetaAccessorToken;
}(core_1$$2.Registration));
exports.InjectMetaAccessorToken = InjectMetaAccessorToken;
/**
 * default MetaAccessor token.
 */
exports.DefaultMetaAccessorToken = new InjectMetaAccessorToken('default');
var MetaAccessor = /** @class */ (function () {
    function MetaAccessor(decorator) {
        this.decorator = decorator;
    }
    MetaAccessor.prototype.getDecorator = function () {
        return this.decorator;
    };
    MetaAccessor.prototype.getMetadata = function (token, container) {
        var type = core_1$$2.isClass(token) ? token : container.getTokenImpl(token);
        if (core_1$$2.isClass(type)) {
            var metas = core_1$$2.getTypeMetadata(this.getDecorator(), type);
            if (metas && metas.length) {
                var meta = metas[0];
                return meta;
            }
        }
        return {};
    };
    MetaAccessor.classAnnations = { "name": "MetaAccessor", "params": { "constructor": ["decorator"], "getDecorator": [], "getMetadata": ["token", "container"] } };
    MetaAccessor = tslib_1$$1.__decorate([
        core_1$$2.Injectable(exports.DefaultMetaAccessorToken),
        tslib_1$$1.__metadata("design:paramtypes", [String])
    ], MetaAccessor);
    return MetaAccessor;
}());
exports.MetaAccessor = MetaAccessor;
/**
 * Annotation MetaAccessor token.
 */
exports.AnnotationMetaAccessorToken = new InjectMetaAccessorToken('Annotation');
/**
 * Annotation MetaAccessor.
 *
 * @export
 * @class AnnotationMetaAccessor
 * @implements {IMetaAccessor<any>}
 */
var AnnotationMetaAccessor = /** @class */ (function () {
    function AnnotationMetaAccessor(decorator) {
        this.decorator = decorator;
    }
    AnnotationMetaAccessor.prototype.getDecorator = function () {
        return this.decorator;
    };
    AnnotationMetaAccessor.prototype.getMetadata = function (token, container) {
        if (core_1$$2.isToken(token)) {
            var accessor_1;
            var provider_1 = { decorator: this.getDecorator() };
            container.getTokenExtendsChain(token).forEach(function (tk) {
                if (accessor_1) {
                    return false;
                }
                var accToken = new InjectMetaAccessorToken(tk);
                if (container.has(accToken)) {
                    accessor_1 = container.resolve(accToken, provider_1);
                }
                return true;
            });
            if (!accessor_1) {
                accessor_1 = this.getDefaultMetaAccessor(container, provider_1);
            }
            if (accessor_1) {
                return accessor_1.getMetadata(token, container);
            }
            else {
                return {};
            }
        }
        return {};
    };
    AnnotationMetaAccessor.prototype.getDefaultMetaAccessor = function (container) {
        var providers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            providers[_i - 1] = arguments[_i];
        }
        return container.resolve.apply(container, [exports.DefaultMetaAccessorToken].concat(providers));
    };
    AnnotationMetaAccessor.classAnnations = { "name": "AnnotationMetaAccessor", "params": { "constructor": ["decorator"], "getDecorator": [], "getMetadata": ["token", "container"], "getDefaultMetaAccessor": ["container", "providers"] } };
    AnnotationMetaAccessor = tslib_1$$1.__decorate([
        core_1$$2.Injectable(exports.AnnotationMetaAccessorToken),
        tslib_1$$1.__metadata("design:paramtypes", [String])
    ], AnnotationMetaAccessor);
    return AnnotationMetaAccessor;
}());
exports.AnnotationMetaAccessor = AnnotationMetaAccessor;


});

unwrapExports$$1(MetaAccessor_1);
var MetaAccessor_2 = MetaAccessor_1.InjectMetaAccessorToken;
var MetaAccessor_3 = MetaAccessor_1.DefaultMetaAccessorToken;
var MetaAccessor_4 = MetaAccessor_1.MetaAccessor;
var MetaAccessor_5 = MetaAccessor_1.AnnotationMetaAccessorToken;
var MetaAccessor_6 = MetaAccessor_1.AnnotationMetaAccessor;

var annotations = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$1.__exportStar(AnnotationBuilder_1, exports);
tslib_1$$1.__exportStar(IAnnotationBuilder, exports);
tslib_1$$1.__exportStar(MetaAccessor_1, exports);


});

unwrapExports$$1(annotations);

var InjectedModule_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * injected module.
 *
 * @export
 * @class InjectedModule
 * @template T
 */
var InjectedModule = /** @class */ (function () {
    function InjectedModule(token, config, container) {
        this.token = token;
        this.config = config;
        this.container = container;
    }
    InjectedModule.classAnnations = { "name": "InjectedModule", "params": { "constructor": ["token", "config", "container"] } };
    return InjectedModule;
}());
exports.InjectedModule = InjectedModule;
/**
 * Injected Module Token.
 *
 * @export
 * @class InjectModuleMetaConfigToken
 * @extends {Registration<Type<T>>}
 * @template T
 */
var InjectedModuleToken = /** @class */ (function (_super) {
    tslib_1$$1.__extends(InjectedModuleToken, _super);
    function InjectedModuleToken(type) {
        return _super.call(this, type, 'InjectedModule') || this;
    }
    InjectedModuleToken.classAnnations = { "name": "InjectedModuleToken", "params": { "constructor": ["type"] } };
    return InjectedModuleToken;
}(core_1$$2.Registration));
exports.InjectedModuleToken = InjectedModuleToken;


});

unwrapExports$$1(InjectedModule_1);
var InjectedModule_2 = InjectedModule_1.InjectedModule;
var InjectedModule_3 = InjectedModule_1.InjectedModuleToken;

var DIModuleInjector_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });







var exportsProvidersFiled = '__exportProviders';
/**
 * DIModule injector token.
 */
exports.DIModuleInjectorToken = new core_1$$2.InjectModuleInjectorToken(decorators.DIModule.toString());
/**
 * DIModule injector.
 *
 * @export
 * @class DIModuleInjector
 * @extends {ModuleInjector}
 */
var DIModuleInjector = /** @class */ (function (_super) {
    tslib_1$$1.__extends(DIModuleInjector, _super);
    function DIModuleInjector(validate) {
        return _super.call(this, validate) || this;
    }
    DIModuleInjector.prototype.setup = function (container, type) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.importModule(container, type)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DIModuleInjector.prototype.import = function (container, type) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var injMd;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validate.validate(type)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.importModule(container, type)];
                    case 1:
                        injMd = _a.sent();
                        return [2 /*return*/, injMd];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    DIModuleInjector.prototype.importByConfig = function (container, config) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerConfgureDepds(container, config)];
                    case 1:
                        _a.sent();
                        if (!(core_1$$2.isArray(config.providers) && config.providers.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.bindProvider(container, config.providers)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    DIModuleInjector.prototype.importModule = function (container, type) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var pools, newContainer, metaConfig, injMd;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pools = container.get(utils.ContainerPoolToken);
                        newContainer = pools.create(container);
                        newContainer.register(type);
                        metaConfig = this.getMetaConfig(type, newContainer);
                        return [4 /*yield*/, this.registerConfgureDepds(newContainer, metaConfig)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.importConfigExports(container, newContainer, metaConfig, type)];
                    case 2:
                        _a.sent();
                        injMd = new InjectedModule_1.InjectedModule(type, metaConfig, newContainer);
                        container.bindProvider(new InjectedModule_1.InjectedModuleToken(type), injMd);
                        return [2 /*return*/, injMd];
                }
            });
        });
    };
    DIModuleInjector.prototype.getMetaConfig = function (token, container) {
        if (core_1$$2.isToken(token)) {
            var accessor = this.getMetaAccessor(container);
            return accessor.getMetadata(token, container);
        }
        return null;
    };
    DIModuleInjector.prototype.getMetaAccessor = function (container) {
        var decorator = this.validate.getDecorator();
        return container.resolve(annotations.AnnotationMetaAccessorToken, { decorator: decorator });
    };
    DIModuleInjector.prototype.registerConfgureDepds = function (container, config) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(core_1$$2.isArray(config.imports) && config.imports.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, container.loadModule.apply(container, config.imports)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (core_1$$2.isArray(config.providers) && config.providers.length) {
                            config[exportsProvidersFiled] = this.bindProvider(container, config.providers);
                        }
                        return [2 /*return*/, config];
                }
            });
        });
    };
    DIModuleInjector.prototype.importConfigExports = function (container, providerContainer, cfg, mdl) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var expProviders;
            return tslib_1$$1.__generator(this, function (_a) {
                if (container === providerContainer) {
                    return [2 /*return*/, container];
                }
                if (cfg.exports && cfg.exports.length) {
                    cfg.exports.forEach(function (tk) {
                        container.bindProvider(tk, function () {
                            var providers = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                providers[_i] = arguments[_i];
                            }
                            return providerContainer.resolve.apply(providerContainer, [tk].concat(providers));
                        });
                    });
                }
                if (mdl) {
                    container.bindProvider(mdl, function () {
                        var providers = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            providers[_i] = arguments[_i];
                        }
                        return providerContainer.resolve.apply(providerContainer, [mdl].concat(providers));
                    });
                }
                expProviders = cfg[exportsProvidersFiled];
                if (expProviders && expProviders.length) {
                    expProviders.forEach(function (tk) {
                        container.bindProvider(tk, function () { return providerContainer.get(tk); });
                    });
                }
                return [2 /*return*/, container];
            });
        });
    };
    DIModuleInjector.prototype.bindProvider = function (container, providers) {
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
    DIModuleInjector.classAnnations = { "name": "DIModuleInjector", "params": { "constructor": ["validate"], "setup": ["container", "type"], "import": ["container", "type"], "importByConfig": ["container", "config"], "importModule": ["container", "type"], "getMetaConfig": ["token", "container"], "getMetaAccessor": ["container"], "registerConfgureDepds": ["container", "config"], "importConfigExports": ["container", "providerContainer", "cfg", "mdl"], "bindProvider": ["container", "providers"] } };
    DIModuleInjector = tslib_1$$1.__decorate([
        core_1$$2.Injectable(exports.DIModuleInjectorToken),
        tslib_1$$1.__param(0, core_1$$2.Inject(DIModuleValidate.DIModuelValidateToken)),
        tslib_1$$1.__metadata("design:paramtypes", [Object])
    ], DIModuleInjector);
    return DIModuleInjector;
}(core_1$$2.ModuleInjector));
exports.DIModuleInjector = DIModuleInjector;


});

unwrapExports$$1(DIModuleInjector_1);
var DIModuleInjector_2 = DIModuleInjector_1.DIModuleInjectorToken;
var DIModuleInjector_3 = DIModuleInjector_1.DIModuleInjector;

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
}(core_1$$2.Registration));
exports.InjectModuleBuilderToken = InjectModuleBuilderToken;
/**
 * default module builder token.
 */
exports.DefaultModuleBuilderToken = new InjectModuleBuilderToken(Object);
/**
 * module builder token.
 */
exports.ModuleBuilderToken = new core_1$$2.Registration(Object, moduleBuilderDesc);


});

unwrapExports$$1(IModuleBuilder);
var IModuleBuilder_1 = IModuleBuilder.InjectModuleBuilderToken;
var IModuleBuilder_2 = IModuleBuilder.DefaultModuleBuilderToken;
var IModuleBuilder_3 = IModuleBuilder.ModuleBuilderToken;

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
}(core_1$$2.Registration));
exports.InjectRunnerToken = InjectRunnerToken;
/**
 * default runner token.
 */
exports.DefaultRunnerToken = new InjectRunnerToken('default');


});

unwrapExports$$1(IRunner);
var IRunner_1 = IRunner.Boot;
var IRunner_2 = IRunner.InjectRunnerToken;
var IRunner_3 = IRunner.DefaultRunnerToken;

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
}(core_1$$2.Registration));
exports.InjectServiceToken = InjectServiceToken;
/**
 * default service token.
 */
exports.DefaultServiceToken = new InjectServiceToken('default');


});

unwrapExports$$1(Service_1);
var Service_2 = Service_1.Service;
var Service_3 = Service_1.InjectServiceToken;
var Service_4 = Service_1.DefaultServiceToken;

var runnable = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$1.__exportStar(IRunner, exports);
tslib_1$$1.__exportStar(Service_1, exports);


});

unwrapExports$$1(runnable);

var ModuleBuilder_1 = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });









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
    ModuleBuilder.prototype.getPools = function () {
        return this.pools;
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
            var injmdl, container, cfg, annBuilder, instance, instance, mdlInst;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(token, env)];
                    case 1:
                        injmdl = _a.sent();
                        container = injmdl.container;
                        cfg = injmdl.config;
                        annBuilder = this.getAnnoBuilder(container, injmdl.token, cfg.annotationBuilder);
                        if (!!injmdl.token) return [3 /*break*/, 3];
                        return [4 /*yield*/, annBuilder.buildByConfig(cfg, data)];
                    case 2:
                        instance = _a.sent();
                        return [2 /*return*/, instance];
                    case 3: return [4 /*yield*/, annBuilder.build(injmdl.token, cfg, data)];
                    case 4:
                        instance = _a.sent();
                        mdlInst = instance;
                        if (mdlInst && core_1$$2.isFunction(mdlInst.mdOnInit)) {
                            mdlInst.mdOnInit(injmdl);
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
            var injmdl, cfg, container, md, bootToken, anBuilder, bootInstance, runable;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(token, env)];
                    case 1:
                        injmdl = _a.sent();
                        cfg = injmdl.config;
                        container = injmdl.container;
                        return [4 /*yield*/, this.build(token, injmdl, data)];
                    case 2:
                        md = _a.sent();
                        bootToken = this.getBootType(cfg);
                        anBuilder = this.getAnnoBuilder(container, bootToken, cfg.annotationBuilder);
                        return [4 /*yield*/, (bootToken ? anBuilder.build(bootToken, cfg, data) : anBuilder.buildByConfig(cfg, data))];
                    case 3:
                        bootInstance = _a.sent();
                        if (!bootInstance) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.autoRun(container, bootToken ? bootToken : anBuilder.getType(cfg), cfg, bootInstance)];
                    case 4:
                        runable = _a.sent();
                        if (!(md && core_1$$2.isFunction(md.mdOnStart))) return [3 /*break*/, 6];
                        return [4 /*yield*/, Promise.resolve(md.mdOnStart(bootInstance))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.autoRun(container, injmdl.token, cfg, md)];
                    case 8:
                        runable = _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/, runable];
                }
            });
        });
    };
    ModuleBuilder.prototype.import = function (token, parent) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var type, key;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!parent) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getParentContainer()];
                    case 1:
                        parent = _a.sent();
                        _a.label = 2;
                    case 2:
                        type = core_1$$2.isClass(token) ? token : parent.getTokenImpl(token);
                        if (!core_1$$2.isClass(type)) return [3 /*break*/, 5];
                        key = new InjectedModule_1.InjectedModuleToken(type);
                        if (!parent.hasRegister(key.toString())) return [3 /*break*/, 3];
                        return [2 /*return*/, parent.get(key)];
                    case 3: return [4 /*yield*/, parent.loadModule(type)];
                    case 4:
                        _a.sent();
                        if (parent.has(key)) {
                            return [2 /*return*/, parent.get(key)];
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/, null];
                }
            });
        });
    };
    ModuleBuilder.prototype.load = function (token, env) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var injmdl, parent, cfg, mdtype, container, injector, injector;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (env instanceof InjectedModule_1.InjectedModule) {
                            return [2 /*return*/, env];
                        }
                        injmdl = null;
                        return [4 /*yield*/, this.getParentContainer(env)];
                    case 1:
                        parent = _a.sent();
                        if (!core_1$$2.isToken(token)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.import(token, parent)];
                    case 2:
                        injmdl = _a.sent();
                        if (!injmdl) {
                            cfg = parent.get(annotations.AnnotationMetaAccessorToken).getMetadata(token, parent);
                            injmdl = new InjectedModule_1.InjectedModule(token, cfg, parent);
                        }
                        return [3 /*break*/, 10];
                    case 3:
                        mdtype = this.getType(token);
                        if (!core_1$$2.isToken(mdtype)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.import(mdtype, parent)];
                    case 4:
                        injmdl = _a.sent();
                        if (!(injmdl instanceof InjectedModule_1.InjectedModule)) return [3 /*break*/, 6];
                        container = injmdl.container;
                        injector = container.get(DIModuleInjector_1.DIModuleInjectorToken);
                        return [4 /*yield*/, injector.importByConfig(container, token)];
                    case 5:
                        _a.sent();
                        injmdl.config = core_1$$2.lang.assign(injmdl.config, token);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        mdtype = null;
                        _a.label = 8;
                    case 8:
                        if (!!injmdl) return [3 /*break*/, 10];
                        injector = parent.get(DIModuleInjector_1.DIModuleInjectorToken);
                        return [4 /*yield*/, injector.importByConfig(parent, token)];
                    case 9:
                        _a.sent();
                        injmdl = new InjectedModule_1.InjectedModule(mdtype, token, parent);
                        _a.label = 10;
                    case 10: return [2 /*return*/, injmdl];
                }
            });
        });
    };
    ModuleBuilder.prototype.getParentContainer = function (env) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var parent;
            return tslib_1$$1.__generator(this, function (_a) {
                if (env) {
                    if (env instanceof core_1$$2.Container) {
                        parent = env;
                    }
                    else if (env instanceof InjectedModule_1.InjectedModule) {
                        parent = env.container.parent;
                    }
                }
                if (!parent) {
                    parent = this.getPools().getDefault();
                }
                return [2 /*return*/, parent];
            });
        });
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
                        if (!(instance instanceof runnable.Boot)) return [3 /*break*/, 2];
                        return [4 /*yield*/, instance.run()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, instance];
                    case 2:
                        if (!(instance instanceof runnable.Service)) return [3 /*break*/, 4];
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
                            var runnerToken = new runnable.InjectRunnerToken(tk);
                            if (container.has(runnerToken)) {
                                runner_1 = container.resolve(runnerToken, provider_1);
                            }
                            var serviceToken = new runnable.InjectServiceToken(tk);
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
        var providers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            providers[_i - 1] = arguments[_i];
        }
        if (container.has(runnable.DefaultRunnerToken)) {
            return container.resolve.apply(container, [runnable.DefaultRunnerToken].concat(providers));
        }
        return null;
    };
    ModuleBuilder.prototype.getDefaultService = function (container) {
        var providers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            providers[_i - 1] = arguments[_i];
        }
        if (container.has(runnable.DefaultServiceToken)) {
            return container.resolve.apply(container, [runnable.DefaultServiceToken].concat(providers));
        }
        return null;
    };
    ModuleBuilder.prototype.getAnnoBuilder = function (container, token, annBuilder) {
        var builder;
        if (core_1$$2.isClass(annBuilder)) {
            if (!container.has(annBuilder)) {
                container.register(annBuilder);
            }
        }
        if (core_1$$2.isToken(annBuilder)) {
            builder = container.resolve(annBuilder);
        }
        else if (annBuilder instanceof annotations.AnnotationBuilder) {
            builder = annBuilder;
        }
        if (!builder && token) {
            container.getTokenExtendsChain(token).forEach(function (tk) {
                if (builder) {
                    return false;
                }
                var buildToken = new annotations.InjectAnnotationBuilder(tk);
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
        if (container.has(annotations.DefaultAnnotationBuilderToken)) {
            return container.resolve(annotations.DefaultAnnotationBuilderToken);
        }
        return container.resolve(annotations.AnnotationBuilderToken);
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
    ModuleBuilder.classAnnations = { "name": "ModuleBuilder", "params": { "constructor": [], "getPools": [], "build": ["token", "env", "data"], "bootstrap": ["token", "env", "data"], "import": ["token", "parent"], "load": ["token", "env"], "getParentContainer": ["env"], "autoRun": ["container", "token", "cfg", "instance"], "getDefaultRunner": ["container", "providers"], "getDefaultService": ["container", "providers"], "getAnnoBuilder": ["container", "token", "annBuilder"], "getDefaultAnnBuilder": ["container"], "getType": ["cfg"], "getBootType": ["cfg"] } };
    tslib_1$$1.__decorate([
        core_1$$2.Inject(utils.ContainerPoolToken),
        tslib_1$$1.__metadata("design:type", utils.ContainerPool)
    ], ModuleBuilder.prototype, "pools", void 0);
    ModuleBuilder = tslib_1$$1.__decorate([
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

var modules = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$1.__exportStar(DIModuleInjector_1, exports);
tslib_1$$1.__exportStar(DIModuleValidate, exports);
tslib_1$$1.__exportStar(InjectedModule_1, exports);
tslib_1$$1.__exportStar(IModuleBuilder, exports);
tslib_1$$1.__exportStar(ModuleBuilder_1, exports);


});

unwrapExports$$1(modules);

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
        container.use(annotations, modules, boot);
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

var ApplicationBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });







var ApplicationEvents;
(function (ApplicationEvents) {
    ApplicationEvents["onRootContainerCreated"] = "onRootContainerCreated";
    ApplicationEvents["onRootContainerInited"] = "onRooConatianerInited";
})(ApplicationEvents = exports.ApplicationEvents || (exports.ApplicationEvents = {}));
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
        _this.inited = false;
        _this.customRegs = [];
        _this.globalModules = [];
        _this.configs = [];
        _this.providers = new core_1$$2.MapSet();
        _this.events = new events$$1.EventEmitter();
        return _this;
    }
    DefaultApplicationBuilder.create = function (baseURL) {
        return new DefaultApplicationBuilder(baseURL);
    };
    DefaultApplicationBuilder.prototype.getPools = function () {
        if (!this.pools) {
            this.pools = new utils.ContainerPool();
            this.createDefaultContainer();
        }
        return this.pools;
    };
    DefaultApplicationBuilder.prototype.createContainer = function () {
        return this.getContainerBuilder().create();
    };
    DefaultApplicationBuilder.prototype.getContainerBuilder = function () {
        if (!this.containerBuilder) {
            this.containerBuilder = this.createContainerBuilder();
        }
        return this.containerBuilder;
    };
    DefaultApplicationBuilder.prototype.createContainerBuilder = function () {
        return new core_1$$2.DefaultContainerBuilder();
    };
    /**
     * use configuration.
     *
     * @param {(string | AppConfigure)} [config]
     * @returns {this} global config for this application.
     * @memberof Bootstrap
     */
    DefaultApplicationBuilder.prototype.useConfiguration = function (config) {
        if (core_1$$2.isUndefined(config)) {
            config = '';
        }
        // clean cached config.
        this.globalConfig = null;
        var idx = this.configs.indexOf(config);
        if (idx >= 0) {
            this.configs.splice(idx, 1);
        }
        this.configs.push(config);
        return this;
    };
    DefaultApplicationBuilder.prototype.loadConfig = function (container, src) {
        if (container.has(AppConfigure.AppConfigureLoaderToken)) {
            var loader = container.resolve(AppConfigure.AppConfigureLoaderToken, { baseURL: this.baseURL, container: container });
            return loader.load(src);
        }
        else if (src) {
            var builder = container.getBuilder();
            return builder.loader.load([src])
                .then(function (rs) {
                return rs.length ? rs[0] : null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    /**
     * use module as global Depdences module.
     *
     * @param {...LoadType[]} modules
     * @returns {this}
     * @memberof PlatformServer
     */
    DefaultApplicationBuilder.prototype.use = function () {
        var modules$$1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules$$1[_i] = arguments[_i];
        }
        this.globalModules = this.globalModules.concat(modules$$1);
        this.inited = false;
        return this;
    };
    /**
     * bind provider
     *
     * @template T
     * @param {Token<T>} provide
     * @param {Token<T> | Factory<T>} provider
     * @returns {this}
     * @memberof IContainer
     */
    DefaultApplicationBuilder.prototype.provider = function (provide, provider) {
        this.providers.set(provide, provider);
        return this;
    };
    DefaultApplicationBuilder.prototype.build = function (token, env, data) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var injmdl, builder;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(token, env)];
                    case 1:
                        injmdl = _a.sent();
                        builder = this.getBuilder(injmdl);
                        if (!builder) return [3 /*break*/, 3];
                        return [4 /*yield*/, builder.build(token, env, data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, _super.prototype.build.call(this, token, env, data)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultApplicationBuilder.prototype.bootstrap = function (token, env, data) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var injmdl, builder;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(token, env)];
                    case 1:
                        injmdl = _a.sent();
                        builder = this.getBuilder(injmdl);
                        if (!builder) return [3 /*break*/, 3];
                        return [4 /*yield*/, builder.bootstrap(token, injmdl, data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, _super.prototype.bootstrap.call(this, token, injmdl, data)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultApplicationBuilder.prototype.getBuilder = function (injmdl) {
        var cfg = injmdl.config;
        var container = injmdl.container;
        var builder;
        if (cfg) {
            if (core_1$$2.isClass(cfg.builder)) {
                if (!container.has(cfg.builder)) {
                    container.register(cfg.builder);
                }
            }
            if (core_1$$2.isToken(cfg.builder)) {
                builder = container.resolve(cfg.builder);
            }
            else if (cfg.builder instanceof modules.ModuleBuilder) {
                builder = cfg.builder;
            }
        }
        var tko = injmdl.token;
        if (!builder && tko) {
            container.getTokenExtendsChain(tko).forEach(function (tk) {
                if (builder) {
                    return false;
                }
                var buildToken = new modules.InjectModuleBuilderToken(tk);
                if (container.has(buildToken)) {
                    builder = container.get(buildToken);
                }
                return true;
            });
        }
        if (!builder) {
            builder = this.getDefaultBuilder(container);
        }
        return builder || this;
    };
    DefaultApplicationBuilder.prototype.getDefaultBuilder = function (container) {
        if (container.has(modules.DefaultModuleBuilderToken)) {
            return container.resolve(modules.DefaultModuleBuilderToken);
        }
        return null;
    };
    DefaultApplicationBuilder.prototype.getParentContainer = function (env) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var container, globCfg;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        container = this.getPools().getDefault();
                        return [4 /*yield*/, this.getGlobalConfig(container)];
                    case 1:
                        globCfg = _a.sent();
                        if (!this.inited) {
                            this.registerExts(container, globCfg);
                            this.bindAppConfig(globCfg);
                            container.bindProvider(AppConfigure.AppConfigureToken, globCfg);
                            this.events.emit(ApplicationEvents.onRootContainerInited, container);
                            this.inited = true;
                        }
                        return [4 /*yield*/, _super.prototype.getParentContainer.call(this, env)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DefaultApplicationBuilder.prototype.getGlobalConfig = function (container) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            var globCfg_1, exts;
            var _this = this;
            return tslib_1$$1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.globalConfig) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getDefaultConfig(container)];
                    case 1:
                        globCfg_1 = _a.sent();
                        globCfg_1 = globCfg_1 || {};
                        if (this.configs.length < 1) {
                            this.configs.push(''); // load default loader config.
                        }
                        return [4 /*yield*/, Promise.all(this.configs.map(function (cfg) {
                                if (core_1$$2.isString(cfg)) {
                                    return _this.loadConfig(container, cfg);
                                }
                                else {
                                    return cfg;
                                }
                            }))];
                    case 2:
                        exts = _a.sent();
                        exts.forEach(function (exCfg) {
                            if (exCfg) {
                                core_1$$2.lang.assign(globCfg_1, exCfg);
                            }
                        });
                        this.globalConfig = globCfg_1;
                        _a.label = 3;
                    case 3: return [2 /*return*/, this.globalConfig];
                }
            });
        });
    };
    DefaultApplicationBuilder.prototype.createDefaultContainer = function () {
        var _this = this;
        var container = this.createContainer();
        container.register(BootModule_1.BootModule);
        this.pools.setDefault(container);
        var chain = container.getBuilder().getInjectorChain(container);
        chain.first(container.resolve(modules.DIModuleInjectorToken));
        container.bindProvider(utils.ContainerPoolToken, function () { return _this.getPools(); });
        this.events.emit(ApplicationEvents.onRootContainerCreated, container);
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
                    case 0:
                        if (!this.globalModules.length) return [3 /*break*/, 2];
                        usedModules = this.globalModules;
                        return [4 /*yield*/, container.loadModule.apply(container, usedModules)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.providers.forEach(function (val, key) {
                            container.bindProvider(key, val);
                        });
                        if (!this.customRegs.length) return [3 /*break*/, 4];
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
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, container];
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
    DefaultApplicationBuilder.prototype.getDefaultConfig = function (container) {
        return tslib_1$$1.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$1.__generator(this, function (_a) {
                if (container.has(AppConfigure.DefaultConfigureToken)) {
                    return [2 /*return*/, container.resolve(AppConfigure.DefaultConfigureToken)];
                }
                else {
                    return [2 /*return*/, {}];
                }
                return [2 /*return*/];
            });
        });
    };
    DefaultApplicationBuilder.classAnnations = { "name": "DefaultApplicationBuilder", "params": { "constructor": ["baseURL"], "create": ["baseURL"], "getPools": [], "createContainer": [], "getContainerBuilder": [], "createContainerBuilder": [], "useConfiguration": ["config"], "loadConfig": ["container", "src"], "use": ["modules"], "provider": ["provide", "provider"], "build": ["token", "env", "data"], "bootstrap": ["token", "env", "data"], "getBuilder": ["injmdl"], "getDefaultBuilder": ["container"], "getParentContainer": ["env"], "getGlobalConfig": ["container"], "createDefaultContainer": [], "registerExts": ["container", "config"], "bindAppConfig": ["config"], "getDefaultConfig": ["container"] } };
    return DefaultApplicationBuilder;
}(modules.ModuleBuilder));
exports.DefaultApplicationBuilder = DefaultApplicationBuilder;


});

unwrapExports$$1(ApplicationBuilder);
var ApplicationBuilder_1 = ApplicationBuilder.ApplicationEvents;
var ApplicationBuilder_2 = ApplicationBuilder.DefaultApplicationBuilder;

var IApplicationBuilder = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.ApplicationBuilderToken = new core_1$$2.InjectToken('DI_AppBuilder');


});

unwrapExports$$1(IApplicationBuilder);
var IApplicationBuilder_1 = IApplicationBuilder.ApplicationBuilderToken;

var boot = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$1.__exportStar(AppConfigure, exports);
tslib_1$$1.__exportStar(ApplicationBuilder, exports);
tslib_1$$1.__exportStar(IApplicationBuilder, exports);


});

unwrapExports$$1(boot);

var D__workspace_github_tsioc_packages_bootstrap_lib = createCommonjsModule$$1(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1$$1.__exportStar(decorators, exports);
tslib_1$$1.__exportStar(boot, exports);
tslib_1$$1.__exportStar(annotations, exports);
tslib_1$$1.__exportStar(modules, exports);
tslib_1$$1.__exportStar(runnable, exports);
tslib_1$$1.__exportStar(utils, exports);
tslib_1$$1.__exportStar(BootModule_1, exports);


});

var index$6 = unwrapExports$$1(D__workspace_github_tsioc_packages_bootstrap_lib);

return index$6;

})));
});

unwrapExports(bootstrap_umd);

var Task = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * create task decorator.
 *
 * @export
 * @template T
 * @param {string} taskType
 * @param {(Token<IActivityBuilder> | IActivityBuilder)} builder
 * @param {InjectToken<IActivity>} provideType
 * @param {MetadataAdapter} [adapter]
 * @param {MetadataExtends<T>} [metadataExtends]
 * @returns {ITaskDecorator<T>}
 */
function createTaskDecorator(taskType, annotationBuilder, provideType, adapter, metadataExtends) {
    return core_1.createClassDecorator('Task', function (args) {
        if (adapter) {
            adapter(args);
        }
        args.next({
            match: function (arg) { return core_1.isString(arg) || (core_1.isObject(arg) && arg instanceof core_1.Registration); },
            setMetadata: function (metadata, arg) {
                if (core_1.isString(arg)) {
                    metadata.name = arg;
                }
                metadata.provide = arg;
            }
        });
        args.next({
            match: function (arg) { return core_1.isString(arg) || core_1.isToken(arg); },
            setMetadata: function (metadata, arg) {
                if (core_1.isString(arg)) {
                    metadata.name = arg;
                }
                else {
                    metadata.annotationBuilder = arg;
                }
            }
        });
        args.next({
            match: function (arg) { return core_1.isString(arg); },
            setMetadata: function (metadata, arg) {
                metadata.name = arg;
            }
        });
    }, function (metadata) {
        if (metadataExtends) {
            metadata = metadataExtends(metadata);
        }
        if (!metadata.name && core_1.isClass(metadata.type)) {
            var isuglify = /^[a-z]$/.test(metadata.type.name);
            if (isuglify && metadata.type.classAnnations) {
                metadata.name = metadata.type.classAnnations.name;
            }
            else {
                metadata.name = metadata.type.name;
            }
        }
        if (core_1.isUndefined(metadata.provide)) {
            metadata.provide = metadata.name;
        }
        if (provideType) {
            if (core_1.isString(metadata.provide)) {
                metadata.provide = new core_1.Registration(provideType, metadata.provide);
            }
            if (!metadata.activity || !metadata.task) {
                metadata.activity = provideType;
            }
        }
        metadata.decorType = taskType;
        if (annotationBuilder && !metadata.annotationBuilder) {
            metadata.annotationBuilder = annotationBuilder;
        }
        return metadata;
    });
}
exports.createTaskDecorator = createTaskDecorator;
/**
 * task decorator, use to define class is a task element.
 *
 * @Task
 */
exports.Task = createTaskDecorator('Task');




});

unwrapExports(Task);
var Task_1 = Task.createTaskDecorator;
var Task_2 = Task.Task;

var Workflow = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


function createWorkflowDecorator(name, builder, annotationBuilder, adapter, metadataExtends) {
    return bootstrap_umd.createDIModuleDecorator(name, builder, annotationBuilder, function (args) {
        if (adapter) {
            adapter(args);
        }
        args.next({
            match: function (arg) { return arg && (core_1.isString(arg) || (core_1.isObject(arg) && arg instanceof core_1.Registration)); },
            setMetadata: function (metadata, arg) {
                if (core_1.isString(arg)) {
                    metadata.name = arg;
                }
                else {
                    metadata.provide = arg;
                }
            }
        });
        args.next({
            match: function (arg) { return core_1.isString(arg) || core_1.isToken(arg); },
            setMetadata: function (metadata, arg) {
                if (core_1.isString(arg)) {
                    metadata.name = arg;
                }
                else {
                    metadata.annotationBuilder = arg;
                }
            }
        });
        args.next({
            match: function (arg) { return core_1.isString(arg); },
            setMetadata: function (metadata, arg) {
                metadata.name = arg;
            }
        });
    }, metadataExtends);
}
exports.createWorkflowDecorator = createWorkflowDecorator;
/**
 * Workflow decorator, define for class as workflow.
 *
 * @Workflow
 */
exports.Workflow = createWorkflowDecorator('Workflow');




});

unwrapExports(Workflow);
var Workflow_1 = Workflow.createWorkflowDecorator;
var Workflow_2 = Workflow.Workflow;

var decorators = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1.__exportStar(Task, exports);
tslib_1.__exportStar(Workflow, exports);




});

unwrapExports(decorators);

var IContext = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Inject Acitity context Token
 *
 * @export
 * @class InjectContextToken
 * @extends {Registration<T>}
 * @template T
 */
var InjectContextToken = /** @class */ (function (_super) {
    tslib_1.__extends(InjectContextToken, _super);
    function InjectContextToken(desc) {
        return _super.call(this, 'ActivityContext', desc) || this;
    }
    InjectContextToken.classAnnations = { "name": "InjectContextToken", "params": { "constructor": ["desc"] } };
    return InjectContextToken;
}(core_1.Registration));
exports.InjectContextToken = InjectContextToken;
/**
 * task context token.
 */
exports.ContextToken = new InjectContextToken('');




});

unwrapExports(IContext);
var IContext_1 = IContext.InjectContextToken;
var IContext_2 = IContext.ContextToken;

var Activity_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * base activity.
 *
 * @export
 * @class Activity
 * @implements {GActivity<T>}
 * @template T
 */
var Activity = /** @class */ (function () {
    function Activity() {
    }
    Activity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * run task.
     *
     * @param {*} [data] execut data.
     * @param {IActivity} [execute] execute activity.
     * @returns {Promise<T>}
     * @memberof Activity
     */
    Activity.prototype.run = function (data, execute) {
        return Promise.resolve(data);
    };
    Activity.prototype.toExpression = function (exptype, target) {
        return this.context.builder.toExpression(exptype, target || this);
    };
    Activity.prototype.toActivity = function (exptype, isRightActivity, toConfig, valify, target) {
        return this.context.builder.toActivity(exptype, target || this, isRightActivity, toConfig, valify);
    };
    Activity.prototype.buildActivity = function (config) {
        return this.context.builder.buildByConfig(config, this.id);
    };
    Activity.classAnnations = { "name": "Activity", "params": { "constructor": [], "onActivityInit": ["config"], "run": ["data", "execute"], "toExpression": ["exptype", "target"], "toActivity": ["exptype", "isRightActivity", "toConfig", "valify", "target"], "buildActivity": ["config"] } };
    tslib_1.__decorate([
        core_1.Inject(IContext.ContextToken),
        tslib_1.__metadata("design:type", Object)
    ], Activity.prototype, "context", void 0);
    Activity = tslib_1.__decorate([
        decorators.Task,
        tslib_1.__metadata("design:paramtypes", [])
    ], Activity);
    return Activity;
}());
exports.Activity = Activity;




});

unwrapExports(Activity_1);
var Activity_2 = Activity_1.Activity;

var IActivityBuilder = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * Inject Acitity builder Token
 *
 * @export
 * @class InjectAcitityBuilderToken
 * @extends {Registration<T>}
 * @template T
 */
var InjectAcitityBuilderToken = /** @class */ (function (_super) {
    tslib_1.__extends(InjectAcitityBuilderToken, _super);
    function InjectAcitityBuilderToken(type) {
        return _super.call(this, type) || this;
    }
    InjectAcitityBuilderToken.classAnnations = { "name": "InjectAcitityBuilderToken", "params": { "constructor": ["type"] } };
    return InjectAcitityBuilderToken;
}(bootstrap_umd.InjectAnnotationBuilder));
exports.InjectAcitityBuilderToken = InjectAcitityBuilderToken;
/**
 * activity builder token.
 */
exports.ActivityBuilderToken = new InjectAcitityBuilderToken(Activity_1.Activity);




});

unwrapExports(IActivityBuilder);
var IActivityBuilder_1 = IActivityBuilder.InjectAcitityBuilderToken;
var IActivityBuilder_2 = IActivityBuilder.ActivityBuilderToken;

var IActivityRunner = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * activity runner token.
 */
exports.ActivityRunnerToken = new bootstrap_umd.InjectServiceToken(Activity_1.Activity);
/**
 *run state.
 *
 * @export
 * @enum {number}
 */
var RunState;
(function (RunState) {
    /**
     * activity init.
     */
    RunState[RunState["init"] = 0] = "init";
    /**
     * runing.
     */
    RunState[RunState["running"] = 1] = "running";
    /**
     * activity parused.
     */
    RunState[RunState["pause"] = 2] = "pause";
    /**
     * activity stopped.
     */
    RunState[RunState["stop"] = 3] = "stop";
    /**
     * activity complete.
     */
    RunState[RunState["complete"] = 4] = "complete";
})(RunState = exports.RunState || (exports.RunState = {}));




});

unwrapExports(IActivityRunner);
var IActivityRunner_1 = IActivityRunner.ActivityRunnerToken;
var IActivityRunner_2 = IActivityRunner.RunState;

var ActivityRunner_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });






/**
 * task runner.
 *
 * @export
 * @class TaskRunner
 * @implements {ITaskRunner}
 */
var ActivityRunner = /** @class */ (function () {
    function ActivityRunner(token, config, instance) {
        this.token = token;
        this.config = config;
        this.instance = instance;
        this._result = new BehaviorSubject_1.BehaviorSubject(null);
        this.stateChanged = new BehaviorSubject_1.BehaviorSubject(IActivityRunner.RunState.init);
    }
    Object.defineProperty(ActivityRunner.prototype, "activity", {
        get: function () {
            return this.token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityRunner.prototype, "configure", {
        get: function () {
            return this.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityRunner.prototype, "result", {
        get: function () {
            return this._result.filter(function (a) { return !a; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityRunner.prototype, "resultValue", {
        get: function () {
            return this._resultValue;
        },
        enumerable: true,
        configurable: true
    });
    ActivityRunner.prototype.start = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.run(data)
                            .then(function (data) {
                            _this.state = IActivityRunner.RunState.complete;
                            _this.stateChanged.next(_this.state);
                            _this._resultValue = data;
                            _this._result.next(data);
                            return data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ActivityRunner.prototype.saveState = function (state) {
        this._currState = state;
    };
    ActivityRunner.prototype.stop = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.state = IActivityRunner.RunState.stop;
                this.stateChanged.next(this.state);
                return [2 /*return*/];
            });
        });
    };
    ActivityRunner.prototype.pause = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.state = IActivityRunner.RunState.pause;
                this.stateChanged.next(this.state);
                return [2 /*return*/];
            });
        });
    };
    ActivityRunner.classAnnations = { "name": "ActivityRunner", "params": { "constructor": ["token", "config", "instance"], "start": ["data"], "saveState": ["state"], "stop": [], "pause": [] } };
    tslib_1.__decorate([
        core_1.Inject(core_1.ContainerToken),
        tslib_1.__metadata("design:type", Object)
    ], ActivityRunner.prototype, "container", void 0);
    ActivityRunner = tslib_1.__decorate([
        decorators.Workflow(IActivityRunner.ActivityRunnerToken),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
    ], ActivityRunner);
    return ActivityRunner;
}());
exports.ActivityRunner = ActivityRunner;




});

unwrapExports(ActivityRunner_1);
var ActivityRunner_2 = ActivityRunner_1.ActivityRunner;

var ActivityConfigure = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * target is activity runner.
 *
 * @export
 * @param {*} target
 * @returns {target is IActivityRunner<any>}
 */
function isActivityRunner(target) {
    return target instanceof ActivityRunner_1.ActivityRunner;
}
exports.isActivityRunner = isActivityRunner;
/**
 * check target is activity type or not.
 *
 * @export
 * @param {*} target
 * @returns {target is ActivityType<any>}
 */
function isActivityType(target, check) {
    if (check === void 0) { check = true; }
    if (!target) {
        return false;
    }
    if (isActivityRunner(target)) {
        return false;
    }
    // forbid string token for activity.
    if (core_1.isString(target)) {
        return false;
    }
    if (core_1.isToken(target)) {
        return true;
    }
    if (core_1.isMetadataObject(target)) {
        if (check) {
            return !!(target.activity || target.task || target.bootstrap);
        }
        return true;
    }
    return false;
}
exports.isActivityType = isActivityType;




});

unwrapExports(ActivityConfigure);
var ActivityConfigure_1 = ActivityConfigure.isActivityRunner;
var ActivityConfigure_2 = ActivityConfigure.isActivityType;

var IActivity = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Inject AcitityToken
 *
 * @export
 * @class InjectAcitityToken
 * @extends {Registration<T>}
 * @template T
 */
var InjectAcitityToken = /** @class */ (function (_super) {
    tslib_1.__extends(InjectAcitityToken, _super);
    function InjectAcitityToken(desc) {
        return _super.call(this, 'Activity', desc) || this;
    }
    InjectAcitityToken.classAnnations = { "name": "InjectAcitityToken", "params": { "constructor": ["desc"] } };
    return InjectAcitityToken;
}(core_1.Registration));
exports.InjectAcitityToken = InjectAcitityToken;
/**
 * task token.
 */
exports.ActivityToken = new InjectAcitityToken('');




});

unwrapExports(IActivity);
var IActivity_1 = IActivity.InjectAcitityToken;
var IActivity_2 = IActivity.ActivityToken;

var ActivityBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });








var ActivityBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(ActivityBuilder, _super);
    function ActivityBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityBuilder.prototype.build = function (token, config, data) {
        return _super.prototype.build.call(this, token, config, data);
    };
    ActivityBuilder.prototype.buildByConfig = function (activity, data) {
        return _super.prototype.buildByConfig.call(this, activity, data);
    };
    ActivityBuilder.prototype.createInstance = function (token, config, uuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var instance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (core_1.isString(token)) {
                            token = this.traslateStrToken(token);
                        }
                        return [4 /*yield*/, _super.prototype.createInstance.call(this, token, config, uuid)];
                    case 1:
                        instance = _a.sent();
                        if (!instance) {
                            return [2 /*return*/, null];
                        }
                        // if (!(instance instanceof Activity)) {
                        //     let task = this.getDefaultAcitvity();
                        //     console.log(isClass(token) ? getClassName(token) : (token || '').toString(), 'is not right Activity, try load default activity:', getClassName(task));
                        //     config.activity = task;
                        //     instance = await this.createInstance(task, config, uuid) as ActivityInstance;
                        // }
                        if (core_1.isString(uuid)) {
                            instance.id = uuid;
                        }
                        if (!core_1.isFunction(instance.onActivityInit)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.resolve(instance.onActivityInit(config))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, instance];
                }
            });
        });
    };
    ActivityBuilder.prototype.buildStrategy = function (activity, config, container) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (config.name) {
                    activity.name = config.name;
                }
                activity.config = config;
                return [2 /*return*/, activity];
            });
        });
    };
    ActivityBuilder.prototype.getDefaultAcitvity = function () {
        return Activity_1.Activity;
    };
    ActivityBuilder.prototype.getType = function (config) {
        var token = config.activity || config.task || config.token || config.type;
        if (core_1.isString(token)) {
            token = this.traslateStrToken(token);
        }
        return token;
    };
    ActivityBuilder.prototype.getDecorator = function () {
        return decorators.Task.toString();
    };
    ActivityBuilder.prototype.resolveToken = function (token, uuid) {
        var activity = this.container.resolve(token);
        activity.id = uuid;
        return activity;
    };
    ActivityBuilder.prototype.traslateStrToken = function (token) {
        var taskToken = new IActivity.InjectAcitityToken(token);
        if (this.container.has(taskToken)) {
            return taskToken;
        }
        return token;
    };
    /**
     * to expression
     *
     * @template T
     * @param {ExpressionType<T>} exptype
     * @param {IActivity} target
     * @returns {Promise<Expression<T>>}
     * @memberof ActivityTypeBuilder
     */
    ActivityBuilder.prototype.toExpression = function (exptype, target) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ActivityConfigure.isActivityType(exptype)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.buildByConfig(exptype, target.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, exptype];
                }
            });
        });
    };
    /**
    * to activity.
    *
    * @template Tr
    * @template Ta
    * @template TCfg
    * @param {(ExpressionType<Tr> | ActivityType<Ta>)} exptype
    * @param {IActivity} target
    * @param {Express<any, boolean>} isRightActivity
    * @param {Express<Tr, TCfg>} toConfig
    * @param {Express<TCfg, TCfg>} [valify]
    * @returns {Promise<Ta>}
    * @memberof ActivityTypeBuilder
    */
    ActivityBuilder.prototype.toActivity = function (exptype, target, isRightActivity, toConfig, valify) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, rt, config;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ActivityConfigure.isActivityType(exptype, !valify)) return [3 /*break*/, 5];
                        if (!valify) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.buildByConfig(core_1.isToken(exptype) ? exptype : valify(exptype), target.id)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.buildByConfig(exptype, target.id)];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        result = exptype;
                        _a.label = 6;
                    case 6:
                        if (isRightActivity(result)) {
                            return [2 /*return*/, result];
                        }
                        if (!core_1.isString(result)) return [3 /*break*/, 7];
                        rt = result;
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, target.context.exec(target, result)];
                    case 8:
                        rt = _a.sent();
                        _a.label = 9;
                    case 9:
                        config = toConfig(rt);
                        if (valify) {
                            config = valify(config);
                        }
                        if (!config) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.buildByConfig(config, target.id)];
                    case 10:
                        result = _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        result = null;
                        _a.label = 12;
                    case 12: return [2 /*return*/, result];
                }
            });
        });
    };
    ActivityBuilder.classAnnations = { "name": "ActivityBuilder", "params": { "build": ["token", "config", "data"], "buildByConfig": ["activity", "data"], "createInstance": ["token", "config", "uuid"], "buildStrategy": ["activity", "config", "container"], "getDefaultAcitvity": [], "getType": ["config"], "getDecorator": [], "resolveToken": ["token", "uuid"], "traslateStrToken": ["token"], "toExpression": ["exptype", "target"], "toActivity": ["exptype", "target", "isRightActivity", "toConfig", "valify"] } };
    ActivityBuilder = tslib_1.__decorate([
        core_1.Injectable(IActivityBuilder.ActivityBuilderToken)
    ], ActivityBuilder);
    return ActivityBuilder;
}(bootstrap_umd.AnnotationBuilder));
exports.ActivityBuilder = ActivityBuilder;




});

unwrapExports(ActivityBuilder_1);
var ActivityBuilder_2 = ActivityBuilder_1.ActivityBuilder;

var ExpressionActivity_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



var ExpressionActivity = /** @class */ (function (_super) {
    tslib_1.__extends(ExpressionActivity, _super);
    function ExpressionActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionActivity.classAnnations = { "name": "ExpressionActivity", "params": {} };
    ExpressionActivity = tslib_1.__decorate([
        decorators.Task
    ], ExpressionActivity);
    return ExpressionActivity;
}(Activity_1.Activity));
exports.ExpressionActivity = ExpressionActivity;
/**
 * assign activity.
 *
 * @export
 * @class Assign
 * @extends {Activity<T>}
 * @template T
 */
var AssignActivity = /** @class */ (function (_super) {
    tslib_1.__extends(AssignActivity, _super);
    function AssignActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssignActivity.classAnnations = { "name": "AssignActivity", "params": {} };
    AssignActivity = tslib_1.__decorate([
        decorators.Task
    ], AssignActivity);
    return AssignActivity;
}(Activity_1.Activity));
exports.AssignActivity = AssignActivity;




});

unwrapExports(ExpressionActivity_1);
var ExpressionActivity_2 = ExpressionActivity_1.ExpressionActivity;
var ExpressionActivity_3 = ExpressionActivity_1.AssignActivity;

var Context_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });









/**
 * task context.
 *
 * @export
 * @class Context
 * @implements {IContext}
 */
var Context = /** @class */ (function () {
    function Context() {
    }
    Context.prototype.getContainer = function () {
        return this.container;
    };
    Context.prototype.getRootPath = function () {
        var cfg = this.getContainer().get(bootstrap_umd.AppConfigureToken) || {};
        return cfg.baseURL || '.';
    };
    Context.prototype.getEnvArgs = function () {
        return {};
    };
    Context.prototype.to = function (target, config) {
        if (core_1.isFunction(target)) {
            if (core_1.isClass(target)) {
                return target;
            }
            return target(this, config);
        }
        else {
            return target;
        }
    };
    /**
     * exec activity result.
     *
     * @template T
     * @param {IActivity} target
     * @param {Expression<T>} result
     * @param {ActivityConfigure} [data]
     * @returns {Promise<T>}
     * @memberof IContext
     */
    Context.prototype.exec = function (target, expression, data) {
        if (core_1.isFunction(expression)) {
            return expression(target, data);
        }
        else if (core_1.isPromise(expression)) {
            return expression;
        }
        else if (expression instanceof Activity_1.Activity) {
            return expression.run(data, target);
        }
        else if (expression instanceof ActivityRunner_1.ActivityRunner) {
            return expression.start(data);
        }
        else {
            return Promise.resolve(expression);
        }
    };
    Context.prototype.isTask = function (task) {
        return core_1.hasOwnClassMetadata(decorators.Task, task);
    };
    Context.classAnnations = { "name": "Context", "params": { "constructor": [], "getContainer": [], "getRootPath": [], "getEnvArgs": [], "to": ["target", "config"], "exec": ["target", "expression", "data"], "isTask": ["task"] } };
    tslib_1.__decorate([
        core_1.Inject(core_1.ContainerToken),
        tslib_1.__metadata("design:type", Object)
    ], Context.prototype, "container", void 0);
    tslib_1.__decorate([
        core_1.Inject(IActivityBuilder.ActivityBuilderToken),
        tslib_1.__metadata("design:type", ActivityBuilder_1.ActivityBuilder)
    ], Context.prototype, "builder", void 0);
    Context = tslib_1.__decorate([
        core_1.Singleton(IContext.ContextToken),
        tslib_1.__metadata("design:paramtypes", [])
    ], Context);
    return Context;
}());
exports.Context = Context;




});

unwrapExports(Context_1);
var Context_2 = Context_1.Context;

var uuid = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * uuid factory token.
 */
exports.UUIDToken = new core_1.InjectToken('uuid_factory');
/**
 * random uuid factory.
 *
 * @export
 * @class RandomUUIDFactory
 * @implements {UUIDFactory}
 */
var RandomUUIDFactory = /** @class */ (function () {
    function RandomUUIDFactory() {
    }
    /**
     * generate uuid.
     *
     * @returns {string}
     * @memberof RandomUUID
     */
    RandomUUIDFactory.prototype.generate = function () {
        return (this.randomS4() + this.randomS4() + '-' + this.randomS4() + '-' + this.randomS4() + '-' + this.randomS4() + '-' + this.randomS4() + this.randomS4() + this.randomS4());
    };
    RandomUUIDFactory.prototype.randomS4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    RandomUUIDFactory.classAnnations = { "name": "RandomUUIDFactory", "params": { "constructor": [], "generate": [], "randomS4": [] } };
    RandomUUIDFactory = tslib_1.__decorate([
        core_1.Singleton(exports.UUIDToken),
        tslib_1.__metadata("design:paramtypes", [])
    ], RandomUUIDFactory);
    return RandomUUIDFactory;
}());
exports.RandomUUIDFactory = RandomUUIDFactory;




});

unwrapExports(uuid);
var uuid_1 = uuid.UUIDToken;
var uuid_2 = uuid.RandomUUIDFactory;

var core = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1.__exportStar(IActivityBuilder, exports);
tslib_1.__exportStar(ActivityBuilder_1, exports);
tslib_1.__exportStar(IActivity, exports);
tslib_1.__exportStar(Activity_1, exports);
tslib_1.__exportStar(ExpressionActivity_1, exports);
tslib_1.__exportStar(ActivityConfigure, exports);
tslib_1.__exportStar(decorators, exports);
tslib_1.__exportStar(IContext, exports);
tslib_1.__exportStar(Context_1, exports);
tslib_1.__exportStar(IActivityRunner, exports);
tslib_1.__exportStar(ActivityRunner_1, exports);
tslib_1.__exportStar(uuid, exports);




});

unwrapExports(core);

var Delay = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * deloy activity token.
 */
exports.DelayActivityToken = new core.InjectAcitityToken('delay');
/**
 * while control activity.
 *
 * @export
 * @class DelayActivity
 * @extends {Activity}
 */
var DelayActivity = /** @class */ (function (_super) {
    tslib_1.__extends(DelayActivity, _super);
    function DelayActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DelayActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.toExpression(config.delay, this)];
                    case 2:
                        _a.delay = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DelayActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var delay, defer, timmer, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.exec(this, this.delay, data)];
                    case 1:
                        delay = _a.sent();
                        defer = new core_1.Defer();
                        timmer = setTimeout(function () {
                            defer.resolve(data);
                            clearTimeout(timmer);
                        }, delay);
                        return [4 /*yield*/, defer.promise];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DelayActivity.classAnnations = { "name": "DelayActivity", "params": { "onActivityInit": ["config"], "run": ["data"] } };
    DelayActivity = tslib_1.__decorate([
        core.Task(exports.DelayActivityToken)
    ], DelayActivity);
    return DelayActivity;
}(core.Activity));
exports.DelayActivity = DelayActivity;




});

unwrapExports(Delay);
var Delay_1 = Delay.DelayActivityToken;
var Delay_2 = Delay.DelayActivity;

var Interval = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * Interval activity token.
 */
exports.IntervalActivityToken = new core.InjectAcitityToken('interval');
/**
 * while control activity.
 *
 * @export
 * @class IntervalActivity
 * @extends {Activity}
 */
var IntervalActivity = /** @class */ (function (_super) {
    tslib_1.__extends(IntervalActivity, _super);
    function IntervalActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntervalActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _c.sent();
                        _a = this;
                        return [4 /*yield*/, this.toExpression(config.interval)];
                    case 2:
                        _a.interval = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.buildActivity(config.body)];
                    case 3:
                        _b.body = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IntervalActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var interval, result;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.exec(this, this.interval, data)];
                    case 1:
                        interval = _a.sent();
                        result = data;
                        setInterval(function () {
                            _this.body.run(result);
                        }, interval);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    IntervalActivity.classAnnations = { "name": "IntervalActivity", "params": { "onActivityInit": ["config"], "run": ["data"] } };
    IntervalActivity = tslib_1.__decorate([
        core.Task(exports.IntervalActivityToken)
    ], IntervalActivity);
    return IntervalActivity;
}(core.Activity));
exports.IntervalActivity = IntervalActivity;




});

unwrapExports(Interval);
var Interval_1 = Interval.IntervalActivityToken;
var Interval_2 = Interval.IntervalActivity;

var DoWhile = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * do while activity token.
 */
exports.DoWhileActivityToken = new core.InjectAcitityToken('dowhile');
/**
 * do while control activity.
 *
 * @export
 * @class DoWhileActivity
 * @extends {Activity}
 */
var DoWhileActivity = /** @class */ (function (_super) {
    tslib_1.__extends(DoWhileActivity, _super);
    function DoWhileActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoWhileActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _c.sent();
                        _a = this;
                        return [4 /*yield*/, this.buildActivity(config.do)];
                    case 2:
                        _a.body = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.toExpression(config.while)];
                    case 3:
                        _b.condition = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DoWhileActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, condition;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.body.run(data)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.context.exec(this, this.condition, result)];
                    case 2:
                        condition = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!condition) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.body.run(result || data)];
                    case 4:
                        result = _a.sent();
                        return [4 /*yield*/, this.context.exec(this, this.condition, result)];
                    case 5:
                        condition = _a.sent();
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, result];
                }
            });
        });
    };
    DoWhileActivity.classAnnations = { "name": "DoWhileActivity", "params": { "onActivityInit": ["config"], "run": ["data"] } };
    DoWhileActivity = tslib_1.__decorate([
        core.Task(exports.DoWhileActivityToken)
    ], DoWhileActivity);
    return DoWhileActivity;
}(core.Activity));
exports.DoWhileActivity = DoWhileActivity;




});

unwrapExports(DoWhile);
var DoWhile_1 = DoWhile.DoWhileActivityToken;
var DoWhile_2 = DoWhile.DoWhileActivity;

var If = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * if activity token.
 */
exports.IfActivityToken = new core.InjectAcitityToken('if');
/**
 * if control activity.
 *
 * @export
 * @class IfActivity
 * @extends {Activity}
 */
var IfActivity = /** @class */ (function (_super) {
    tslib_1.__extends(IfActivity, _super);
    function IfActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IfActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _d.sent();
                        _a = this;
                        return [4 /*yield*/, this.buildActivity(config.ifBody)];
                    case 2:
                        _a.ifBody = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this.toExpression(config.if)];
                    case 3:
                        _b.condition = _d.sent();
                        if (!config.elseBody) return [3 /*break*/, 5];
                        _c = this;
                        return [4 /*yield*/, this.buildActivity(config.elseBody)];
                    case 4:
                        _c.elseBody = _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    IfActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var condition;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.exec(this, this.condition, data)];
                    case 1:
                        condition = _a.sent();
                        if (condition) {
                            return [2 /*return*/, this.execIf(data)];
                        }
                        else if (this.elseBody) {
                            return [2 /*return*/, this.execElse(data)];
                        }
                        else {
                            return [2 /*return*/, Promise.resolve(data)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    IfActivity.prototype.execIf = function (data) {
        return this.ifBody.run(data);
    };
    IfActivity.prototype.execElse = function (data) {
        return this.elseBody.run(data);
    };
    IfActivity.classAnnations = { "name": "IfActivity", "params": { "onActivityInit": ["config"], "run": ["data"], "execIf": ["data"], "execElse": ["data"] } };
    IfActivity = tslib_1.__decorate([
        core.Task(exports.IfActivityToken)
    ], IfActivity);
    return IfActivity;
}(core.Activity));
exports.IfActivity = IfActivity;




});

unwrapExports(If);
var If_1 = If.IfActivityToken;
var If_2 = If.IfActivity;

var Invoke = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * while activity token.
 */
exports.InvokeActivityToken = new core.InjectAcitityToken('invoke');
/**
 * while control activity.
 *
 * @export
 * @class InvokeActivity
 * @extends {Activity}
 */
var InvokeActivity = /** @class */ (function (_super) {
    tslib_1.__extends(InvokeActivity, _super);
    function InvokeActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InvokeActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.context.getContainer().invoke(this.targetType, this.target, this.args, { data: data })];
            });
        });
    };
    InvokeActivity.classAnnations = { "name": "InvokeActivity", "params": { "run": ["data"] } };
    InvokeActivity = tslib_1.__decorate([
        core.Task(exports.InvokeActivityToken)
    ], InvokeActivity);
    return InvokeActivity;
}(core.Activity));
exports.InvokeActivity = InvokeActivity;




});

unwrapExports(Invoke);
var Invoke_1 = Invoke.InvokeActivityToken;
var Invoke_2 = Invoke.InvokeActivity;

var Parallel = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * parallel activity token.
 */
exports.ParallelActivityToken = new core.InjectAcitityToken('parallel');
/**
 * parallel activity.
 *
 * @export
 * @class ParallelActivity
 * @extends {Activity}
 */
var ParallelActivity = /** @class */ (function (_super) {
    tslib_1.__extends(ParallelActivity, _super);
    function ParallelActivity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activites = [];
        return _this;
    }
    ParallelActivity_1 = ParallelActivity;
    ParallelActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _a.sent();
                        if (!(config.parallel && config.parallel.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.buildChildren(this, config.parallel)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ParallelActivity.prototype.buildChildren = function (activity, configs) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var children;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(configs.map(function (cfg) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var node;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.buildActivity(cfg)];
                                    case 1:
                                        node = _a.sent();
                                        if (!node) {
                                            return [2 /*return*/, null];
                                        }
                                        if (!(node instanceof ParallelActivity_1)) return [3 /*break*/, 3];
                                        if (!(!core_1.isToken(cfg) && cfg.parallel && cfg.parallel.length)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, node.buildChildren(node, cfg.parallel)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/, node];
                                }
                            });
                        }); }))];
                    case 1:
                        children = _a.sent();
                        activity.activites = children;
                        return [2 /*return*/, activity];
                }
            });
        });
    };
    /**
     * run parallel activity.
     *
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns {Promise<any>}
     * @memberof ParallelActivity
     */
    ParallelActivity.prototype.run = function (data, execute) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.before(data, execute)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.execute(result, execute)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.after(result, execute)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * before run parallel.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof ParallelActivity
     */
    ParallelActivity.prototype.before = function (data, execute) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    /**
     * execute parallel.
     *
     * @protected
     * @param {*} [data]
     * @param {IActivity} [execute]
     * @returns {Promise<any>}
     * @memberof ParallelActivity
     */
    ParallelActivity.prototype.execute = function (data, execute) {
        return Promise.all(this.activites.map(function (task) { return task.run(data); }));
    };
    /**
     * after run parallel.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof ParallelActivity
     */
    ParallelActivity.prototype.after = function (data, execute) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    var ParallelActivity_1;
    ParallelActivity.classAnnations = { "name": "ParallelActivity", "params": { "onActivityInit": ["config"], "buildChildren": ["activity", "configs"], "run": ["data", "execute"], "before": ["data", "execute"], "execute": ["data", "execute"], "after": ["data", "execute"] } };
    ParallelActivity = ParallelActivity_1 = tslib_1.__decorate([
        core.Task(exports.ParallelActivityToken)
    ], ParallelActivity);
    return ParallelActivity;
}(core.Activity));
exports.ParallelActivity = ParallelActivity;




});

unwrapExports(Parallel);
var Parallel_1 = Parallel.ParallelActivityToken;
var Parallel_2 = Parallel.ParallelActivity;

var Sequence = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * sequence activity token
 */
exports.SequenceActivityToken = new core.InjectAcitityToken('sequence');
/**
 * sequence activity.
 *
 * @export
 * @class SequenceActivity
 * @extends {Activity}
 */
var SequenceActivity = /** @class */ (function (_super) {
    tslib_1.__extends(SequenceActivity, _super);
    function SequenceActivity() {
        var _this = _super.call(this) || this;
        _this.activites = [];
        return _this;
    }
    SequenceActivity_1 = SequenceActivity;
    SequenceActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _a.sent();
                        if (!(config.sequence && config.sequence.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.buildChildren(this, config.sequence)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SequenceActivity.prototype.buildChildren = function (activity, configs) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sequence;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(configs.map(function (cfg) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var node;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.buildActivity(cfg)];
                                    case 1:
                                        node = _a.sent();
                                        if (!node) {
                                            return [2 /*return*/, null];
                                        }
                                        if (!(node instanceof SequenceActivity_1)) return [3 /*break*/, 3];
                                        if (!(!core_1.isToken(cfg) && cfg.sequence && cfg.sequence.length)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, node.buildChildren(node, cfg.sequence)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/, node];
                                }
                            });
                        }); }))];
                    case 1:
                        sequence = _a.sent();
                        activity.activites = sequence;
                        return [2 /*return*/, activity];
                }
            });
        });
    };
    SequenceActivity.prototype.run = function (data, execute) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.before(data, execute)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.execute(result, execute)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.after(result, execute)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * before run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof SequenceActivity
     */
    SequenceActivity.prototype.before = function (data, execute) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    SequenceActivity.prototype.execute = function (data, execute) {
        var execPromise = Promise.resolve(data);
        this.activites.forEach(function (task) {
            execPromise = execPromise.then(function (pdata) { return task.run(pdata); });
        });
        return execPromise;
    };
    /**
     * after run sequence.
     *
     * @protected
     * @param {*} [data]
     * @returns {Promise<any>}
     * @memberof SequenceActivity
     */
    SequenceActivity.prototype.after = function (data, execute) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    var SequenceActivity_1;
    SequenceActivity.classAnnations = { "name": "SequenceActivity", "params": { "constructor": [], "onActivityInit": ["config"], "buildChildren": ["activity", "configs"], "run": ["data", "execute"], "before": ["data", "execute"], "execute": ["data", "execute"], "after": ["data", "execute"] } };
    SequenceActivity = SequenceActivity_1 = tslib_1.__decorate([
        core.Task(exports.SequenceActivityToken),
        tslib_1.__metadata("design:paramtypes", [])
    ], SequenceActivity);
    return SequenceActivity;
}(core.Activity));
exports.SequenceActivity = SequenceActivity;




});

unwrapExports(Sequence);
var Sequence_1 = Sequence.SequenceActivityToken;
var Sequence_2 = Sequence.SequenceActivity;

var Switch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * Switch activity token.
 */
exports.SwitchActivityToken = new core.InjectAcitityToken('switch');
/**
 * Switch control activity.
 *
 * @export
 * @class SwitchActivity
 * @extends {Activity}
 */
var SwitchActivity = /** @class */ (function (_super) {
    tslib_1.__extends(SwitchActivity, _super);
    function SwitchActivity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Switch body.
         *
         * @type {MapSet<any, IActivity>}
         * @memberof SwitchActivity
         */
        _this.cases = new core_1.MapSet();
        return _this;
    }
    SwitchActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _c.sent();
                        _a = this;
                        return [4 /*yield*/, this.toExpression(config.expression)];
                    case 2:
                        _a.expression = _c.sent();
                        if (!(config.cases && config.cases.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(config.cases.map(function (cs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var val;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.buildActivity(cs.value)];
                                        case 1:
                                            val = _a.sent();
                                            this.cases.set(cs.key, val);
                                            return [2 /*return*/, val];
                                    }
                                });
                            }); }))];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!config.defaultBody) return [3 /*break*/, 6];
                        _b = this;
                        return [4 /*yield*/, this.buildActivity(config.defaultBody)];
                    case 5:
                        _b.defaultBody = _c.sent();
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SwitchActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var matchkey;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.exec(this, this.expression, data)];
                    case 1:
                        matchkey = _a.sent();
                        if (!core_1.isUndefined(matchkey) && this.cases.has(matchkey)) {
                            return [2 /*return*/, this.cases.get(matchkey).run(data)];
                        }
                        else if (this.defaultBody) {
                            return [2 /*return*/, this.defaultBody.run(data)];
                        }
                        else {
                            return [2 /*return*/, Promise.resolve(data)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SwitchActivity.classAnnations = { "name": "SwitchActivity", "params": { "onActivityInit": ["config"], "run": ["data"] } };
    SwitchActivity = tslib_1.__decorate([
        core.Task(exports.SwitchActivityToken)
    ], SwitchActivity);
    return SwitchActivity;
}(core.Activity));
exports.SwitchActivity = SwitchActivity;




});

unwrapExports(Switch);
var Switch_1 = Switch.SwitchActivityToken;
var Switch_2 = Switch.SwitchActivity;

var Throw = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * throw activity token.
 */
exports.ThrowActivityToken = new core.InjectAcitityToken('throw');
/**
 * throw control activity.
 *
 * @export
 * @class ThrowActivity
 * @extends {Activity}
 */
var ThrowActivity = /** @class */ (function (_super) {
    tslib_1.__extends(ThrowActivity, _super);
    function ThrowActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThrowActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.toExpression(config.exception)];
                    case 2:
                        _a.exception = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ThrowActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.exec(this, this.exception, data)];
                    case 1:
                        error = _a.sent();
                        throw error;
                }
            });
        });
    };
    ThrowActivity.classAnnations = { "name": "ThrowActivity", "params": { "onActivityInit": ["config"], "run": ["data"] } };
    ThrowActivity = tslib_1.__decorate([
        core.Task(exports.ThrowActivityToken)
    ], ThrowActivity);
    return ThrowActivity;
}(core.Activity));
exports.ThrowActivity = ThrowActivity;




});

unwrapExports(Throw);
var Throw_1 = Throw.ThrowActivityToken;
var Throw_2 = Throw.ThrowActivity;

var TryCatch = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * while activity token.
 */
exports.TryCatchActivityToken = new core.InjectAcitityToken('trycatch');
/**
 * while control activity.
 *
 * @export
 * @class TryCatchActivity
 * @extends {Activity}
 */
var TryCatchActivity = /** @class */ (function (_super) {
    tslib_1.__extends(TryCatchActivity, _super);
    function TryCatchActivity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * catch activities.
         *
         * @type {IActivity[]}
         * @memberof TryCatchActivity
         */
        _this.catchs = [];
        return _this;
    }
    TryCatchActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, catchs, _b;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _c.sent();
                        _a = this;
                        return [4 /*yield*/, this.buildActivity(config.try)];
                    case 2:
                        _a.try = _c.sent();
                        if (!(config.catchs && config.catchs.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(config.catchs.map(function (cat) {
                                return _this.buildActivity(cat);
                            }))];
                    case 3:
                        catchs = _c.sent();
                        this.catchs = catchs;
                        _c.label = 4;
                    case 4:
                        if (!config.finally) return [3 /*break*/, 6];
                        _b = this;
                        return [4 /*yield*/, this.buildActivity(config.finally)];
                    case 5:
                        _b.finally = _c.sent();
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TryCatchActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rp;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                try {
                    rp = this.try.run(data);
                    this.catchs.forEach(function (cth) {
                        rp = rp.catch(function (r) { return cth.run(r); });
                    });
                    if (this.finally) {
                        rp.then(function (r) {
                            return _this.finally.run(r);
                        });
                    }
                }
                catch (_b) {
                    rp = Promise.resolve(data);
                    if (this.finally) {
                        rp.then(function (r) {
                            return _this.finally.run(r);
                        });
                    }
                }
                return [2 /*return*/, rp];
            });
        });
    };
    TryCatchActivity.classAnnations = { "name": "TryCatchActivity", "params": { "onActivityInit": ["config"], "run": ["data"] } };
    TryCatchActivity = tslib_1.__decorate([
        core.Task(exports.TryCatchActivityToken)
    ], TryCatchActivity);
    return TryCatchActivity;
}(Activity_1.Activity));
exports.TryCatchActivity = TryCatchActivity;




});

unwrapExports(TryCatch);
var TryCatch_1 = TryCatch.TryCatchActivityToken;
var TryCatch_2 = TryCatch.TryCatchActivity;

var While = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 * while activity token.
 */
exports.WhileActivityToken = new core.InjectAcitityToken('while');
/**
 * while control activity.
 *
 * @export
 * @class WhileActivity
 * @extends {Activity}
 */
var WhileActivity = /** @class */ (function (_super) {
    tslib_1.__extends(WhileActivity, _super);
    function WhileActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WhileActivity.prototype.onActivityInit = function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onActivityInit.call(this, config)];
                    case 1:
                        _c.sent();
                        _a = this;
                        return [4 /*yield*/, this.buildActivity(config.body)];
                    case 2:
                        _a.body = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.toExpression(config.while)];
                    case 3:
                        _b.condition = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WhileActivity.prototype.run = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var condition, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.context.exec(this, this.condition, data)];
                    case 1:
                        condition = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!condition) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.body.run(result || data)];
                    case 3:
                        result = _a.sent();
                        return [4 /*yield*/, this.context.exec(this, this.condition, result)];
                    case 4:
                        condition = _a.sent();
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    WhileActivity.classAnnations = { "name": "WhileActivity", "params": { "onActivityInit": ["config"], "run": ["data"] } };
    WhileActivity = tslib_1.__decorate([
        core.Task(exports.WhileActivityToken)
    ], WhileActivity);
    return WhileActivity;
}(core.Activity));
exports.WhileActivity = WhileActivity;




});

unwrapExports(While);
var While_1 = While.WhileActivityToken;
var While_2 = While.WhileActivity;

var activities = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

// export * from './Confirm';
tslib_1.__exportStar(Delay, exports);
tslib_1.__exportStar(Interval, exports);
tslib_1.__exportStar(DoWhile, exports);
tslib_1.__exportStar(If, exports);
tslib_1.__exportStar(Invoke, exports);
tslib_1.__exportStar(Parallel, exports);
tslib_1.__exportStar(Sequence, exports);
tslib_1.__exportStar(Switch, exports);
tslib_1.__exportStar(Throw, exports);
// export * from './Transition';
tslib_1.__exportStar(TryCatch, exports);
tslib_1.__exportStar(While, exports);




});

unwrapExports(activities);

var RunAspect_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * Task Log
 *
 * @export
 * @class TaskLogAspect
 */
var RunAspect = /** @class */ (function () {
    function RunAspect() {
    }
    RunAspect.prototype.beforeRun = function (joinPoint) {
        var runner = this.getRunner(joinPoint.target);
        if (!runner) {
            return;
        }
        runner.saveState(joinPoint);
        switch (runner.state) {
            case core.RunState.pause:
                throw new Error('workflow paused!');
            case core.RunState.stop:
                throw new Error('workflow stop!');
        }
    };
    RunAspect.prototype.afterRun = function (joinPoint) {
        var runner = this.getRunner(joinPoint.target);
        if (!runner) {
            return;
        }
        runner.saveState(joinPoint);
        switch (runner.state) {
            case core.RunState.pause:
                throw new Error('workflow paused!');
            case core.RunState.stop:
                throw new Error('workflow stop!');
        }
    };
    RunAspect.prototype.getRunner = function (task) {
        if (task instanceof core.Activity) {
            if (task.id && this.container.has(task.id)) {
                return this.container.resolve(task.id);
            }
        }
        return null;
    };
    RunAspect.classAnnations = { "name": "RunAspect", "params": { "constructor": [], "beforeRun": ["joinPoint"], "afterRun": ["joinPoint"], "getRunner": ["task"] } };
    tslib_1.__decorate([
        core_1.Inject(core_1.ContainerToken),
        tslib_1.__metadata("design:type", Object)
    ], RunAspect.prototype, "container", void 0);
    tslib_1.__decorate([
        aop_1.Before('execution(*.run)'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [aop_1.Joinpoint]),
        tslib_1.__metadata("design:returntype", void 0)
    ], RunAspect.prototype, "beforeRun", null);
    tslib_1.__decorate([
        aop_1.AfterReturning('execution(*.run)'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [aop_1.Joinpoint]),
        tslib_1.__metadata("design:returntype", void 0)
    ], RunAspect.prototype, "afterRun", null);
    RunAspect = tslib_1.__decorate([
        aop_1.Aspect({
            annotation: core.Task,
            singleton: true
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RunAspect);
    return RunAspect;
}());
exports.RunAspect = RunAspect;




});

unwrapExports(RunAspect_1);
var RunAspect_2 = RunAspect_1.RunAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1.__exportStar(RunAspect_1, exports);




});

unwrapExports(aop);

var WorkflowModuleValidate_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



exports.WorkflowModuleValidateToken = new core_1.InjectModuleValidateToken(core.Workflow.toString());
var WorkflowModuleValidate = /** @class */ (function (_super) {
    tslib_1.__extends(WorkflowModuleValidate, _super);
    function WorkflowModuleValidate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkflowModuleValidate.prototype.getDecorator = function () {
        return core.Workflow.toString();
    };
    WorkflowModuleValidate.classAnnations = { "name": "WorkflowModuleValidate", "params": { "getDecorator": [] } };
    WorkflowModuleValidate = tslib_1.__decorate([
        core_1.Singleton(exports.WorkflowModuleValidateToken)
    ], WorkflowModuleValidate);
    return WorkflowModuleValidate;
}(core_1.BaseModuelValidate));
exports.WorkflowModuleValidate = WorkflowModuleValidate;
exports.ActvityModuleValidateToken = new core_1.InjectModuleValidateToken(core.Task.toString());
var ActvityModuleValidate = /** @class */ (function (_super) {
    tslib_1.__extends(ActvityModuleValidate, _super);
    function ActvityModuleValidate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActvityModuleValidate.prototype.getDecorator = function () {
        return core.Task.toString();
    };
    ActvityModuleValidate.classAnnations = { "name": "ActvityModuleValidate", "params": { "getDecorator": [] } };
    ActvityModuleValidate = tslib_1.__decorate([
        core_1.Singleton(exports.ActvityModuleValidateToken)
    ], ActvityModuleValidate);
    return ActvityModuleValidate;
}(core_1.BaseModuelValidate));
exports.ActvityModuleValidate = ActvityModuleValidate;




});

unwrapExports(WorkflowModuleValidate_1);
var WorkflowModuleValidate_2 = WorkflowModuleValidate_1.WorkflowModuleValidateToken;
var WorkflowModuleValidate_3 = WorkflowModuleValidate_1.WorkflowModuleValidate;
var WorkflowModuleValidate_4 = WorkflowModuleValidate_1.ActvityModuleValidateToken;
var WorkflowModuleValidate_5 = WorkflowModuleValidate_1.ActvityModuleValidate;

var WorkflowModuleInjector_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });





exports.WorkflowModuleInjectorToken = new core_1.InjectModuleInjectorToken(core.Workflow.toString());
var WorkflowModuleInjector = /** @class */ (function (_super) {
    tslib_1.__extends(WorkflowModuleInjector, _super);
    function WorkflowModuleInjector(validate) {
        return _super.call(this, validate) || this;
    }
    WorkflowModuleInjector.classAnnations = { "name": "WorkflowModuleInjector", "params": { "constructor": ["validate"] } };
    WorkflowModuleInjector = tslib_1.__decorate([
        core_1.Injectable(exports.WorkflowModuleInjectorToken),
        tslib_1.__param(0, core_1.Inject(WorkflowModuleValidate_1.WorkflowModuleValidateToken)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], WorkflowModuleInjector);
    return WorkflowModuleInjector;
}(bootstrap_umd.DIModuleInjector));
exports.WorkflowModuleInjector = WorkflowModuleInjector;
exports.ActivityModuleInjectorToken = new core_1.InjectModuleInjectorToken(core.Task.toString());
var ActivityModuleInjector = /** @class */ (function (_super) {
    tslib_1.__extends(ActivityModuleInjector, _super);
    function ActivityModuleInjector(validate) {
        return _super.call(this, validate) || this;
    }
    ActivityModuleInjector.prototype.importModule = function (container, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var metaConfig, injMd;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        container.register(type);
                        metaConfig = this.getMetaConfig(type, container);
                        return [4 /*yield*/, this.registerConfgureDepds(container, metaConfig)];
                    case 1:
                        _a.sent();
                        injMd = new bootstrap_umd.InjectedModule(type, metaConfig, container);
                        container.bindProvider(new bootstrap_umd.InjectedModuleToken(type), injMd);
                        return [2 /*return*/, injMd];
                }
            });
        });
    };
    ActivityModuleInjector.classAnnations = { "name": "ActivityModuleInjector", "params": { "constructor": ["validate"], "importModule": ["container", "type"] } };
    ActivityModuleInjector = tslib_1.__decorate([
        core_1.Injectable(exports.ActivityModuleInjectorToken),
        tslib_1.__param(0, core_1.Inject(WorkflowModuleValidate_1.WorkflowModuleValidateToken)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ActivityModuleInjector);
    return ActivityModuleInjector;
}(bootstrap_umd.DIModuleInjector));
exports.ActivityModuleInjector = ActivityModuleInjector;




});

unwrapExports(WorkflowModuleInjector_1);
var WorkflowModuleInjector_2 = WorkflowModuleInjector_1.WorkflowModuleInjectorToken;
var WorkflowModuleInjector_3 = WorkflowModuleInjector_1.WorkflowModuleInjector;
var WorkflowModuleInjector_4 = WorkflowModuleInjector_1.ActivityModuleInjectorToken;
var WorkflowModuleInjector_5 = WorkflowModuleInjector_1.ActivityModuleInjector;

var DefaultWorkflowBuilder_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * workflow builder token.
 */
exports.WorkflowBuilderToken = new bootstrap_umd.InjectModuleBuilderToken(core.Activity);
/**
 * default Workflow Builder.
 *
 * @export
 * @class DefaultTaskContainer
 */
var DefaultWorkflowBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(DefaultWorkflowBuilder, _super);
    function DefaultWorkflowBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * bootstrap workflow via activity.
     *
     * @param {ActivityType<IActivity>} activity
     * @param {ModuleEnv} [env]
     * @param {string} [workflowId]
     * @returns {Promise<IActivityRunner<any>>}
     * @memberof DefaultWorkflowBuilder
     */
    DefaultWorkflowBuilder.prototype.bootstrap = function (activity, env, workflowId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var injmdl, runner;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(activity, env)];
                    case 1:
                        injmdl = _a.sent();
                        console.log(injmdl);
                        workflowId = workflowId || this.createUUID(injmdl.container);
                        return [4 /*yield*/, _super.prototype.bootstrap.call(this, activity, injmdl, workflowId)];
                    case 2:
                        runner = _a.sent();
                        return [2 /*return*/, runner];
                }
            });
        });
    };
    // getDecorator() {
    //     return Task.toString();
    // }
    DefaultWorkflowBuilder.prototype.createUUID = function (container) {
        if (!container.has(core.UUIDToken)) {
            container.register(core.RandomUUIDFactory);
        }
        return container.get(core.UUIDToken).generate();
    };
    DefaultWorkflowBuilder.prototype.getBootTyp = function (config) {
        return config.activity || config.task || _super.prototype.getBootType.call(this, config);
    };
    // protected getConfigId(config: ActivityConfigure) {
    //     return config.id || config.name;
    // }
    DefaultWorkflowBuilder.prototype.getDefaultService = function (container) {
        var providers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            providers[_i - 1] = arguments[_i];
        }
        return container.resolve.apply(container, [core.ActivityRunnerToken].concat(providers));
    };
    DefaultWorkflowBuilder.classAnnations = { "name": "DefaultWorkflowBuilder", "params": { "bootstrap": ["activity", "env", "workflowId"], "createUUID": ["container"], "getBootTyp": ["config"], "getDefaultService": ["container", "providers"] } };
    DefaultWorkflowBuilder = tslib_1.__decorate([
        core_1.Singleton(exports.WorkflowBuilderToken)
    ], DefaultWorkflowBuilder);
    return DefaultWorkflowBuilder;
}(bootstrap_umd.ModuleBuilder));
exports.DefaultWorkflowBuilder = DefaultWorkflowBuilder;




});

unwrapExports(DefaultWorkflowBuilder_1);
var DefaultWorkflowBuilder_2 = DefaultWorkflowBuilder_1.WorkflowBuilderToken;
var DefaultWorkflowBuilder_3 = DefaultWorkflowBuilder_1.DefaultWorkflowBuilder;

var ActivityMetaAccessor_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




exports.ActivityMetaAccessorToken = new bootstrap_umd.InjectMetaAccessorToken(core.Activity);
/**
 * activity metadata accessor.
 *
 * @export
 * @class ActivityMetaAccessor
 * @extends {MetaAccessor}
 */
var ActivityMetaAccessor = /** @class */ (function (_super) {
    tslib_1.__extends(ActivityMetaAccessor, _super);
    function ActivityMetaAccessor() {
        return _super.call(this, core.Task.toString()) || this;
    }
    ActivityMetaAccessor.classAnnations = { "name": "ActivityMetaAccessor", "params": { "constructor": [] } };
    ActivityMetaAccessor = tslib_1.__decorate([
        core_1.Injectable(exports.ActivityMetaAccessorToken),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActivityMetaAccessor);
    return ActivityMetaAccessor;
}(bootstrap_umd.MetaAccessor));
exports.ActivityMetaAccessor = ActivityMetaAccessor;




});

unwrapExports(ActivityMetaAccessor_1);
var ActivityMetaAccessor_2 = ActivityMetaAccessor_1.ActivityMetaAccessorToken;
var ActivityMetaAccessor_3 = ActivityMetaAccessor_1.ActivityMetaAccessor;

var injectors = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1.__exportStar(WorkflowModuleValidate_1, exports);
tslib_1.__exportStar(WorkflowModuleInjector_1, exports);
tslib_1.__exportStar(DefaultWorkflowBuilder_1, exports);
tslib_1.__exportStar(ActivityMetaAccessor_1, exports);




});

unwrapExports(injectors);

var CoreModule_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });






/**
 * register task decorators.
 *
 * @export
 * @param {IContainer} container
 */
var CoreModule = /** @class */ (function () {
    function CoreModule(container) {
        this.container = container;
    }
    CoreModule.prototype.setup = function () {
        var container = this.container;
        var lifeScope = container.getLifeScope();
        lifeScope.registerDecorator(core.Workflow, core_1.CoreActions.bindProvider, core_1.CoreActions.cache, core_1.CoreActions.componentBeforeInit, core_1.CoreActions.componentInit, core_1.CoreActions.componentAfterInit);
        lifeScope.registerDecorator(core.Task, core_1.CoreActions.bindProvider, core_1.CoreActions.cache, core_1.CoreActions.componentBeforeInit, core_1.CoreActions.componentInit, core_1.CoreActions.componentAfterInit);
        container.register(core.ActivityBuilder)
            .register(core.ActivityRunner)
            .register(core.Context)
            .register(aop.RunAspect)
            .register(core.Activity)
            .use(activities)
            .use(injectors);
    };
    CoreModule.classAnnations = { "name": "CoreModule", "params": { "constructor": ["container"], "setup": [] } };
    CoreModule = tslib_1.__decorate([
        core_1.IocExt('setup'),
        tslib_1.__param(0, core_1.Inject(core_1.ContainerToken)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;




});

unwrapExports(CoreModule_1);
var CoreModule_2 = CoreModule_1.CoreModule;

var DefaultTaskContainer_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });









/**
 * default task container.
 *
 * @export
 * @class DefaultTaskContainer
 */
var DefaultTaskContainer = /** @class */ (function () {
    function DefaultTaskContainer(baseURL) {
        this.baseURL = baseURL;
    }
    DefaultTaskContainer.prototype.getContainer = function () {
        if (!this.container) {
            this.container = this.getBuilder().getPools().getDefault();
        }
        return this.container;
    };
    DefaultTaskContainer.prototype.getBuilder = function () {
        if (!this.builder) {
            this.builder = this.createAppBuilder();
            this.builder.events.on(bootstrap_umd.ApplicationEvents.onRootContainerCreated, function (container) {
                container.register(injectors.DefaultWorkflowBuilder)
                    .register(injectors.WorkflowModuleValidate)
                    .register(injectors.WorkflowModuleInjector)
                    .register(injectors.ActvityModuleValidate)
                    .register(injectors.ActivityModuleInjector);
                var chain = container.getBuilder().getInjectorChain(container);
                chain.first(container.resolve(injectors.ActivityModuleInjectorToken));
                chain.first(container.resolve(injectors.WorkflowModuleInjectorToken));
            });
            this.builder
                .use(aop_1.AopModule)
                .use(logs.LogModule)
                .use(CoreModule_1.CoreModule)
                .provider(bootstrap_umd.DefaultAnnotationBuilderToken, core.ActivityBuilderToken)
                .provider(bootstrap_umd.DefaultServiceToken, core.ActivityRunnerToken)
                .provider(bootstrap_umd.DefaultModuleBuilderToken, injectors.WorkflowBuilderToken)
                .provider(bootstrap_umd.DefaultMetaAccessorToken, injectors.ActivityMetaAccessorToken);
        }
        return this.builder;
    };
    DefaultTaskContainer.prototype.createAppBuilder = function () {
        return new bootstrap_umd.DefaultApplicationBuilder(this.baseURL);
    };
    /**
     * use custom configuration.
     *
     * @param {(string | AppConfiguration)} [config]
     * @param {IContainer} [container]
     * @returns {this}
     * @memberof IApplicationBuilder
     */
    DefaultTaskContainer.prototype.useConfiguration = function (config) {
        this.getBuilder().useConfiguration(config);
        return this;
    };
    /**
     * use module
     *
     * @param {...LoadType[]} modules
     * @returns {this}
     * @memberof IApplicationBuilder
     */
    DefaultTaskContainer.prototype.use = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var _a;
        (_a = this.getBuilder()).use.apply(_a, modules);
        return this;
    };
    /**
     * bind provider
     *
     * @template T
     * @param {Token<T>} provide
     * @param {Token<T> | Factory<T>} provider
     * @returns {this}
     * @memberof IContainer
     */
    DefaultTaskContainer.prototype.provider = function (provide, provider) {
        this.getBuilder().provider(provide, provider);
        return this;
    };
    DefaultTaskContainer.prototype.useLog = function (logAspect) {
        if (core_1.hasClassMetadata(aop_1.Aspect, logAspect)) {
            this.getBuilder().use(logAspect);
        }
        else {
            console.error('logAspect param is not right aspect');
        }
        return this;
    };
    DefaultTaskContainer.prototype.getWorkflow = function (workflowId) {
        return this.getContainer().resolve(workflowId);
    };
    /**
     * create workflow.
     *
     * @param {Active} activity
     * @param {string} [workflowId]
     * @memberof ITaskContainer
     */
    DefaultTaskContainer.prototype.createActivity = function (activity, workflowId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var boot, runner;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workflowId = workflowId || this.createUUID();
                        if (core_1.isToken(activity)) {
                            boot = activity; // { id: workflowId, token: activity, builder: WorkflowBuilderToken };
                        }
                        else {
                            boot = activity || {};
                            boot.id = workflowId;
                            boot.builder = boot.builder || injectors.WorkflowBuilderToken;
                            boot.annotationBuilder = boot.annotationBuilder || core.ActivityBuilderToken;
                        }
                        return [4 /*yield*/, this.getBuilder().bootstrap(boot, null, workflowId)];
                    case 1:
                        runner = _a.sent();
                        this.getContainer().bindProvider(workflowId, runner);
                        return [2 /*return*/, runner];
                }
            });
        });
    };
    DefaultTaskContainer.prototype.createUUID = function () {
        var container = this.getContainer();
        if (!container.has(core.UUIDToken)) {
            container.register(core.RandomUUIDFactory);
        }
        return container.get(core.UUIDToken).generate();
    };
    /**
     * create workflow and bootstrap.
     *
     * @param {...Active[]} activites
     * @returns {Promise<IActivityRunner<any>>}
     * @memberof DefaultTaskContainer
     */
    DefaultTaskContainer.prototype.bootstrap = function () {
        var activites = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            activites[_i] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var workflow, runner;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workflow = (activites.length > 1) ? { sequence: activites, task: activities.SequenceActivity } : core_1.lang.first(activites);
                        return [4 /*yield*/, this.createActivity(workflow)];
                    case 1:
                        runner = _a.sent();
                        return [2 /*return*/, runner];
                }
            });
        });
    };
    DefaultTaskContainer.classAnnations = { "name": "DefaultTaskContainer", "params": { "constructor": ["baseURL"], "getContainer": [], "getBuilder": [], "createAppBuilder": [], "useConfiguration": ["config"], "use": ["modules"], "provider": ["provide", "provider"], "useLog": ["logAspect"], "getWorkflow": ["workflowId"], "createActivity": ["activity", "workflowId"], "createUUID": [], "bootstrap": ["activites"] } };
    return DefaultTaskContainer;
}());
exports.DefaultTaskContainer = DefaultTaskContainer;




});

unwrapExports(DefaultTaskContainer_1);
var DefaultTaskContainer_2 = DefaultTaskContainer_1.DefaultTaskContainer;

var objectUtil = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * pick object.
 *
 * @export
 * @template T
 * @param {object} source
 * @param {...string[]} fields
 * @returns {T}
 */
function pick(source) {
    var fields = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        fields[_i - 1] = arguments[_i];
    }
    var pickObj = {};
    fields.forEach(function (field) {
        pickObj[field] = source[field];
    });
    return pickObj;
}
exports.pick = pick;




});

unwrapExports(objectUtil);
var objectUtil_1 = objectUtil.pick;

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1.__exportStar(objectUtil, exports);




});

unwrapExports(utils);

var D__workspace_github_typeTask_packages_core_lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_1.__exportStar(ITaskContainer, exports);
tslib_1.__exportStar(DefaultTaskContainer_1, exports);
tslib_1.__exportStar(injectors, exports);
tslib_1.__exportStar(utils, exports);
tslib_1.__exportStar(core, exports);
tslib_1.__exportStar(aop, exports);
tslib_1.__exportStar(activities, exports);
tslib_1.__exportStar(CoreModule_1, exports);




});

var index$6 = unwrapExports(D__workspace_github_typeTask_packages_core_lib);

return index$6;

})));
