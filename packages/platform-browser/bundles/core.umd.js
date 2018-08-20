(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tslib'), require('@ts-ioc/core'), require('@ts-ioc/aop'), require('@ts-ioc/logs'), require('@taskfr/core'), require('reflect-metadata')) :
	typeof define === 'function' && define.amd ? define(['tslib', '@ts-ioc/core', '@ts-ioc/aop', '@ts-ioc/logs', '@taskfr/core', 'reflect-metadata'], factory) :
	(global.core = global.core || {}, global.core.umd = global.core.umd || {}, global.core.umd.js = factory(global.tslib_1,global.core_1,global.aop_1,global.logs_1,global.core_2,global.Reflect));
}(this, (function (tslib_1,core_1,aop_1,logs_1,core_2,reflectMetadata) { 'use strict';

tslib_1 = tslib_1 && tslib_1.hasOwnProperty('default') ? tslib_1['default'] : tslib_1;
core_1 = core_1 && core_1.hasOwnProperty('default') ? core_1['default'] : core_1;
aop_1 = aop_1 && aop_1.hasOwnProperty('default') ? aop_1['default'] : aop_1;
logs_1 = logs_1 && logs_1.hasOwnProperty('default') ? logs_1['default'] : logs_1;
core_2 = core_2 && core_2.hasOwnProperty('default') ? core_2['default'] : core_2;
reflectMetadata = reflectMetadata && reflectMetadata.hasOwnProperty('default') ? reflectMetadata['default'] : reflectMetadata;

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
Object.defineProperty(exports,"__esModule",{value:!0});var RunnerLogAspect=function(r){function t(t){var e=r.call(this,t)||this;return e.startHrts={}, e}return tslib_1.__extends(t,r), t.prototype.logStart=function(t){var e,r,o=this.logger,i=t.target.instance.id,n="'"+i+"'";t.state===aop_1.JoinpointState.Before&&(e=new Date, this.startHrts[i]=e, o.log("["+e.toString()+"]","Starting workflow",n,"...")), t.state===aop_1.JoinpointState.AfterReturning&&(e=this.startHrts[i], r=new Date, delete this.startHrts[i], o.log("["+r.toString()+"]","Finished workflow",n," after ",r.getTime()-e.getTime())), t.state===aop_1.JoinpointState.AfterThrowing&&(e=this.startHrts[i], r=new Date, delete this.startHrts[i], o.log("["+r.toString()+"]","Finished workflow",n,"errored after",r.getTime()-e.getTime()));}, t.classAnnations={name:"RunnerLogAspect",params:{constructor:["container"],logStart:["joinPoint"]}}, tslib_1.__decorate([aop_1.Around("execution(*.start)"),tslib_1.__metadata("design:type",Function),tslib_1.__metadata("design:paramtypes",[aop_1.Joinpoint]),tslib_1.__metadata("design:returntype",void 0)],t.prototype,"logStart",null), t=tslib_1.__decorate([aop_1.Aspect({annotation:core_2.Workflow,singleton:!0}),tslib_1.__param(0,core_1.Inject(core_1.ContainerToken)),tslib_1.__metadata("design:paramtypes",[Object])],t)}(logs_1.LoggerAspect);exports.RunnerLogAspect=RunnerLogAspect;



});

unwrapExports(RunnerLogAspect_1);
var RunnerLogAspect_2 = RunnerLogAspect_1.RunnerLogAspect;

var aop = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(TaskLogAspect_1,exports), tslib_1.__exportStar(RunnerLogAspect_1,exports);



});

unwrapExports(aop);

var bootstrap_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory(tslib_1, core_1, reflectMetadata);
}(commonjsGlobal, (function (tslib_1$$2,core_1$$2,reflectMetadata$$1) { tslib_1$$2 = tslib_1$$2 && tslib_1$$2.hasOwnProperty('default') ? tslib_1$$2['default'] : tslib_1$$2;
core_1$$2 = core_1$$2 && core_1$$2.hasOwnProperty('default') ? core_1$$2['default'] : core_1$$2;
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

tslib_1$$2.__exportStar(Annotation, exports);
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
    tslib_1$$2.__extends(InjectModuleBuilderToken, _super);
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
    tslib_1$$2.__extends(InjectAnnotationBuilder, _super);
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
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var builder, instance;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1$$2.__generator(this, function (_a) {
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
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var instance;
            return tslib_1$$2.__generator(this, function (_a) {
                if (!token) {
                    console.log('can not find annotation token.');
                    return [2 /*return*/, null];
                }
                if (!this.container.has(token)) {
                    if (core_1$$2.isClass(token)) {
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
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$2.__generator(this, function (_a) {
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
    tslib_1$$2.__decorate([
        core_1$$2.Inject(core_1$$2.ContainerToken),
        tslib_1$$2.__metadata("design:type", Object)
    ], AnnotationBuilder.prototype, "container", void 0);
    AnnotationBuilder = AnnotationBuilder_1 = tslib_1$$2.__decorate([
        core_1$$2.Injectable(IAnnotationBuilder.AnnotationBuilderToken),
        tslib_1$$2.__metadata("design:paramtypes", [])
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
    tslib_1$$2.__extends(InjectMetaAccessorToken, _super);
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
    MetaAccessor.prototype.get = function (container, token) {
        var type = core_1$$2.isClass(token) ? token : container.getTokenImpl(token);
        if (core_1$$2.isClass(type)) {
            var metas = core_1$$2.getTypeMetadata(this.decorator, type);
            if (metas && metas.length) {
                var meta = metas[0];
                return meta;
            }
        }
        return null;
    };
    MetaAccessor.classAnnations = { "name": "MetaAccessor", "params": { "constructor": ["decorator"], "get": ["container", "token"] } };
    MetaAccessor = tslib_1$$2.__decorate([
        core_1$$2.Injectable(exports.DefaultMetaAccessorToken),
        tslib_1$$2.__metadata("design:paramtypes", [String])
    ], MetaAccessor);
    return MetaAccessor;
}());
exports.MetaAccessor = MetaAccessor;


});

unwrapExports$$1(MetaAccessor_1);
var MetaAccessor_2 = MetaAccessor_1.InjectMetaAccessorToken;
var MetaAccessor_3 = MetaAccessor_1.DefaultMetaAccessorToken;
var MetaAccessor_4 = MetaAccessor_1.MetaAccessor;

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
        container.register(MetaAccessor_1.MetaAccessor);
        container.register(ModuleBuilder_1.ModuleBuilder);
        container.register(AnnotationBuilder_1.AnnotationBuilder);
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
        this.inited = false;
        this.pools = new core_1$$2.MapSet();
        this.globalModules = [];
    }
    ContainerPool.prototype.getTokenKey = function (token) {
        if (token instanceof core_1$$2.Registration) {
            return token.toString();
        }
        return token;
    };
    /**
     * use global modules.
     *
     * @param {...LoadType[]} modules
     * @returns {this}
     * @memberof ContainerPool
     */
    ContainerPool.prototype.use = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        this.globalModules = this.globalModules.concat(modules);
        this.inited = false;
        return this;
    };
    ContainerPool.prototype.hasInit = function () {
        return this.inited;
    };
    ContainerPool.prototype.initDefault = function () {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var container, usedModules;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        container = this.getDefault();
                        if (!this.globalModules.length) return [3 /*break*/, 2];
                        usedModules = this.globalModules;
                        return [4 /*yield*/, container.loadModule.apply(container, usedModules)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.inited = true;
                        return [2 /*return*/, container];
                }
            });
        });
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
    ContainerPool.classAnnations = { "name": "ContainerPool", "params": { "constructor": [], "getTokenKey": ["token"], "use": ["modules"], "hasInit": [], "initDefault": [], "isDefault": ["container"], "hasDefault": [], "setDefault": ["container"], "getDefault": [], "set": ["token", "container"], "get": ["token"], "has": ["token"] } };
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
    tslib_1$$2.__extends(InjectServiceToken, _super);
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
    tslib_1$$2.__extends(InjectRunnerToken, _super);
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
     * @param {ModuleEnv} [env] set loadedModule will return loaded container; set default container or not. not set will create new container.
     * @param {IContainer} [parent] set the container parent, default will set root default container.
     * @returns {IContainer}
     * @memberof ModuleBuilder
     */
    ModuleBuilder.prototype.getContainer = function (token, env, parent) {
        var container;
        if (env instanceof ModuleType.LoadedModule && env.token === token) {
            container = env.container;
            this.setParent(container, parent);
            return container;
        }
        var defaultContainer = this.getContainerInEnv(env);
        var pools = this.getPools();
        if (core_1$$2.isToken(token)) {
            if (pools.has(token)) {
                return pools.get(token);
            }
            else {
                var cfg = this.getConfigure(token, defaultContainer);
                container = cfg.container || defaultContainer;
                if (!container || !(defaultContainer instanceof core_1$$2.Container)) {
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
            if (!container || !(defaultContainer instanceof core_1$$2.Container)) {
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
    ModuleBuilder.prototype.getContainerInEnv = function (env) {
        var envContainer;
        if (env instanceof ModuleType.LoadedModule) {
            envContainer = env.container;
        }
        else if (env instanceof core_1$$2.Container) {
            envContainer = env;
        }
        return envContainer;
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
        return new core_1$$2.DefaultContainerBuilder();
    };
    ModuleBuilder.prototype.load = function (token, env, parent) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var container, tk, mdToken, cfg, mToken, loadmdl;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.getPools().hasInit()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getPools().initDefault()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        container = this.getContainer(token, env, parent);
                        tk = core_1$$2.isToken(token) ? token : this.getConfigId(token);
                        mdToken = new InjectModuleLoadToken(tk);
                        if (tk && container.has(mdToken)) {
                            return [2 /*return*/, container.resolve(mdToken)];
                        }
                        cfg = this.getConfigure(token, container);
                        return [4 /*yield*/, this.registerDepdences(container, cfg)];
                    case 3:
                        cfg = _a.sent();
                        mToken = core_1$$2.isToken(token) ? token : this.getType(cfg);
                        if (core_1$$2.isClass(mToken) && !container.has(mToken)) {
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
    ModuleBuilder.prototype.cleanLoadModule = function (container, tk) {
        var mdToken = new InjectModuleLoadToken(tk);
        container.unregister(mdToken);
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
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var loadmdl, container, cfg, builder, tk, annBuilder, instance, instance, mdlInst;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(token, env)];
                    case 1:
                        loadmdl = _a.sent();
                        container = loadmdl.container;
                        cfg = loadmdl.moduleConfig;
                        builder = this.getBuilder(token, env);
                        if (!(builder && builder !== this)) return [3 /*break*/, 3];
                        tk = core_1$$2.isToken(token) ? token : this.getConfigId(token);
                        this.cleanLoadModule(container, tk);
                        return [4 /*yield*/, builder.build(token, loadmdl, data)];
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
                        if (mdlInst && core_1$$2.isFunction(mdlInst.mdOnInit)) {
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
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var loadmdl, cfg, container, builder, tk, md, bootToken, anBuilder, bootInstance, runable;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.load(token, env)];
                    case 1:
                        loadmdl = _a.sent();
                        cfg = loadmdl.moduleConfig;
                        container = loadmdl.container;
                        builder = this.getBuilder(token, env);
                        if (!(builder && builder !== this)) return [3 /*break*/, 3];
                        tk = core_1$$2.isToken(token) ? token : this.getConfigId(token);
                        this.cleanLoadModule(container, tk);
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
                        if (!(md && core_1$$2.isFunction(md.mdOnStart))) return [3 /*break*/, 8];
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
    ModuleBuilder.prototype.getBuilder = function (token, env) {
        var container = this.getContainerInEnv(env) || this.getPools().getDefault();
        var cfg = this.getConfigure(token, container);
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
            else if (cfg.builder instanceof ModuleBuilder_1) {
                builder = cfg.builder;
            }
        }
        var tko = core_1$$2.isToken(token) ? token : this.getType(token);
        if (!builder && tko) {
            container.getTokenExtendsChain(tko).forEach(function (tk) {
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
        if (!builder) {
            builder = this.getDefaultBuilder(container);
        }
        if (builder) {
            builder.setPools(this.getPools());
        }
        return builder || this;
    };
    ModuleBuilder.prototype.getDefaultBuilder = function (container) {
        if (container.has(IModuleBuilder.DefaultModuleBuilderToken)) {
            return container.resolve(IModuleBuilder.DefaultModuleBuilderToken);
        }
        return null;
    };
    ModuleBuilder.prototype.autoRun = function (container, token, cfg, instance) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var runner_1, service_1, provider_1;
            return tslib_1$$2.__generator(this, function (_a) {
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
        var providers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            providers[_i - 1] = arguments[_i];
        }
        if (container.has(IRunner.DefaultRunnerToken)) {
            return container.resolve.apply(container, [IRunner.DefaultRunnerToken].concat(providers));
        }
        return null;
    };
    ModuleBuilder.prototype.getDefaultService = function (container) {
        var providers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            providers[_i - 1] = arguments[_i];
        }
        if (container.has(Service_1.DefaultServiceToken)) {
            return container.resolve.apply(container, [Service_1.DefaultServiceToken].concat(providers));
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
        if (container.has(IAnnotationBuilder.DefaultAnnotationBuilderToken)) {
            return container.resolve(IAnnotationBuilder.DefaultAnnotationBuilderToken);
        }
        return container.resolve(IAnnotationBuilder.AnnotationBuilderToken);
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
        container = container || this.getPools().getDefault();
        if (core_1$$2.isToken(token)) {
            cfg = this.getMetaConfig(token, container);
        }
        else if (core_1$$2.isObject(token)) {
            var type = this.getType(token);
            cfg = core_1$$2.lang.assign(token || {}, this.getMetaConfig(type, container), token || {});
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
                        buider = container.getBuilder();
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
    ModuleBuilder.prototype.getMetaConfig = function (token, container) {
        if (core_1$$2.isToken(token)) {
            var decorator = this.getDecorator();
            var accessor_1;
            var provider_2 = { decorator: decorator };
            container.getTokenExtendsChain(token).forEach(function (tk) {
                if (accessor_1) {
                    return false;
                }
                var accToken = new MetaAccessor_1.InjectMetaAccessorToken(tk);
                if (container.has(accToken)) {
                    accessor_1 = container.resolve(accToken, provider_2);
                }
                return true;
            });
            if (!accessor_1) {
                accessor_1 = this.getDefaultMetaAccessor(container, provider_2);
            }
            if (accessor_1) {
                return accessor_1.get(container, token);
            }
            else {
                return null;
            }
        }
        return null;
    };
    ModuleBuilder.prototype.getDefaultMetaAccessor = function (container) {
        var providers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            providers[_i - 1] = arguments[_i];
        }
        return container.resolve.apply(container, [MetaAccessor_1.DefaultMetaAccessorToken].concat(providers));
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
    ModuleBuilder.classAnnations = { "name": "ModuleBuilder", "params": { "constructor": [], "getPools": [], "setPools": ["pools"], "regDefaultContainer": [], "getContainer": ["token", "env", "parent"], "getContainerInEnv": ["env"], "getConfigId": ["cfg"], "setParent": ["container", "parent"], "createContainer": [], "getContainerBuilder": [], "createContainerBuilder": [], "load": ["token", "env", "parent"], "cleanLoadModule": ["container", "tk"], "build": ["token", "env", "data"], "bootstrap": ["token", "env", "data"], "getBuilder": ["token", "env"], "getDefaultBuilder": ["container"], "autoRun": ["container", "token", "cfg", "instance"], "getDefaultRunner": ["container", "providers"], "getDefaultService": ["container", "providers"], "getAnnoBuilder": ["container", "token", "annBuilder"], "getDefaultAnnBuilder": ["container"], "importModule": ["token", "container"], "getDecorator": [], "getConfigure": ["token", "container"], "registerDepdences": ["container", "config"], "getType": ["cfg"], "getBootType": ["cfg"], "importConfigExports": ["container", "providerContainer", "cfg"], "registerConfgureDepds": ["container", "config"], "getMetaConfig": ["token", "container"], "getDefaultMetaAccessor": ["container", "providers"], "isIocExt": ["token"], "isDIModule": ["token"], "registerExts": ["container", "config"], "bindProvider": ["container", "providers"] } };
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
        _this.customRegs = [];
        _this.providers = new core_1$$2.MapSet();
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
        container = container || this.getPools().getDefault();
        if (!this.globalConfig) {
            this.globalConfig = Promise.resolve(this.getDefaultConfig(container));
        }
        var pcfg;
        if (core_1$$2.isString(config) || core_1$$2.isUndefined(config)) {
            pcfg = this.loadConfig(container, config);
        }
        else if (config) {
            pcfg = Promise.resolve(config);
        }
        if (pcfg) {
            this.globalConfig = this.globalConfig
                .then(function (cfg) {
                return pcfg.then(function (rcfg) {
                    if (rcfg) {
                        var excfg = (rcfg['default'] ? rcfg['default'] : rcfg);
                        cfg = core_1$$2.lang.assign(cfg || {}, excfg || {});
                    }
                    return cfg || {};
                });
            });
        }
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
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var _a;
        (_a = this.pools).use.apply(_a, modules);
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
    DefaultApplicationBuilder.prototype.registerConfgureDepds = function (container, config) {
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            var globalCfg;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.globalConfig) {
                            this.useConfiguration(undefined, container);
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
            var _this = this;
            return tslib_1$$2.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.registerExts.call(this, container, config)];
                    case 1:
                        _a.sent();
                        this.providers.forEach(function (val, key) {
                            container.bindProvider(key, val);
                        });
                        if (!this.customRegs.length) return [3 /*break*/, 3];
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
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, container];
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
        return tslib_1$$2.__awaiter(this, void 0, void 0, function () {
            return tslib_1$$2.__generator(this, function (_a) {
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
    DefaultApplicationBuilder.classAnnations = { "name": "DefaultApplicationBuilder", "params": { "constructor": ["baseURL"], "create": ["baseURL"], "useConfiguration": ["config", "container"], "loadConfig": ["container", "src"], "use": ["modules"], "provider": ["provide", "provider"], "registerConfgureDepds": ["container", "config"], "mergeGlobalConfig": ["globalCfg", "moduleCfg"], "regDefaultContainer": [], "registerExts": ["container", "config"], "bindAppConfig": ["config"], "getDefaultConfig": ["container"] } };
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
tslib_1$$2.__exportStar(MetaAccessor_1, exports);
tslib_1$$2.__exportStar(IAnnotationBuilder, exports);
tslib_1$$2.__exportStar(AnnotationBuilder_1, exports);
tslib_1$$2.__exportStar(IRunner, exports);
tslib_1$$2.__exportStar(Service_1, exports);
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
}(commonjsGlobal, (function (tslib_1$$2,core,bootstrap,platformBrowser) { tslib_1$$2 = tslib_1$$2 && tslib_1$$2.hasOwnProperty('default') ? tslib_1$$2['default'] : tslib_1$$2;
core = core && core.hasOwnProperty('default') ? core['default'] : core;
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
        return _super.call(this, baseURL || !core.isUndefined(System) ? System.baseURL : location.href) || this;
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
    ApplicationBuilder.classAnnations = { "name": "ApplicationBuilder", "params": { "constructor": ["baseURL"], "create": ["baseURL"], "createContainerBuilder": [], "createBuilder": [] } };
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

var D__Workspace_Projects_modules_typeTask_packages_platformBrowser_lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:!0});tslib_1.__exportStar(aop,exports), tslib_1.__exportStar(TaskContainer_1,exports);



});

var index$1 = unwrapExports(D__Workspace_Projects_modules_typeTask_packages_platformBrowser_lib);

return index$1;

})));
