/* A node.js library for interacting with the Arduino. */
const five = require("johnny-five");
const board = new five.Board();

board.on('ready', pot());

function pot(){
    const potenciometro = new five.Sensor("A1");
    potenciometro.on("change",()=>{
         const {value, raw} = potenciometro;
        console.log("Potenciometro");
        console.log("valor: ", value);
        console.log("raw",raw);
    })
}