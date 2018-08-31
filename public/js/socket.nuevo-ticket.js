//Comando para la conexión
var socket = io();
var label = $('#lblNuevoTicket'); //JQuery para hacer referencia al label del nuevo-ticket.html donde se desplegará el contenido

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor');

});
socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket); //JQuery .text para cambiar el contenido del label
    });

})
