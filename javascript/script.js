const selected_image = document.querySelectorAll(".nav_link");   

selected_image.forEach((element) => {
    element.addEventListener("mouseover", () => {
        element.classList.add("bounce");
        setTimeout(() => {
            element.classList.remove("bounce");
        }, 500);
    });
});