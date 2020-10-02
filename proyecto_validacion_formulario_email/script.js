// VARIABLES GLOBALES
const textarea_para = document.querySelector('#para');
const textarea_asunto = document.querySelector('#asunto');
const textarea_mensaje = document.querySelector('#mensaje');
const boton_enviar = document.querySelector('#enviar');
const main = document.querySelector('main');


// campos de validaciones
let validacion_cantidad_caracteres_para;
let validacion_cantidad_caracteres_asunto;
let validacion_cantidad_caracteres_mensaje;
let validacion_email;
let botonEnviarIsEnabled = false;

// variables de estilos css

let cursor;
let color;

// EVENT LISTENERS


// animacion hover del boton enviar

boton_enviar.addEventListener('mouseover', () => {
            
    //console.log(`puntero: ${cursor}`)
    boton_enviar.style = `cursor: ${cursor}; background: ${color}; color: white`;
    // = true;
    //console.log('en el mouse over: '+ cursor);

})


textarea_para.addEventListener('blur', validar_campos);
textarea_asunto.addEventListener('blur', validar_campos);
textarea_mensaje.addEventListener('blur', validar_campos);

// FUNCIONES

function validar_campos(e)
{
    if(e.target.id == 'para')// validacion para el textarea para
    {
        if(e.target.value.length > 5 ) // validamos que cantidad de caracteres sea superior a 5
        {
            validacion_cantidad_caracteres_para = true;
            e.target.style = 'border: 1.6px solid green';
                // validamos que sea un email valido
                if(validar_email(e.target.value) == true) 
                {
                    validacion_email = true;
                    e.target.style = 'border: 1.6px solid green';
                    remover_mensaje_error();
                    
                }else{
                    validacion_email = false;
                    e.target.style = 'border: 1.6px solid red';
                    mostrar_mensaje_error('EL EMAIL NO ES VALIDO');
                }

        }else{ 
            e.target.style = 'border: 1.6px solid red';
            validacion_cantidad_caracteres_para = false;
            mostrar_mensaje_error('LA LONGITUD DEL EMAIL DEBE SER MAYOR A 6');
        }
   
    }
    //----------------------------------------------------------------------------------------------
    else if(e.target.id == 'asunto') //validacion para el textarea asunto
    {
        if(e.target.value.length > 5 ) // validamos que cantidad de caracteres sea superior a 5
        {
            validacion_cantidad_caracteres_asunto = true;
            e.target.style = 'border: 1.6px solid green';
            remover_mensaje_error();
        }else { 
            e.target.style = 'border: 1.6px solid red';
            validacion_cantidad_caracteres_asunto = false;
            mostrar_mensaje_error('LA LONGITUD DEL ASUNTO DEBE SER MAYOR A 6'); 
        }
    }
    //----------------------------------------------------------------------------------------------
    else if(e.target.id == 'mensaje') // validacion para el textarea mensaje
    {
        if(e.target.value.length > 10 ) // validamos que cantidad de caracteres sea superior a 10
        {
            validacion_cantidad_caracteres_mensaje = true;
            e.target.style = 'border: 1.6px solid green';
            remover_mensaje_error();
        }else{
            e.target.style = 'border: 1.6px solid red';
            validacion_cantidad_caracteres_mensaje = false;
            mostrar_mensaje_error('LA LONGITUD DEL MENSAJE DEBE SER MAYOR A 10'); 
        }
    }
    //------------------------------------------------------------------------------------------------
    
    
    console.log(validacion_cantidad_caracteres_mensaje+' este fue valor de cantidad caracteres mensaje')
    if(validacion_cantidad_caracteres_para && validacion_cantidad_caracteres_asunto 
    && validacion_cantidad_caracteres_mensaje && validacion_email) // validar todo
    {
        //boton_enviar.setAttribute('disabled','false');
        cursor = 'pointer';
        color = '#32DB40';
        boton_enviar.style = 'background-color: #32DB40; color: white';
        console.log('entro en validacion correctas!');  
        
    }else { }
}

    function validar_email(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function mostrar_mensaje_error(error)
    {

        // este if es para que no se pongan mas de un error
        if(document.querySelector('#mensaje-error') == null)
        {
            const div = document.createElement('div');
            div.id = 'mensaje-error';
            const span = document.createElement('span');
            span.innerHTML = error;
            div.appendChild(span);

            main.insertBefore(div,main.children[0]);
            
            boton_enviar.style = 'background-color: #BDFBC4;';
            color = '#BDFBC4';
            cursor = 'not-allowed'; 
            
            
            botonEnviarIsEnabled = false;
            

        }else{
            document.querySelector('#mensaje-error span').innerHTML = error;
        }
    }
    function remover_mensaje_error()
    {
        if(document.querySelector('#mensaje-error') != null)
        {
            document.querySelector('#mensaje-error').remove();
        }
        
    }
    
    