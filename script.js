let apiUrl3 = `https://pokeapi.co/api/v2/pokemon/1`;
  
fetch(apiUrl3)
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
    })
    .then(data => {
    console.log(data)
    selected_image.src = data.sprites.front_default
    nom.innerHTML = data.name
    error_text.innerHTML = ""
    })
    .catch(error => {
    console.error("AAAAAAAAH ... ce pokemon n'existe pas !");
    selected_image.src = ""
    nom.innerHTML = ""
    error_text.innerHTML = "AAAAAAAAH ... ce pokemon n'existe pas !"
    });