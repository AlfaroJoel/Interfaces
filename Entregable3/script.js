document.addEventListener('DOMContentLoaded', function () {
    let nav = document.querySelector(".nav");
    let fechaD = document.querySelector(".fechad");
    let fechaHr = document.querySelector(".fechahr");
    let sig = document.querySelector(".siguiente");
    let atras = document.querySelector(".atras");
    let galeria = document.querySelector(".galeria");
    let totalImgs = 4;
    let imgactual = 1;

    fechaEstreno();
    setInterval(fechaEstreno, 1000);

    window.onscroll = function(){
        let y = window.scrollY;
        if(y > 300){
            nav.style.height = 38 + "px";
            nav.style.paddingTop = 13 + "px";
            nav.style.fontSize = 17 + "px";
        }else if(y < 300){
            nav.style.height = 45 + "px";
            nav.style.paddingTop = 18 + "px";
            nav.style.fontSize = 20 + "px";
        }
    }

    function fechaEstreno(){
        let estreno = new Date(2020, 9, 30, 20, 16, 0);
        let hoy = new Date();
        let dif = estreno - hoy;
        let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        let horas = Math.floor((dif % 86400000) / 3600000);
        let minutos = Math.floor((dif / 60000) % 60);
        let seg = Math.floor(dif / 1000) % 60;
        fechaD.innerHTML =  dias + " DIAS";
        fechaHr.innerHTML = horas + ":" + minutos + ":" + seg;
    }
    
    sig.addEventListener('click', function(){
        siguienteImg();
    });

    atras.addEventListener('click', function(){
        anteriorImg();
    });

    function siguienteImg(){
        console.log("entresig");
        if(imgactual > totalImgs || imgactual == 0){
            imgactual = 1;
        }
        galeria.style.backgroundImage = "url(./Images/galeria"+ imgactual +".jpg)";
        imgactual++;
    }

    function anteriorImg(){
        console.log("entreant");
        if(imgactual > totalImgs || imgactual == 0){
            imgactual = totalImgs;
        }
        galeria.style.backgroundImage = "url(./Images/galeria"+ imgactual +".jpg)";
        imgactual--;
    }
});