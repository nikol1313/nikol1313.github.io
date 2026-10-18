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
        introTagline: "Full-stack Developer — <span>Web Technologies</span>, <span>Software</span> and <span>Automation</span>",
        portraitAlt: "My portrait",
        aboutTitle: "About Me",
        aboutLead: "I build practical and scalable web applications.",
        aboutIntro: "I'm Nikusha Avsajanishvili, a third-year Computer Science student. My main interests are web development, scripting, and automation.",
        aboutDescription: "I became interested in programming when I realized I could turn my ideas into reality with code. Since then, I've been learning and building projects that combine frontend and backend technologies. I'm particularly interested in automating repetitive tasks and using technology to solve real-world problems.",
        aboutCardTitle: "A little about me",
        aboutCardSubtitle: "Beyond the code",
        aboutUniversity: "ALTE University / 3rd year",
        aboutField: "Computer Science",
        aboutLocation: "Tbilisi, Georgia",
        aboutDefaultMode: "Books and surfing the web",
        aboutForFun: "LeetCode & algorithm problems",
        aboutSkills: "Attention to detail · Communication · <span class=\"skill-phrase\">Research &amp; curiosity</span>",
        skillsTitle: "Skills & Technologies",
        skillsCoreTitle: "Languages & Frontend",
        skillsBackendTitle: "Backend & APIs",
        skillsDataTitle: "Databases & Caching",
        skillsDevopsTitle: "DevOps & Infrastructure",
        contactTitle: "Get in Touch",
        projectsTitle: "Projects",
        projectIphoneCategory: "Price tracking",
        projectIphoneTitle: "iPhone Price Tracker",
        projectIphoneDescription: "Compare iPhone prices across Georgian retailers, follow price history, and get alerts when a product reaches your target.",
        projectVideoCategory: "Media tools",
        projectVideoTitle: "Video Downloader",
        projectVideoDescription: "A web app for downloading videos from supported sites, choosing video quality, and tracking each download as it runs.",
        projectGithubLink: "Explore on GitHub",
        projectUpcomingCategory: "Coming soon",
        projectUpcomingTitle: "My Biggest Project Is Coming Soon",
        projectUpcomingDescription: "I’m working on something massive. More details and the launch are coming soon.",
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
        introTagline: "Full-stack დეველოპერი — <span>ვებტექნოლოგიები</span>, <span>პროგრამული უზრუნველყოფა</span> და <span>ავტომატიზაცია</span>",
        portraitAlt: "ჩემი პორტრეტი",
        aboutTitle: "ჩემ შესახებ",
        aboutLead: "ვქმნი პრაქტიკულ და მასშტაბირებად ვებ აპლიკაციებს.",
        aboutIntro: "მე ვარ ნიკუშა ავსაჯანიშვილი, კომპიუტერული მეცნიერების მესამე კურსის სტუდენტი. ჩემი ძირითადი ინტერესებია ვებდეველოპმენტი, სკრიპტინგი და ავტომატიზაცია.",
        aboutDescription: "პროგრამირება იმან დამაინტერესა, რომ კოდის დახმარებით საკუთარი იდეების რეალობად ქცევა შემეძლო. მას შემდეგ ვსწავლობ და ვქმნი პროექტებს, რომლებიც აერთიანებს ფრონტენდისა და ბექენდის ტექნოლოგიებს. განსაკუთრებულად მაინტერესებს განმეორებადი პროცესების ავტომატიზაცია და ტექნოლოგიების გამოყენებით რეალური პრობლემების გადაჭრა.",
        aboutCardTitle: "ცოტა რამ ჩემ შესახებ",
        aboutCardSubtitle: "კოდის მიღმა",
        aboutUniversity: "ALTE University / მე-3 კურსი",
        aboutField: "კომპიუტერული მეცნიერება",
        aboutLocation: "თბილისი",
        aboutDefaultMode: "წიგნები და ინტერნეტში ხეტიალი",
        aboutForFun: "LeetCode და ალგორითმული ამოცანები",
        aboutSkills: "დეტალებზე ორიენტირება · კომუნიკაცია · <span class=\"skill-phrase\">კვლევა და ცნობისმოყვარეობა</span>",
        skillsTitle: "უნარები და ტექნოლოგიები",
        skillsCoreTitle: "პროგრამირების ენები და ფრონტენდი",
        skillsBackendTitle: "ბექენდი და API-ები",
        skillsDataTitle: "მონაცემთა ბაზები და ქეშირება",
        skillsDevopsTitle: "DevOps და ინფრასტრუქტურა",
        contactTitle: "დამიკავშირდით",
        projectsTitle: "პროექტები",
        projectIphoneCategory: "ფასის მონიტორინგი",
        projectIphoneTitle: "iPhone-ის ფასების ტრეკერი",
        projectIphoneDescription: "შეადარეთ iPhone-ების ფასები ქართულ ონლაინმაღაზიებში, დააკვირდით ფასების ცვლილებას და მიიღეთ შეტყობინება სასურველი ფასის მიღწევისას.",
        projectVideoCategory: "ვიდეო ხელსაწყო",
        projectVideoTitle: "Video Downloader",
        projectVideoDescription: "ვებაპლიკაცია მხარდაჭერილი საიტებიდან ვიდეოების ჩამოსატვირთად, ხარისხის ასარჩევად და ჩამოტვირთვის პროცესის სანახავად.",
        projectGithubLink: "GitHub-ზე ნახვა",
        projectUpcomingCategory: "მალე",
        projectUpcomingTitle: "ჩემი ყველაზე მასშტაბური პროექტი მალე გამოვა",
        projectUpcomingDescription: "დიდ პროექტზე ვმუშაობ. ძალზე მასშტაბურზე. დეტალები მალე...",
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
        const translation = languageTranslations[element.dataset.i18n];

        if (translation !== undefined) {
            element.innerHTML = translation;
        }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const translation = languageTranslations[element.dataset.i18nAlt];

        if (translation !== undefined) {
            element.alt = translation;
        }
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
