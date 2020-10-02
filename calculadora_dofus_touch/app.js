const get_dano_bruto = () => 
{
    let base = Number(document.getElementById('dano_hechizo').value);
    let stats = Number(document.getElementById('stats').value);
    let potencia = Number(document.getElementById('potencia').value);
    let danos_fijos = Number(document.getElementById('danos_fijos').value);

  
    let dano_bruto=(base *(1+(stats+potencia * 0.80)/100)+danos_fijos) ;
    
    document.getElementById('resultado').value = parseInt(dano_bruto);
    
}

document.getElementById('boton').addEventListener('click',get_dano_bruto);
document.addEventListener('keypress', evt =>{
    if(evt.keyCode == 13) get_dano_bruto();
});
