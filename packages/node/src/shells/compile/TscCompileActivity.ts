import * as path from 'path';
import { ShellActivity, ShellActivityConfig } from '../ShellActivity';
import { Task, CtxType, Src } from '@taskfr/core';
import { CompilerOptions, ModuleResolutionKind, ModuleKind, ScriptTarget } from 'typescript';
import { ObjectMap, lang, isArray, isBoolean } from '@ts-ioc/core';


/**
 * tsc builder activity config
 *
 * @export
 * @interface TscCompileActivityConfig
 * @extends {ShellActivityConfig}
 */
export interface TscCompileActivityConfig extends ShellActivityConfig {
    /**
     * tsconfig.
     *
     * @type {CtxType<string>}
     * @memberof TscCompileActivityConfig
     */
    tsconfig?: CtxType<string>;

    /**
     * ts file source.
     *
     * @type {CtxType<Src>}
     * @memberof TscCompileActivityConfig
     */
    src?: CtxType<Src>;

    /**
     * ts compile out dir.
     *
     * @type {CtxType<string>}
     * @memberof TscCompileActivityConfig
     */
    dist?: CtxType<string>;
    /**
     * compiler options.
     *
     * @type {CtxType<CompilerOptions>}
     * @memberof TscCompileActivityConfig
     */
    compilerOptions?: CtxType<CompilerOptions>;
}

@Task('tsc')
export class TscCompileActivity extends ShellActivity {
    /**
     * tsconfig.
     *
     * @type {string}
     * @memberof TscCompileActivity
     */
    tsconfig: string;
    src: Src;
    dist: string;
    compilerOptions?: CompilerOptions;

    async onActivityInit(config: TscCompileActivityConfig) {
        await super.onActivityInit(config);
        this.src = await this.context.getFiles(this.context.to(config.src));
        this.dist = this.context.to(config.dist);
        this.tsconfig = this.context.to(config.tsconfig);
        this.compilerOptions = this.context.to(config.compilerOptions);
    }

    protected formatShell(shell: string): string {
        if (this.tsconfig) {
            return path.normalize(path.resolve('node_modules', '.bin', 'tsc') +
                ' -p ' + this.tsconfig);
        }
        shell = `${path.join(this.context.getRootPath(), 'node_modules', '.bin', 'tsc')} ${isArray(this.src) ? this.src.join(' ') : this.src}`;
        return super.formatShell(shell);
    }

    protected formatArgs(env: ObjectMap<any>): string[] {
        let args = lang.assign(<CompilerOptions>{
            module: ModuleKind.CommonJS,
            target: ScriptTarget.ES5,
            sourceMap: true,
            lib: ['dom', 'es2017'],
            typeRoots: ['node'],
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            outDir: this.dist,
            moduleResolution: ModuleResolutionKind.NodeJs
        }, env || {}, this.compilerOptions || {});
        return super.formatArgs(args);
    }

    protected formatArg(arg: any, key: string, env?: ObjectMap<any>): any {
        if (isBoolean(arg) && arg) {
            return `--${key} true`;
        }
        switch (key) {
            case 'target':
                return `--${key} ${ScriptTarget[arg].toLowerCase()}`;
            case 'module':
                return `--${key} ${ModuleKind[arg].toLowerCase()}`;
            case 'moduleResolution':
                return `--${key} ${arg === ModuleResolutionKind.NodeJs ? 'node' : 'class'}`;
            default:
                return super.formatArg(arg, key, env);
        }
    }
}
