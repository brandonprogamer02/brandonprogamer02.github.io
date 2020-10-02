/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                                       VARIABLES							                                                 |     
 * -------------------------------------------------------------------------------------------------------------------------------------------------------
 */

alert('VER LAS INSTRUCCIONES PRIMERO');
var canvas;
var c;
let movimiento = 100;
let score = 0;
let speedUp = 0;
let intentos = 0;
let estadoDelJuego = 'HOME';

// ? SCORE DISPLAY
let playWUD; // ESTA VARIABLE TIENE EL DISPLAY DEL LA SECCION SCORE.
let scoreboard;
let finalScore;

// ? MENUS
let homeMenu;
let gameOverMenu;
let instructionMenu;

// ? BUTTONS
let startButton;
let restartButton;
let goHomeButton;
let introButton;
let backButton;

// ? Audio
let backgroundAudio;
let homeMenuAudio;
let gameoverAudio;

// ? EFECTS
let reboundAudio;
let screenreboundAudio;

var colorArray = [
	'##F26D85',
	'#BF214B',
	'#C1D0D9',
	'#0E6973',
	'#0E7373',
	'#547C8C',
	'#6FB7BF',
	'#D96704',
	'#D9A679',
	'#8C4C46'
];

var teclas = {
	A: 65,
	D: 68,
	LEFT: 37,
	RIGHT: 39
};

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                          FUNCION INICIACIDORAR DEL JUEGO                                                                   |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */
function iniciadorDelJuego(estadoDelJuego) {
	canvas = document.querySelector('canvas');
	if (estadoDelJuego == 'HOME') {
		canvas.style.backgroundColor = 'purple';
	} else {
		canvas.style.backgroundColor = 'teal';
	}

	c = canvas.getContext('2d');
	document.addEventListener('keydown', moverBarra);

	//** MENUS
	homeMenu = document.getElementById('homeMenu');
	centerMenuPosition(homeMenu);

	gameOverMenu = document.getElementById('gameOver');
	centerMenuPosition(gameOverMenu);

	instructionMenu = document.getElementById('instructionMenu');
	centerMenuPosition(instructionMenu);

	// ** BUTTOM GO HOME
	goHomeButton = document.getElementById('goHomeButton');
	goHomeButton.addEventListener('click', goHome);

	// ** BUTTON RESTART
	restartButton = document.getElementById('restartButton');
	restartButton.addEventListener('click', gameRestart);

	playWUD = document.getElementById('playWUD');
	scoreboard = document.getElementById('scoreboard');

	// ** BUTTON START
	startButton = document.getElementById('startButton');
	startButton.addEventListener('click', gameStart);

	// ** BUTTON introButton
	introButton = document.getElementById('introButton');
	introButton.addEventListener('click', instruction);

	// ** BUTTON backButton
	backButton = document.getElementById('backButton');
	backButton.addEventListener('click', goBack);

	//** SCORE FINAL
	finalScore = document.getElementById('finalScore');

	// * Audios
	backgroundAudio = document.getElementById('backgroundAudio');
	homeMenuAudio = document.getElementById('homeMenuAudio');
	gameoverAudio = document.getElementById('gameoverAudio');
	reboundAudio = document.getElementById('reboundAudio');
	screenreboundAudio = document.getElementById('screenreboundAudio');

	setState(estadoDelJuego);

	/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?		 	  ESTA CONDICION SE CUMPLE CUANDO EL CIRCULO SALE POR DEBAJO(recuerda convertirlo en una funcion luego)                                      |     
 * -------------------------------------------------------------------------------------------------------------------------------------------------------
 */
	// ? ESTA CONDICION SE CUMPLE CUANDO EL CIRCULO SALE POR DEBAJO(recuerda convertirlo en una funcion luego)
	if (circulo.y + circulo.radius - barra.h > canvas.height) {
		if (intentos <= intentos && intentos > 0) {
			circulo.y = 100;
			intentos -= 1;
		} else {
			setState('GAME OVER');
			gameoverAudio.play();
			homeMenuAudio.pause();
			homeMenuAudio.currentTime = 0;
			canvas.style.backgroundColor = 'darkred';
		}
	}
}

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  				    CLASS PARA DIBUJAR EL CIRCULO                                                           |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */

class Circulo {
	constructor(x, y, dx, dy, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = color;
	}

	draw = function() {
		c.beginPath();
		c.fillStyle = this.color;
		c.strokeStyle = 'seagreen';
		c.lineWidth = 25;
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.stroke();
		c.fill();
	};
	update = function() {
		/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							             ESTA CONDICION HACE QUE EL CIRCULO COLISIONE CON LOS EXTREMO DEL CANVAS                                        |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
			screenreboundAudio.play();
		}

		if (this.y - this.radius < 0) {
			this.dy = -this.dy;
			score = score;
			screenreboundAudio.play();
		}
		if (this.y + this.radius - barra.h > canvas.height) {
			barra.color = 'black';
			screenreboundAudio.play();
		}
		/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							             ESTA CONDICION HACE QUE EL CIRCULO COLISIONE CON LA BARRA.                                                      |     
 * -------------------------------------------------------------------------------------------------------------------------------------------------------
 */
		if (
			circulo.x + circulo.radius > barra.x &&
			circulo.x - circulo.radius < barra.x + barra.w &&
			circulo.y + circulo.radius > barra.y &&
			circulo.y - circulo.radius < barra.y + barra.h
		) {
			// circulo.dx = -circulo.dx;
			circulo.dy = -5 + speedUp;
			score += 1;

			reboundAudio.play();

			/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							 ESTA CONDICION PERMITE AUMENTAR LA VELOCIDAD DEL CIRCULO CADA VEZ QUE SCORE SEA UN DIVISOR DE 10.                           |     
 * -------------------------------------------------------------------------------------------------------------------------------------------------------
 */
			if (score % 5 == 0 && score != 0) {
				speedUp += -0.5;
			}
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	};
}

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  				    CLASS PARA DIBUJAR LA BARRA                                                             |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */

class Barra {
	constructor(x, y, w, h, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
	}

	dibujarBarra = function() {
		c.beginPath();
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.w, this.h);
		c.closePath();
	};

	updateBarra = function() {
		if (pause1.checked == false) {
			this.dibujarBarra();
		}
	};
}

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  				    COORDENADA  DEL CIRCULO                                                                 |     
 ? 							          					        COORDENADA  DEL BARRA        							                            	|
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */

let circulo = new Circulo(300, 300, 5, 5, 50, 'blue');
let barra = new Barra(300, 620, 200, 20, 'black');

// ? COLISION DEL CIRCULO CON EL barraANGULO
// function colision(circulo, barra) {
// 	var dy = circulo.dy;
// 	if (
// 		circulo.x + circulo.radius > barra.x &&
// 		circulo.x - circulo.radius < barra.x + barra.w &&
// 		circulo.y + circulo.radius > barra.y &&
// 		circulo.y - circulo.radius < barra.y + barra.h
// 	) {
// 		// circulo.dx = -circulo.dx;
// 		circulo.dy = -dy;
// 		score += 1;
// 		console.log(score);
// 		console.log('VELOCIAD INICIAR:'+dy);
// 		if (score % 2 == 0) {
// 			dy += 1;
// 			console.log('ESTA ES LA VOCIDAD :' + dy);
// 		} else {
// 			score = score;
// 		}
// 	} else {
// 		circulo.color = 'blue';
// 		barra.color = 'red';
// 	}
// }

// ? FUNCION PARA MOVER LA BARRA

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  				    FUNCION PARA INICIAR EL JUEGO                                                         |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */
function instruction() {
	setState('INSTRUCTIONS');
}

function goBack() {
	setState('HOME');
}

function gameStart() {
	iniciadorDelJuego('PLAY');
	backgroundAudio.pause();
	backgroundAudio.currentTime = 0;
	homeMenuAudio.play();

	animate();
}
/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  				    FUNCION PARA IR AL INICIO DEL JUEGO                                                         |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */

function goHome() {
	// setState('HOME');
	// score = 0;
	// speedUp = 0;
	// circulo.y = 300;
	// circulo.x = barra.x + barra.w / 2;
	// gameoverAudio.pause();
	// gameoverAudio.currentTime = 0;
	window.location.reload();
}

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  				    FUNCION PARA REINICIAR EL JUEGO                                                         |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */

function gameRestart() {
	setState('PLAY');

	circulo.update();
	barra.updateBarra();

	// barra.x = canvas.width / 2;
	circulo.y = barra.y - barra.h * 3;
	circulo.x = barra.x + barra.w / 2;
	barra.updateBarra();
	score = 0;
	speedUp = 0;

	backgroundAudio.pause();
	backgroundAudio.currentTime = 0;
	gameoverAudio.pause();
	gameoverAudio.currentTime = 0;
	homeMenuAudio.play();
}

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  				    FUNCION PARA MOVER LA BARRA                                                             |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */

function moverBarra(evento) {
	if (pause.checked == false) {
		switch (evento.keyCode) {
			case teclas.LEFT:
				barra.dibujarBarra();
				/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							       ESTA CONDICION LIMITA LA BARRA A NO PASAR LOS BORDERS DEL CANVAS.						                            |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */
				if (barra.x - movimiento >= 0) {
					barra.x = barra.x - movimiento;
				}
				break;

			case teclas.RIGHT:
				barra.dibujarBarra();
				/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							       ESTA CONDICION LIMITA LA BARRA A NO PASAR LOS BORDERS DEL CANVAS.						                            |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */
				if (barra.x + barra.w < canvas.width) {
					barra.x = barra.x + movimiento;
				}
				break;
			case teclas.A:
				barra.dibujarBarra();
				/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							       ESTA CONDICION LIMITA LA BARRA A NO PASAR LOS BORDERS DEL CANVAS.						                            |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */
				if (barra.x - movimiento >= 0) {
					barra.x = barra.x - movimiento;
				}
				break;

			case teclas.D:
				barra.dibujarBarra();
				/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							       ESTA CONDICION LIMITA LA BARRA A NO PASAR LOS BORDERS DEL CANVAS.						                            |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */
				if (barra.x + barra.w < canvas.width) {
					barra.x = barra.x + movimiento;
				}
				break;
		}
	}
}

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  			   FUNCION QUE PERMITE INICIAR TODO                                                        |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */

function inicio() {
	if (pause.checked == false) {
		iniciadorDelJuego(estadoDelJuego);
		c.clearRect(0, 0, innerWidth, innerHeight); // Esto limpia el rastro del circulo cada vez que se ejecuta la funcion.
		if (estadoDelJuego == 'PLAY') {
			drawScoreboard();
			circulo.update();
			barra.updateBarra();
		}
	}
}

/*
 *-------------------------------------------------------------------------------------------------------------------------------------------------------
 ?							                  			   FUNCION QUE PERMITE ANIMAR EL CIRCULO                                                        |     
 * ------------------------------------------------------------------------------------------------------------------------------------------------------
 */

function animate() {
	requestAnimationFrame(animate);
	inicio();
}
animate();

/*
*-------------------------------------------------------------------------------------------------------------------------------------------------------
?							                  				    MANEJADOR DE ESTADO DEL JUEGO                                                           |     
* ------------------------------------------------------------------------------------------------------------------------------------------------------
*/

function setState(estado) {
	estadoDelJuego = estado;
	showMenu(estado);
}
/*
*-------------------------------------------------------------------------------------------------------------------------------------------------------
?							                  				    FUNCIONES DE MENUS                                                                     |     
* ------------------------------------------------------------------------------------------------------------------------------------------------------
*/
function displayMenu(menu) {
	menu.style.visibility = 'visible';
}
function closeMenu(menu) {
	menu.style.visibility = 'hidden';
}

function showMenu(estado) {
	if (estado == 'GAME OVER') {
		displayMenu(gameOverMenu);
		closeMenu(scoreboard);
	}
	if (estado == 'PLAY') {
		closeMenu(homeMenu);
		closeMenu(gameOverMenu);

		displayMenu(playWUD);
		displayMenu(scoreboard);
	}
	if (estado == 'HOME') {
		displayMenu(homeMenu);
		closeMenu(gameOverMenu);
		closeMenu(instructionMenu);

		backgroundAudio.play();
	}
	if (estado == 'INSTRUCTIONS') {
		displayMenu(instructionMenu);
		closeMenu(homeMenu);

		backgroundAudio.play();
	}
}

function centerMenuPosition(menu) {
	menu.style.top = canvas.height / 2 - menu.offsetHeight / 2 + 'px';
	menu.style.left = canvas.width / 2 - menu.offsetWidth / 2 + 'px';
}

function drawScoreboard() {
	scoreboard.innerHTML = 'SCORE: <span style="color:cornsilk">' + score + '</span>';
	finalScore.innerHTML = 'Tu SCORE es : <span style="color:cornsilk">' + score + '</span>';
}
