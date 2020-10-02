var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

console.log(teclas);

// document.addEventListener('keydown', dibujarTeclado);
var cuadrito = document.getElementById('area_de_dibujo');
var papel = cuadrito.getContext('2d');
var x = 259;
var y = 259;
var buttons = 1;
var colorcito = 'blue';
document.addEventListener('mousemove', dibujarMouse);
document.addEventListener('mousedown', dibujarMouse);

function dibujarlinea(color, xinicial, yinicial, xfinal, yfinal, lienzo) {
	lienzo.beginPath();
	lienzo.strokeStyle = color;
	lienzo.lineWidth = 3;
	lienzo.moveTo(xinicial, yinicial);
	lienzo.lineTo(xfinal, yfinal);
	lienzo.stroke();
	lienzo.closePath();
}

function dibujarMouse(click) {
	var xinicial = click.layerX;
	var yinicial = click.layerY;
	var xfinal = click.movementX;
	var yfinal = click.movementY;

	if (click.buttons == buttons) {
		dibujarlinea(colorcito, xinicial, yinicial, xinicial - xfinal, yinicial - yfinal, papel);
	}
	
}

// dibujarlinea('green', 249, 249, 251, 251, papel);

// Boton rojo
var rojo = document.getElementById('cambiarColor1');
rojo.addEventListener('click', cambiaColor);
// boton blanco
var blanco = document.getElementById('cambiarColor2');
blanco.addEventListener('click', cambiaColor2);
// boton azul
var azul = document.getElementById('cambiarColor3');
azul.addEventListener('click', cambiaColor3);

function borrarColor() {
	if ((colorcito == 'blue', 'red', 'white')) {
		colorcito = 'black';
	}
}

function cambiaColor() {
	if ((colorcito == 'blue', 'white')) {
		colorcito = 'red';
	}
}

function cambiaColor2() {
	if ((colorcito == 'red', 'blue')) {
		colorcito = 'white';
	}
}
function cambiaColor3() {
	if ((colorcito == 'red', 'white')) {
		colorcito = 'blue';
	}
}

// function dibujarTeclado(evento) {
// 	var movimiento = 10;

// 	switch (evento.keyCode) {
// 		case teclas.UP:
// 			dibujarlinea(colorcito, x, y, x, y - movimiento, papel);
// 			y = y - movimiento;

// 			break;

// 		case teclas.DOWN:
// 			dibujarlinea(colorcito, x, y, x, y + movimiento, papel);
// 			y = y + movimiento;
// 			break;
// 		case teclas.LEFT:
// 			dibujarlinea(colorcito, x, y, x - movimiento, y, papel);
// 			x = x - movimiento;
// 			break;
// 		case teclas.RIGHT:
// 			dibujarlinea(colorcito, x, y, x + movimiento, y, papel);
// 			x = x + movimiento;
// 	}
// }
//

// ** Para descargar el canvas

var img = document.getElementById('laimagen');

var png = document.getElementById('png');
png.addEventListener(
	'click',
	function() {
		img.src = cuadrito.toDataURL('image/png');
	},
	false
);

var jpeg = document.getElementById('jpeg');
jpeg.addEventListener(
	'click',
	function() {
		img.src = cuadrito.toDataURL('image/jpeg');
	},
	false
);

// ** Linea que permite descargar la imagen
var descargar = document.getElementById('descargar');
descargar.addEventListener(
	'click',
	function() {
		var imagen = cuadrito.toDataURL('image/jpeg');
		imagen = imagen.replace('image/jpeg', 'image/octet-stream');
		document.location.href = imagen;
	},
	false
);
