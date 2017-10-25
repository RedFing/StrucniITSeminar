const net = require('net');
const moment = require('moment');

// Every time a client connects, he has 5 seconds of connection before thrown out.
// Logs the current time every second.

moment.locale('bs');
 module.exports.init= function(){
  const client = new net.Socket();
  client.connect(8080, 'localhost', () => {
    client.write('Danas je '+ moment().format('DD MMMM YYYY'));
    let secondsToLive = 0;
    let x = setInterval(() => {

      if (secondsToLive === 5){
        clearInterval(x);
        client.end();
      } else{
        let currentTime = moment().format('hh:mm:ss');
        secondsToLive++;
        client.write(`Current time is ${currentTime}`);
      }
    }, 1000);
  });

  client.on('data', (data) => {
    console.log('Server sent me this: ' + data);
  });

  client.on('close', () => {
    console.log('Your time is up... Bye.');
    // kill the process....
    process.exit();
  });
  return client;
};
