/** Crear / conectar bbdd */
let database = new PouchDB('temperaturaMarte');

window.onload = function(){

	function mostrar() {
		document.getElementById("sidebar").style.width = "300px";
		document.getElementById("contenido").style.marginLeft = "300px";
		document.getElementById("abrir").style.display = "none";
		document.getElementById("cerrar").style.display = "block";
	}
	
	function ocultar() {
		document.getElementById("sidebar").style.width = "0";
		document.getElementById("contenido").style.marginLeft = "0";
		document.getElementById("abrir").style.display = "block";
		document.getElementById("cerrar").style.display = "none";
	}


	fetch(`https://mars-weather-rems.netlify.app/rems.json`)
		.then(data => {
			return data.json();
		})
		.then(data => {
			let cajaTemperatura = document.querySelector(".container_temperaturas");
			data.weather_report.magnitudes.forEach(function () {
				let temp2 = `
				<div class="temperaturaPrevision">
					<h3 class="icono" ><i class="fas fa-temperature-high"></i></h3>	
					<h4>${data.weather_report.magnitudes[0].max_temp}max.</h4>
					<h4>${data.weather_report.magnitudes[0].min_temp}min.</h4>  
				</div>
				<span class="borde"></span>
				<div class="temperatura_aire">
					<h3 class="icono"><i class="fas fa-clock"></i></h3>
					<h4>${data.weather_report.magnitudes[0].sunrise} salida</h4>
					<h4>${data.weather_report.magnitudes[0].sunset} puesta</h4>
				</div>
				<span class="borde"></span>
				<div class="temperatura_suelo">
					<h3 class="icono"><i class="fas fa-mountain"></i></h3>
					<h4>${data.weather_report.magnitudes[0].max_gts_temp}max.</h4>
					<h4>${data.weather_report.magnitudes[0].min_gts_temp}min.</h4>
				</div`;
					cajaTemperatura.innerHTML += temp2;
			});
			console.log(data.weather_report.terrestrial_date[0]);

			let cajaHora = document.querySelector(".reloj");
			data.weather_report.terrestrial_date.forEach(function () {
				let hora = `
				<div class="marte_hour">
				<div class="reloj">
				<p id="horas" class="horas">${data.weather_report.terrestrial_date[0]}</p>
					</div>

				</div>
				</div>`;
				cajaHora.innerHTML += hora;

				let cajaSol = document.querySelector("#sol");
				data.weather_report.sol.forEach(function () {
					let sumMars = `
						<h2>Sol</h2>
						<div id="sol">${data.weather_report.sol[0]}</div>
						`;
					cajaSol.innerHTML += sumMars;

				});
			});

				
		});
		
		let temp;

		

		/** Pintar la lista de usuarios */
		//renderTemperatura();

		/** Escuechar eventos de los botones */
		let btnAdd = document.querySelector("#add");
		btnAdd.addEventListener("click", addData, false);

		/** Función para añadir usuarios */
		function addData() {
			if (confirm("¿Quiere guardar los datos actuales de Marte?")) {
				let cajaTemperaturas = document.querySelector(".container_temperaturas");
	
				if (cajaTemperaturas.innerHTML != "") {

					var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
					var momentoActual  = new Date();

					// Añadir registro a la BBDD
					let objetoQueVamosAGuardarEnBD = {
						"_id": `${momentoActual.toLocaleString()}`,
						"fecha": `${momentoActual.toLocaleString()}`,
						"cajaInformacion": cajaTemperaturas.innerHTML,
					 };
					database.put(objetoQueVamosAGuardarEnBD);
				};
			}
		};


		

};