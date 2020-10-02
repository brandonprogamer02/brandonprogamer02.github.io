const boton_enviar = document.querySelector('#enviar');

boton_enviar.style = ' background:red';


boton_enviar.addEventListener('mouseover', (e)=>
{
    boton_enviar.style.cursor = 'pointer';
});