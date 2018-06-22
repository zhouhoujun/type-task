import { PipeModule, PipeElement, IPipeContext, SourceToken, PipeTask } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
const jeditor = require('gulp-json-editor');


let argFactory = (ctx: IPipeContext) => {
    let envArgs = ctx.getEnvArgs();
    if (envArgs.deploy) {
        return '--access=public';
    } else if (envArgs.release) {
        return '--release';
    } else {
        return envArgs.test ? '--test' : '';
    }
}

let versionSetting = (ctx: IPipeContext) => {
    let envArgs = ctx.getEnvArgs();
    return jeditor((json: any) => {
        let version = envArgs['version'] || '';
        if (version) {
            json.version = version;
            if (json.peerDependencies) {
                Object.keys(json.peerDependencies).forEach(key => {
                    if (/^@ts-ioc/.test(key)) {
                        json.peerDependencies[key] = version;
                    }
                })
            }
        }
        return json;
    })
}

@PipeTask({
    children: [
        {
            src: ['packages/**/package.json', '!node_modules/**/package.json'],
            pipes: [
                (ctx) => versionSetting(ctx)
            ],
            dist: 'packages',
            task: SourceToken
        },
        {
            shell: (ctx: IPipeContext) => {
                let envArgs = ctx.getEnvArgs();
                let packages = ctx.getFolders('packages');
                let cmd = envArgs.deploy ? 'npm publish' : 'npm test';
                return packages.map(fd => {
                    return `cd ${fd} && ${cmd}`;
                });
            },
            args: argFactory,
            task: 'shell'
        }
    ]
})
export class Builder extends PipeElement {
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(Builder);
