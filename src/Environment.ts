import { TaskString } from './types';


export class Environment {
    getRootPath() {
        let root: string;
        if (this.env && this.env.root) {
            root = this.env.root
        } else {
            this.each(c => {
                if (c.env && c.env.root) {
                    root = this.env.root;
                    return false;
                }
                return true;
            }, Mode.route);
        }
        return root;
    }

    getRootFolders(express?: folderCallback): string[] {
        return this.getFolders(this.getRootPath(), express);
    }

    getFolders(pathstr: string, express?: folderCallback): string[] {
        let dir = fs.readdirSync(pathstr);
        let folders = [];
        _.each(dir, (d: string) => {
            let sf = path.join(pathstr, d);
            let f = fs.lstatSync(sf);
            if (f.isDirectory()) {
                if (express) {
                    let fl = express(sf, d, this);
                    if (fl) {
                        folders.push(fl);
                    }
                } else {
                    folders.push(sf);
                }
            }
        });
        return folders;
    }

    getDistFolders(express?: folderCallback, task?: ITaskInfo): string[] {
        return this.getFolders(this.getDist(task), express);
    }

    toRootSrc(src: Src): Src {
        return absoluteSrc(this.getRootPath(), src);
    }

    toRootPath(pathstr: string): string {
        return absolutePath(this.getRootPath(), pathstr);
    }

    toDistSrc(src: Src, task?: ITaskInfo): Src {
        return absoluteSrc(this.getDist(task), src);
    }

    toDistPath(pathstr: string, task?: ITaskInfo): string {
        return absolutePath(this.getDist(task), pathstr);
    }

    to<T>(val: CtxType<T>): T {
        return isFunction(val) ? val(this) : val;
    }

    toSrc(source: TaskSource): Src {
        return taskSourceVal(source, this);
    }

    toStr(name: TaskString): string {
        return taskStringVal(name, this);
    }

    toUrl(basePath: string, toPath?: string): string {
        return (toPath ? path.relative(basePath, toPath) : basePath).replace(/\\/g, '/'); // .replace(/^\//g, '');
    }

    getPackage(filename?: TaskString): any {
        filename = filename || this.cfg.packageFile;
        let name = this.toRootPath(this.toStr(filename) || 'package.json');
        if (!packages[name]) {
            packages[name] = require(name);
        }
        return packages[name]
    }

    getNpmModuleVersion(name: string, packageFile?: string): string {
        let packageCfg = this.getPackage(packageFile);
        if (!packageCfg) {
            return '';
        }
        let version = '';
        if (packageCfg.dependencies) {
            version = packageCfg.dependencies[name]
        }
        if (!version && packageCfg.devDependencies) {
            version = packageCfg.devDependencies[name]
        }

        return version || '';

    }
    hasNpmModule(name: string, packageFile?: string): boolean {
        return this.getNpmModuleVersion(name, packageFile) !== '';
    }
}
