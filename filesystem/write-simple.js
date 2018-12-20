'use strict';
const fs = require('fs');
fs.writeFile('target.txt', 'Hello world', (err, data) => {
    if(err) {
        throw err;
    }
    console.log('File saved');
});
