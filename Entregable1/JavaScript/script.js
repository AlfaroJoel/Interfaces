
document.addEventListener('DOMContentLoaded', function () {

    let canvas = document.querySelector('#mycanvas');
    let ctx = canvas.getContext('2d');
    let input;

    let image;

    let width;
    let height;

    let r = 0;  ///////SI, TALVEZ TENGO DEMASIADAS VARIABLES GLOBALES, PERO ES QUE NECESITO A TODAS :(
    let g = 0;
    let b = 0;
    let a = 255;

    let filterActive = false;

    let imageData;
    let imageRestore;

    canvas.width = innerWidth - 30;
    canvas.height = innerHeight - 75;

    let mousePos = { x: 0, y: 0 };

    let sizePencil = 7;


    //CODIGO PARA DIBUJAR.... si haces click derecho y luego en cualquier parte del canvas, click izquierdo, se dibuja una linea recta(menos en firefox :(  )

    canvas.addEventListener('mousemove', function (e) {
        mousePos.x = e.clientX - 15,
        mousePos.y = e.clientY - 52;
    });

    let select = document.querySelector('#palet');
    select.addEventListener('change', function () {
        ctx.strokeStyle = select.value;
    });

    function draw(){

        ctx.lineWidth = sizePencil;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        function paintOn() {
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
        }

        canvas.addEventListener('mousedown', function () {
            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            canvas.addEventListener("mousemove", paintOn, false);
        }, false);

        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', paintOn, false);
        }, false);
    }

    document.querySelector("#pencil").addEventListener('click', function () {
        ctx.strokeStyle = "#0DDEDE";
        draw();
    });

    document.querySelector('#eraser').addEventListener('click', function () {
        ctx.strokeStyle = "#FFFFFF";
        draw();
    })


    document.querySelector("#addSizePencil").addEventListener('click', function addSizePencil() {
        sizePencil += 2;
        ctx.lineWidth = sizePencil;
    });

    document.querySelector("#subSizePencil").addEventListener('click', function subSizePencil() {
        if (sizePencil > 3) {
            sizePencil -= 2;
            ctx.lineWidth = sizePencil;
        }
    });

    //FIN DE CODIGO PARA DIBUJAR

    scale = document.getElementById("zoom"); 
        scale.addEventListener("change", function (e) { 
            if(image){
                //canvas.style.transform = "scale(" + e.target.value + "," + e.target.value + ")" ;

                width = image.width + parseInt(e.target.value) * 3;
                height = image.height + parseInt(e.target.value) * 3;

                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, width, height);

                imageData = ctx.getImageData(0, 0, width, height);
                imageRestore = ctx.getImageData(0, 0, width, height);
                ctx.putImageData(imageData, 0, 0);
            }
        });

    //CODIGO PARA CARGAR IMAGEN

    document.querySelector("#addimage").addEventListener("click", function () {
        input = document.querySelector("#inputfile");
        input.click();

        scale.value = "35";

        input.onchange = function (e) {
            addImage(e);
        }
    });

    function addImage(e) {

        // getting a hold of the file reference
        let file = e.target.files[0];

        // setting up the reader
        let reader = new FileReader();
        reader.readAsDataURL(file); // this is reading as data url

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            let content = readerEvent.target.result; // this is the content!

            image = new Image();

            image.src = content;

            let div = 2;

            image.onload = function () {
                if (image.width > image.height && image.width > canvas.width) {
                    while(div < 10){
                        if((image.width / div) < canvas.width){
                            image.width = parseInt(image.width / div);
                            image.height = parseInt(image.height / div);
                            div = 11;
                        }
                        div++;
                    }
                } else {
                    if(image.height > canvas.height){
                        while(div < 10){
                            if((image.width / div) < canvas.width){
                                image.width = parseInt(image.width / div);
                                image.height = parseInt(image.height / div);
                                div = 11;
                            }
                            div++;
                        }
                    }
                }

                // draw image on canvas

                ctx.drawImage(this, 0, 0, image.width, image.height);
                

                // get imageData from content of canvas
                imageData = ctx.getImageData(0, 0, image.width, image.height);
                imageRestore = ctx.getImageData(0, 0, image.width, image.height);

                width = image.width;
                height = image.height;

                //imageRestore = imageData; ESTO NO FUNCIONA, ES UN OBJETO;
                ctx.putImageData(imageData, 0, 0);
            }
        }
    }

    //FIN DE CODIGO PARA CARGAR IMAGEN


    document.querySelector('#save').addEventListener('click', function () {
        // if (image){


            link = document.createElement('a');

            link.download = "Sin título";

            link.href = canvas.toDataURL("image/jpg");//usa la imagen del canvas
            
            link.click();

        
    });

    document.querySelector('#delete').addEventListener('click', function () {
        scale.value = "35";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imageData = null;
        imageRestore = null;
    });

    document.querySelector('#undo').addEventListener('click', function () {
        ctx.putImageData(imageRestore, 0, 0);
        imageData = ctx.getImageData(0, 0, width, height);
    });

    function comrpobarFiltro() {
        
        if (imageData) {
            if (!filterActive) {
                filterActive = true;
            }
            else {
                ctx.putImageData(imageRestore, 0, 0);
                imageData = ctx.getImageData(0, 0, width, height);
            }
        }
    }

    document.querySelector('#filterNegativo').addEventListener('click', function () {
        comrpobarFiltro();
        filtroNegativo();
    });

    document.querySelector('#filterBinarizacion').addEventListener('click', function () {
        comrpobarFiltro();
        filtroBinarizacion();
    });

    document.querySelector('#filterSepia').addEventListener('click', function () {
        comrpobarFiltro();
        filtroSepia();
    });

    document.querySelector('#filterLineas').addEventListener('click', function () {
        comrpobarFiltro();
        filtroLineasNegras();
    });

    document.querySelector('#filterBrillo').addEventListener('click', function () {
        let matriz = [
            [0.6, 0, 0],
            [0, 0.6, 0],
            [0, 0, 0.6]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    document.querySelector('#filterBlur').addEventListener('click', function () {
        let matriz = [
            [1 / 9, 1 / 9, 1 / 9],
            [1 / 9, 1 / 9, 1 / 9],
            [1 / 9, 1 / 9, 1 / 9]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    document.querySelector('#filterBordes').addEventListener('click', function () {
        let matriz = [
            [0, 1, 0],
            [1, -4, 1],
            [0, 1, 0]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    document.querySelector('#filterEnfoque').addEventListener('click', function () {
        let matriz = [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    document.querySelector('#filterRepujado').addEventListener('click', function () {
        let matriz = [
            [-2, -1, 0],
            [-1, 1, 1],
            [0, 1, 2]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    document.querySelector('#filterBordes2').addEventListener('click', function () {
        let matriz = [
            [1, 1, 2],
            [1, 0, -1],
            [-2, -1, -1]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    document.querySelector('#filterBordes3').addEventListener('click', function () {
        let matriz = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    document.querySelector('#filterBordes4').addEventListener('click', function () {
        let matriz = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });
    document.querySelector('#filterBordes5').addEventListener('click', function () {
        let matriz = [
            [1, 1, -1],
            [1, -2, -1],
            [1, 1, -1]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });
    document.querySelector('#filterBordes6').addEventListener('click', function () {

        let matriz = [
            [1, -1, -1],
            [1, -2, -1],
            [1, 1, 1]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });
    document.querySelector('#filterBordes7').addEventListener('click', function () {
        let matriz = [
            [-1, -1, -1],
            [1, -2, 1],
            [1, 1, 1]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    document.querySelector('#filterBordes8').addEventListener('click', function () {
        let matriz = [
            [-1, -1, 1],
            [-1, -2, 1],
            [1, 1, 1]
        ];

        comrpobarFiltro();
        aplicarFiltro(matriz);
    });

    function getRed(imgData, x, y) {
        let index = (x + y * imgData.width) * 4;
        return imgData.data[index];
    }

    function getGreen(imgData, x, y) {
        let index = (x + y * imgData.width) * 4;
        return imgData.data[index + 1];
    }

    function getBlue(imgData, x, y) {
        let index = (x + y * imgData.width) * 4;
        return imgData.data[index + 2];
    }

    function setPixel(imgData, x, y, r, g, b, a) {
        let index = (x + y * imgData.width) * 4;
        imgData.data[index + 0] = r;
        imgData.data[index + 1] = g;
        imgData.data[index + 2] = b;
        imgData.data[index + 3] = a;
    }

    function filtroLineasNegras() {
        for (let x = 0; x < (imageData.height) * 2; x++) {
            for (let y = 0; y < imageData.width; y++) {
                if (x % 2 == 0) {
                    setPixel(imageData, x, y, 0, 0, 0, a);
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function filtroNegativo() {
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                index = (x + y * imageData.width) * 4;
                r = 255 - getRed(imageData, x, y);
                g = 255 - getGreen(imageData, x, y);
                b = 255 - getBlue(imageData, x, y);
                setPixel(imageData, x, y, r, g, b, a);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function filtroBinarizacion() {
        let index;
        let pixel;
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                index = (x + y * imageData.width) * 4;
                pixel = parseInt((getRed(imageData, x, y) + getGreen(imageData, x, y) + getBlue(imageData, x, y)) / 3);
                setPixel(imageData, x, y, pixel, pixel, pixel, a);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function filtroSepia() {
        let index;
        let pixel;
        for (let x = 0; x < imageData.width; x++) {
            for (let y = 0; y < imageData.height; y++) {
                index = (x + y * imageData.width) * 4;
                pixel = .3 * getRed(imageData, x, y) + .6 * getGreen(imageData, x, y) + .1 * getBlue(imageData, x, y);
                r = Math.min(pixel + 40, 255);
                g = Math.min(pixel + 15, 255);
                b = pixel;
                setPixel(imageData, x, y, r, g, b, a);
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function aplicarFiltro(matriz) {
        r = 0;
        g = 0;
        b = 0;

        for (let x = 1; x < imageData.width - 1; x++) {
            for (let y = 1; y < imageData.height - 1; y++) {
                promedioMatriz(x, y, matriz);
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function promedioMatriz(x, y, matriz) {
        r = getRed(imageRestore, x - 1, y - 1) * matriz[0][0] + getRed(imageRestore, x, y - 1) * matriz[0][1] + getRed(imageRestore, x + 1, y - 1) * matriz[0][2]
            + getRed(imageRestore, x - 1, y) * matriz[1][0] + getRed(imageRestore, x, y) * matriz[1][1] + getRed(imageRestore, x + 1, y) * matriz[1][2]
            + getRed(imageRestore, x - 1, y + 1) * matriz[2][0] + getRed(imageRestore, x, y + 1) * matriz[2][1] + getRed(imageRestore, x + 1, y + 1) * matriz[2][2];

        //indice = matriz.lenght - 2;
        //for(let i=0; i < matriz.lenght; i++)
        //  for(let j=0; j < matriz.lenght; j++)
        //      getGreen() * matriz[i][j]   ----- si j=0 -> x-1  -- si j=1 -> x -- si j=2 -> x+1
        //                                  ----- si i=0 -> y-1  -/- si i=1 -> y -/- si i=2 y+1

        g = getGreen(imageRestore, x - 1, y - 1) * matriz[0][0] + getGreen(imageRestore, x, y - 1) * matriz[0][1] + getGreen(imageRestore, x + 1, y - 1) * matriz[0][2]
            + getGreen(imageRestore, x - 1, y) * matriz[1][0] + getGreen(imageRestore, x, y) * matriz[1][1] + getGreen(imageRestore, x + 1, y) * matriz[1][2]
            + getGreen(imageRestore, x - 1, y + 1) * matriz[2][0] + getGreen(imageRestore, x, y + 1) * matriz[2][1] + getGreen(imageRestore, x + 1, y + 1) * matriz[2][2];

        b = getBlue(imageRestore, x - 1, y - 1) * matriz[0][0] + getBlue(imageRestore, x, y - 1) * matriz[0][1] + getBlue(imageRestore, x + 1, y - 1) * matriz[0][2]
            + getBlue(imageRestore, x - 1, y) * matriz[1][0] + getBlue(imageRestore, x, y) * matriz[1][1] + getBlue(imageRestore, x + 1, y + 1) * matriz[1][2]
            + getBlue(imageRestore, x - 1, y + 1) * matriz[2][0] + getBlue(imageRestore, x, y + 1) * matriz[2][1] + getBlue(imageRestore, x + 1, y + 1) * matriz[2][2];

        setPixel(imageData, x, y, r, g, b, a);
    }
});