
import chalk from 'chalk';
const timestamp = require('time-stamp');
const prettyTime = require('pretty-hrtime');
const Liftoff = require('liftoff');
const minimist = require('minimist');
process.env.INIT_CWD = process.cwd();

const cli = new Liftoff({
  name: 'runtask',
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
  v8flags: ['--harmony'],
});

const argv = minimist(process.argv.slice(2));


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

let cliPackage = require('../package');
let versionFlag = argv.v || argv.version;

cli.launch({
  cwd: argv.cwd,
  configPath: argv.taskfile,
  require: argv.require,
  completion: argv.completion,
}, (env) => {
  if (versionFlag) {
    console.log('type-task CLI version', cliPackage.version);
    if (env.modulePackage && typeof env.modulePackage.version !== 'undefined') {
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
