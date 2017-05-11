
var express   = require('express');
var app       = express();
var http      = require('http').Server(app);
var io        = require('socket.io')(http);
var users     = {};
var usernames = [];

app.use(express.static(__dirname + "/"));

app.get('/', function (req, res) {
    res.render('index');
})

io.on('connection', function (socket) {
    socket.broadcast.emit('newMessage', 'Someone Connected');
    
    socket.on('registerUser', function (user) {
        if (usernames.indexOf(user) != -1) {
            socket.emit('registerRespond', false);
        } else {
            users[socket.id] = user;
            usernames.push(user);
            socket.emit('registerRespond', true);
        }
    })

    socket.on('newMessage', function (message) {
        io.emit('newMessage', message);
    })

    socket.on('disconnect', function (message) {
        socket.broadcast.emit('newMessage', 'Someone Disconnected');
    })

})

http.listen(3000, function () {
    console.log('Server is running ...');
})