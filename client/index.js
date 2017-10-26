const net = require('net');
const moment = require('moment');
const readline = require('readline');

// Every time a client connects, he has 60 seconds of connection before thrown out.
// Logs the current time every second.

moment.locale('bs');
 module.exports.init= function(){

    let myName = process.argv[2] || 'anonymous';

     const client = new net.Socket();
    client.connect(8082, 'localhost', () => {
        r1.on('line', (line) => {
            if (line.toString() === 'cls') process.stdout.write('\033c');
            else if (line.toString() === 'quit'){ client.destroy(); process.exit();}
            else {
                let myLine = line.toString('utf-8');
                "use strict";

                client.write((myName + ': ' + line).toString());
            }
            });

  });

  client.on('data', (data) => {
    console.log(data.toString());
  });

  client.on('close', () => {
        client.write('Korisnik'+ myName + 'je napustio');
      console.log('Your time is up... Bye.');
  });
  return client;
};

const r1 = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});


