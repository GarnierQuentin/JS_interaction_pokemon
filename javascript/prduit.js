
let apiUrl3 = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`;
const pokemons = document.querySelector('.pokemons');
  
fetch(apiUrl3)
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
    })
    
    .then(data => {
    data.results.forEach(element => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}`)
        
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        
        .then(data => {

            if (!localStorage.getItem("reservation_list")) {
                localStorage.setItem("reservation_list", JSON.stringify([]));
            }

            if (!localStorage.getItem("bought_pokemon")) {
                localStorage.setItem("bought_pokemon", JSON.stringify([]));
            }

            let moyenne = 0;
            let nbStats = 0;
            let prix = 0;
            data.stats.forEach(element => {
                moyenne += element.base_stat;
                nbStats++;
            });
            moyenne = moyenne / nbStats;
            prix = parseFloat((moyenne * 0.5).toFixed(2));

            if (!localStorage.getItem("reservation_list").includes(data.name) && !localStorage.getItem("bought_pokemon").includes(data.name)) {
                const pokemon = document.createElement('div');
                pokemon.innerHTML = `<div class="pokemon">
                <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
                <p>Type(s) :</p>
                <ul>
                ${data.types.map(type => `<li>${type.type.name}</li>`).join('')}
                </ul>
                <img src="${data.sprites.front_default}" alt="pokeball">
                ${data.stats.map(element => `<p>${element.stat.name} : ${element.base_stat}</p>`).join('')}
                <h2>Prix : ${prix}€</h2>
                </div>`;

                const reservationButton = document.createElement('button');
                reservationButton.classList.add('reservation_button');
                reservationButton.textContent = 'Ajouter au panier';
                reservationButton.href = '';

                pokemon.querySelector('.pokemon').appendChild(reservationButton);
                pokemons.appendChild(pokemon);

                reservationButton.addEventListener("click", () => {
                    let reservation_list = JSON.parse(localStorage.getItem("reservation_list"));
                    reservation_list.push(data.name);
                    localStorage.setItem("reservation_list", JSON.stringify(reservation_list));

                    location.reload();
                });
            }
        })

        .catch(error => {
        console.error(error);
        });
    });
    })

    .catch(error => {
    console.error(error);
    });