const net = require('net');

// Create a server, and handle data being sent from client

module.exports.init = function() {
  const server = net.createServer((socket) => {
    serverr = socket;
    socket.on('data', (data) => console.log(`Server got message: ${data}`));
    socket.on('close', () =>console.log('Server says: client disconnected' ));
  });

  server.listen({port: 8080, host: 'localhost'}, () => {
    console.log('Server opened on', server.address());

  });
  return server;
};
