const mode = document.getElementById("mode");

mode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    mode.textContent = document.body.classList.contains("dark")
      ? "Light"
      : "Dark";

});

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
});

// changing text
const typingText = document.querySelector('.typed-text');
const texts = [
    'Bash/Python Scripting',
    'Automation & Web Scraping',
    'Full-Stack developer',
    'Web Fundamentals'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

