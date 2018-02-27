
/**
 * mutil source stream pipe task run way, task runway, or same level context run way.
 *
 * @export
 * @enum {number}
 */
export enum RunWay {
    /**
     * run mutil source stream by sequence.
     */
    sequence = 1,
    /**
     * run mutil source stream by parallel.
     */
    parallel = 1 << 1,

    /**
     * node execute sth before children.
     */
    nodeFirst = 1 << 2,

    /**
     * node execute sth after children.
     */
    nodeLast = 1 << 3,

    seqFirst = sequence | nodeFirst,

    seqLast = sequence | nodeLast,

    paraFirst = parallel | nodeFirst,

    paraLast = parallel | nodeLast
}
