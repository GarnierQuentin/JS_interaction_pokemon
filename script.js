const selected_image = document.querySelectorAll(".nav_link");   

selected_image.forEach((element) => {
    element.addEventListener("mouseover", () => {
        element.classList.add("bounce");
        setTimeout(() => {
            element.classList.remove("bounce");
        }, 500);
    });
});

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
    })

    .catch(error => {
    console.error("AAAAAAAAH ... ce pokemon n'existe pas !");
    });

