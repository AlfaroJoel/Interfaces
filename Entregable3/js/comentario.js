document.addEventListener('DOMContentLoaded', function () {

    let form = document.querySelector(".form").childNodes;
    let btnComment = document.querySelector(".comentar");
    let check = false;

    btnComment.addEventListener("click", function(){
        if(form[3].value[0] == " " || form[3].value[0] == undefined || form[3].value[0] == ""){
            form[3].style.animation = "moveinput 0.7s linear";
            form[3].style.border = "2px solid red";
            check = false;
        }else{
            form[3].style.animation = "";
            form[3].style.border = "2px solid green";
            check = true;
        }
        if(form[7].value[0] == " " || form[7].value[0] == undefined || form[7].value[0] == ""){
            form[7].style.border = "2px solid red";
            form[7].style.animation = "moveinput 0.7s linear 0.8s";
            check = false;
        }else{
            form[7].style.animation = "";
            form[7].style.border = "2px solid green";
            check = true;
        }
        if(form[11].value[0] == " " || form[11].value[0] == undefined || form[11].value[0] == ""){
            form[11].style.border = "2px solid red";
            check = false;
        }else{
            form[11].style.border = "2px solid green";
            check = true;
        }

        if(check){
            btnComment.style.animation = "";
            form[15].innerHTML = "Comentario enviado con exito";
            form[15].style.color = "green";
            btnComment.style.animation = "bgcolorgreen 1s linear";
        }else{
            btnComment.style.animation = "";
            form[15].style.color = "red";
            form[15].innerHTML = "Por favor rellene los campos vacios";
            btnComment.style.animation = "bgcolorred 1s linear";
        }
    });
});