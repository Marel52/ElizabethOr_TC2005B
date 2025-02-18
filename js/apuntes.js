// arreglos
//No se cambia la referencia a la memoria, sino el valor asociado a esa referencia de memoria 
const arreglo = ["Elemento"];

const arreglo2 = new Array()

arreglo.push ("Otro elemento");

arreglo[10] = "Uno más";

arreglo [0] = "Elemento modificado";

//arreglos asociativos

arreglos["uno"] = 1; 

//Recorrido tradicional de arreglo
for (i = 1; i < arreglo.length; i++){
    console.log(arreglo[i]);
}

//OBJETOS
/*Declarar un objeto | Un objeto es una colección  */
/*Objetos dinámicos */
const objeto = {};

objeto.color = "verde";
objeto.tipo = "Orquidea";

//COMPORTAMIENTOS
/*Modificar HTML*/
/*En HTML se vería: <button id="boton_regar" class="button is-danger">Regar</button> */
const boton = document.getElementById("boton_regar");
console.log(boton);

boton.onclick = () => {
    console.log("click");
};

/*Recuperar imagen*/
boton.onclick = () =>{
    const imagen = document.getElementById("imagen_menta");
    imagen.innerHTML = `<img alt = "Foto de una planta de menta" src= "link"`
};

/*Cambiar de comportamiento a un botón*/
const poner_imagen_menta = () => {
    const imagen = document.getElementById("imagen_menta");
    imagen.innerHTML = `<img alt = "Foto de una planta de menta" src= "link"`
};

boton.onclick = poner_imagen_menta;




