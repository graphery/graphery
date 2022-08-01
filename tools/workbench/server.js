const http         = require ('http');
const URL          = require ('url');
const path         = require ('path');
const fs           = require ('fs');
const ext2mimeType = require ('./ext2mime.json');
const Update       = require ('./update.js');
const log          = require ('./log.js');

module.exports = async ({root, port, label, tests, lib, imp}) => {
  const observer = Update (http.createServer (function (request, response) {
    const resolvedBase  = path.resolve (root);
    const resolvedLocal = path.resolve (__dirname, './static/');
    const resolveFolder = path.resolve (tests);
    request.URL         = URL.parse (request.url);
    if (request.URL.pathname === '/') {
      request.URL.pathname += 'index.html';
    }
    
    switch (request.URL.pathname) {
      case '/index.html':
      case '/load.html':
      case '/test.css':
      case '/graphery.svg':
      case '/gy.svg':
        file (request, response, resolvedLocal, observer);
        break;
      case '/test/':
        test (request, response, label, resolveFolder, resolvedBase);
        break;
      default:
        file (request, response, resolvedBase, observer);
    }
    
  }).listen (port));
  log (`workbench listen on http://localhost:${port}/?${imp ? `imp=${imp}` : lib ? `&lib=${lib}` : '' }` );
};

async function test (request, response, label, folder, root) {
  response.writeHead (
    200,
    {
      'Content-Type' : 'application/json'
    }
  );
  const result = [];
  const dir    = await fs.promises.readdir (folder);
  for (let fil of dir) {
    if (fil.substring (fil.length - 3) === '.js') {
      const fileLoc = path.join (folder, fil);
      result.push ({
        name : await getName (fileLoc),
        url  : '/' + path.relative (root, fileLoc)
      });
    }
  }
  response.end (JSON.stringify ({label : label, test : result}));
  
}

async function getName (fileLoc) {
  const content = (await fs.promises.readFile (fileLoc)).toString ();
  return content.substring (0, content.indexOf ('\n')).trim ().substring (2).trim ();
}

async function file (request, response, folder, observe) {
  const fileLoc = path.join (folder, request.URL.pathname);
  
  // Access not allowed
  if (fileLoc.indexOf (folder) === -1) {
    response.statusCode    = 404;
    response.statusMessage = http.STATUS_CODES[ 404 ];
    log (`404 ${ request.url }`);
    return response.end ();
  }
  
  // Check file
  let stat;
  try {
    stat = await fs.promises.stat (fileLoc);
  } catch (err) {
    response.statusCode    = 404;
    response.statusMessage = http.STATUS_CODES[ 404 ];
    log (`404 ${ request.url }`);
    return response.end ();
  }
  
  // Return file
  response.writeHead (
    200,
    {
      'Last-Modified' : stat.mtime.toUTCString (),
      'Content-Type'  : mimeTypes (fileLoc),
      'Cache-Control' : 'no-store',
      'Access-Control-Allow-Origin': '*'
    }
  );
  
  observe (fileLoc);
  let readable = fs.createReadStream (fileLoc);
  readable.pipe (response);
  log (`200 ${ request.url }`);
  
}

function mimeTypes (fileLoc) {
  const index = fileLoc.lastIndexOf ('.');
  return ext2mimeType[ index < 0 ?
    '' :
    fileLoc.substring (index + 1).toLocaleLowerCase () ] || 'application/octet-stream';
}
