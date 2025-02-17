/*Ej. 1: Entrada: un número pedido con un prompt.
Salida: Una tabla con los números del 1 al número dado con sus cuadrados y cubos.*/
function ejercicio1(){
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

    doument.write("<table>")
}

/*Ej. 2: Entrada: Usando un prompt se pide el resultado de la suma de 2 números generados de manera aleatoria. 
Salida: La página debe indicar si el resultado fue correcto o incorrecto, y el tiempo que tardó el usuario en escribir la respuesta._*/
function ejercicio2(){
    let resultado= prompt ("Escribe el resultado de la suma")

}