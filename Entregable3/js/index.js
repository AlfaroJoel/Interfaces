document.addEventListener('DOMContentLoaded', function () {
    let estreno = document.querySelector(".estreno");
    let personajes = document.querySelector(".personajes");
    let fechaD = document.querySelector(".fechad");
    let fechaHr = document.querySelector(".fechahr");
    let sig = document.querySelector(".siguiente");
    let atras = document.querySelector(".atras");
    let galeria = document.querySelector(".galeria");
    let menu = document.querySelector(".menu");
    let nav = document.querySelector(".nav");
    let totalImgs = 4;
    let imgactual = 1;

    fechaEstreno();
    setInterval(fechaEstreno, 1000);



    window.onscroll = function(){
        let y = window.scrollY;
        if(y < 210){
            estreno.style.top = 300 + y + "px";
        }
        if(y > 1070){
            personajes.style.animation = "opacityCards 1s linear";
            personajes.style.opacity = 1;
        }else if(y < 880){
            personajes.style.animation = "";
            personajes.style.opacity = 0;
        }

        if(y > 300){
            menu.style.transform = "scale(0.7)";
            menu.style.top = "0";
            nav.style.height = "35px";
            nav.style.paddingTop = "13px";
            nav.style.fontSize = "17px";
        }else if(y < 300){
            menu.style.transform = "scale(1)"; 
            menu.style.top = "7px";
            nav.style.height = "45px";
            nav.style.paddingTop = "18px";
            nav.style.fontSize = "20px";
        }
    }

    function fechaEstreno(){
        let estreno = new Date(2020, 10, 10, 20, 30, 0);
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