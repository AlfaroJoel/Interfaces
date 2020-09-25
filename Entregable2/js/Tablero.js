const FILAS = 6;
const EXTREMO_INFERIOR = 24; //Espacio que hay en el extremo inferior del tablero    
const ESPACIADO_COL = 18;// Espacio que hay entre ficha y ficha de columnas        O -18- O -18- O    O = FICHAS
const ESPACIADO_FIL = 17; // Espacio que hay entre ficha y ficha de filas  27
const ESPACIADO_EXTREMOS = 20; // Espacio que le saco a los extremos del tablero, no quiero que sean seleccionables
const ESPACIADO_CASILLEROS = 90; // Espacio que ocupa un casillero entero del tablero

class Tablero{

    constructor(canvas, urlimage, cols){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.fichas = new Array();
        this.image = new Image();
        this.urlimage = urlimage;
        this.lastPosInsert = {col: 0, fil: 0}; //posicion de la ultima ficha insertada en filas y columnas
        this.pos = {x: 0, y: 0};    //posicion en x e y de
        this.cols = cols; //cantidad de columnas que tiene el tablero
        this.lastPlayer = null; //ultimo jugador que inserto una ficha
    }

    initMatriz(){
        for(let i = 1; i <= this.cols; i++){
            this.fichas["col"+i] = [null,null,null,null,null,null]; 
            // las creo null para cuando pregunto si hay ficha no tire error y me ahorro de hacer el try catch
        }
    }

    insertFicha(ficha, mousex){
        this.lastPosInsert.col = this.selectCol(mousex);
        let col = this.lastPosInsert.col;
        let pos = 0;
        while(pos < FILAS){
            if(this.fichas["col"+col][pos] == null){
                this.lastPosInsert.fil = pos+1;
                this.pisitionFicha(ficha);
                this.fichas["col"+col].splice(pos,1, ficha); // reemplazo el lugar donde va la ficha
                this.lastPlayer = ficha.getNumeroJugador();
                return true;
            }
            pos++;
        }
        return false;
    }

    comprobar(){
        let col = this.lastPosInsert.col;
        let fil = this.lastPosInsert.fil;

        let ganador = false;

        ganador = this.comprobarColumnas(col);
        
        if(!ganador){
            ganador = this.comprobarFilas(fil);
        }
        if(!ganador){
            ganador = this.comprobarDiagonales(col, fil);
        }

        return ganador;
    }

    comprobarDiagonales(col, fil){
        let ganador = false;
        let posFil = fil;
        let posCol = col;

        ganador = this.comprobarDiagonalIzquierda(posCol, posFil-1);

        if(!ganador){
            ganador = this.comprobarDiagonalDerecha(posCol, posFil-1);
        }
        return ganador

    }

    comprobarDiagonalDerecha(posCol, posFil){
        let iguales = 1;

        while(posFil < FILAS-1 && posCol < this.cols){//voy a la posicion mas arriba de donde se puso la ficha
            posFil++;
            posCol++;
        }
        while(posFil > 0 && posCol > 1){//mientras no se vaya del tablero...
            if(this.fichas["col"+posCol][posFil] != null && this.fichas["col"+(posCol-1)][posFil-1] != null){
                if(this.fichas["col"+posCol][posFil].getNumeroJugador() === this.fichas["col"+(posCol-1)][posFil-1].getNumeroJugador()){
                    iguales++;
                    if(iguales == 4){
                        return true;
                    }
                }
                else{
                    iguales = 1;
                }
            }
            else{
                iguales = 1
            }
            posFil--;
            posCol--;
        }// si sale del while, quiere decir que no hay 4 iguales para la primer diagonal
        return false;
    }

    comprobarDiagonalIzquierda(posCol, posFil){
        let iguales = 1;

        while(posFil < FILAS-1 && posCol > 1){//voy a la posicion mas arriba de donde se puso la ficha
            posFil++;
            posCol--;
        }
        while(posFil > 0 && posCol < this.cols){//mientras no se vaya del tablero...
            if(this.fichas["col"+posCol][posFil] != null && this.fichas["col"+(posCol+1)][posFil-1] != null){
                if(this.fichas["col"+posCol][posFil].getNumeroJugador() === this.fichas["col"+(posCol+1)][posFil-1].getNumeroJugador()){
                    iguales++;
                    if(iguales == 4){
                        return true;
                    }
                }
                else{
                    iguales = 1;
                }
            }
            else{
                iguales = 1
            }
            posFil--;
            posCol++;
        }// si sale del while, quiere decir que no hay 4 iguales para la primer diagonal
        return false;
    }

    comprobarFilas(fil){
        let iguales = 1;
        let pos = 1;
        while(pos < this.cols){
            if(this.fichas["col"+pos][fil-1] != null && this.fichas["col"+(pos+1)][fil-1] != null){
                if(this.fichas["col"+pos][fil-1].getNumeroJugador() === this.fichas["col"+(pos+1)][fil-1].getNumeroJugador()){
                    iguales++;
                    if(iguales === 4){
                        return true;
                    }
                }else{
                    iguales=1;
                }
            }
            else{
                iguales=1;
            }
            pos++;
        }
        return false;
    }

    comprobarColumnas(col){
        let iguales = 1;
        let pos = 0;
        while(pos+1 < this.fichas["col"+col].length){
            if(this.fichas["col"+col][pos] != null && this.fichas["col"+col][pos+1] != null){
                if(this.fichas["col"+col][pos].getNumeroJugador() === this.fichas["col"+col][pos+1].getNumeroJugador()){
                    iguales++;
                    if(iguales === 4){
                        return true;
                    }
                }else{
                    iguales=1;
                }
            }
            else{
                iguales=1;
            }
            pos++;
        }
        return false;
    }

    getPosition(){
        return this.pos;
    }

    selectCol(mousex){
        let pos = 1;
        let seguir = true;
        if (mousex > this.pos.x + ESPACIADO_EXTREMOS && mousex < this.pos.x + this.image.width - ESPACIADO_EXTREMOS){
            while(seguir && pos <= this.cols){
                if(mousex < this.pos.x + ESPACIADO_EXTREMOS + ESPACIADO_CASILLEROS * pos){
                    seguir = false;
                    return pos;
                }else{
                    pos++;
                }
            }
        }
    }

    pisitionFicha(ficha){  // dada una columna y una fila, retorna en pixeles en donde se tiene que dibujar
        let posx = 0;
        let posy = 0;
        if(this.lastPosInsert.col == 1){
            posx = this.pos.x + ESPACIADO_EXTREMOS + 7;
        }else{
            posx = this.pos.x + ESPACIADO_EXTREMOS + 7 + (this.lastPosInsert.col - 1) * (ESPACIADO_COL + ficha.getSizeFicha());
        }
        if(this.lastPosInsert.fil == 1){
            posy = this.pos.y + this.image.height - ficha.getSizeFicha() - EXTREMO_INFERIOR; 
        }else{
            posy = this.pos.y + this.image.height - ficha.getSizeFicha() - EXTREMO_INFERIOR - + (this.lastPosInsert.fil - 1) * (ESPACIADO_FIL + ficha.getSizeFicha());;
        }
        ficha.setPositions(posx, posy);
    }

    draw(){
        if(this.image.src === ""){
            this.image.src = this.urlimage;
            let cargarImg = function(){
                this.pos.x = (this.canvas.width / 2) - (this.image.width / 2);
                this.pos.y = (this.canvas.height /2) - (this.image.height / 2) + 55;
                this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.image.width, this.image.height); //565 468
            }
            this.image.onload = cargarImg.bind(this);
        }else{
            this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.image.width, this.image.height); //565 468
        }
    }

    isClicked(mousex, mousey){
        return !(mousex < this.pos.x + 19 || mousex > this.pos.x + (this.image.width - 19) || mousey < this.pos.y || mousey > this.pos.y + this.image.height)
    }

    getCols(){
        return this.cols;
    }

    getCasilleros(){
        return this.cols * 6;
    }
}