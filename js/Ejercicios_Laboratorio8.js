const promediar = (numeros) =>{
    if(numeros.lenght === 0) return 0;
    const suma = numeros.reduce((resultado, val)=> resultado + val, 0);
    return suma / numeros.lenght;
};

const numeros =[];