document.addEventListener('DOMContentLoaded', function () {

    let canvas = document.querySelector("#mycanvas");

    let game = new Juego(canvas, 1);

    game.newGame();

    canvas.addEventListener("mousedown",  function(e){
        game.onMouseDown(e);
        canvas.addEventListener("mousemove",  moveMouse, false);
    });
    canvas.addEventListener("mouseup", function(e){
        game.isClickedTablero(e.layerX, e.layerY);
        canvas.removeEventListener("mousemove", moveMouse, false);
        game.fotograma();
    });

    function moveMouse(e){
        game.onMouseMove(e);
    }
    

});