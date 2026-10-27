const modeButton = document.getElementById("mode");
const languageButton = document.getElementById("language");
const menuToggle = document.getElementById("menu-toggle");
const scrollTopButton = document.getElementById("scroll-top");
const nav = document.querySelector("nav");
const pageSections = Array.from(document.querySelectorAll("main > section"));
const pageLinks = Array.from(document.querySelectorAll(".navigation a"));

const savedTheme = localStorage.getItem("theme");
let currentLanguage = localStorage.getItem("language") === "en" ? "en" : "ka";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const translations = {
    en: {
        pageTitle: "Nikusha Avsajanishvili — Portfolio",
        navHome: "Home",
        navAbout: "About Me",
        navExperience: "Experience",
        navSkills: "Skills / Technologies",
        navProjects: "Projects",
        introTitle: "<span class=\"intro-role\">Web Development</span><span class=\"intro-separator\" aria-hidden=\"true\">|</span><span class=\"intro-role intro-role-accent\">DevOps</span><span class=\"intro-separator\" aria-hidden=\"true\">|</span><span class=\"intro-role\">Testing</span>",
        introLead: "Full-stack developer who builds, tests, ships, and monitors web apps, using AI where it actually helps.",
        portraitAlt: "Portrait of Nikusha Avsajanishvili",
        introCta: "Open to internships and junior roles —",
        cvDownload: "download my CV",
        emailCopyLabel: "Copy email address",
        emailCopied: "Email address copied",
        emailCopyFailed: "Could not copy the email address",
        experienceTitle: "Experience & Education",
        expRentoDate: "Aug 2026 — Present",
        expRentoTitle: "Junior Software Engineer at Rento Group",
        expRentoPoints: "<li>Set up external uptime, content and SSL-expiry monitoring for the company website, with alerts sent as soon as a check fails.</li><li>Wrote Playwright end-to-end tests for the company website (page availability, broken images, contact links, mobile layout), scheduled to run daily in CI to catch regressions before customers do.</li><li>Improved the company website’s Lighthouse scores (Performance 75 → 95, Accessibility 74 → 91) by optimizing images, eliminating layout shift and fixing accessibility issues.</li>",
        expAlteDate: "Sep 2024 — Expected 2028",
        expAlteTitle: "BSc in Computer Science · ALTE University, Tbilisi",
        expAlteCoursework: "Relevant coursework: Data Structures & Algorithms, Databases, Operating Systems, Computer Networks.",
        aboutTitle: "About Me",
        aboutIntro: "I’m 19 and a Computer Science student. I build programs to solve problems I run into myself.",
        aboutProjects: "That’s how the iPhone price tracker started, because I got tired of checking five stores by hand. The video downloader, because free online services were overloaded with ads. And ModzebnAI, because searching for jobs every day and preparing the same applications over and over took up too much of my time.",
        aboutStack: "I work on both the backend and the frontend, mostly with <strong>Python</strong> and <strong>TypeScript</strong>.",
        aboutTesting: "It matters to me not only that a program works, but that I can check that it works. In the price tracker I use <strong>pytest</strong> for unit tests, <strong>Testcontainers</strong> for integration tests and <strong>Playwright</strong> to automatically check the main user flows.",
        aboutRento: "At <strong>Rento Group</strong>, I applied the same approach to the company website: I wrote Playwright end-to-end tests and set them up to run daily in CI.",
        aboutAi: "I use AI for code analysis, debugging and learning, but I verify the solutions it generates on my own.",
        skillsTitle: "Skills & Technologies",
        skillsBackendTitle: "Backend",
        skillsFrontendTitle: "Frontend",
        skillsTestingTitle: "Testing",
        skillsToolsTitle: "Tools &amp; DevOps",
        projectsTitle: "Projects",
        projectIphoneCategory: "Price tracking",
        projectIphoneTitle: "iPhone Price Tracker",
        projectIphoneDescription: "Compares and tracks iPhone prices across Georgian stores.",
        projectIphoneProblem: "The same iPhone costs different amounts at different Georgian retailers, and prices change often. Finding the best deal meant opening several stores and re-checking them by hand, again and again.",
        projectIphoneHighlight1: "Retailer-specific scrapers pull listings from multiple Georgian stores, including Zoommer, Alta and more, into one searchable catalog and log every crawl.",
        projectIphoneHighlight2: "Every price change is recorded, so each model gets its own price history.",
        projectIphoneHighlight3: "Prices are re-checked every 12 hours, and a Telegram alert goes out when a tracked iPhone drops below the user’s target price.",
        projectVideoCategory: "Media tools",
        projectVideoTitle: "Video Downloader",
        projectVideoDescription: "Paste a link, pick a quality or MP3, and watch it download live.",
        projectVideoProblem: "Growing up, I downloaded songs to my device from the “YouTube to MP3” sites that come up on Google, but they were full of ads and sometimes viruses. So I built my own clean downloader that fits my preferences and runs long downloads in the background.",
        projectVideoHighlight1: "yt-dlp downloads videos from YouTube and other supported sites in 360p, 720p, or 1080p, or as audio-only MP3, and FFmpeg merges video and audio.",
        projectVideoHighlight2: "A Node.js, Express, and TypeScript backend runs yt-dlp as background processes, two at a time, while PostgreSQL stores every download job.",
        projectVideoHighlight3: "A one-page React and TypeScript interface starts downloads, shows live progress, and saves finished files.",
        projectVideoHighlight4: "Prometheus collects app metrics at /metrics, and Docker Compose runs the whole stack.",
        projectProblemLabel: "The problem",
        projectBuiltLabel: "What I built",
        projectGithubLink: "Explore on GitHub",
        projectJobCategory: "In progress · AI automation",
        projectJobDescription: "An AI job radar that ranks new Georgian job postings against your CV.",
        projectJobProblem: "Job hunting in Georgia means checking jobs.ge, hr.ge and other sites every day, reading dozens of postings that don’t fit, and rewriting the same cover letter again and again.",
        projectJobHighlight1: "Scheduled scrapers collect new postings from Georgian job boards into one PostgreSQL database.",
        projectJobHighlight2: "AI compares each posting with your CV, scores how well it fits, and explains why.",
        projectJobHighlight3: "Strong matches trigger an email notification, along with an AI-drafted cover letter tailored to the job.",
        projectJobHighlight4: "A React and TypeScript dashboard to browse matches, fit scores, and generated cover letters.",
        projectBuildingLabel: "What I’m building",
        mediaEnlargeLabel: "Enlarge demo video",
        mediaCloseLabel: "Close",
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
        introTitle: "<span class=\"intro-role\">ვებ დეველოპმენტი</span><span class=\"intro-separator\" aria-hidden=\"true\">|</span><span class=\"intro-role intro-role-accent\">DevOps</span><span class=\"intro-separator\" aria-hidden=\"true\">|</span><span class=\"intro-role\">ტესტირება</span>",
        introLead: "Full-stack დეველოპერი, რომელიც ვებაპლიკაციებს ქმნის, ტესტავს, უშვებს და მონიტორინგს უწევს, AI-ს კი იქ იყენებს, სადაც სჭირდება.",
        portraitAlt: "ნიკუშა ავსაჯანიშვილის პორტრეტი",
        introCta: "ღია ვარ სტაჟირებისა და junior პოზიციებისთვის —",
        cvDownload: "ჩამოტვირთე ჩემი CV",
        emailCopyLabel: "ელფოსტის მისამართის კოპირება",
        emailCopied: "ელფოსტის მისამართი დაკოპირდა",
        emailCopyFailed: "ელფოსტის მისამართის კოპირება ვერ მოხერხდა",
        experienceTitle: "გამოცდილება და განათლება",
        expRentoDate: "აგვისტო 2026 — დღემდე",
        expRentoTitle: "Junior Software Engineer · Rento Group",
        expRentoPoints: "<li>დავნერგე ვებსაიტის გარე მონიტორინგი (uptime, კონტენტის შემოწმება, SSL სერტიფიკატის ვადა), რომელიც ხარვეზის შემთხვევაში შეტყობინებას მაშინვე აგზავნის.</li><li>დავწერე Playwright-ის end-to-end ტესტები (გვერდების ჩატვირთვა, ჩაუტვირთავი სურათები, საკონტაქტო ბმულები, მობილური ვერსია), რომლებიც CI-ში ყოველდღიურად ეშვება და შეცდომებს მომხმარებლამდე ავლენს.</li><li>გავაუმჯობესე ვებსაიტის Lighthouse-ის შეფასებები (Performance 75 → 95, Accessibility 74 → 91) სურათების ოპტიმიზაციით, layout shift-ის აღმოფხვრითა და accessibility-ის ხარვეზების გასწორებით.</li>",
        expAlteDate: "სექტემბერი 2024 — სავარაუდოდ 2028",
        expAlteTitle: "კომპიუტერული მეცნიერების ბაკალავრიატი · ALTE University, თბილისი",
        expAlteCoursework: "შესაბამისი კურსები: მონაცემთა სტრუქტურები და ალგორითმები, მონაცემთა ბაზები, ოპერაციული სისტემები, კომპიუტერული ქსელები.",
        aboutTitle: "ჩემ შესახებ",
        aboutIntro: "მე ვარ 19 წლის, კომპიუტერული მეცნიერების სტუდენტი. ვქმნი პროგრამებს იმ პრობლემების გადასაჭრელად, რომლებსაც თავად ვაწყდები.",
        aboutProjects: "ასე გაჩნდა iPhone-ის ფასების ტრეკერი, რადგან მომბეზრდა ხუთი მაღაზიის ხელით შემოწმება. ვიდეოების ჩამომტვირთავი, რადგან უფასო ონლაინ სერვისები რეკლამებით იყო გადატვირთული. და ModzebnAI, რადგან ვაკანსიების ყოველდღიური ძებნა და განმეორებითი განაცხადების მომზადება ზედმეტ დროს მართმევდა.",
        aboutStack: "ვმუშაობ როგორც ბექენდზე, ისე ფრონტენდზე, ძირითადად <strong>Python</strong>-ისა და <strong>TypeScript</strong>-ის გამოყენებით.",
        aboutTesting: "ჩემთვის მნიშვნელოვანია არა მხოლოდ ის, რომ პროგრამა მუშაობდეს, არამედ ისიც, რომ მისი მუშაობის შემოწმება შემეძლოს. ფასების ტრეკერში ვიყენებ <strong>pytest</strong>-ს unit ტესტებისთვის, <strong>Testcontainers</strong>-ს ინტეგრაციული ტესტებისთვის და <strong>Playwright</strong>-ს მომხმარებლის ძირითადი სცენარების ავტომატურად შესამოწმებლად.",
        aboutRento: "<strong>Rento Group</strong>-ში იგივე მიდგომა კომპანიის ვებსაიტზეც გამოვიყენე: დავწერე Playwright-ის end-to-end ტესტები და მათი ყოველდღიური გაშვება CI-ში დავაყენე.",
        aboutAi: "AI-ს ვიყენებ კოდის ანალიზისთვის, დებაგინგისა და სწავლისთვის, თუმცა გენერირებულ გადაწყვეტილებებს დამოუკიდებლად ვამოწმებ.",
        skillsTitle: "უნარები და ტექნოლოგიები",
        skillsBackendTitle: "ბექენდი",
        skillsFrontendTitle: "ფრონტენდი",
        skillsTestingTitle: "ტესტირება",
        skillsToolsTitle: "ხელსაწყოები და DevOps",
        projectsTitle: "პროექტები",
        projectIphoneCategory: "ფასის მონიტორინგი",
        projectIphoneTitle: "iPhone-ის ფასების ტრეკერი",
        projectIphoneDescription: "iPhone-ის ფასების შედარებისა და მონიტორინგის პლატფორმა ქართული მაღაზიებისთვის.",
        projectIphoneProblem: "ერთი და იგივე iPhone სხვადასხვა ქართულ მაღაზიაში განსხვავებულ ფასად იყიდება და ფასები ხშირად იცვლება. საუკეთესო შეთავაზების საპოვნელად რამდენიმე საიტის ხელით, ისევ და ისევ შემოწმება იყო საჭირო.",
        projectIphoneHighlight1: "მაღაზიებზე მორგებული სკრეიპერები სხვადასხვა ქართული მაღაზიის, მათ შორის Zoommer-ის, Alta-ს და სხვების, პროდუქტებს ერთ საძიებო კატალოგში აგროვებს და ყოველი განახლების შედეგს აღრიცხავს.",
        projectIphoneHighlight2: "ფასის ყოველი ცვლილება ინახება, ამიტომ თითოეულ მოდელს საკუთარი ფასების ისტორია აქვს.",
        projectIphoneHighlight3: "ფასები ყოველ 12 საათში მოწმდება და, როცა თვალყურდევნებული iPhone-ის ფასი მომხმარებლის სასურველ ფასზე დაბლა ჩამოდის, Telegram-ზე შეტყობინება იგზავნება.",
        projectVideoCategory: "ვიდეო ხელსაწყო",
        projectVideoTitle: "Video Downloader",
        projectVideoDescription: "ჩასვი ბმული, აირჩიე ხარისხი ან MP3 და ადევნე თვალი ჩამოტვირთვას რეალურ დროში.",
        projectVideoProblem: "ბავშვობაში სიმღერებს ჩემს მოწყობილობაზე Google-ში ნაპოვნი „YouTube to MP3“ საიტებიდან ვტვირთავდი, მაგრამ ისინი რეკლამებითა და ზოგჯერ ვირუსებით იყო სავსე. ამიტომ შევქმენი საკუთარი, სუფთა ჩამომტვირთავი, რომელიც ერგება ჩემს მოთხოვნებს და ხანგრძლივ ჩამოტვირთვებს ფონურ რეჟიმში ამუშავებს.",
        projectVideoHighlight1: "yt-dlp ვიდეოებს YouTube-იდან და სხვა მხარდაჭერილი საიტებიდან 360p, 720p ან 1080p ხარისხით ან მხოლოდ MP3 აუდიოდ ტვირთავს, FFmpeg კი ვიდეოსა და აუდიოს აერთიანებს.",
        projectVideoHighlight2: "Node.js-ის, Express-ისა და TypeScript-ის ბექენდი yt-dlp-ს ფონურ პროცესებად, ერთდროულად ორს უშვებს, PostgreSQL კი ჩამოტვირთვის ყველა ამოცანას ინახავს.",
        projectVideoHighlight3: "React-ითა და TypeScript-ით აწყობილი ერთგვერდიანი ინტერფეისი ჩამოტვირთვას იწყებს, პროგრესს რეალურ დროში აჩვენებს და მზა ფაილებს ინახავს.",
        projectVideoHighlight4: "Prometheus აპლიკაციის მეტრიკებს /metrics მისამართზე აგროვებს, Docker Compose კი მთელ სისტემას უშვებს.",
        projectProblemLabel: "პრობლემა",
        projectBuiltLabel: "რა შევქმენი",
        projectGithubLink: "GitHub-ზე ნახვა",
        projectJobCategory: "მიმდინარე · AI ავტომატიზაცია",
        projectJobDescription: "AI-ზე დაფუძნებული სამუშაოს რადარი, რომელიც ახალ ქართულ ვაკანსიებს შენს CV-ს ადარებს.",
        projectJobProblem: "საქართველოში სამუშაოს ძებნა ნიშნავს jobs.ge-ის, hr.ge-ისა და სხვა საიტების ყოველდღიურ შემოწმებას, ათობით შეუსაბამო ვაკანსიის კითხვას და ერთი და იმავე სამოტივაციო წერილის ხელახლა წერას.",
        projectJobHighlight1: "განრიგით გაშვებული სკრეიპერები ქართული ვაკანსიების საიტებიდან ახალ განცხადებებს ერთ PostgreSQL ბაზაში აგროვებს.",
        projectJobHighlight2: "AI თითოეულ ვაკანსიას შენს CV-ს ადარებს, აფასებს რამდენად შეესაბამება და ხსნის რატომ.",
        projectJobHighlight3: "კარგი დამთხვევისას ელფოსტაზე შეტყობინება მოდის, ვაკანსიაზე მორგებულ, AI-ით მომზადებულ სამოტივაციო წერილთან ერთად.",
        projectJobHighlight4: "React-ითა და TypeScript-ით აწყობილი დაფა, სადაც შესაბამისი ვაკანსიები, მათი შეფასებები და მომზადებული სამოტივაციო წერილები ჩანს.",
        projectBuildingLabel: "რას ვქმნი",
        mediaEnlargeLabel: "დემო ვიდეოს გადიდება",
        mediaCloseLabel: "დახურვა",
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
    // Translated text above the viewport changes height, which would shift the
    // page; keep the section under the nav at the same spot on screen.
    const navBottom = nav.getBoundingClientRect().bottom;
    const anchor = pageSections.find((section) => section.getBoundingClientRect().bottom > navBottom);
    const anchorTop = anchor?.getBoundingClientRect().top;

    currentLanguage = currentLanguage === "en" ? "ka" : "en";
    localStorage.setItem("language", currentLanguage);
    applyLanguage(currentLanguage);

    if (anchor) {
        window.scrollBy({ top: anchor.getBoundingClientRect().top - anchorTop, behavior: "instant" });
    }
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

    document.querySelectorAll("[data-i18n-label]").forEach((element) => {
        const translation = languageTranslations[element.dataset.i18nLabel];

        if (translation !== undefined) {
            element.setAttribute("aria-label", translation);
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

if (reducedMotion.matches) {
    document.querySelectorAll("video[autoplay]").forEach((video) => {
        video.removeAttribute("autoplay");
        video.pause();
    });
}

setupMediaDialogs();

function setupMediaDialogs() {
    document.querySelectorAll("[data-media-dialog]").forEach((button) => {
        const dialog = document.getElementById(button.dataset.mediaDialog);
        const video = dialog.querySelector("video");

        button.addEventListener("click", () => {
            dialog.showModal();

            if (!reducedMotion.matches) {
                video.play().catch(() => {});
            }
        });

        // A click outside the video lands on the dialog element itself (the backdrop).
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });

        dialog.querySelector(".media-dialog-close").addEventListener("click", () => dialog.close());
        dialog.addEventListener("close", () => video.pause());
    });
}
