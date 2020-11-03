const notificar:HTMLElement = document.querySelector('#notificar');
const verNorificacion = document.querySelector('#ver=notificacion');
// Event Listeners
// evento para solicitar permiso
notificar.addEventListener('click',()=>{
    Notification
            .requestPermission()
            .then(resultado =>{
                console.log(`El resultado es ${resultado}`)
            })  
})



