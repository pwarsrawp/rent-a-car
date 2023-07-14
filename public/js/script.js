const menuButton = document.getElementById('menu-button')
const menu = document.getElementById('menu')

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("rent-a-car JS imported successfully!");
});


menuButton.addEventListener("click", () => {
  if (menuButton.classList.contains("fa-bars")) {
    menuButton.classList.remove("fa-bars");
    menuButton.classList.add("fa-xmark");
    menu.style.display = "flex"

  } else {
    menuButton.classList.add("fa-bars");
    menuButton.classList.remove("fa-xmark");
    menu.style.display = "none"
    menu.appendChild("<li>aaaa</li>")
  }  
});
