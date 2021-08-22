/*  VARIABLES Y CONSTANTES GLOBALES  */

// La longitud de la clave de cifrado, en dado caso de que se genere de forma aleatoria (pseudo-aleatoria).
const caracteresDeClave = 20;

// En esta variable vamos a guardar la clave cifrado. Va a depender si el usuario proporciona una clave o si se genera una clave pseudo-aleatoria.
let claveCifrado = null;

// En esta variable vamos a guardar el mensaje cifrado.
let mensajeCifrado = null;

let nombre = null;

/*  FIN VARIABLES Y CONSTANTES GLOBALES  */

/*  ELEMENTOS HTML  */
const formaClaveCifrado =  document.getElementById('clave-cifrado');

const formaMensajeCifrado = document.getElementById('mensaje-cifrado');

const formaMensajeDescifrado = document.getElementById('mensaje-descifrado');

const inputs = document.getElementsByTagName('input');
/* FIN ELEMENTOS HTML  */

/*  FUNCIONES AUXILIARES  */
function generarClaveAleatoria() {
  let clave = '';
  for (let i = 0; i < caracteresDeClave; i++) {
    clave += String.fromCharCode(Math.floor(Math.random() * 94 + 32));
  }
  return clave;
}
/*  FIN FUNCIONES AUXILIARES  */

/*  FUNCIONES HANDLERS DE EVENTOS  */
function claveCifradoHandler(evento) {
  evento.preventDefault();
  // Con esta constante determinamos que boton mando la inforamcion.
  const existeClaveProporcionada = evento.submitter.classList.contains('btn-clave-proporcionada');
  nombre = inputs[0].value ? inputs[0].value : "Anónimo";
  if (existeClaveProporcionada) {
    claveCifrado = inputs[1].value;
    alert(`Hola ${nombre}, la clave de cifrado es ${claveCifrado}. Usted proporcionó la clave de cifrado.`);
  } else {
    claveCifrado = generarClaveAleatoria();
    alert(`Hola ${nombre}, la clave de cifrado es ${claveCifrado}. La clave de cifrado se genero pseudo-aleatoriamente.`);
  }
  inputs[0].value = '';
  inputs[1].value = '';
}

function mensajeCifradoHandler(evento) {
  evento.preventDefault();
  const mensaje = inputs[2].value;
  mensajeCifrado = CryptoJS.AES.encrypt(mensaje, claveCifrado).toString();
  alert(`El mensaje a sido cifrado con exito. El mensaje cifrado es ${mensajeCifrado}`);
  inputs[2].value = '';
}

function mensajeDescifradoHandler(evento) {
  evento.preventDefault();
  const mensajeDescifrado = CryptoJS.AES.decrypt(mensajeCifrado, claveCifrado).toString(CryptoJS.enc.Utf8);
  alert(`El mensaje descifrado es "${mensajeDescifrado}"`);
}

// Cada vez que se refresca la página, todos los campos de las formas los ponemos en blanco.
function documentoCargo() {
  for (const input of inputs) {
    input.value = "";
  }
}

/*  FIN FUNCIONES HANDLERS DE EVENTOS  */

/*  EVENT LISTENERS  */
formaClaveCifrado.addEventListener('submit', claveCifradoHandler);

formaMensajeCifrado.addEventListener('submit', mensajeCifradoHandler);

formaMensajeDescifrado.addEventListener('submit', mensajeDescifradoHandler);

document.addEventListener('DOMContentLoaded', documentoCargo);
/*  FIN EVENT LISTENERS  */
