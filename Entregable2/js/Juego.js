
const PADDING = 35;

class Juego {

    constructor(canvas, turno) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.background = new Image();
        this.fichas = [];
        this.clickFicha = null;
        this.tablero = null;
        this.turnoDe = turno;
        this.tableroBig = false;
        this.player1 = null;
        this.player2 = null;
    }

    setTableroBig(){
        if(this.tableroBig)
            this.tableroBig = false;
        else{
            this.tableroBig = true;
        }
        this.tablero = null;
    }

    cambiarTurno(){
        if(this.turnoDe == 1){
            this.turnoDe = 2;
        }else{
            this.turnoDe = 1;
        }
    }

    clearCanvas(){
        this.ctx.fillStyle = "rgba(0,0,0,255)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground(){
        if(this.background.src === ""){
            this.background.src = "./images/Fondo.jpg";
            let cargarImg = function(){
                this.ctx.drawImage(this.background, 0, 0, 1366, 768);
            }
            this.background.onload = cargarImg.bind(this);
        }else{
            this.ctx.drawImage(this.background, 0, 0, 1366, 768);
        }
    }

    newGame(){
        this.fichas = []
        this.drawBackground();
        setTimeout(() => {
            this.drawTablero();
        }, 100);
        setTimeout(() => {
            if(this.player1 == null || this.player2 == null){
                this.getNames();
            }
        }, 150);
        setTimeout(() => {
            this.initFichas(); 
        }, 150); // para que carguen los jugadores
    }

    getNames(){
        let nombre1 = prompt("Ingrese el nombre del Jugador 1");
        let nombre2 = prompt("Ingrese el nombre del Jugador 2");

        if(nombre1 == null){
            this.player1 = new Jugador("Jugador 1", 1);
        }else{
            this.player1 = new Jugador(nombre1, 1);
        }
        if(nombre2 == null){
            this.player2 = new Jugador("Jugador 2", 2);
        }else{
            this.player2 = new Jugador(nombre2, 2);
        }
        this.drawTexts();
    }

    drawFichas(){
        for(let i = 0; i < this.fichas.length; i++){
            this.fichas[i].drawFicha();
        }
    }

    initFichas(){
        let ficha1;
        let ficha2;
        let posnewX = 20;
        let posnewY = 180;
        let fichasCreadas = 0;
        let casilleros = this.tablero.getCasilleros();
        while(fichasCreadas < casilleros){
            ficha1 = new Ficha(this.ctx, "./images/FichaRoja.png", this.player1, 1);
            ficha2 = new Ficha(this.ctx, "./images/FichaAmarilla.png", this.player2, 2);
            this.fichas.push(ficha1);
            this.fichas.push(ficha2);
            ficha1.draw(posnewX, posnewY);
            ficha2.draw(posnewX+1100, posnewY);
            fichasCreadas += 2;
            posnewX += 45;
            if(fichasCreadas % 8 == 0){
                posnewX = 20;
                posnewY += 55;
            }
        }
        this.tablero.initMatriz();
    }

    drawTablero() {
        if(this.tablero === null){
            if(this.tableroBig){
                this.tablero = new Tablero(this.canvas, "./images/Tablero9x6.jpg", 9);
            }else{
                this.tablero = new Tablero(this.canvas, "./images/Tablero.jpg", 7);
            }
        }
        this.tablero.draw();
    }

    drawTexts() {
        this.ctx.fillStyle = "#262626";
        if(this.player1 != null && this.player2 != null){
            if(this.turnoDe == 1){
                this.ctx.font='italic small-caps 300 20px arial';
                this.ctx.fillText("Turno de ", 40, 100);
            }
            else{
                this.ctx.font='italic small-caps 300 20px arial';
                this.ctx.fillText("Turno de ", 1140, 100);
            }
            this.ctx.font='italic small-caps 600 32px arial';
            this.ctx.fillText(this.player1.getNombre(), 40, 140);
            this.ctx.fillText(this.player2.getNombre(), 1140, 140);

            this.ctx.fillStyle = '#262626';
            this.ctx.font = 'Italic 20px Sans-Serif';
            this.ctx.fillText('-Cambiar tablero-', 345, 30);
            this.ctx.fillText('-Reiniciar-', 920, 30);
        }
    }

    findClickFicha(mousex, mousey){
        let find = false;
        let pos = 0;
        let ficha;
        while(!find && pos < this.fichas.length){
            ficha = this.fichas[pos];
            if(ficha.getNumeroJugador() == this.turnoDe && !ficha.getUsada() &&  ficha.isClicked(mousex,mousey)){
                this.clickFicha = ficha;
                ficha.Selected(true);
                find = true;
            }
            pos++;
        }
    }

    isClickedTablero(mousex, mousey){
        if((this.clickFicha != null) && (this.tablero.isClicked(mousex, mousey))){ // compruebo que se haya clickeado el tablero
            if(this.tablero.insertFicha(this.clickFicha, mousex)){ // compruebo que se puede insertar la ficha (que haya espacio en la columna)
                if(this.tablero.comprobar()){ //compruebo si hay un ganador
                    this.cambiarTurno();
                    this.endGame();
                }else{
                    this.clickFicha.isUsed();
                    this.clickFicha.Selected(false);
                    this.cambiarTurno();
                }
            }else{
                console.log("Columna llena")
            }
        }
    }

    endGame(){
        alert(this.clickFicha.getPlayer().getNombre() + " GANO EL JUEGO!!!");
        this.newGame();
    }

    onMouseMove(e){
        if(this.clickFicha != null){
            this.clickFicha.setPositions(e.layerX-PADDING, e.layerY-PADDING);
            this.fotograma();
        }
    }

    onMouseDown(event){
        if(this.clickFicha != null){
            this.clickFicha.Selected(false);
            this.clickFicha = null;
        }
        this.clickFeature(event.layerX, event.layerY);
        this.findClickFicha(event.layerX,event.layerY);
        this.fotograma();
    }

    clickFeature(_x, _y){
        if((_x > 340 && _x < 490 && _y > 12 && _y < 32)){//345 --- 930 x , 30 --- 30 y
            this.setTableroBig();
            this.newGame();
            this.fotograma();
        }else if(_x > 915 && _x < 1100 && _y > 12 && _y < 32){
            this.newGame();
        }
    }

    fotograma(){
        this.clearCanvas();
        this.drawBackground();
        this.drawTablero();
        this.drawTexts();
        this.drawFichas();
    }
}