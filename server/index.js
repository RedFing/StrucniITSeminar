const net = require('net');

// Create a server, and handle data being sent from client
const clients = [];

module.exports.init = function() {
  const server = net.createServer((socket) => {
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    clients.push(socket);
    serverr = socket;

    // Send a nice welcome message and announce
    //socket.write("Welcome " + socket.name + "\n");
    //broadcast(socket.name + " joined the chat\n", socket);

    // Handle incoming messages from clients.
    socket.on('data', function (data) {
      broadcast(data, socket);
      //broadcast(+data+ '', socket);
    });

    // Remove the client from the list when it leaves
    socket.on('end', function () {
      clients.splice(clients.indexOf(socket), 1);
      broadcast(socket.name + " left the chat.\n");
    });

    socket.on('close', () =>console.log('Server says: client disconnected' ));

    // Send a message to all clients
    function broadcast(message, sender) {
      clients.forEach(function (client) {
        // Don't want to send it to sender
        if (client === sender) return;
        client.write(message.toString('utf-8'));
      });
      // Log it to the server output too
      //process.stdout.write(message)
    }


  });

  server.listen({port: 8082, host: 'localhost'}, () => {
    console.log('Server opened on', server.address());

  });
  return server;
};



