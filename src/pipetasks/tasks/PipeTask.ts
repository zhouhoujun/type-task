import { ITask } from '../ITask';
import { ITaskContext } from '../ITaskContext';
import { IAssets } from '../IAssets';
import { TransformSource, Pipe, OutputPipe, TaskResult } from '../types';
import { RunWay } from '../RunWay';
import { ITransform } from '../ITransform';
import { IPipe } from '../IPipe';
import { isFunction, Singleton } from 'tsioc';
import { isString, isArray, isUndefined } from 'util';
import { IPipeTask } from '../IPipeTask';
import { sortOrder, pick, Src } from '../../utils';
import { PipeTask } from '../index';

/**
 *  Pipe Task class.
 *
 * @export
 * @class Task
 * @implements {ITask}
 */
@PipeTask
export class DefaultPipeTask implements IPipeTask {
    /**
     * run mutil source stream way. default parallel.
     *
     * @memberOf PipeTask
     */
    public runWay = RunWay.parallel;


    constructor() {
    }

    /**
     * source streams.
     *
     * @param {ITaskContext} context
     * @param {IAssets} option
     * @returns {(TransformSource | Promise<TransformSource>)}
     *
     * @memberOf PipeTask
     */
    source(ctx: ITaskContext, dist: IAssets): TransformSource | Promise<TransformSource> {
        return this.src(ctx.getSrc());
    }



    /**
     * task pipe works.
     *
     * @param {ITaskContext} context
     * @param {IAssets} dist
     * @returns {Pipe[]}
     *
     * @memberOf PipeTask
     */
    pipes(ctx: ITaskContext, dist: IAssets): Pipe[] {
        let option = ctx.option;
        let pipes: Pipe[] = null;
        let loader = <IPipeOption>option['loader'];
        if (loader) {
            pipes = isFunction(loader.pipes) ? loader.pipes(ctx, option) : loader.pipes.filter(p => p);
        }

        if (option.pipes) {
            let opps = isFunction(option.pipes) ? option.pipes(ctx, option) : option.pipes.filter(p => p);
            if (opps && opps.length > 0) {
                pipes = pipes ? pipes.concat(opps) : opps;
            }
        }
        return pipes || [];
    }

    /**
     * output pipes.
     *
     * @param {ITaskContext} context
     * @param {IAssets} dist
     * @returns {OutputPipe[]}
     *
     * @memberOf PipeTask
     */
    output(ctx: ITaskContext, dist: IAssets): OutputPipe[] {
        let option = ctx.option;
        let pipes: OutputPipe[] = null;
        let loader = <IPipeOption>option['loader'];
        if (loader && !isString(loader) && !isArray(loader)) {
            if (loader.output) {
                pipes = isFunction(loader.output) ? loader.output(ctx, option) : loader.output.filter(p => p);
            } else if (loader.output === null) {
                return [(stream) => stream];
            }
        }
        if (option.output) {
            let opps = isFunction(option.output) ? option.output(ctx, option) : option.output.filter(p => p);
            if (opps && opps.length > 0) {
                pipes = pipes ? pipes.concat(opps) : opps;
            }
        } else if (option.output === null) {
            return [(stream) => stream];
        }

        return pipes || [(stream) => stream.pipe(this.dest(ctx.getDist(dist)))]
    }

    dest(dist: string): NodeJS.ReadWriteStream {
        return null;
    }

    /**
     *  custom pipe Promise.
     *
     * @protected
     * @param {ITransform} source
     * @param {ITaskContext} ctx
     * @param {IAssets} dist
     * @returns
     *
     * @memberOf PipeTask
     */
    protected customPipe(source: ITransform, ctx: ITaskContext, dist: IAssets): ITransform | Promise<ITransform> {
        let cfgopt = ctx.option;
        let loader = <IPipeOption>cfgopt['loader'];
        let prsrc: Promise<ITransform>;
        let oper;
        if (cfgopt.pipe) {
            oper = this.getTransformOperate(source);
            prsrc = this.cpipe2Promise(source, cfgopt, ctx, dist);
        }
        if (loader && !isString(loader) && !isArray(loader) && loader.pipe) {
            oper = this.getTransformOperate(source);
            prsrc = prsrc ?
                prsrc.then(stream => {
                    this.setTransformOperate(stream, oper);
                    return this.cpipe2Promise(stream, loader, ctx, dist)
                })
                : this.cpipe2Promise(source, loader, ctx, dist);
        }

        if (prsrc) {
            return prsrc.then(stream => {
                this.setTransformOperate(stream, oper);
                return stream;
            });
        }

        return source;
    }

    /**
     * get option.
     *
     * @protected
     * @param {ITaskContext} ctx
     * @returns {IAssets}
     *
     * @memberOf PipeTask
     */
    protected getOption(ctx: ITaskContext): IAssets {
        return ctx.getAssets();
    }

    /**
     * match pipe Operate
     *
     * @protected
     * @param {IPipe} p
     * @param {string} name
     * @param {ITaskContext} ctx
     * @param {IPipe} [trsOperate]
     * @param {boolean} [isOutput=false]
     * @returns
     *
     * @memberOf PipeTask
     */
    protected match(p: IPipe, name: string, ctx: ITaskContext, trsOperate?: IPipe, isOutput = false) {
        // return this.matchOperate(p, name, ctx, isOutput) && (!trsOperate || (trsOperate && this.matchOperate(trsOperate, name, ctx, isOutput)));
        return this.matchOperate(p, name, ctx, isOutput) || (trsOperate && this.matchOperate(trsOperate, name, ctx, isOutput));
    }

    /**
     * match operate.
     * @param p
     * @param name
     * @param ctx
     * @param isOutput
     */
    protected matchOperate(p: IPipe, name: string, ctx: ITaskContext, isOutput = false) {
        if (!p) {
            return false;
        }
        if (p.name && !name.endsWith(ctx.toStr(p.taskName || p.name))) {
            return false;
        }

        if (p.oper && (ctx.to(p.oper) & ctx.oper) <= 0) {
            return false;
        }

        if (isOutput && p.noneOutput === true) {
            return false;
        } else if (!isOutput && p.nonePipe === true) {
            return false;
        }

        return true;
    }

    /**
     * convert custom pipe result to Promise.
     *
     * @protected
     * @param {ITransform} source
     * @param {ICustomPipe} opt
     * @param {ITaskContext} context
     * @param {IAssets} dist
     * @returns
     *
     * @memberOf PipeTask
     */
    protected cpipe2Promise(source: ITransform, opt: ICustomPipe, context: ITaskContext, dist: IAssets) {
        return new Promise<ITransform>((resolve, reject) => {
            let ps = opt.pipe(source, context, dist, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            if (ps) {
                Promise.resolve(ps).then(resolve, reject);
            }
        });
    }


    protected operateKey = 'pipe_operate';
    protected operateFileds = ['name', 'oper', 'order', 'nonePipe', 'noneOutput'];
    /**
     * get transform Operate.
     *
     * @protected
     * @param {ITransform | OutputPipe} source
     * @returns {IPipe}
     *
     * @memberOf PipeTask
     */
    protected getTransformOperate(source: ITransform | OutputPipe): IPipe {
        if (!source) {
            return null;
        }
        return (source[this.operateKey] ? source[this.operateKey] : pick(source, ...this.operateFileds)) as IPipe;
    }

    /**
     * set transform Operate.
     *
     * @protected
     * @param {ITransform | OutputPipe} source
     * @param {IPipe} operate
     * @returns
     *
     * @memberOf PipeTask
     */
    protected setTransformOperate(source: ITransform | OutputPipe, operate: IPipe) {
        if (!source) {
            return;
        }

        let soperate = source[this.operateKey] = source[this.operateKey] || {};

        this.operateFileds.forEach(n => {
            if (!isUndefined(operate[n])) {
                soperate[n] = operate[n];
            }
        });
    }

    /**
     * covert pipes transform to Promise.
     *
     * @protected
     * @param {ITransform} source
     * @param {ITaskContext} context
     * @param {IAssets} assets
     * @param {Gulp} gulp
     * @param {Pipe[]} [pipes]
     * @returns
     *
     * @memberOf PipeTask
     */
    protected pipes2Promise(source: ITransform, ctx: ITaskContext, assets: IAssets, pipes?: Pipe[]) {
        let oper = this.getTransformOperate(source);
        if (!this.match(oper, name, ctx)) {
            return Promise.resolve(source);
        }
        pipes = pipes || this.pipes(ctx, assets);
        return Promise.all(pipes.map((p: Pipe) => {
            if (isFunction(p)) {
                return p(ctx, assets);
            } else {
                if (!this.match(p, name, ctx)) {
                    return null;
                } else {
                    p.pipe = p.pipe || p.toTransform;
                    if (!p.pipe) {
                        return null;
                    }
                    return Promise.resolve(p.pipe(ctx, assets))
                        .then(trs => {
                            // trs.order = ctx.to(p.order)
                            this.setTransformOperate(trs, p);
                            // trs.order = p.order;
                            return trs;
                        });
                }
            }
        }))
            .then(tanseq => {

                let tans = sortOrder<ITransform>(tanseq, it => this.getTransformOperate(it).order, ctx, true);

                tans.forEach((stream: ITransform) => {
                    if (!this.match(this.getTransformOperate(stream), name, ctx, oper)) {
                        return;
                    }

                    if (isFunction(stream.transformSourcePipe)) {
                        source = stream.transformSourcePipe(source);
                    } else if (isFunction(source.transformPipe)) {
                        source = source.transformPipe(stream);
                    } else {
                        source = source.pipe(stream);
                    }
                });
                this.setTransformOperate(source, oper);
                return source;
            });
    }

    /**
     * output pipes transform to Promise.
     *
     * @protected
     * @param {ITransform} source
     * @param {ITaskContext} context
     * @param {IAssets} assets
     * @param {OutputPipe[]} [outputs]
     * @returns
     *
     * @memberOf PipeTask
     */
    protected output2Promise(source: ITransform, context: ITaskContext, assets: IAssets, outputs?: OutputPipe[]) {
        let oper = this.getTransformOperate(source);
        outputs = outputs || this.output(context, assets);
        return Promise.all(outputs.map(output => {
            if (isFunction(output)) {
                return output(source, context, assets);
            } else {
                if (!this.match(this.getTransformOperate(output), name, context, oper, true)) {
                    return null;
                } else {
                    return output.toTransform(source, context, assets);
                }
            }
        }))
            .then(outputs => {
                return Promise.all(outputs.map(output => {
                    return new Promise((resolve, reject) => {
                        if (output) {
                            output
                                .once('end', () => {
                                    resolve(output);
                                })
                                .once('error', reject);
                        } else {
                            resolve();
                        }
                    }).then(result => {
                        output.removeAllListeners('error');
                        output.removeAllListeners('end');
                        return result;
                    });
                }));
            })
    }

    /**
     * each one source stream works.
     *
     * @protected
     * @param {ITransform} source
     * @param {ITaskContext} ctx
     * @param {IAssets} option
     * @param {Pipe[]} [pipes]
     * @param {OutputPipe[]} [output]
     * @returns
     *
     * @memberOf PipeTask
     */
    protected working(source: ITransform, ctx: ITaskContext, option: IAssets, pipes?: Pipe[], output?: OutputPipe[]) {
        return Promise.resolve(source)
            .then(psrc => this.customPipe(psrc, ctx, option))
            .then(psrc => this.pipes2Promise(psrc, ctx, option, pipes))
            .then(psrc => this.output2Promise(psrc, ctx, option, output))
    }

    /**
     * execute task working
     *
     * @param {ITaskContext} context
     * @returns {Promise<any>}
     *
     * @memberOf PipeTask
     */
    execute(context: ITaskContext): Promise<any> {
        let option = this.getOption(context);
        return Promise.resolve(this.source(context, option))
            .then(stream => {
                if (isArray(stream)) {
                    if (this.runWay === RunWay.parallel) {
                        return Promise.all(stream.map(st => this.working(st, context, option)));
                    } else if (this.runWay === RunWay.sequence) {
                        let pthen: Promise<any>;
                        stream.forEach(st => {
                            if (!pthen) {
                                pthen = this.working(st, context, option);
                            } else {
                                pthen = pthen.then(() => {
                                    return this.working(st, context, option);
                                });
                            }
                        });
                        return pthen;
                    } else {
                        return Promise.reject('runWay setting error.');
                    }
                } else {
                    return this.working(stream, context, option);
                }
            });
    }
}
