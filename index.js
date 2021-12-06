const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',(socket) => {
    console.log('user connected');
    socket.on('on-chat', (message) => {
        io.emit('user-chat', message);
        console.log({message});
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});