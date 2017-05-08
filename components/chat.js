
var socket = io();

$('form').submit(function () {
    socket.emit('newMessage', $('#message').val());
    $('#message').val('');

    return false;
});

socket.on('newMessage', function (message) {
    $('#list-message').append($('<div id="chat">').text(message));
});