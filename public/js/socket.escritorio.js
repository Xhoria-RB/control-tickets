var socket = io();

var searchParams = new URLSearchParams(window.location.search); //Funcion para obtener todos los parametros opcionales pasados en la
//URL, no es válida en IE y Edge

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

if (!searchParams.has('escritorio')) { //Has devuelve true si encuentra coincidencias, false si no
    window.location = 'index.html'; //Para hacer que se salga de la pantalla actual al index
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio'); //Devuelve el valor de la variable
var label = $('small');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'Ya no hay más tickets!') {
            label.text(resp)
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero)

    })
});
