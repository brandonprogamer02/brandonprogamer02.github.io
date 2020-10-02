class Mamifero
{
    #colorPelo;
    #genero;
    // sobrecarga de constructores en js
    static getInstance(colorPelo,genero)
    {
        let f = new Mamifero();
        f.setColorPelo(colorPelo);
        f.setGenero(genero);
        return f;
    }
    static getInstance(genero)
    {
        let f = new Mamifero();
        f.setGenero(genero);
        return f;
    }
    
    reproducirse() { console.log('yo me reproduzco');}

    getColorPelo() { return this.#colorPelo; };
    setColorPelo(colorPelo) { this.#colorPelo = colorPelo; }
    setGenero() { return this.#genero; }
    setGenero(genero) { this.#genero = genero; }

}
class Gato extends Mamifero
{
    maullar(){ console.log('yo maullo'); }

}

let gato = Gato.getInstance();
gato.setColorPelo('negro');
console.log(gato.getColorPelo());
gato.maullar();