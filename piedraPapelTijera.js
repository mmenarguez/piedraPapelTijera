var posibilidades = ["piedra", "papel", "tijera"];

//Asignación de eventos a los botones
document.getElementById("boton-iniciar").addEventListener("click", mostrarFormulario);
document.getElementById("boton-empezar").addEventListener("click", introducirJugador);
document.getElementById("boton-ya").addEventListener("click", function() {
    generarOpcionAleatoria(posibilidades);
document.getElementById("boton-reset").addEventListener("click", resetearPartida);
});

// Ocultar la pantalla inicial y mostrar el formulario
function mostrarFormulario() {
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-formulario").style.display = "block";
}

// Ocultar la pantalla inicial y mostrar el formulario
function mostrarJuego() {
    document.getElementById("pantalla-formulario").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
}

//Asignar a las imágenes del jugador el evento para seleccionarlas
var imagenes = document.getElementsByTagName("img");

for (var i = 0; i < imagenes.length-1; i++) {
    var rutaImagen = "img/" + posibilidades[i] + "Jugador.png";
    imagenes[i].id = posibilidades[i];
    imagenes[i].src = rutaImagen;
    imagenes[i].addEventListener("click", tiradaJugador, false);
}

//Función que permite hacer las comprobaciones sobre el nombre del jugador y la cantidad de partidas
var nombreJugador ="";

function introducirJugador() {
    nombreJugador = document.getElementsByTagName('input')[0].value;
    var numeroPartidas = document.getElementsByTagName('input')[1].value;
    var totalSpan = document.getElementById('total');

    if (comprobarNombre(nombreJugador) && comprobarPartidas(numeroPartidas)) {
        document.getElementsByName('nombre')[0].style.backgroundColor = "";
        document.getElementsByName('partidas')[0].style.backgroundColor = "";
        document.getElementsByName('nombre').disabled = true;
        document.getElementsByName('partidas').disabled = true;
        totalSpan.textContent = numeroPartidas;
        mostrarJuego();

    } else {
        if (!comprobarNombre(nombreJugador)) {
            document.getElementById("mensaje-error-nombre").style.display = "block";
        } else {
            document.getElementById("mensaje-error-nombre").style.display = "none";
        }

        if (!comprobarPartidas(numeroPartidas)) {
            document.getElementById("mensaje-error-partidas").style.display = "block";
        } else {
            document.getElementById("mensaje-error-partidas").style.display = "none";
        }
    }
};

//Función que permite comprobar que el nombre del jugador es válido
function comprobarNombre (nombreJugador) {
    return nombreJugador.length > 3 && isNaN(nombreJugador[0]) 
}

//Función que permite comprobar que el número de partidas es válido
function comprobarPartidas (numeroPartidas){
    return numeroPartidas > 0;
 }

 //Función que permite al jugador seleccionar una opción
 var opcionJugador;
 
 function tiradaJugador(opcion) {
    for (var i = 0; i <= posibilidades.length - 1; i++) {
        if (imagenes[i] != opcion.target) {
            imagenes[i].classList.remove("seleccionado");
            imagenes[i].classList.add("noSeleccionado");
        } else {
            imagenes[i].classList.remove("noSeleccionado");
            imagenes[i].classList.add("seleccionado");

            opcionJugador = posibilidades[i];
        }
    }
 }

 //Función que permite generar una opción aleatoria para la máquina
 function generarOpcionAleatoria (posibilidades) {
    if (actual.innerHTML < total.innerHTML) {
        var maquina = document.getElementsByTagName("img")[document.getElementsByTagName("img").length-1];
        var indiceAleatorio = Math.floor(Math.random() * posibilidades.length);
        var opcionAleatoria = posibilidades[indiceAleatorio];
        var rutaImagen = "img/" + opcionAleatoria + "Ordenador.png";
        maquina.src = rutaImagen;  
        actual.textContent = Number(actual.textContent) + 1;
        var tiradaMaquina = opcionAleatoria;
        comprobarResultado (opcionJugador, tiradaMaquina);
    return opcionAleatoria;
    }
 }

 //Función que permite comprobar el resultado e incluirlo en el historial
 function comprobarResultado (opcionJugador, tiradaMaquina) {
    var indiceJugador = posibilidades.indexOf(opcionJugador);
    var indiceMaquina = posibilidades.indexOf(tiradaMaquina);

    if ((indiceJugador === 0 && indiceMaquina === posibilidades.length - 1) || (indiceJugador > 0 && indiceJugador - 1 === indiceMaquina)) {
        historial.innerHTML += "<li>Gana " + nombreJugador +"</li>\n"
    } else if (indiceJugador === indiceMaquina) {
        historial.innerHTML += "<li>" + "Empate" + "</li>\n";
    } else {
        historial.innerHTML += "<li>" + "Gana la máquina" + "</li>\n"; 
    }
}

//Resetear partida
function resetearPartida() {
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-formulario").style.display = "block";
    document.getElementById("mensaje-error-nombre").style.display = "none";
    document.getElementById("mensaje-error-partidas").style.display = "none";
    document.getElementsByName('nombre')[0].disabled = false;
    document.getElementsByName('partidas')[0].disabled = false;
    document.getElementsByTagName('input')[1].value = "0";
    document.getElementById('actual').textContent = "0";
    document.getElementById('total').textContent = "0";
    var maquina = document.getElementsByTagName("img")[document.getElementsByTagName("img").length-1];
    maquina.src = "img/defecto2.png";
    historial.innerHTML = "";
}