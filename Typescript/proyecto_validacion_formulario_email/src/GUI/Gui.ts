import { validarCampos, botonEnviarIsEnabled } from '../Logic/validaciones'
export class Gui {

    public cursor: string;
    public color: string;

    public textarea_para: HTMLElement = document.querySelector('#para');
    public textarea_asunto: HTMLElement = document.querySelector('#asunto');
    public textarea_mensaje: HTMLElement = document.querySelector('#mensaje');
    public boton_enviar: HTMLElement = document.querySelector('#enviar')
    public mainElement: HTMLElement = document.querySelector('main');

    constructor() {
        this.initEvents();
    }

    private initEvents() {
        this.boton_enviar.addEventListener('mouseover', () => {
            //boton_enviar.style= `cursor: ${cursor}; background: ${color}; color: white`;
            this.boton_enviar.style.cursor = this.cursor;
            this.boton_enviar.style.background = this.color;
            this.boton_enviar.style.color = 'white';
        })
        this.boton_enviar.addEventListener('click', () => {
            if (botonEnviarIsEnabled) {
                alert('EMAI ENVIADO!')
            }
        })
        this.textarea_para.addEventListener('blur', validarCampos);
        this.textarea_asunto.addEventListener('blur', validarCampos);
        this.textarea_mensaje.addEventListener('blur', validarCampos);
    }
}