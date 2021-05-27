//ventana modal eliminar//

window.onload = function () {

    let API_KEY = '8frhMzKpGP9bakdBIfgCnH5samta4mur1Mk6hN09';
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${API_KEY}`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            // console.log(data.photos[0].img_src);
            // console.log(data.photos[1].img_src);
            // console.log(data);
            let caja = document.querySelector(".container_imagenes_save");
            data.photos.forEach(function () {
                let img = `<div class="marco">
                <div class="cerrar_imagen">
                    <button>
                    <i class="fas fa-trash-alt" id="basura"></i></button>
                </div>
                <img class="imagen1" src="${data.photos[1].img_src}">
            </div>`;
                caja.innerHTML += img;
            });
        });



    function ventanaModal() {
        const openModal = document.getElementById('basura'); 
        const closeModal = document.getElementById('close_modal');
        const modal = document.getElementById ('modal');
        
        
        function close(){
            modal.style.display = "none";
            // fondoModal.style.display = "none";
        };
        
        function open(){
            modal.style.display = "block";
            // fondoModal.style.display = "block";
        };
        
        
        openModal.addEventListener('click', open);
        closeModal.addEventListener('click'
        , close);

    };
};