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
        aboutLead: "Web, automation and AI — I build applications and systems that bring these areas together.",
        aboutIntro: "I'm a third-year Computer Science student whose main interests are web development and automation.",
        aboutDescription: "I fell in love with programming because code makes it possible to turn ideas into real, working products. Today I build full-stack projects and work on both the backend and the frontend.",
        aboutAutomation: "I'm especially interested in building web applications that solve real problems and make people's everyday work easier. I enjoy the process of turning an idea into a functional product — from understanding the problem to building the interface and logic. Along the way, I use AI as a development tool that speeds up writing code, debugging, and learning new technologies. I'm also constantly looking for ways to automate routine processes so repetitive tasks get done faster and more efficiently.",
        aboutCardTitle: "A little about me",
        aboutCardSubtitle: "Beyond the code",
        aboutUniversityLabel: "University",
        aboutFieldLabel: "Field",
        aboutLocationLabel: "Location",
        aboutFreeTimeLabel: "Free time",
        aboutForFunLabel: "For fun",
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
        projectIphoneDescription: "A price-comparison and tracking platform for the Georgian iPhone market: one place to see who sells it cheapest, how prices move over time, and when it’s the right moment to buy.",
        projectIphoneProblem: "The same iPhone costs different amounts at different Georgian retailers, and prices change often. Finding the best deal meant opening several stores and re-checking them by hand, again and again.",
        projectIphoneHighlight1: "Retailer-specific scrapers pull listings from multiple Georgian stores, including Zoommer, Alta and more, into one searchable catalog and log every crawl.",
        projectIphoneHighlight2: "Every price change is recorded, so each model gets its own price history.",
        projectIphoneHighlight3: "Users set a target price and get a Telegram alert the moment it’s reached.",
        projectVideoCategory: "Media tools",
        projectVideoTitle: "Video Downloader",
        projectVideoDescription: "An asynchronous video downloader: paste a link, pick a quality, and watch the job progress live, with full monitoring running behind the scenes.",
        projectVideoProblem: "Downloading online videos usually means ad-filled websites or command-line tools, and long downloads tie everything up while they run. This app turns it into a clean web flow that works in the background.",
        projectVideoHighlight1: "yt-dlp downloads videos from YouTube and other supported sites in 360p, 720p, or 1080p.",
        projectVideoHighlight2: "FastAPI background tasks process jobs asynchronously while PostgreSQL tracks each job’s status.",
        projectVideoHighlight3: "Prometheus metrics and Grafana dashboards monitor the app’s health and performance.",
        projectProblemLabel: "The problem",
        projectBuiltLabel: "What I built",
        projectGithubLink: "Explore on GitHub",
        projectJobCategory: "In progress · AI automation",
        projectJobDescription: "An AI-powered job radar for the Georgian market: it watches job boards for you, ranks every new posting against your CV, and helps you apply faster.",
        projectJobProblem: "Job hunting in Georgia means checking jobs.ge, hr.ge and other sites every day, reading dozens of postings that don’t fit, and rewriting the same cover letter again and again.",
        projectJobHighlight1: "Scheduled scrapers collect new postings from Georgian job boards into one PostgreSQL database.",
        projectJobHighlight2: "AI compares each posting with your CV, scores how well it fits, and explains why.",
        projectJobHighlight3: "Strong matches trigger an email notification, along with an AI-drafted cover letter tailored to the job.",
        projectJobHighlight4: "A React and TypeScript dashboard to browse matches, fit scores, and generated cover letters.",
        projectBuildingLabel: "What I’m building",
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
        aboutLead: "ვები, ავტომატიზაცია და AI — ვქმნი აპლიკაციებსა და სისტემებს, რომლებიც ამ მიმართულებებს აერთიანებს.",
        aboutIntro: "ვარ კომპიუტერული მეცნიერების მესამე კურსის სტუდენტი, რომლის ძირითადი ინტერესებია ვებდეველოპმენტი და ავტომატიზაცია.",
        aboutDescription: "პროგრამირება იმ შესაძლებლობამ შემაყვარა, რომ კოდის დახმარებით იდეები რეალურ, მოქმედ პროდუქტებად შეიძლება იქცეს. დღეს ვქმნი full-stack პროექტებს და ვმუშაობ როგორც ბექენდის, ისე ფრონტენდის მიმართულებით.",
        aboutAutomation: "განსაკუთრებით მაინტერესებს ისეთი ვებაპლიკაციების შექმნა, რომლებიც რეალურ პრობლემებს აგვარებს და ადამიანებს ყოველდღიურ საქმიანობას უმარტივებს. მომწონს იდეის ფუნქციურ პროდუქტად გარდაქმნის პროცესი — პრობლემის გააზრებიდან ინტერფეისისა და ლოგიკის შექმნამდე. ამ პროცესში AI-ს ვიყენებ როგორც დეველოპმენტის ხელსაწყოს, რომელიც კოდის წერას, დებაგინგსა და ახალი ტექნოლოგიების ათვისებას აჩქარებს. ასევე განუწყვეტლივ ვეძებ რუტინული პროცესების ავტომატიზაციის გზებს, რათა განმეორებადი ამოცანები უფრო სწრაფად და ეფექტურად შესრულდეს.",
        aboutCardTitle: "ცოტა რამ ჩემ შესახებ",
        aboutCardSubtitle: "კოდის მიღმა",
        aboutUniversityLabel: "უნივერსიტეტი",
        aboutFieldLabel: "მიმართულება",
        aboutLocationLabel: "მდებარეობა",
        aboutFreeTimeLabel: "თავისუფალი დრო",
        aboutForFunLabel: "გასართობად",
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
        projectIphoneDescription: "ფასების შედარებისა და მონიტორინგის პლატფორმა ქართული iPhone-ის ბაზრისთვის: ერთ სივრცეში ხედავ, სად იყიდება ყველაზე იაფად, როგორ იცვლება ფასი დროთა განმავლობაში და როდის ღირს ყიდვა.",
        projectIphoneProblem: "ერთი და იგივე iPhone სხვადასხვა ქართულ მაღაზიაში განსხვავებულ ფასად იყიდება და ფასები ხშირად იცვლება. საუკეთესო შეთავაზების საპოვნელად რამდენიმე საიტის ხელით, ისევ და ისევ შემოწმება იყო საჭირო.",
        projectIphoneHighlight1: "მაღაზიებზე მორგებული სკრეიპერები სხვადასხვა ქართული მაღაზიის, მათ შორის Zoommer-ის, Alta-ს და სხვების, პროდუქტებს ერთ საძიებო კატალოგში აგროვებს და ყოველი განახლების შედეგს აღრიცხავს.",
        projectIphoneHighlight2: "ფასის ყოველი ცვლილება ინახება, ამიტომ თითოეულ მოდელს საკუთარი ფასების ისტორია აქვს.",
        projectIphoneHighlight3: "მომხმარებელი სასურველ ფასს ადგენს და მისი მიღწევისთანავე Telegram-ზე შეტყობინებას იღებს.",
        projectVideoCategory: "ვიდეო ხელსაწყო",
        projectVideoTitle: "Video Downloader",
        projectVideoDescription: "ასინქრონული ვიდეო ჩამომტვირთავი: ჩასვი ბმული, აირჩიე ხარისხი და ადევნე თვალი პროცესს რეალურ დროში, სრული მონიტორინგით კულისებში.",
        projectVideoProblem: "ონლაინ ვიდეოს ჩამოსატვირთად, როგორც წესი, რეკლამებით სავსე საიტები ან ბრძანების ხაზის ხელსაწყოებია საჭირო, ხანგრძლივი ჩამოტვირთვა კი ყველაფერს აფერხებს. ეს აპლიკაცია მას სუფთა ვებ-პროცესად აქცევს, რომელიც ფონურ რეჟიმში მუშაობს.",
        projectVideoHighlight1: "yt-dlp ვიდეოებს YouTube-იდან და სხვა მხარდაჭერილი საიტებიდან 360p, 720p ან 1080p ხარისხით ტვირთავს.",
        projectVideoHighlight2: "FastAPI-ის ფონური ამოცანები ჩამოტვირთვებს ასინქრონულად ამუშავებს, PostgreSQL კი თითოეული ამოცანის სტატუსს აღრიცხავს.",
        projectVideoHighlight3: "Prometheus-ის მეტრიკები და Grafana-ს დაფები აპლიკაციის მდგომარეობასა და წარმადობას აკონტროლებს.",
        projectProblemLabel: "პრობლემა",
        projectBuiltLabel: "რა შევქმენი",
        projectGithubLink: "GitHub-ზე ნახვა",
        projectJobCategory: "მიმდინარე · AI ავტომატიზაცია",
        projectJobDescription: "AI-ზე დაფუძნებული სამუშაოს რადარი ქართული ბაზრისთვის: თავად აკვირდება ვაკანსიების საიტებს, ყოველ ახალ განცხადებას შენს CV-ს ადარებს და განაცხადის გაგზავნას გიმარტივებს.",
        projectJobProblem: "საქართველოში სამუშაოს ძებნა ნიშნავს jobs.ge-ის, hr.ge-ისა და სხვა საიტების ყოველდღიურ შემოწმებას, ათობით შეუსაბამო ვაკანსიის კითხვას და ერთი და იმავე სამოტივაციო წერილის ხელახლა წერას.",
        projectJobHighlight1: "განრიგით გაშვებული სკრეიპერები ქართული ვაკანსიების საიტებიდან ახალ განცხადებებს ერთ PostgreSQL ბაზაში აგროვებს.",
        projectJobHighlight2: "AI თითოეულ ვაკანსიას შენს CV-ს ადარებს, აფასებს რამდენად შეესაბამება და ხსნის რატომ.",
        projectJobHighlight3: "კარგი დამთხვევისას ელფოსტაზე შეტყობინება მოდის, ვაკანსიაზე მორგებულ, AI-ით მომზადებულ სამოტივაციო წერილთან ერთად.",
        projectJobHighlight4: "React-ითა და TypeScript-ით აწყობილი დაფა, სადაც შესაბამისი ვაკანსიები, მათი შეფასებები და მომზადებული სამოტივაციო წერილები ჩანს.",
        projectBuildingLabel: "რას ვქმნი",
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
