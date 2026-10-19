const modeButton = document.getElementById("mode");
const languageButton = document.getElementById("language");
const menuToggle = document.getElementById("menu-toggle");
const scrollTopButton = document.getElementById("scroll-top");
const nav = document.querySelector("nav");
const pageSections = Array.from(document.querySelectorAll("main > section"));
const pageLinks = Array.from(document.querySelectorAll(".navigation a"));

const savedTheme = localStorage.getItem("theme");
let currentLanguage = localStorage.getItem("language") === "en" ? "en" : "ka";

const translations = {
    en: {
        pageTitle: "Nikusha Avsajanishvili — Portfolio",
        navHome: "Home",
        navAbout: "About Me",
        navExperience: "Experience",
        navSkills: "Skills / Technologies",
        navProjects: "Projects",
        firstName: "Nikusha",
        lastName: "Avsajanishvili",
        introTagline: "<span class=\"intro-tagline-line\">Full-stack Developer - <span class=\"accent\">Programming</span>,</span><span class=\"intro-tagline-line\"><span class=\"accent\">Web Application Development and</span></span><span class=\"intro-tagline-line\"><span class=\"accent\">Process Automation</span></span>",
        portraitAlt: "My portrait",
        cvDownload: "Download CV",
        experienceTitle: "Experience & Education",
        expRentoDate: "2024 — Present",
        expRentoTitle: "Web Development & Operations",
        expRentoType: "Employment",
        expRentoPoints: "<li>Updated website content and service information to keep customer-facing details accurate and up to date.</li><li>Handled customer requests and helped resolve service-related issues.</li><li>Improved routine workflows by identifying recurring issues and simplifying day-to-day tasks.</li>",
        expAlteDate: "2024 — Present",
        expAlteTitle: "BSc in Computer Science",
        expAlteType: "Education",
        expAlteDescription: "Third-year student focused on algorithms, data structures, and software engineering.",
        aboutTitle: "About Me",
        aboutLead: "I build practical and scalable web applications.",
        aboutIntro: "I'm a third-year Computer Science student. My focus is web development, scripting, and automation.",
        aboutDescription: "I fell in love with programming because code lets me turn ideas into real, working products. Today I build full-stack projects where the frontend and backend come together as one system.",
        aboutAutomation: "What interests me most is automating routine processes. If something happens twice, I think about how to make it run by itself the third time. I actively use AI in this approach: on one hand as a workflow agent that runs multi-step processes automatically, and on the other as a development tool that speeds up writing code, debugging, and learning new technologies.",
        aboutCardTitle: "A little about me",
        aboutCardSubtitle: "Beyond the code",
        aboutUniversityLabel: "University",
        aboutFieldLabel: "Field",
        aboutLocationLabel: "Location",
        aboutFreeTimeLabel: "Free time",
        aboutForFunLabel: "For fun, apparently",
        aboutSkillsLabel: "Skills",
        aboutUniversity: "ALTE University / 3rd year",
        aboutField: "Computer Science",
        aboutLocation: "Tbilisi, Georgia",
        aboutDefaultMode: "Books and surfing the web",
        aboutForFun: "LeetCode & algorithm problems",
        aboutSkills: "Attention to detail · Communication · <span class=\"skill-phrase\">Research &amp; curiosity</span>",
        skillsTitle: "Skills & Technologies",
        skillsCoreTitle: "Languages & Frontend",
        skillsBackendTitle: "Backend, APIs & Databases",
        skillsDevopsTitle: "DevOps & Infrastructure",
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
        menuCloseLabel: "Close navigation menu",
        scrollTopLabel: "Scroll to home"
},
    ka: {
        pageTitle: "ნიკუშა ავსაჯანიშვილი — პორტფოლიო",
        navHome: "მთავარი",
        navAbout: "ჩემ შესახებ",
        navExperience: "გამოცდილება",
        navSkills: "უნარები / ტექნოლოგიები",
        navProjects: "პროექტები",
        firstName: "ნიკუშა",
        lastName: "ავსაჯანიშვილი",
        introTagline: "<span class=\"intro-tagline-line\">Full-stack დეველოპერი - <span class=\"accent\">პროგრამირება</span>,</span><span class=\"intro-tagline-line\"><span class=\"accent\">ვებ აპლიკაციების შექმნა/განვითარება და</span></span><span class=\"intro-tagline-line\"><span class=\"accent\">პროცესების ავტომატიზაცია.</span></span>",
        portraitAlt: "ჩემი პორტრეტი",
        cvDownload: "CV-ის ჩამოტვირთვა",
        experienceTitle: "გამოცდილება და განათლება",
        expRentoDate: "2024 — დღემდე",
        expRentoTitle: "ვებდეველოპმენტი და ოპერაციები",
        expRentoType: "სამუშაო",
        expRentoPoints: "<li>ვმართავ ვებსაიტის კონტენტის განახლებასა და სერვისების შესახებ ინფორმაციის სიზუსტეს, რათა მომხმარებლებს ყოველთვის ჰქონდეთ აქტუალური მონაცემები.</li><li>ვამუშავებ მომხმარებელთა მოთხოვნებს, ვარკვევ წარმოქმნილ პრობლემებს და ვეხმარები მათ დროულად მოგვარებაში.</li><li>ვაუმჯობესებ ყოველდღიურ სამუშაო პროცესებს განმეორებადი პრობლემების გამოვლენით, რუტინული ამოცანების გამარტივებითა და სამუშაო პროცესების ოპტიმიზაციით.</li>",
        expAlteDate: "2024 — დღემდე",
        expAlteTitle: "კომპიუტერული მეცნიერების ბაკალავრიატი",
        expAlteType: "განათლება",
        expAlteDescription: "მესამე კურსის სტუდენტი; ფოკუსი ალგორითმებზე, მონაცემთა სტრუქტურებსა და პროგრამულ ინჟინერიაზე.",
        aboutTitle: "ჩემ შესახებ",
        aboutLead: "ვქმნი პრაქტიკულ და მასშტაბირებად ვებ აპლიკაციებს.",
        aboutIntro: "კომპიუტერული მეცნიერების მესამე კურსის სტუდენტი ვარ. ჩემი ფოკუსია ვებ-დეველოპმენტი, სკრიპტინგი და ავტომატიზაცია.",
        aboutDescription: "პროგრამირება იმიტომ შემიყვარდა, რომ კოდით იდეების რეალურ, მოქმედ პროდუქტებად ქცევა შემიძლია. დღეს ვქმნი full-stack პროექტებს, სადაც ფრონტენდსა და ბექენდს ერთ სისტემად ვაერთიანებ.",
        aboutAutomation: "ყველაზე მეტად მაინტერესებს რუტინული პროცესების ავტომატიზაცია. თუ რაიმე ორჯერ მეორდება, ვფიქრობ, როგორ გავაკეთო ისე, რომ მესამედ თავისით შესრულდეს. ამ მიდგომაში აქტიურად ვიყენებ AI-ს: ერთი მხრივ, როგორც workflow აგენტს, რომელიც მრავალსაფეხურიან პროცესებს ავტომატურად ასრულებს, მეორე მხრივ კი, როგორც დეველოპმენტის ხელსაწყოს, რომელიც კოდის წერას, დებაგინგს და ახალი ტექნოლოგიების ათვისებას აჩქარებს.",
        aboutCardTitle: "ცოტა რამ ჩემ შესახებ",
        aboutCardSubtitle: "კოდის მიღმა",
        aboutUniversityLabel: "უნივერსიტეტი",
        aboutFieldLabel: "მიმართულება",
        aboutLocationLabel: "მდებარეობა",
        aboutFreeTimeLabel: "თავისუფალი დრო",
        aboutForFunLabel: "გასართობად, როგორც ჩანს",
        aboutSkillsLabel: "უნარები",
        aboutUniversity: "ALTE University / მე-3 კურსი",
        aboutField: "კომპიუტერული მეცნიერება",
        aboutLocation: "თბილისი",
        aboutDefaultMode: "წიგნები და ინტერნეტში ხეტიალი",
        aboutForFun: "LeetCode და ალგორითმული ამოცანები",
        aboutSkills: "დეტალებზე ორიენტირება · კომუნიკაცია · <span class=\"skill-phrase\">კვლევა და ცნობისმოყვარეობა</span>",
        skillsTitle: "უნარები და ტექნოლოგიები",
        skillsCoreTitle: "პროგრამირების ენები და ფრონტენდი",
        skillsBackendTitle: "ბექენდი, API-ები და მონაცემთა ბაზები",
        skillsDevopsTitle: "DevOps და ინფრასტრუქტურა",
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
        menuCloseLabel: "ნავიგაციის მენიუს დახურვა",
        scrollTopLabel: "მთავარზე დაბრუნება"
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
    localStorage.setItem("language", currentLanguage);
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
    scrollTopButton.setAttribute("aria-label", languageTranslations.scrollTopLabel);
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


function updateScrollTopButton() {
    const showButton = window.scrollY > 280;

    scrollTopButton.classList.toggle("is-visible", showButton);
    scrollTopButton.setAttribute("aria-hidden", String(!showButton));
    scrollTopButton.tabIndex = showButton ? 0 : -1;
    nav.classList.toggle("scrolled", window.scrollY > 30);
}

scrollTopButton.addEventListener("click", () => {
    const intro = document.getElementById("intro");

    if (!intro) {
        return;
    }

    if (window.location.hash !== "#intro") {
        window.history.pushState(null, "", "#intro");
    }

    intro.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentSection("intro");
});

window.addEventListener("scroll", updateScrollTopButton, { passive: true });
updateScrollTopButton();
