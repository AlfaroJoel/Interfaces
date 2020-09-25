const FICHA_SIZE = 73;
const RADIO = 37;

class Ficha{

    constructor(ctx, urlimage, player) {
        this.ctx = ctx;
        this.player = player; // objeto
        this.urlimage = urlimage;
        this.image = new Image();
        this.pos = {x: 0, y: 0};
        this.posArc = {x: 0, y: 0};
        this.select = false;
        this.usada = false;
        this.numeroJugador = player.getNumero(); // seria el numero del jugador (1 o 2) xd
    }

    getSizeFicha(){
        return FICHA_SIZE;
    }

    getUsada(){
        return this.usada;
    }

    isUsed(){
        this.usada = true;
    }

    getNumeroJugador(){
        return this.numeroJugador;
    }

    getPlayer(){
        return this.player;
    }

    getPositionArc(){
        return this.posArc;
    }

    getPosition(){
        return this.pos;
    }

    Selected(bool){
        this.select = bool;
    }

    isSelect(){
        return this.select;
    }

    setPositions(posX, posY){
        this.pos.x = posX;
        this.pos.y = posY;

        //la imagen es cuadrada
        this.posArc.x = posX + (FICHA_SIZE/2);
        this.posArc.y = posY + (FICHA_SIZE/2);
    }

    drawFicha(){
        this.draw(this.pos.x, this.pos.y);
    }

    draw(posX, posY){
        
        this.setPositions(posX, posY);

        this.ctx.beginPath();

        this.ctx.arc(this.posArc.x, this.posArc.y+1, RADIO, 0 , 2 * Math.PI); // un pixel en Y, error en la imagen de la ficha
        if(this.image.src === ""){
            this.image.src = this.urlimage;
            let cargarImg = function(){
                this.ctx.drawImage(this.image, this.pos.x, this.pos.y, FICHA_SIZE, FICHA_SIZE);
            }
            this.image.onload = cargarImg.bind(this);
        }else{
            this.ctx.drawImage(this.image, this.pos.x, this.pos.y, FICHA_SIZE, FICHA_SIZE);
        }

        this.ctx.closePath();
        if(this.select === true){
            this.ctx.strokeStyle = "#262626";
            this.ctx.lineWidth = 7;
            this.ctx.stroke();
        }
    }

    isClicked(mousex, mousey){
        let _x = this.posArc.x - mousex;
        let _y = this.posArc.y - mousey;
        return (Math.sqrt(_x * _x + _y * _y) < RADIO);
    }


}



