var canvas = document.querySelector('#canvas');
var contexto = canvas.getContext('2d');
canvas.width = screen.width / 3;
canvas.height = screen.height / 3;
//Dibujando eje y 
function escala(escala) {
    var esc = 10 * escala;
    return esc;
}
function DrawEY() {
    var origenx = canvas.width / 2;
    var origeny = canvas.height / 2;
    contexto.lineWidth = 1;
    contexto.strokeStyle = 'black';
    contexto.textBaseline = "middle";
    contexto.strokeRect(origenx, 0, 1, canvas.height);
    contexto.font = '7px monospace';
    contexto.fillStyle = 'black';
    //Dibuja regla y numeros
    let i = escala(1);
    var n = 1;
    while (i < canvas.height) {
        contexto.strokeRect(origenx - 2, origeny + i, 5, 0.5);
        contexto.strokeRect(origenx - 2, origeny - i, 5, 0.5);
        i += escala(1);
        n++;
    }

}
//Dibujando eje x
function DrawEX() {
    var origenx = canvas.width / 2;
    var origeny = canvas.height / 2;
    contexto.lineWidth = 1;
    contexto.strokeStyle = 'black';
    contexto.strokeRect(0, origeny, canvas.width, 1);
    contexto.font = '8px monospace';
    contexto.fillStyle = 'black';
    //Dibuja regla y numeros
    let i = escala(1);
    var n = 1;
    while (i < canvas.height) {
        contexto.strokeRect(origenx + i, origeny - 2, .5, 5);
        contexto.strokeRect(origenx - i, origeny - 2, .5, 5);
        i += escala(1);
        n++;
    }

}
//Dibujando la cuadrícula
function DrawGrid() {
    contexto.lineWidth = 0.5;
    contexto.strokeStyle = 'gray';
    for (i = 10; i < canvas.width; i = i + 10) {
        contexto.strokeRect(i, 0, 0.01, canvas.height);
    }

    for (i = 10; i < canvas.height; i = i + 10) {
        contexto.strokeRect(0, i, canvas.width, 0.01);
    }

}

function Dibujar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    DrawEX();
    DrawEY();
}
Dibujar();
const sockets = io();
////Obtener cual funcion se quiere graficar y graficarla
//Para borrar las funciones al presionar el boton borrar
document.getElementById('button').addEventListener('click',()=>{
    // event.preventDefault(); //Evita que se recargue la pagina
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0;i<16;i++){
        document.curvas.Curva[i].checked = false;
    }
    Dibujar();
    // return false;

})


obtenerDatos();
var h, ang, calculo, calculox;
var r = 5;
function obtenerDatos() {
    sockets.on('valorPot', function (value) {
        console.log(value);
        ang = (value * (4 * Math.PI)) / 1023;

        //     // var origenx = canvas.width / 2;
        //     // var origeny = canvas.height / 2;
        var nombre;
        function grafica(r, nombre, formulax, formulay) {
            console.log("Graficando " + nombre);
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;


            /* Drawing a circle with the center at (origenx + formulax, formulay- calculox) and radius
            2. */
            contexto.arc(origenx + formulax, formulay - calculox, 2, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }

        function cicloide(r) {
            console.log("Graficando cicloide");
            var R = escala(r);
           //Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;
            // Dibujamos el circulo con el que se dibujarà
            // contexto.closePath();
            // contexto.beginPath();
            // contexto.arc(origenx + h, origeny - R, R, 0, Math.PI * 2, true);
            // contexto.stroke();
            // contexto.closePath();
            //contexto.beginPath();
            /* The parametric equation of a cycloid. */
            calculo = R * (ang - Math.sin(ang));
            calculox = R * (1 - Math.cos(ang));
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function prolata(A, B) {
            console.log("Graficando cicloide prolata");
            // var A = escala(a);
            // var B = escala(b);
            //    contexto.clearRect(0, 0, canvas.width, canvas.height);
            //    Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (A * ang) - (B * Math.sin(ang));
            calculox = A - (B * Math.cos(ang));
            console.log("Coordenadas x" + calculo);
            console.log("Angulo x" + ang);
            contexto.arc(origenx + calculo, origeny - calculox, 1, 0, Math.PI * 2, true);
            contexto.fill();
            // contexto.beginPath();
            contexto.moveTo(origenx + calculo, origeny - calculox);

        }
        function lemniscata(r) {
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (R * Math.sin(ang)) / (1 + (Math.pow(Math.cos(ang), 2)));
            calculox = (R * Math.sin(ang) * (Math.cos(ang))) / (1 + (Math.pow(Math.cos(ang), 2)));
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);
            contexto.fill();
            contexto.moveTo(origenx + calculo, origeny - calculox);


        }
        function recta(r) {
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = -80 * ang + 97;
            calculox = -70 * ang + 6;
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);
            contexto.fill();
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function circulo(r) {
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = R * Math.cos(ang);
            calculox = R * Math.sin(ang);
            //
      
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);
            contexto.fill();
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function elipse(a, b) {
            var A = escala(a);
            var B = escala(b);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = A * Math.sin(ang);
            calculox = B * Math.cos(ang);
            //
            contexto.strokeStyle = "red";
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);

            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function parabola(a, b, c, d, e) {
            var A = escala(a);
            var B = escala(b);
            var C = escala(c);
            var D = escala(d);
            var E = escala(e);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = D * ang + E;;
            calculox = A * Math.pow(ang, 2) + B * ang + C;
            //
            contexto.strokeStyle = "red";
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);

            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function hiperbola(a, b) {
            var A = escala(a);
            var B = escala(b);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = A * (1 / Math.cos(ang));
            calculox = B * Math.tan(ang);
            //
            // contexto.strokeStyle="red";
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);

            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function cardioide(r) {
            var R = escala(r);
            //contexto.clearRect(0, 0, canvas.width, canvas.height);
            // Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (R * Math.cos(ang)) * (1 - Math.cos(ang));
            calculox = ((R * Math.sin(ang))) * (1 - Math.cos(ang));
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function rosa(r) {
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (R * Math.cos(6 * ang)) * (Math.cos(ang));
            calculox = ((R * Math.cos(6 * ang))) * (Math.sin(ang));
            contexto.arc(origenx + calculo, origeny - calculox, 2, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function rotar() {
            var mr;
        }
        function rosa_polar(r) {
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (R * Math.cos(3 * ang));
            calculox = ((R * Math.cos(3 * ang))) * (Math.sin(ang));
            contexto.arc(origenx + calculo, rotate(ang), 2, 0, Math.PI * 2, true);
            contexto.fill();
            contexto.closePath();

            if (ang <= (Math.PI)) {
                ang = ang + .01;
            }
            else {
                clearInterval();
            }
        }
        function caracol(r, a, color) {
            var R = escala(r);
            var A = escala(a);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (A - R * Math.sin(ang)) * (Math.cos(ang));
            calculox = ((A - R * Math.sin(ang))) * (Math.sin(ang));
            contexto.arc(origenx + calculo, origeny - calculox, 1, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function cisoide(r) {
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;
            var p = Math.pow(Math.sin(ang), 2);
            calculo = (R * p);
            calculox = (R * p) * Math.tan(ang);
            console.log(p);
            contexto.arc(origenx + calculo, origeny - calculox, 1, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function agnesi(r) {
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;
            ctg = Math.cos(ang) / Math.sin(ang);
            calculo = (R * ctg);
            calculox = (R * Math.pow((Math.sin(ang)), 2));
            contexto.arc(origenx + calculo, origeny - calculox, 1, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function astroide(r) {
            var R = escala(r);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (R * (Math.pow(Math.cos(ang), 3)));
            calculox = (R * (Math.pow(Math.sin(ang), 3)));
            contexto.arc(origenx + calculo, origeny - calculox, 1, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function reloj_arena(a, b) {
            var A = escala(a);
            var B = escala(b);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (A * (Math.sin(2 * ang)));
            calculox = (B * (Math.sin(ang)));
            contexto.arc(origenx + calculo, origeny - calculox, 1, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function gota(a, b) {
            var A = escala(a);
            var B = escala(b);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = (2 * A * (Math.cos(ang))) - (A * Math.sin(2 * ang));
            calculox = (B * (Math.sin(ang)));
            contexto.arc(origenx + calculo, origeny - calculox, 1, 0, Math.PI * 2, true);
            contexto.fill();
            //Con ese ya no se ven esas lìneas locas que aparecian la graficar
            contexto.moveTo(origenx + calculo, origeny - calculox);
        }
        function hmm(A) {
            var A = escala(a);
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            Dibujar();

            var origenx = canvas.width / 2;
            var origeny = canvas.height / 2;

            calculo = 12 * Math.sech(ang / 12);
            calculox = (ang - 12) * Math.tanh(ang / 12);
            contexto.arc(origenx + calculo, origeny - calculox, 1, 0, Math.PI * 2, true);
            contexto.fill();
            contexto.closePath();

            if (ang <= (2 * Math.PI)) {
                ang = +.01;
            }
            else {
                clearInterval();
            }

        }


        // prolata(2,3);
        // lemniscata(5);
        // cardioide(r);
        // agnesi(r);
        // cisoide(r);
        // gota(r,6);
        // window.onload = function () {
        //     h = 0;
        //     ang = 10;
        //     calculo = 10;
        //     calculox = 10;
        //     //prolata(2,3);
        //     setInterval("caracol(2,1)", 10);
        // setInterval("elipse(5,3)", 10);
        //setInterval("hiperbola(2,1)", 1);
        // setInterval("prolata(2,3)", 1);
        //setInterval("rosa(3)", 10);
        // setInterval("rosa_polar(3)", 10);
        // setInterval("recta(9)", 10);
        // setInterval("circulo(r)", 10);
        // setInterval("cisoide(2)",1);
        // setInterval("agnesi(2)",10);
        // setInterval("gota(2,6)",10);
        // setInterval("hmm(12)",10);

        // setInterval("cicloide(2)", 10);
        // setInterval("lemniscata(r)", 10);
        // setInterval("cardioide(2)", 10);
        // setInterval("reloj_arena(3,6)", 10);
        // setInterval("astroide(r)", 10);
        // setInterval("astroide(r)", 10);
        // }


        for (var i = 0; i < document.curvas.Curva.length; i++) {
            // console.log("Esta uno seleccionado "+i+" "+document.curvas.Curva[i].checked)
            if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Cicloide') {
               
                // console.log("Cicloide");
                cicloide(3);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Prolata') {

                prolata(7, 14);
                // console.log("Prolata");

            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Lemniscata') {

                lemniscata(r);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Recta') {
                recta(r);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Circulo') {
                circulo(3);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Elipse') {
                elipse(r, 7);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Parabola') {
                parabola(1, 0, 0, 1, 0);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Hiperbola') {
                hiperbola(r, 6);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Cardioide') {
                cardioide(r);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Rosa') {
                rosa(7);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Caracol') {
                caracol(5, 2);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Cisoide') {
                cisoide(r);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Agnesi') {
                agnesi(r);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Astroide') {
                astroide(r);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Reloj') {
                reloj_arena(r, 8);
            }
            else if (document.curvas.Curva[i].checked && document.curvas.Curva[i].value == 'Gota') {
                gota(2, 6);
            }
            
            
        }
    })

}



