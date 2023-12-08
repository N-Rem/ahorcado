import { Letras } from '../recursos/letras.js';
import { Palabras } from '../recursos/palabras.js';
console.log(Letras);
console.log(Palabras);
ordenaPalabras();

const $h3Titulo = document.querySelector("#titulo");
const $divGano = document.querySelector("#gano");
const $divPerdio = document.querySelector("#perdio");
const $divApp = document.querySelector("#App");
const $divBtns = document.querySelector("#btns");
const $spanIntentos = document.querySelector("#intentos");
const $spanRestantes = document.querySelector("#restantes");
const $divImagen = document.querySelector("#imagenAhorcado");
const $h3PalabraOculta = document.querySelector("#palabraOculta");
const $h2PalabrasEncontradas = document.querySelector("#palabrasEncontradas");
const $btns = document.querySelectorAll(".letras");
const $btnIniciar = document.querySelector("#iniciar");


//Variables globales de PalabraActual y de 
let palabrasConseguidas = []
let palabraSeleccionada;
let palabraOculta;
let errores = 0;
let vecesPerdidas = -1;


const MAX_ERRORES = 9
$btnIniciar.addEventListener("click", inicio)
function inicio() {
    $h3Titulo.innerHTML = `Ahorcado`;

    creaBtn()
    errores = 0;

    $btnIniciar.style.display = "none";//Oculta el voton iniciar.
    $divGano.innerHTML = "";
    $divPerdio.innerHTML = "";
    $divApp.style.display = "";
    muestraIntentos()
    palabraSeleccionada = seleccionaPalabra();
    console.log(`Palabra en juego: ${palabraSeleccionada}`);
    creaPalabraOculta(palabraSeleccionada);

    console.log("---Partida Nueva---");
    mostrarImagenAhorcado(errores)
    muestraEncontradas();
}

function creaBtn() {
    $divBtns.innerHTML = ""
    Letras.forEach((letra) => {
        let nuevoBtn = document.createElement("button");
        nuevoBtn.classList.add("btn-letra");
        nuevoBtn.classList.add("letras")
        nuevoBtn.value = `${letra}`;
        nuevoBtn.innerText = letra;
        nuevoBtn.addEventListener("click", jugarTurno);
        $divBtns.appendChild(nuevoBtn)
    })
}

function ordenaPalabras() {
    let aux = "";
    let ordenado = true;
    while (ordenado) {
        ordenado = false;
        for (let i = 0; i < Palabras.length - 1; i++) {
            if (Palabras[i].length > Palabras[i + 1].length) {
                aux = Palabras[i];
                Palabras[i] = Palabras[i + 1];
                Palabras[i + 1] = aux;
                ordenado = true;
                break;
            }
        }
    }
    console.log(Palabras)
}

function seleccionaPalabra() {
    let cero = 0;
    let largoConseguidas = palabrasConseguidas.length
    if (largoConseguidas > cero) {
        return Palabras[largoConseguidas]
    }
    else {
        return Palabras[0];
    }
}

function muestraEncontradas() {
    $h2PalabrasEncontradas.innerHTML = `Se consiguio ${palabrasConseguidas.length} palabras de ${Palabras.length}`;
}

function creaPalabraOculta(palabra) {
    $h3PalabraOculta.innerText = "";
    let largo = palabra.length;
    let guiones = '';
    for (let i = 1; i <= largo; i++) {
        guiones += '_';
    }
    $h3PalabraOculta.innerText = guiones;
    palabraOculta = guiones
}

function jugarTurno(event) {
    if (palabraOculta == palabraSeleccionada || errores === MAX_ERRORES) {
        console.log("ya esta!..")
    }
    else {
        let valorBtn = event.target.value
        console.log(valorBtn.toLowerCase());
        event.target.remove();
        //Funcion del juego
        if (compruebaError(valorBtn)) {
            errores++
            if (errores > MAX_ERRORES - 1) {
                mostrarImagenAhorcado(errores);
                muestraIntentos();
                setTimeout(perdio, 1000);
            }
            else {
                mostrarImagenAhorcado(errores);
                muestraIntentos();
            }
        }
        else {
            agregaLetraCorrecta(valorBtn);
            $h3PalabraOculta.innerText = "";
            $h3PalabraOculta.innerText = palabraOculta;
            if (palabraOculta.toLowerCase() === palabraSeleccionada.toLowerCase()) {
                setTimeout(gano, 1000);
            }
        }
    }

}


//----Turno por letra----
function compruebaError(letra) {
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (letra.toUpperCase() === palabraSeleccionada[i].toUpperCase()) {
            return false;
        }
    }
    return true;
}

function agregaLetraCorrecta(letraSelec) {
    let arrayPalabraOculta = palabraOculta.split(``);
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (letraSelec.toLowerCase() == palabraSeleccionada[i].toLowerCase()) {
            arrayPalabraOculta[i] = letraSelec;
        }
    }
    palabraOculta = arrayPalabraOculta.join(``)
    console.log(arrayPalabraOculta)
    console.log(palabraOculta)
}

function mostrarImagenAhorcado(error) {
    $divImagen.innerHTML = `<img class="img-ahorcado" src="recursos/partesAhorcado/${error}.png" alt="ahorcado" />`;
}

function muestraIntentos() {
    $spanRestantes.innerHTML = `${MAX_ERRORES - errores}`;
    $spanIntentos.innerHTML = `${errores}`;
}

function gano() {
    $h3Titulo.innerHTML = `Salvado!`;
    $divApp.style.display = "none";
    $divGano.innerHTML = `<h1>GANÓ!!</h1> 
    <img class="gif" src="recursos/gano/gano.gif" alt="esqueleto Bailando"/>`;
    $btnIniciar.style.display = "" //Muestra el voton iniciar.
    palabrasConseguidas.push(palabraOculta);
    vecesPerdidas = -1;
}

function perdio() {
    let imagenFallo;
    vecesPerdidas++
    if (vecesPerdidas <= 7) {
        imagenFallo = vecesPerdidas;
    }
    else {
        imagenFallo = 8;
    }
    let img = imagenFallo.toString();
    $divApp.style.display = "none";
    $divPerdio.innerHTML = `<h1>PERDÓ!<h1>
    <img class="gif" src="recursos/perdio/perdio${img}.gif" alt="esqueletoPerdedor"/>`;
    $btnIniciar.style.display = ``;
}
