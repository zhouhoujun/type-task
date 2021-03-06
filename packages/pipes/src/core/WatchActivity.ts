
import { IActivity, ExpressionType, Src, Expression, Activity, InjectAcitityToken, Task, ActivityConfigure } from '@taskfr/core';
import { Defer, isArray } from '@ts-ioc/core';
import { ITransform } from './ITransform';
import { Observable } from 'rxjs';
import { src } from 'vinyl-fs';
const chokidar = require('chokidar');


/**
 * watch activity token.
 */
export const WatchAcitvityToken = new InjectAcitityToken<WatchActivity>('Watch');

/**
 * watch configure.
 *
 * @export
 * @interface WatchConfigure
 * @extends {SourceConfigure}
 */
export interface WatchConfigure extends ActivityConfigure {

    /**
    * transform source.
    *
    * @type {TransformSource}
    * @memberof IPipeConfigure
    */
    src: ExpressionType<Src>;

    /**
     * watch options.
     *
     * @type {ExpressionType<WatchOptions>}
     * @memberof WatchConfigure
     */
    options?: ExpressionType<WatchOptions>;

}

/**
 * watch options.
 *
 * @export
 * @interface WatchOptions
 */
export interface WatchOptions {
    // Performance

    /**
     * persistent (default: true). Indicates whether the process should continue to run as long as files are being watched. If set to false when using fsevents to watch, no more events will be emitted after ready, even if the process continues to run.
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    persistent?: boolean;

    // Path filtering

    /**
     *  (anymatch-compatible definition) Defines files/paths to be ignored. The whole relative or absolute path is tested, not just filename. If a function with two arguments is provided, it gets called twice per path - once with a single argument (the path), second time with two arguments (the path and the fs.Stats object of that path).
     *
     * @type {string}
     * @memberof WatchOptions
     */
    ignored?: string;
    /**
     * (default: false). If set to false then add/addDir events are also emitted for matching paths while instantiating the watching as chokidar discovers these file paths (before the ready event).
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    ignoreInitial?: boolean;
    /**
     *  (default: true). When false, only the symlinks themselves will be watched for changes instead of following the link references and bubbling events through the link's path.
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    followSymlinks?: boolean;
    /**
     * (no default). The base directory from which watch paths are to be derived. Paths emitted with events will be relative to this.
     *
     * @type {string}
     * @memberof WatchOptions
     */
    cwd?: string;
    /**
     * (default: false). If set to true then the strings passed to .watch() and .add() are treated as literal path names, even if they look like globs.
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    disableGlobbing?: boolean;

    // Performance

    /**
     * (default: false). Whether to use fs.watchFile (backed by polling), or fs.watch. If polling leads to high CPU utilization, consider setting this to false. It is typically necessary to set this to true to successfully watch files over a network, and it may be necessary to successfully watch files in other non-standard situations. Setting to true explicitly on OS X overrides the useFsEvents default. You may also set the CHOKIDAR_USEPOLLING env variable to true (1) or false (0) in order to override this option.
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    usePolling?: boolean;
    /**
     * (default: 100). Interval of file system polling. You may also set the CHOKIDAR_INTERVAL env variable to override this option.
     *
     * @type {number}
     * @memberof WatchOptions
     */
    interval?: number;
    /**
     * (default: 300). Interval of file system polling for binary files. (see list of binary extensions)
     *
     * @type {number}
     * @memberof WatchOptions
     */
    binaryInterval?: number;
    /**
     * (default: true on OS X). Whether to use the fsevents watching interface if available. When set to true explicitly and fsevents is available this supercedes the usePolling setting. When set to false on OS X, usePolling: true becomes the default.
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    useFsEvents?: boolean;
    /**
     *  (default: false). If relying upon the fs.Stats object that may get passed with add, addDir, and change events, set this to true to ensure it is provided even in cases where it wasn't already available from the underlying watch events.
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    alwaysStat?: boolean;
    /**
     * (default: undefined). If set, limits how many levels of subdirectories will be traversed.
     *
     * @type {number}
     * @memberof WatchOptions
     */
    depth?: number;
    /**
     * awaitWriteFinish (default: false). By default, the add event will fire when a file first appears on disk, before the entire file has been written. Furthermore, in some cases some change events will be emitted while the file is being written. In some cases, especially when watching for large files there will be a need to wait for the write operation to finish before responding to a file creation or modification. Setting awaitWriteFinish to true (or a truthy value) will poll file size, holding its add and change events until the size does not change for a configurable amount of time. The appropriate duration setting is heavily dependent on the OS and hardware. For accurate detection this parameter should be relatively high, making file watching much less responsive. Use with caution.
     *
     * @type {(boolean | {
     *         stabilityThreshold?: number,
     *         pollInterval?: number
     *     })}
     * @memberof WatchOptions
     */
    awaitWriteFinish: boolean | {
        /**
         *  (default: 2000). Amount of time in milliseconds for a file size to remain constant before emitting its event.
         *
         * @type {number}
         */
        stabilityThreshold?: number;
        /**
         * (default: 100). File size polling interval.
         *
         * @type {number}
         */
        pollInterval?: number;
    };

    // Errors

    /**
     * (default: false). Indicates whether to watch files that don't have read permissions if possible. If watching fails due to EPERM or EACCES with this set to true, the errors will be suppressed silently.
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    ignorePermissionErrors?: boolean;
    /**
     *  (default: true if useFsEvents and usePolling are false). Automatically filters out artifacts that occur when using editors that use "atomic writes" instead of writing directly to the source file. If a file is re-added within 100 ms of being deleted, Chokidar emits a change event rather than unlink then add. If the default of 100 ms does not work well for you, you can override it by setting atomic to a custom value, in milliseconds.
     *
     * @type {boolean}
     * @memberof WatchOptions
     */
    atomic?: boolean; // or a custom 'atomicity delay', in milliseconds (default 100)

}

/**
 * files changed.
 *
 * @export
 * @interface FileChanged
 */
export interface FileChanged {
    added: string[];
    changed: string[];
    removed: string[];
}


@Task(WatchAcitvityToken)
export class WatchActivity extends Activity<any> {

    /**
     * watch src.
     *
     * @type {Expression<Src>}
     * @memberof WatchActivity
     */
    src: Expression<Src>;
    /**
     * watch options.
     *
     * @type {Expression<WatchOptions>}
     * @memberof WatchActivity
     */
    options: Expression<WatchOptions>;


    async run(data: any, watched: IActivity): Promise<any> {
        return await this.watch(data, watched);
    }

    async onActivityInit(config: WatchConfigure) {
        await super.onActivityInit(config);
        this.src = await this.toExpression(config.src);
        if (config.options) {
            this.options = await this.toExpression(config.options)
        }
    }

    protected async watch(data: any, watched: IActivity) {
        let watchSrc = await this.context.exec(this, this.src, data);
        let options = await this.context.exec(this, this.options, data);
        let watcher = chokidar.watch(watchSrc, options);

        let defer = new Defer();
        Observable.fromEventPattern<FileChanged>(
            handler => {
                watcher.on('add', paths => handler({ added: isArray(paths) ? paths : [paths] }));
                watcher.on('change', paths => handler({ changed: isArray(paths) ? paths : [paths] }));
                watcher.on('unlink', paths => handler({ removed: isArray(paths) ? paths : [paths] }));
                watcher.on('unlinkDir', paths => handler({ removed: isArray(paths) ? paths : [paths] }));
            },
            handler => {
                watcher.close();
                defer.resolve(data);
            })
            .bufferTime(300)
            .map(chgs => {
                let chg: FileChanged = {
                    added: [],
                    changed: [],
                    removed: []
                }
                chgs.forEach(fc => {
                    if (fc.added) {
                        chg.added = chg.added.concat(fc.added);
                    }
                    if (fc.changed) {
                        chg.changed = chg.changed.concat(fc.changed);
                    }
                    if (fc.removed) {
                        chg.removed = chg.removed.concat(fc.removed);
                    }
                });
                return chg;
            })
            .subscribe(chg => {
                let chgStream = this.changedToStream(watchSrc, chg);
                if (chgStream) {
                    watched.run(chgStream, this);
                }
            });

        defer.promise;
    }

    protected changedToStream(watchSrc: Src, chg: FileChanged): ITransform {
        if (chg.removed.length) {
            return src(watchSrc); // removed will build all.
        } else {
            let srcs = chg.added.concat(chg.changed);
            if (srcs.length) {
                return src(srcs);
            } else {
                return null;
            }
        }
    }
}
