const fs        = require ('fs');
const WebSocket = require ('ws');
const log       = require ('./log.js');

module.exports = (httpServer) => {
  const wss = new WebSocket.Server ({server : httpServer});
  wss.on ('connection', function connection (ws) {
    ws.send ('console.log(\'Connected to the Graphery Workbench\')');
    log ('Workbech connected');
  });
  wss.on ('disconnection', function connection (ws) {
    log ('Workbech disconnected');
  });
  return function (filename) {
    fs.watch (filename, {}, () => {
      wss.clients.forEach (function each (client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send ('location.reload()');
          log ('Workbech reload');
        }
      });
    });
  };
};