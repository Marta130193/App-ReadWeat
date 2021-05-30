

window.onload = function(){

	function fetchPokemon(id){
	fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then(data => {
			return data.json();
		})
		.then(data => {
			console.log(data);
			let cajaPokemon = document.querySelector(".pokemon-container");
			let htmlPokemon = `
					<article class="card">
						
						<div class="card-body">
						<img src="${data.sprites.front_default}"  class="card-header">
							<img src="" class="card-body-img">
							<h1 class="card-body-title">
								<p>${capitalizeFirstLetter(data.name)}</p>
								<span class="borde"></span>
							</h1>
							<p class="card-body-text"></p>
						</div>
						<div class="card-footer">
							<div class="habilidades">
								<h3>Peso ${data.weight} kg.</h3>
								<p>Ataque</p>
							</div>
							<div class="habilidades">
								<h3></h3>
								<p>Naturaleza</p>
							</div>
							<div class="habilidades">
								<h3></h3>
								<p>Nivel</p>
							</div>
						</div>
					</article>`;
			cajaPokemon.innerHTML += htmlPokemon;
			
		});
			
    };


	function capitalizeFirstLetter(texto) {
		if (texto) {
			return texto.charAt(0).toUpperCase() + texto.slice(1);
		} else {
			return "";
		}
	  }

	 function fetchPokemons(number){
	 	for (let i = 1; i<= number; i++) {
	 		fetchPokemon(i);
	 	}
	 };

	 fetchPokemons(12);
	
	// function createPokemonCard(pokemon){
	// 	const card = document.querySelector('.card');
	// 	card.classList.add('pokemon-block');
	// 	const spriteContainer
	// }

};

