
var express  = require('express');
var app      = express();
var http     = require('http').Server(app);
var io       = require('socket.io')(http);

app.use(express.static(__dirname + "/"));

app.get('/', function (req, res) {
    res.render('index');
})

io.on('connection', function (socket) {
    socket.on('newMessage', function (message) {
        io.emit('newMessage', message);
        console.log('message baru ' + message);
    })

    socket.on('disconnect', function (message) {
        console.log('Message Disconnected!');
    })

})

http.listen(3000, function () {
    console.log('Server is running ..,');
})