import { InjectToken, Singleton, Inject, isToken, isString, Express } from '@ts-ioc/core';
import { ExpressionType, Expression, isActivityType, IConfigure, ActivityType } from './IConfigure';
import { IActivity } from './IActivity';
import { IActivityBuilder, ActivityBuilderToken } from './IActivityBuilder';

export const ConfigTranslatorToken = new InjectToken<ConfigTranslator>('Activity_ConfigTranslator');

@Singleton(ConfigTranslatorToken)
export class ConfigTranslator {
    @Inject(ActivityBuilderToken)
    builder: IActivityBuilder;

    async toExpression<T>(exptype: ExpressionType<T>, target: IActivity): Promise<Expression<T>> {
        if (isActivityType(exptype)) {
            return await this.builder.build(exptype, target.id);
        } else {
            return exptype;
        }
    }

    async toActivity<Tr, Ta extends IActivity, TCfg extends IConfigure>(exptype: ExpressionType<Tr> | ActivityType<Ta>, target: IActivity, isRightActivity: Express<any, boolean>, toConfig: Express<Tr, TCfg>, valify?: Express<TCfg, TCfg>): Promise<Ta> {
        let result;
        if (isActivityType(exptype, !valify)) {
            if (valify) {
                result = await this.builder.build(isToken(exptype) ? exptype : valify(exptype as TCfg), target.id);
            } else {
                result = await this.builder.build(exptype, target.id);
            }
        } else {
            result = exptype;
        }

        if (isRightActivity(result)) {
            return result;
        }

        let rt;
        if (isString(result)) {
            rt = result;
        } else {
            rt = await target.context.exec(target, result);
        }
        let config = toConfig(rt);
        if (valify) {
            config = valify(config);
        }
        if (config) {
            result = await this.builder.build(config, target.id);
        } else {
            result = null;
        }
        return result;
    }
}
