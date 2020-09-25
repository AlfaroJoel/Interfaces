class Jugador{

    constructor(nombre, numero){
        this.nombre = nombre;
        this.numero = numero;
    }

    getNombre(){
        return this.nombre;
    }

    getNumero(){
        return this.numero;
    }

    getTurno(){
        return this.turno;
    }
}