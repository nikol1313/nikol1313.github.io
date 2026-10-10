const modeButton = document.getElementById("mode");
const languageButton = document.getElementById("language");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");
const pageSections = Array.from(document.querySelectorAll("main > section"));
const pageLinks = Array.from(document.querySelectorAll(".navigation a"));

const savedTheme = localStorage.getItem("theme");
let currentLanguage = "ka";

const translations = {
    en: {
        pageTitle: "Nikusha Avsajanishvili — Portfolio",
        navHome: "Home",
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
        projectsTitle: "Projects",
        projectsEmpty: "More projects will be added here soon.",
        languageButton: "ქართული",
        languageLabel: "Switch language to Georgian",
        menuOpenLabel: "Open navigation menu",
        menuCloseLabel: "Close navigation menu"
},
    ka: {
        pageTitle: "ნიკუშა ავსაჯანიშვილი — პორტფოლიო",
        navHome: "მთავარი",
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
        projectsTitle: "პროექტები",
        projectsEmpty: "პროექტები მალე დაემატება.",
        languageButton: "English",
        languageLabel: "ენის ინგლისურად შეცვლა",
        menuOpenLabel: "ნავიგაციის მენიუს გახსნა",
        menuCloseLabel: "ნავიგაციის მენიუს დახურვა"
    }
};

document.body.classList.toggle("light", savedTheme === "light");
applyLanguage(currentLanguage);
updateModeButton();
const initialSection = document.getElementById(window.location.hash.slice(1)) || document.getElementById("intro");
setCurrentSection(initialSection.id);

if (initialSection.id !== "intro") {
    initialSection.scrollIntoView({ behavior: "auto", block: "start" });
}

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

menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");
    menuToggle.textContent = isOpen ? "×" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        translations[currentLanguage][isOpen ? "menuCloseLabel" : "menuOpenLabel"]
    );
});

pageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const sectionId = link.hash.slice(1);
        const section = document.getElementById(sectionId);

        if (!section) {
            return;
        }

        if (window.location.hash !== `#${sectionId}`) {
            window.history.pushState(null, "", `#${sectionId}`);
        }

        section.scrollIntoView({ behavior: "auto", block: "start" });
        setCurrentSection(sectionId);
        closeMenu();
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("menu-open")) {
        closeMenu();
        menuToggle.focus();
    }
});

window.addEventListener("popstate", () => {
    const sectionId = window.location.hash.slice(1) || "intro";
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "auto", block: "start" });
    setCurrentSection(sectionId);
});

const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleSection) {
        setCurrentSection(visibleSection.target.id);
    }
}, { threshold: [0.15, 0.35, 0.6] });

pageSections.forEach((section) => sectionObserver.observe(section));

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
    menuToggle.setAttribute(
        "aria-label",
        translations[currentLanguage][nav.classList.contains("menu-open") ? "menuCloseLabel" : "menuOpenLabel"]
    );
    updateModeButton();
}

function setCurrentSection(sectionId) {
    pageLinks.forEach((link) => {
        if (link.hash === `#${sectionId}`) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function closeMenu() {
    nav.classList.remove("menu-open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", translations[currentLanguage].menuOpenLabel);
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
