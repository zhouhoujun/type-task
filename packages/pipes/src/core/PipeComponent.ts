// import { TaskRunner, OnTaskInit, SequenceActivity } from '@taskfr/core';
// import { ITransform } from '../ITransform';
// import { IPipeComponent } from './IPipeComponent';
// import { isArray, isClass, isFunction, Inject, Injectable } from '@ts-ioc/core';
// import { TransformMerger, TransformType, PipeExpress, isTransform } from './pipeTypes';
// import { ITransformMerger } from './ITransformMerger';
// import { IPipeContext, PipeContextToken } from './IPipeContext';
// import { IPipeConfigure } from './IPipeConfigure';

// /**
//  * pipe component
//  *
//  * @export
//  * @abstract
//  * @class PipeComponent
//  * @extends {TaskComponent<T>}
//  * @implements {ITask}
//  * @implements {IPipeComponent<ITransform>}
//  * @template T
//  */
// @Injectable()
// export class PipeComponent<T extends IPipeComponent> extends SequenceActivity implements IPipeComponent, OnTaskInit {

//     @Inject(PipeContextToken)
//     context: IPipeContext;

//     /**
//      * pipes.
//      *
//      * @type {TransformType[]}
//      * @memberof PipeComponent
//      */
//     pipes: TransformType[];
//     /**
//      * stream merger.
//      *
//      * @type {TransformMerger}
//      * @memberof PipeComponent
//      */
//     merger: TransformMerger;

//     config: IPipeConfigure;

//     constructor() {
//         super();
//         this.pipes = [];
//     }

//     onTaskInit(config: IPipeConfigure) {
//         this.config = config;
//     }


//     /**
//      * execute tasks
//      *
//      * @protected
//      * @param {(ITransform | ITransform[])} data
//      * @returns {Promise<any>}
//      * @memberof TaskComponent
//      */
//     protected execute(data: ITransform | ITransform[]): Promise<ITransform> {
//         return this.merge(...isArray(data) ? data : [data])
//             .then(stream => this.pipe(stream));
//     }

//     /**
//      * pipe transform.
//      *
//      * @protected
//      * @param {ITransform} transform
//      * @returns {Promise<ITransform>}
//      * @memberof PipeComponent
//      */
//     protected pipe(stream: ITransform): Promise<ITransform> {
//         return this.pipesToPromise(stream, this.pipes);
//     }

//     /**
//      * merge transforms
//      *
//      * @protected
//      * @param {...ITransform[]} data
//      * @returns {Promise<ITransform>}
//      * @memberof PipeComponent
//      */
//     protected merge(...data: ITransform[]): Promise<ITransform> {
//         let ptsf: Promise<ITransform>;
//         let trans = data.filter(it => !it);
//         if (trans.length > 1) {
//             let merger = this.merger;
//             if (merger) {
//                 if (merger instanceof TaskRunner) {
//                     ptsf = merger.start(data);
//                 } else if (!isClass(merger) && isFunction(merger)) {
//                     let mergerExp = merger as Function;
//                     ptsf = Promise.resolve(mergerExp(data));
//                 } else {
//                     if (isFunction(merger['run'])) {
//                         let tsmerger = merger as ITransformMerger;
//                         ptsf = tsmerger.run(data);
//                     }
//                 }
//             }
//         }

//         if (!ptsf) {
//             ptsf = Promise.resolve(isArray(data) ? data[0] : data);
//         }

//         return ptsf.then(tranform => isTransform(tranform) ? tranform as ITransform : null);
//     }

//     /**
//      * pipe to promise.
//      *
//      * @protected
//      * @param {ITransform} source
//      * @param {TransformType[]} pipes
//      * @returns {Promise<ITransform>}
//      * @memberof PipeComponent
//      */
//     protected pipesToPromise(source: ITransform, pipes: TransformType[]): Promise<ITransform> {
//         if (!pipes) {
//             return Promise.resolve(source);
//         }

//         let pstream = Promise.resolve(source);
//         pipes.forEach(transform => {
//             if (transform) {
//                 pstream = pstream
//                     .then(stream => {
//                         return this.executePipe(stream, transform);
//                     });
//             }
//         });
//         return pstream;

//     }

//     /**
//      * execute pipe.
//      *
//      * @protected
//      * @param {ITransform} stream
//      * @param {TransformType} transform
//      * @returns {Promise<ITransform>}
//      * @memberof PipeComponent
//      */
//     protected executePipe(stream: ITransform, transform: TransformType): Promise<ITransform> {
//         let pstf: Promise<ITransform>;
//         if (transform instanceof TaskRunner) {
//             pstf = transform.start(stream);
//         } else if (isTransform(stream)) {
//             if (!isClass(transform) && isFunction(transform)) {
//                 let pex = transform as PipeExpress;
//                 pstf = Promise.resolve(pex(this.context, this, stream));
//             } else if (isTransform(transform)) {
//                 pstf = Promise.resolve(transform as ITransform);
//             }
//             if (pstf) {
//                 pstf = pstf.then(pst => {
//                     if (isTransform(pst)) {
//                         if (pst.changeAsOrigin) {
//                             stream = pst;
//                         } else {
//                             stream = stream.pipe(pst);
//                         }
//                     }
//                     return stream;
//                 })
//             }
//         } else {
//             pstf = Promise.resolve(null);
//         }

//         return pstf;
//     }
// }
