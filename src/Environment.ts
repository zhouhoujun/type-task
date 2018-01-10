import { toAbsolutePath, Singleton, Express, Express2 } from 'tsioc';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';

/**
 * Enviroment.
 *
 * @export
 * @class Environment
 */
@Singleton
export class Environment {
    root: string;
    packageFile = 'package.json';

    constructor() {

    }

    /**
     * get path.
     *
     * @returns
     * @memberof Environment
     */
    getRootPath() {
        return this.root;
    }

    getRootFolders(express?: Express2<string, string, boolean>): string[] {
        return this.getFolders(this.getRootPath(), express);
    }

    getFolders(pathstr: string, express?: Express2<string, string, boolean>): string[] {
        let dir = readdirSync(pathstr);
        let folders = [];
        dir.forEach(d => {
            let sf = join(pathstr, d);
            let f = lstatSync(sf);
            if (f.isDirectory()) {
                if (express) {
                    let fl = express(sf, d);
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

    toRootPath(pathstr: string): string {
        return toAbsolutePath(this.getRootPath(), pathstr);
    }

    private _package: any;
    getPackage(): any {
        let filename = this.toRootPath(this.packageFile);
        if (!this._package) {
            this._package = require(filename);
        }
        return this._package
    }

    getPackageVersion(): string {
        let packageCfg = this.getPackage();
        if (!packageCfg) {
            return '';
        }
        return packageCfg.version || '';
    }
    getModuleVersion(name: string, dependencies = false): string {
        let packageCfg = this.getPackage();
        if (!packageCfg) {
            return '';
        }
        let version = '';
        if (packageCfg.dependencies) {
            version = packageCfg.dependencies[name]
        }
        if (!dependencies && !version && packageCfg.devDependencies) {
            version = packageCfg.devDependencies[name]
        }

        return version || '';

    }
}
