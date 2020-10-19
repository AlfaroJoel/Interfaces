document.addEventListener('DOMContentLoaded', function () {
    let body = document.querySelector("body");
    let spinner = document.querySelector("#spin");
    let container = document.querySelector("#container");

    setTimeout(cargar, 3000);

    function cargar(){
        body.style.height = "100vh";
        body.style.overflow = "visible";
        spinner.classList.remove("spinner");
        container.classList.remove("containerDiv");
    }
});