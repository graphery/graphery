const path      = require ('path');
const commander = require ('commander');
const open      = require ('open');
const config    = require ('./config.js');
const server    = require ('./server.js');

const program = new commander.Command ();
program
  .version ('1.0.1')
  .option ('-l, --label <test-name>', 'test name')
  .option ('-t, --test <test-folder>', 'folder with test (.js)')
  .option ('-r, --root <root-folder>', 'root folder served')
  .option ('-p, --port <server-port>', 'http server port')
  .option ('-i, --import <module...>', 'import module')
  .option ('-b, --lib <library...>', 'import library')
  .option ('-s, --silence', 'silence mode')
  .action ((command) => {
    main ({
      label   : command.label || 'test',
      tests   : command.test ? path.resolve (process.cwd (), command.test) : config.test,
      root    : command.root ? path.resolve (process.cwd (), command.root) : config.root,
      port    : command.port ? Number.parseInt (command.port) : config.port,
      lib     : command.lib ? command.lib.map(lib => path.join((process.cwd().replace(command.root || config.root,'')), lib).replace(/\\/g,'/')) : false,
      imp     : command.import ? command.import.map(imp => path.join((process.cwd().replace(command.root || config.root,'')), imp).replace(/\\/g,'/')) : false,
      silence : command.silence || false
    });
  });
program.parse (process.argv);

async function main (options) {
  process.silence = options.silence;
  await server (options);
  if (!process.silence) {
    await open (`http://localhost:${options.port}/?${options.imp ? options.imp.map(imp => `imp=${imp}`).join('&') : options.lib ? options.lib.map(lib => `&lib=${lib}`).join('&') : ''}`);
  }
}