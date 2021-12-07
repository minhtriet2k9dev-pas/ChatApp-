const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require('socket.io');
const io = new Server(server);
const fs = require('fs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
fs.writeFile(__dirname + '/chat.log',"",function (err) {
    if (err){
        console.log(err);
    }
})
io.on('connection',(socket) => {
    var time = new Date();
    socket.on('new-user',(name) => {
        //console.log('User connected at',time.getHours()+':'+time.getMinutes()+':'+time.getSeconds(),`with name: "${name}"`);
        fs.appendFile(__dirname+"/chat.log",'User connected at '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+` with name: "${name}"\n`, function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    });
    socket.on('on-chat', (message) => {
        io.emit('user-chat', message);
        fs.appendFile(__dirname+"/chat.log",JSON.stringify(message)+'\n', function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

