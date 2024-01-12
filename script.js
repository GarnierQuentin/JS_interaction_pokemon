const selected_image = document.querySelectorAll(".nav_link");   

selected_image.forEach((element) => {
    element.addEventListener("mouseover", () => {
        element.classList.add("bounce");
        setTimeout(() => {
            element.classList.remove("bounce");
        }, 500);
    });
});

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

            const pokemon = document.createElement('div');
            pokemon.innerHTML = `<div class="pokemon">
            <h1>${data.name}</h1>
            <p>Type(s) :</p>
            <ul>
            ${data.types.map(type => `<li>${type.type.name}</li>`).join('')}
            </ul>
            <img src="${data.sprites.front_default}" alt="pokeball">
            ${data.stats.map(element => `<p>${element.stat.name} : ${element.base_stat}</p>`).join('')}
            <button>Ajouter au panier</button>
            </div>`;

            pokemons.appendChild(pokemon);
        })

        .catch(error => {
        console.error(error);
        });
    });
    })

    .catch(error => {
    console.error(error);
    });

