document.addEventListener('DOMContentLoaded', function () {

    let menu = document.querySelector(".menu");
    let nav = document.querySelector(".nav");

    window.onscroll = function(){
        let y = window.scrollY;

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


        if(y < 210){
            estreno.style.top = 300 + y + "px";
        }
    }
});