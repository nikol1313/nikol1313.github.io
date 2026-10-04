const modeButton = document.getElementById("mode");
const nav = document.querySelector("nav");




const savedTheme = localStorage.getItem("theme");

document.body.classList.toggle("light", savedTheme === "light");

updateModeButton();

modeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    updateModeButton();
});

function updateModeButton() {
    const isLight = document.body.classList.contains("light");

    modeButton.textContent = isLight ? "Dark" : "Light";
    modeButton.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to gray theme");
}


// Navbar scroll effect
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
});
