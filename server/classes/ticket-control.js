const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
            //definir propiedades e inicializar
            this.ultimo = 0;
            this.hoy = new Date().getDate();
            this.tickets = [];
            this.ultimos4 = [];

            let data = require('../data/data.json'); //Para leer el archivo json

            if (data.hoy === this.hoy) {
                this.ultimo = data.ultimo;
                this.tickets = data.tickets;
                this.ultimos4 = data.ultimos4;

            } else {
                this.reiniciarConteo()
            }


        }
        //Funcion para crear el siguiente ticket
    siguiente() {

            this.ultimo += 1;
            let ticket = new Ticket(this.ultimo, null)
            this.tickets.push(ticket);
            this.grabarArchivo();
            return `Ticket ${this.ultimo}`;

        }
        //Regresa el ultimo ticket
    getUltimo() {
            return `Ticket ${this.ultimo}`;

        }
        //Regresa la cola de ultimos 4 tickets
    getUltimos4() {
        return this.ultimos4;

    }
    atenderTicket(escritorio) {
            if (this.tickets.length === 0) { //Se verifica que hayan tickets por atender
                return 'Ya no hay más tickets!';
            }
            //Se hizo asi para romper la regla de JS de mandar los objetos por referencias
            let numeroTicket = this.tickets[0].numero;
            this.tickets.shift(); //Sacar el primer elemento del array

            let atenderTicket = new Ticket(numeroTicket, escritorio);
            this.ultimos4.unshift(atenderTicket); //Agregar como primer elemento del array

            if (this.ultimos4.length > 4) {
                this.ultimos4.splice(-1, 1); //Borra el ultimo elemento del arreglo
            }

            console.log('Ultimos 4', this.ultimos4);
            this.grabarArchivo();
            return atenderTicket;
        }
        //Funcion-propiedad del objeto
    reiniciarConteo() {
        this.ultimo = 0;
        this.ultimos4 = [];
        this.tickets = [];

        this.grabarArchivo();

    }

    grabarArchivo() {
        //Creamos objeto JSON para guardarlo en el archivo json
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        //Tenemos que mandarlo como string para poder guardarlo
        let jsonDataString = JSON.stringify(jsonData);

        //Para el fs.writeFileSync usamos un path relativo desde server
        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }



}

module.exports = {
    TicketControl
}

//Clases en ES6
