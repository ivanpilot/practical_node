'use strict';
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if(!filename) {
    throw Error('Error: No filename provided');
}

net.createServer(connection => {
    console.log('Subscriber connected');
    connection.write(JSON.stringify({type: 'watching', file: filename}) + '\n'); //connection.write sends information to the client

    const watcher = fs.watch(filename, () => connection.write(JSON.stringify({type: 'changed', timestamp: Date.now()}) + '\n'));
    //const watcher = fs.watch(filename, () => connection.write(`File changed at ${new Date()}\n`));

    connection.on('close', () => {
        console.log('Subscriber disconnected.');
        watcher.close();
    })
}).listen(60300, () => console.log('Listening for subscribers...'));
//this program is quite interesting as it creates a TCP connection between a client and a server.
//once the connection is done, it acknowledges the connections and start watching for change on the target file. Each time the target file is touched, the server will notify the client by calling connection.write
//It also listen for a close connection event
