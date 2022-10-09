// // Haciendo el server
const http = require('http');
const express = require('express');

const app = express();
// /inicializando el server se le pasa la config de express
const server = http.createServer(app);

// require('socket.io');nos retorna una clase, no una instancia,entonces hay que crear la instacia utilizando su constructor Server
const {Server}= require('socket.io');
const es = new Server (server);
const io = es.listen(server);

//Para publicar archivos estaticos de express
app.use(express.static(__dirname + '/public'))

server.listen(3000, function(){
    console.log("Servidor escuchando desde el port:3000");
})



/* A node.js library for interacting with the Arduino. */
const { Board, Sensor } =require("johnny-five");
const board = new Board();

// Para leer del arduino directamente con el serialport
// const Serialport = require("serialport");
// //Leer valores del serial port las lecturas empezaran a aparecer en lineas diferentes
// const ReadLine = Serialport.parsers.ReadLine;
// Conocer el puerto de donde se optienen los datos y de cuanto en cuanto se reciben 
// const port = new Serialport('COM6', {
//     boundRate: 9600
// });
    // Para que haya espacios y saltos de linea
// const parser = port.pie(new ReadLine({delimeter:'\r\n'}))

// //Para escuchar eventos
// parser.on('open', function(){
//     console.log('conexion is opened');
// })
// parser.on('data', function(data){
//     console.log(data);
// })
// port.on('error', function(err){
//     console.log(err);
// })


board.on('ready', function (){
    const potenciometro = new Sensor("A1");
    potenciometro.on("change",()=>{
         const {value, raw} = potenciometro;
        console.log("Potenciometro");
        // console.log(typeof value);
        console.log("valor: ", value);
        //Se define el evento mediante el cual se mandaràel mensaje
        io.emit('valorPot',value);
        //console.log(typeof raw);
        // console.log("raw",raw);
    })
});