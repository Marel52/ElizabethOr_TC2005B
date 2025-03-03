document.addEventListener('DOMContentLoaded', function() {

    const contrasena1= document.getElementById('password1');
    const contrasena2= document.getElementById('password2');
    const form= document.getElementById('passwordForm');

    const length= document.getElementById('length-req');
    const letter= document.getElementById('letter-req');
    const capital= document.getElementById('capital-req');
    const number= document.getElementById('number-req');
    const match= document.getElementById('match-req');
    const blank= document.getElementById('blank-req');
    const nulll= document.getElementById('null-req');

    const tieneEspacios= /\s/;
    const tieneLetra= /[A-Za-z]/;
    const tieneMayuscula= /[A-Z]/;
    const tieneNumero= /\d/;

    function validarContrasena() {
        const p1= contrasena1.value.trim();
        const p2= contrasena2.value.trim();

        if (p1.length >= 8) {
            length.className = 'valido';
        } else {
            length.className = 'invalido';
        }

        if (tieneLetra.test(p1)) {
            letter.className = 'valido';
        } else {
            letter.className = 'invalido';
        }

        if (tieneMayuscula.test(p1)) {
            capital.className = 'valido';
        } else {
            capital.className = 'invalido';
        }

        if (tieneNumero.test(p1)) {
            number.className = 'valido';
        } else {
            number.className = 'invalido';
        }

        if (tieneEspacios.test(p1)) {
            blank.className = 'invalido';
        } else {
            blank.className = 'valido';
        }

        if (p1 && p2) {
            nulll.className = 'valido';
        } else {
            nulll.className = 'invalido';
        }

        if (p1 === p2 && p1 !== "") {
            match.className = 'valido';
        } else {
            match.className = 'invalido';
        }
    }

    contrasena1.addEventListener('input', validarContrasena);
    contrasena2.addEventListener('input', validarContrasena);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validarContrasena();

        const requisitos = document.querySelectorAll('.requisitos li');
        let esValido = true;
        
        for (let i = 0; i < requisitos.length; i++) {
            if (requisitos[i].className !== 'valido') {
                esValido = false;
                break;
            }
        }

        if (esValido) {
            alert('¡Contraseña válida!');
            form.reset(); 
        } else {
            alert('Corrige los errores antes de enviar.');
        }
    });

    validarContrasena();
});