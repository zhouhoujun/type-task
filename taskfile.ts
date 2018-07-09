import { PipeModule, PipeElement, IPipeContext, PipeTask } from '@taskfr/pipes';
import { TaskContainer } from '@taskfr/platform-server';
import { PipeAsset } from 'packages/pipes/lib/assets/PipeAsset';
const jeditor = require('gulp-json-editor');



let versionSetting = (ctx: IPipeContext) => {
    let envArgs = ctx.getEnvArgs();
    return jeditor((json: any) => {
        let version = envArgs['setvs'] || '';
        if (version) {
            // console.log(version);
            json.version = version;
            if (json.peerDependencies) {
                Object.keys(json.peerDependencies).forEach(key => {
                    if (/^@taskfr/.test(key)) {
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
            dest: 'packages',
            task: PipeAsset
        },
        {
            src: ['package.json'],
            pipes: [
                (ctx) => versionSetting(ctx)
            ],
            dest: '.',
            task: PipeAsset
        },
        {
            shell: (ctx: IPipeContext) => {
                let envArgs = ctx.getEnvArgs();
                let packages = ctx.getFolders('packages');
                let cmd = envArgs.deploy ? 'npm publish --access=public' : 'npm test';
                let cmds = packages.map(fd => {
                    return `cd ${fd} && ${cmd}`;
                });
                console.log(cmds);
                return cmds;
            },
            task: 'shell'
        }
    ]
})
export class Builder extends PipeElement {
}

TaskContainer.create(__dirname)
    .use(PipeModule)
    .bootstrap(Builder);
