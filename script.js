const modeButton = document.getElementById("mode");
const languageButton = document.getElementById("language");
const nav = document.querySelector("nav");

const savedTheme = localStorage.getItem("theme");
let currentLanguage = "ka";

const translations = {
    en: {
        pageTitle: "Nikusha Avsajanishvili — Portfolio",
        navAbout: "About Me",
        navSkills: "Skills / Technologies",
        navProjects: "Projects",
        navContact: "Contact",
        firstName: "Nikusha",
        lastName: "Avsajanishvili",
        introTagline: "Full-stack Developer — <span>Web Applications</span>, <span>Scripting</span> and <span>Automation.</span>",
        portraitAlt: "My portrait",
        aboutTitle: "About Me",
        aboutLead: "I build practical and scalable web applications.",
        aboutIntro: "I'm Nikusha Avsajanishvili, a third-year Computer Science student. My main interests are web development, scripting, and automation.",
        aboutDescription: "I became interested in programming when I realized I could turn my ideas into reality with code. Since then, I've been learning and building projects that combine frontend and backend technologies. I'm particularly interested in automating repetitive tasks and using technology to solve real-world problems.",
        skillsTitle: "Programming Languages and Web Technologies",
        toolsTitle: "Frameworks and Tools",
        contactTitle: "Get in Touch",
        languageButton: "ქართული",
        languageLabel: "Switch language to Georgian"
},
    ka: {
        pageTitle: "ნიკუშა ავსაჯანიშვილი — პორტფოლიო",
        navAbout: "ჩემ შესახებ",
        navSkills: "უნარები / ტექნოლოგიები",
        navProjects: "პროექტები",
        navContact: "კონტაქტი",
        firstName: "ნიკუშა",
        lastName: "ავსაჯანიშვილი",
        introTagline: "Full-stack დეველოპერი — <span>ვებაპლიკაციები</span>, <span>სკრიპტინგი</span> და <span>ავტომატიზაცია.</span>",
        portraitAlt: "ჩემი პორტრეტი",
        aboutTitle: "ჩემ შესახებ",
        aboutLead: "ვქმნი პრაქტიკულ და მასშტაბირებად ვებ აპლიკაციებს.",
        aboutIntro: "მე ვარ ნიკუშა ავსაჯანიშვილი, კომპიუტერული მეცნიერების მესამე კურსის სტუდენტი. ჩემი ძირითადი ინტერესებია ვებდეველოპმენტი, სკრიპტინგი და ავტომატიზაცია.",
        aboutDescription: "პროგრამირება იმან დამაინტერესა, რომ კოდის დახმარებით საკუთარი იდეების რეალობად ქცევა შემეძლო. მას შემდეგ ვსწავლობ და ვქმნი პროექტებს, რომლებიც აერთიანებს ფრონტენდისა და ბექენდის ტექნოლოგიებს. განსაკუთრებულად მაინტერესებს განმეორებადი პროცესების ავტომატიზაცია და ტექნოლოგიების გამოყენებით რეალური პრობლემების გადაჭრა.",
        skillsTitle: "პროგრამირების ენები და ვებ ტექნოლოგიები",
        toolsTitle: "ფრეიმვორკები და ხელსაწყოები",
        contactTitle: "დამიკავშირდით",
        languageButton: "English",
        languageLabel: "ენის ინგლისურად შეცვლა"
    }
};

document.body.classList.toggle("light", savedTheme === "light");
applyLanguage(currentLanguage);
updateModeButton();

modeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    updateModeButton();
});

languageButton.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ka" : "en";
    applyLanguage(currentLanguage);
});

function applyLanguage(language) {
    const languageTranslations = translations[language];

    document.documentElement.lang = language;
    document.title = languageTranslations.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.innerHTML = languageTranslations[element.dataset.i18n];
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        element.alt = languageTranslations[element.dataset.i18nAlt];
    });

    languageButton.textContent = languageTranslations.languageButton;
    languageButton.setAttribute("aria-label", languageTranslations.languageLabel);
    updateModeButton();
}

function updateModeButton() {
    const isLight = document.body.classList.contains("light");

    modeButton.textContent = isLight ? "Dark" : "Light";
    modeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to gray theme"
    );
}


// Navbar scroll effect
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
});
