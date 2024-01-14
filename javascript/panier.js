const panier_items = document.querySelector('.panier_items');



if (!localStorage.getItem("current_money")) {
    localStorage.setItem("current_money", 250);
}

if (!localStorage.getItem("bought_pokemon")) {
    localStorage.setItem("bought_pokemon", JSON.stringify([]));
}

if (!localStorage.getItem("total_price")) {
    localStorage.setItem("total_price", 0);
}


let current_money = document.querySelector('.solde');
current_money.innerHTML = `Solde : ${parseFloat(localStorage.getItem("current_money"))}€`;



const list = document.querySelector('.list');
const total = document.querySelector('.total');
let total_price = 0;

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
            prix = parseFloat((moyenne * 0.5).toFixed(2));

            const supprButton = document.createElement('button');
            supprButton.classList.add('supprButton');
            supprButton.innerHTML = "Supprimer";

            pokemonInfo.innerHTML = `<img src="${data.sprites.front_default}" alt="pokeball">
            <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
            <div class="pokemon_decision">
            <h2>Prix : ${prix}€</h2>
            </div>`;

            total_price += parseFloat((prix).toFixed(2));
            total_price = parseFloat((total_price).toFixed(2));
            localStorage.setItem("total_price", total_price);

            const pokemonDecision = pokemonInfo.querySelector(".pokemon_decision");
            pokemonDecision.appendChild(supprButton);

            panier_items.appendChild(pokemonInfo);


            const pokemon_shopping = document.createElement('div');
            pokemon_shopping.classList.add('pokemon_shopping');

            pokemon_shopping.innerHTML = `<p> <b>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</b> - ${prix}€</p>`;

            list.appendChild(pokemon_shopping);

            total.innerHTML = `Total : ${total_price}€`;

            supprButton.addEventListener('click', () => {
                panier_items.removeChild(pokemonInfo);
                list.removeChild(pokemon_shopping);
                total_price -= prix;
                localStorage.setItem("total_price", total_price);
                total.innerHTML = `Total : ${total_price}€`;
                localStorage.setItem("reservation_list", JSON.stringify(listeReservation.filter(pokemon => pokemon !== data.name)));
                location.reload();
            });
        })


        .catch(error => console.error('Error:', error));
        });
}

console.log(localStorage.getItem("total_price"));

const buy = document.querySelector('.to_pay_button');

buy.addEventListener('click', () => {
    if (parseFloat(localStorage.getItem("total_price")) <= parseFloat(localStorage.getItem("current_money"))) {
        let listePokemon = JSON.parse(localStorage.getItem("bought_pokemon"));
        let listeReservation = JSON.parse(localStorage.getItem("reservation_list"));

        listeReservation.forEach(pokemonReserved => {
            listePokemon.push(pokemonReserved);
        });

        localStorage.setItem("bought_pokemon", JSON.stringify(listePokemon));
        localStorage.setItem("current_money", localStorage.getItem("current_money") - localStorage.getItem("total_price"));
        localStorage.setItem("reservation_list", JSON.stringify([]));
        localStorage.setItem("total_price", 0);

        location.reload();
    } else {
        alert("Vous n'avez pas assez d'argent pour acheter ces pokémons");
    }
});