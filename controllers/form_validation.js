// Valida el input y modifica su estilo a la clase correspondiente

export function valida(input) {
    const tipoInput = input.dataset.tipo;
    const btnEnviar = document.getElementById("submit") // definir por clase

    if(input.validity.valid){
        input.parentElement.classList.remove("input__invalido");
        input.parentElement.querySelector(".input__error").innerHTML = "";

        btnEnviar.addEventListener('click', () => {
            mensajeEnviado();
        })

    }  else {
        input.parentElement.classList.add("input__invalido");
        input.parentElement.querySelector(".input__error").innerHTML = mostrarMensajeError(tipoInput, input);
    }
}

// Declarando los tipos de errores y sus mensajes de error según el data-tipo

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Debe completar este campo",
        patternMismatch: "Debe contener entre 4 y 30 caracteres",
    },
    email: {
        valueMissing: "Debe completar este campo",
        typeMismatch: "El correo ingresado no es válido, el formato es example@email.com",
    },
    subject: {
        valueMissing: "Debe completar este campo",
        patternMismatch: "Debe contener entre 4 y 40 caracteres",
    },
};

// Función para mostrar el mensaje de error según corresponda

function mostrarMensajeError(tipoInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]) {
            mensaje = mensajesDeError[tipoInput][error];
        }
    })
    return mensaje;
} 