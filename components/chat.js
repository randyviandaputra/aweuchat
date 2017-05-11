
var socket = io();
var user = '';

$('form').submit(function () {
    user = $('#name_user').val();
    socket.emit('newMessage', user + ' ' + $('#message').val());
    $('#message').val('');

    return false;
});

socket.on('newMessage', function (message) {
    $('#list-message').append($('<div id="chat">').text(message + ' On : ' + Date()));
});

$('#submit-name').click(function () {
    if ($('#name_user') != '') {
        user = $('#name_user').val();
        socket.emit('registerUser', user);
    }
});

socket.on('registerRespond', function (status) {
    if (status == false) {
        alert('User Available');
    } else {
        $('#chatpage').removeClass('hidden');
        $('#homepage').addClass('hidden');
    }
})
