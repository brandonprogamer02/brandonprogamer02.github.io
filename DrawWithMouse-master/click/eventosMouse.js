    function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal,lienzo)// esta es la funcion encargado de dibujar en el canvas 
 {
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 6;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
 }

function empezar(parametros)
    {
        console.log(parametros)
        
       
        dibujarLinea(colorElegido, parametros.clientX - 7 ,parametros.clientY - 7 ,parametros.clientX - 8 , parametros.clientY - 9,areaDelDibujo)
    }
    
function pararDibujar()
    {
    
    areaDelCanvas.removeEventListener("mousemove", empezar)
    }   
        
function  dibujar()
     {

     areaDelCanvas.addEventListener("mousemove",empezar)


     }
     ///////////////////////////////////////////////////

var colorElegido
var areaDelCanvas = document.getElementById("elCanvas")
var areaDelDibujo = areaDelCanvas.getContext("2d")
var red = document.getElementById("red")
var blue = document.getElementById("blue")
var yellow = document.getElementById("yellow")
var green = document.getElementById("green")
var purple = document.getElementById("purple")
var black = document.getElementById("black")
var brown = document.getElementById("brown")
var orange = document.getElementById("orange")
var pink = document.getElementById("pink")
var white = document.getElementById("white")


areaDelCanvas.addEventListener("click",dibujar)
areaDelCanvas.addEventListener("dblclick", pararDibujar)

red.addEventListener("click", colores)
blue.addEventListener("click", colores)
yellow.addEventListener("click", colores)
green.addEventListener("click", colores)
purple.addEventListener("click", colores)
black.addEventListener("click", colores)
brown.addEventListener("click", colores)
orange.addEventListener("click", colores)
pink.addEventListener("click", colores)
white.addEventListener("click", colores)









function colores(parametros)
{

    if (parametros.srcElement === red)
    {
        colorElegido = "red"
    }

    if (parametros.srcElement === blue)
    {
        colorElegido = "blue"
    }

    if (parametros.srcElement === yellow)
    {
        colorElegido = "yellow"
    }

    if (parametros.srcElement === green)
    {
        colorElegido = "green"
    }

    if (parametros.srcElement === brown)
    {
        colorElegido = "brown"
    }

    if (parametros.srcElement === white)
    {
        colorElegido = "white"
    }

    if (parametros.srcElement === black)
    {
        colorElegido = "black"
    }

    if (parametros.srcElement === purple)
    {
        colorElegido = "purple"
    }

    if (parametros.srcElement === pink)
    {
        colorElegido = "pink"
    }

    if (parametros.srcElement === orange)
    {
        colorElegido = "orange"
    }














}
// alert('Por favor, pulsar "Ctrl"  +  "+" para poner el zoom en 150 y tener una mejor experiencia ')
// alert('Haz "Click" en el area del lienzo para empezar a dibujar y "doble click"  para detener el trazo')
// alert('Abajo estan los botones en los cuales, puedes seleccionar el color que desees y tambien borrar con el boton "borrador"')