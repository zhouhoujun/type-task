import { Task } from '../decorators';
import { Activity, IActivity, ActivityConfigure, ActivityType } from '../core';


export interface ChainConfigure extends ActivityConfigure {
    activites?: ActivityType<ChainItemActivity>[];
}


export class ChainItemActivity extends Activity<any> {
    match(data: any): boolean {
        return false;
    }
}


@Task()
export class ChainActivity extends Activity<any> {

    activites: ChainItemActivity[];

    async onActivityInit(config: ChainConfigure): Promise<any> {
        this.activites = this.activites || [];
        await super.onActivityInit(config);
        if (config.activites && config.activites.length) {
            this.activites = await Promise.all(config.activites.map(cfg => this.buildActivity(cfg)))
        }
    }

    protected async execute(data?: any, execute?: IActivity): Promise<any> {
        let acts = this.activites.filter(act => act.match(data));
        let execPromise = Promise.resolve(data);
        acts.forEach(task => {
            execPromise = execPromise.then(pdata => task.run(pdata));
        });
        return execPromise;
    }

    next(activity: ChainItemActivity) {
        this.activites.push(activity);
    }
}
