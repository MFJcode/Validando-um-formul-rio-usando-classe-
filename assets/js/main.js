
class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
        this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos()
    }

    camposSaoValidos() {
        let valid = true;

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            if(!campo.value) {
                this.criaErro(campo, 'Campo tal não pode estar em branco')

            }
        }
    }
}




const valida = new ValidaFormulario();