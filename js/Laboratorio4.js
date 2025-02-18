window.alert("Aquí está mi laboratorio 4 :b  Att: Elizabeth" );

/*Ej. 1: Entrada: un número pedido con un prompt.
Salida: Una tabla con los números del 1 al número dado con sus cuadrados y cubos.*/
const boton1 = document.getElementById("ejercicio1");
boton1.onclick = () =>{
    ejercicio1();
};

const ejercicio1 = () => {
    let numero = prompt("Ingrese un número")
    numero = parseInt(numero);

    document.write("<table>");
    document.write("<tr><th>| Número | </th><th> Cuadrado(^2) |</th><th> Cubo(^3) | </th><tr/>");

    for(i = 1; i <= numero; i++){
        document.write("<tr>")
        document.write("<td>" + i + "</td>");
        document.write("<td>" + (i * i) + "</td>");
        document.write("<td>" + (i * i * i) + "</td>");
        document.write("</tr>");
    }

    document.write("</table>");
};


/*Ej. 2: Entrada: Usando un prompt se pide el resultado de la suma de 2 números generados de manera aleatoria. 
Salida: La página debe indicar si el resultado fue correcto o incorrecto, y el tiempo que tardó el usuario en escribir la respuesta.*/
const boton2 = document.getElementById("ejercicio2");
boton2.onclick = () =>{
    ejercicio2();
};

const ejercicio2 = () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const inicio = new Date().getTime();

    const respuesta = prompt(`Escribe el resultado de la suma: ${num1} + ${num2}`);
    const respuestaCorrecta = num1 + num2;
    const estaCorrecta = parseInt(respuesta) === respuestaCorrecta;

    const fin = new Date().getTime();

    const tiempoTotal = (fin - inicio)/1000;

    document.write("<p> Operación: " + num1 + " + " + num2 + " = " + respuestaCorrecta + "</p>");
    document.write("<p> Tiempo: " + tiempoTotal + " segundos</p>");
    document.write("<p> Tu respuesta: " + parseInt(respuesta) + "</p>");

    if (estaCorrecta){
        document.write("<p>¡Respuesta Correcta!</p>");
    }else{
        document.write("<p>Respuesta Incorrecta</p>");
    }    
};


/*Ej. 3:Función: contador. Parámetros: Un arreglo de números. 
Regresa: La cantidad de números negativos en el arreglo, la cantidad de 0's, y la cantidad de valores mayores a 0 en el arreglo. */
const boton3 = document.getElementById("ejercicio3");
boton3.onclick = () => {
    ejercicio3();
};

const contar = (arreglo) => {
    let negativos = 0;
    let ceros = 0;
    let positivos = 0;

    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] < 0) negativos += 1;
        else if (arreglo[i] === 0) ceros += 1;  
        else positivos += 1;
    }
    
    return {
        negativos: negativos,
        ceros: ceros, 
        positivos: positivos,
    };
};

const ejercicio3 = () => {
    const arreglo = [-3, -2, 0, 0, 9, 8, -33, 5, 7, -12, 0];
    const resultados = contar(arreglo);

    document.write("<p>Arreglo: [" + arreglo + "]</p>");
    document.write("<p>Negativos: " + resultados.negativos + "</p>");
    document.write("<p>Ceros: " + resultados.ceros + "</p>");
    document.write("<p>Positivos: " + resultados.positivos + "</p>");
};


/*Ej. 4: Función: promedios. Parámetros: Un arreglo de arreglos de números. 
Regresa: Un arreglo con los promedios de cada uno de los renglones de la matriz.*/
const boton4 = document.getElementById("ejercicio4");
boton4.onclick = () => {
    ejercicio4();
};

const promediar = (matriz) => {
    let promedios=[];

    for(let i = 0; i < matriz.length; i++){
        let suma = 0;

        for(let j = 0; j < matriz[i].length; j++){
            suma += matriz[i][j];
        }

        promedios.push(suma / matriz[i].length);
    }

    return promedios;
};

const ejercicio4 = () => {

    const matriz =[
        [2, 5, 6], 
        [1, 8, 14], 
        [7, 8, 10], 
    ]

    const resultado = promediar(matriz);

    document.write("<p><strong>Matriz original: </strong></p>");

    for (let i = 0; i < matriz.length; i++){
        document.write("<p>Arreglo " + (i+1) + ": [" + matriz[i] + "]</p>");
    }
    for (let i = 0; i < resultado.length; i++){
    document.write("<p><strong>Promedio "+ (i+1) + ":</strong> " + resultado[i] + "</p>")
    }
};


/*Ej. 5: Función: inverso. Parámetros: Un número.
Regresa: El número con sus dígitos en orden inverso.*/
const boton5 = document.getElementById("ejercicio5");
boton5.onclick = () => {
    ejercicio5();
};

const invertir = (numero) =>{
    let original =parseInt(numero);
    let inverso = 0;

    while (original > 0){
        const digito = original % 10;

        inverso = inverso * 10 + digito;

        original = Math.floor(original/10);
    }

    return inverso
    
};

const ejercicio5 = () =>{
    
    const numero = prompt("Ingresa un número para invertir");
    const resultado = invertir(numero);

    document.write("<p><strong>Número original: </strong>" + numero + "</p>");
    document.write("<p><strong>Número invertido: </strong>" + resultado + "</p>");
    
};


/*Ej. 6: Crea una solución para un problema de tu elección. Utilizando al menos la creación de un objeto, 
el objeto además de su constructor deben tener al menos 2 métodos.*/
const boton6 = document.getElementById("ejercicio6");
boton6.onclick = () => {
    ejercicio6();
};

class Calculadora{
    constructor(){
        this.historial = [];
    }

    suma(a, b){
        const resultado = a + b;
        this.historial.push(`${a} + ${b} = ${resultado}`);
        return resultado;
    }

    resta(a, b){
        const resultado = a - b;
        this.historial.push(`${a} - ${b} = ${resultado}`);
        return resultado;
    }

    verHistorial = () =>{
        return this.historial;
    };
}

const ejercicio6 = () =>{
    const nuevaCalculadora = new Calculadora();
    let resultados =[];

    let num1 = parseInt(prompt("Ingresa el primer número para la suma:"));
    let num2 = parseInt(prompt("Ingresa el segundo número para la suma:"));
    const suma1 = nuevaCalculadora.suma(num1, num2);
    resultados.push({tipo: "suma", num1, num2, resultado: suma1});

    num1 = parseFloat(prompt("Ingresa el primer número para la resta:"));
    num2 = parseFloat(prompt("Ingresa el segundo número para la resta:"));
    const resta1 = nuevaCalculadora.resta(num1, num2);
    resultados.push({tipo: "resta", num1, num2, resultado: resta1});

    document.write("<p><strong>Resultado de operaciones:</strong></p>");
    const resultado = nuevaCalculadora.verHistorial();

    for (let i = 0; i < resultado.length; i++) {
        document.write("<li>" + resultado[i] + "</li>");
    }

};