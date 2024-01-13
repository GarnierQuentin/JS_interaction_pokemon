const panier_items = document.querySelector('.panier_items');

if (localStorage.getItem("reservation_list")) {
    let listeReservation = JSON.parse(localStorage.getItem("reservation_list"));
    console.log(listeReservation);

    listeReservation.forEach(pokemonReserved => {
        const pokemonInfo = document.createElement('div');
        pokemonInfo.classList.add('pokemon_info');

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonReserved}`)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })

        .then(data => {
            let moyenne = 0;
            let nbStats = 0;
            let prix = 0;
            data.stats.forEach(element => {
                moyenne += element.base_stat;
                nbStats++;
            });
            moyenne = moyenne / nbStats;
            prix = Math.round((moyenne * 0.5)*100)/100;

            const checker = document.createElement('input');
            checker.type = 'checkbox';

            pokemonInfo.innerHTML = `<img src="${data.sprites.front_default}" alt="pokeball">
            <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
            <div class="pokemon_decision">
            <h2>Prix : ${prix}€</h2>
            </div>`;
            const pokemonDecision = pokemonInfo.querySelector(".pokemon_decision");
            pokemonDecision.appendChild(checker);

            panier_items.appendChild(pokemonInfo);
        })


        .catch(error => console.error('Error:', error));
        });
}