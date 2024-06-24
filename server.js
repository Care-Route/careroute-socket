const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let users = {};

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);

    socket.on('register', (userId) => {
        users[userId] = socket.id;
        console.log('User registered:', userId, 'with socket ID:', socket.id);
    });

    socket.on('send_message', (data) => {
        console.log(data)
        const { to, message } = data;
        const recipientSocketId = users[to];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('receive_message', { message });
            console.log('Message sent from', socket.id, 'to', recipientSocketId, ':', message);
        }
    });

    socket.on('disconnect', () => {
        for (let userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                console.log('User disconnected:', userId);
                break;
            }
        }
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});
