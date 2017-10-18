const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage}= require('./utils/message');
const {isRealString}=require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users=new Users();

app.use(express.static(publicPath));



io.on('connection', (socket) => {
    console.log('New user connected');



    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room name are required')
        }


        socket.join(params.room);
        //users.removeUser(socket.id); //먼저 다른 방에서 지우고 다시 넣는 것
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback()
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.'); //이 부분이 acknowledgement
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });
    socket.on('disconnect', () => {
        var user= users.removeUser(socket.id);
        console.log('User was disconnected');

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
        });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});