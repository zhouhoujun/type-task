#!/usr/bin/env node

import { isUndefined } from 'tsioc';
// const chalk = require('chalk');
import chalk from 'chalk';
const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
const Liftoff = require('liftoff');
// import program from 'commander';

process.env.INIT_CWD = process.cwd();

let argv = require('minimist')(process.argv.slice(2));
let cliPackage = require('../package');
let versionFlag = argv.v || argv.version;

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


const cli = new Liftoff({
  name: 'type-task',
  processTitle: 'type-task',
  moduleName: 'type-task',
  configName: 'taskfile',
  extensions: {
    '.js': null,
    '.json': null,
    '.ts': 'ts-node/register',
    '.tsx': 'ts-node/register',
    '.xml': 'require-xml',
    '.yaml': 'require-yaml',
    '.yml': 'require-yaml'
  },
  v8flags: ['--harmony']
});




process.once('exit', function (code) {
  if (code === 0) {
    process.exit(1);
  }
});

cli.on('require', (name) => {
  console.log('Requiring external module', chalk.magenta(name));
});

cli.on('requireFail', (name) => {
  console.log(chalk.red('Failed to load external module'), chalk.magenta(name));
});

cli.on('respawn', (flags, child) => {
  var nodeFlags = chalk.magenta(flags.join(', '));
  var pid = chalk.magenta(child.pid);
  console.log('Node flags detected:', nodeFlags);
  console.log('Respawned to PID:', pid);
});

cli.launch({
  cwd: argv.cwd,
  configPath: argv.taskfile,
  require: argv.require,
  completion: argv.completion
}, (env) => {
  if (versionFlag) {
    console.log('type-task CLI version', cliPackage.version);
    if (env.modulePackage && !isUndefined(env.modulePackage.version)) {
      console.log('Local version', env.modulePackage.version);
    }
    process.exit(0);
  }

  if (!env.configPath) {
    console.log(chalk.red('No taskfile found'));
    process.exit(1);
  }

  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    console.log('Working directory changed to', chalk.magenta(env.cwd));
  }

  require(env.configPath);

  console.log('Using taskfile', chalk.magenta(env.configPath));
});
