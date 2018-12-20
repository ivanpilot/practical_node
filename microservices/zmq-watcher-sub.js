'use strict';
const zmq = require('zeromq');
const subscriber = zmq.socket('sub');

subscriber.subscribe(''); //subscribing to all messages

subscriber.on('message', data => {
    const message = JSON.parse(data);
    const date = new Date(message.timestamp);
    console.log(`File "${message.file}" changed at ${date}`);
});

subscriber.connect("tcp://localhost:60400");
