const http = require('http');
const config = require('./config.js');
// const handlePing = require('./handlePing');
// const exec = require('child_process').exec;
const serverHandler = require('./server/server');
const io = require('socket.io');
const server = http.createServer(serverHandler);
const socket = io(server);
// const url = 'http://www.google.fr';

server.listen(3000);

socket.on('connect', (event) => {
    console.log(event);
});

/*
setInterval(() => {
    exec(`ping -n 1 ${url}`, handlePing);
}, 1000);
*/
