/** Crear conectar bbdd */
let database = new PouchDB('temperaturaMarte');


function borrarDatoHistorico(fechaDatoAborrar) {

    if (confirm("¿Está seguro de borrar el histórico para la fecha: " +  fechaDatoAborrar + "?")) {
        var elementoABorrar = document.getElementById(fechaDatoAborrar);
        if (elementoABorrar) {
            debugger;
            // Borramos el elemento de la base de datos
            database.get(fechaDatoAborrar).then(function(datoHistorico) {
                debugger;
                database.remove(datoHistorico);
                // Borramos el elemento del HTML
                elementoABorrar.remove();
              }).catch(function (err) {
                console.log(err);
                alert("Error desconocido al borrar el histórico")
              });

        }
    }
}


window.onload = function () {


    const closeModal = document.getElementById('close_modal');
    const modal = document.getElementById('modal');


    function close() {
        modal.style.display = "none";
        // fondoModal.style.display = "none";
    };

    function open() {
        modal.style.display = "block";
        // fondoModal.style.display = "block";
    };

    closeModal.addEventListener('click', close);



    // Recuperamos la información de la base de datos
    database.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        // Pintar la información recuperada
        let cajaTemperatura = document.getElementById("datosHistoricos");
        if (result && result.total_rows && result.total_rows > 0) {

            for (i = 0; i < result.total_rows; i++) {
                let cajaTemperaturaDeUnaFechaEspecifica = `
				    <div id="${result.rows[i].doc.fecha}" class="container_temperaturas">
                            ${result.rows[i].doc.cajaInformacion}
                        
                        <span class="borde"></span>
                        <div class="temperatura_aire">
                            <h3 class="icono"><i class="fas fa-calendar-alt"></i></h3>
                            <h4>${result.rows[i].doc.fecha}</h4>
                        </div> 
                        <span class="borde"></span>
                        <div class="temperatura_aire">
                            <h3 class="icono"><i class="fas fa-edit"></i></h3>
                            <h4><button onclick="borrarDatoHistorico('${result.rows[i].doc.fecha}')"><h4 class="icono"><i class="fas fa-trash"></i></h4></button></h4>
                        </div>
                     </div>`;

                     
                cajaTemperatura.innerHTML += cajaTemperaturaDeUnaFechaEspecifica;

            }

        } else {
            cajaTemperatura.innerHTML += `<div>No hay datos almacenados todavía</div>`;
        }

    }).catch(function (err) {
        console.log(err);
    });



   

};