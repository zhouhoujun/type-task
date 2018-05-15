#!/usr/bin/env node

import { isUndefined } from 'util';
import chalk from 'chalk';

const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
const Liftoff = require('liftoff');
// import program from 'commander';
// program
//   .version(cliPackage.version, '-v, --version')
//   .command('run [file]')
//   .description('run with config taskfile')
//   .alias('r')
//   .option('-r, --release', 'release project mode')
//   .option('-p, --publish', 'publish project mode')
//   .option('-t, --task', 'run specil task')
//   .action((file, options) => {
//     file = file || './taskfile';
//     require(file);
//   })
//   .command('init [name]', 'init taskfile')
//   .alias('i')
//   .parse(process.argv)


process.env.INIT_CWD = process.cwd();

let argv = require('minimist')(process.argv.slice(2));
let cliPackage = require('../package');
let versionFlag = argv.v || argv.version;
let jsVariants = require('interpret').jsVariants;
let tsregister: string[] = jsVariants['.ts']
if (tsregister.indexOf('tsconfig-paths/register') < 0) {
  tsregister.push('tsconfig-paths/register');
  jsVariants['.ts'] = tsregister;
}

const cli = new Liftoff({
  name: 'taskp',
  processTitle: 'taskp',
  moduleName: 'taskp',
  configName: 'taskfile',
  extensions: jsVariants,
  v8flags: ['--harmony']
}).on('require', (name, module) => {
  console.log('Requiring external module', chalk.magenta(name));
}).on('requireFail', (name, err) => {
  console.log(chalk.red('Failed to load external module'), chalk.magenta(name), err);
}).on('respawn', (flags, child) => {
  var nodeFlags = chalk.magenta(flags.join(', '));
  var pid = chalk.magenta(child.pid);
  console.log('Node flags detected:', nodeFlags);
  console.log('Respawned to PID:', pid);
});

cli.launch({
  cwd: argv.cwd,
  configPath: argv.taskfile,
  require: argv.require,
  completion: argv.completion,
  verbose: argv.verbose
}, (env) => {

  if (versionFlag) {
    console.log('taskp CLI version', cliPackage.version);
    if (env.modulePackage && !isUndefined(env.modulePackage.version)) {
      console.log('Local version', env.modulePackage.version);
    }
    process.exit(0);
  }

  if (argv.verbose) {
    console.log('LIFTOFF SETTINGS:', this);
    console.log('CLI OPTIONS:', argv);
    console.log('CWD:', env.cwd);
    console.log('LOCAL MODULES PRELOADED:', env.require);
    console.log('SEARCHING FOR:', env.configNameRegex);
    console.log('FOUND CONFIG AT:', env.configPath);
    console.log('CONFIG BASE DIR:', env.configBase);
    console.log('YOUR LOCAL MODULE IS LOCATED:', env.modulePath);
    console.log('LOCAL PACKAGE.JSON:', env.modulePackage);
    console.log('CLI PACKAGE.JSON', require('../package'));
  }

  if (!env.configPath) {
    console.log(chalk.red('No taskfile found'));
    process.exit(1);
  }

  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    console.log('Working directory changed to', chalk.magenta(env.cwd));
  }

  if (!env.modulePath) {
    console.log('Local ', cli.moduleName, ' module not found in: ', env.cwd);
    process.exit(1);
  }

  console.log('Using taskfile', chalk.magenta(env.configPath));
  require(env.configPath);

});
