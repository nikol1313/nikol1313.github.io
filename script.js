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
        introTitle: "<span class=\"intro-role\">Web Development</span><span class=\"intro-separator\" aria-hidden=\"true\">|</span><span class=\"intro-role intro-role-accent\">AI, Testing &amp; Automation</span>",
        portraitAlt: "Portrait of Nikusha Avsajanishvili",
        introCta: "Open to internships and junior roles —",
        cvDownload: "download my CV",
        emailCopyLabel: "Copy email address",
        emailCopied: "Email address copied",
        emailCopyFailed: "Could not copy the email address",
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
        aboutIntro: "I'm a third-year Computer Science student whose main interests are web development and automation.",
        aboutDescription: "I fell in love with programming because code makes it possible to turn ideas into real, working products. Today I build web projects, work on both the backend and the frontend, and automate testing and other repetitive development tasks.",
        aboutAutomation: "I'm especially interested in building web applications that solve real problems and make people's everyday work easier. I enjoy the process of turning an idea into a functional product — from understanding the problem to building the interface and logic. Along the way, I use AI as a development tool that speeds up writing code, debugging, and learning new technologies. I'm also constantly looking for ways to automate routine processes, such as testing, so repetitive tasks get done faster and more efficiently.",
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
        projectIphoneHighlight3: "Users set a target price and get a Telegram alert the moment it’s reached.",
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
        introTitle: "<span class=\"intro-role\">ვებ დეველოპმენტი</span><span class=\"intro-separator\" aria-hidden=\"true\">|</span><span class=\"intro-role intro-role-accent\">AI, ტესტირება და ავტომატიზაცია</span>",
        portraitAlt: "ნიკუშა ავსაჯანიშვილის პორტრეტი",
        introCta: "ღია ვარ სტაჟირებისა და junior პოზიციებისთვის —",
        cvDownload: "ჩამოტვირთე ჩემი CV",
        emailCopyLabel: "ელფოსტის მისამართის კოპირება",
        emailCopied: "ელფოსტის მისამართი დაკოპირდა",
        emailCopyFailed: "ელფოსტის მისამართის კოპირება ვერ მოხერხდა",
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
        aboutIntro: "ვარ კომპიუტერული მეცნიერების მესამე კურსის სტუდენტი, რომლის ძირითადი ინტერესებია ვებდეველოპმენტი და ავტომატიზაცია.",
        aboutDescription: "პროგრამირება იმ შესაძლებლობამ შემაყვარა, რომ კოდის დახმარებით იდეები რეალურ, მოქმედ პროდუქტებად შეიძლება იქცეს. დღეს ვქმნი ვებ პროექტებს, ვმუშაობ როგორც ბექენდის, ისე ფრონტენდის მიმართულებით და ვაავტომატიზირებ ტესტირებასა და სხვა განმეორებად დეველოპმენტის ამოცანებს.",
        aboutAutomation: "განსაკუთრებით მაინტერესებს ისეთი ვებაპლიკაციების შექმნა, რომლებიც რეალურ პრობლემებს აგვარებს და ადამიანებს ყოველდღიურ საქმიანობას უმარტივებს. მომწონს იდეის ფუნქციურ პროდუქტად გარდაქმნის პროცესი — პრობლემის გააზრებიდან ინტერფეისისა და ლოგიკის შექმნამდე. ამ პროცესში AI-ს ვიყენებ როგორც დეველოპმენტის ხელსაწყოს, რომელიც კოდის წერას, დებაგინგსა და ახალი ტექნოლოგიების ათვისებას აჩქარებს. ასევე განუწყვეტლივ ვეძებ რუტინული პროცესების (მაგ. ტესტირების) ავტომატიზაციის გზებს, რათა განმეორებადი ამოცანები უფრო სწრაფად და ეფექტურად შესრულდეს.",
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
        projectIphoneHighlight3: "მომხმარებელი სასურველ ფასს ადგენს და მისი მიღწევისთანავე Telegram-ზე შეტყობინებას იღებს.",
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

setupEmailCopy();
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

function setupEmailCopy() {
    const button = document.querySelector(".email-copy");

    if (!button) {
        return;
    }

    // Kept out of the HTML so scrapers don't find the address.
    const email = ["avsajanishvilinikol", "gmail.com"].join("@");
    const address = button.querySelector(".email-address");
    const status = button.parentElement.querySelector("[role='status']");
    const obfuscated = address.textContent;
    let resetTimer = null;

    button.addEventListener("click", () => {
        clearTimeout(resetTimer);

        Promise.resolve()
            .then(() => navigator.clipboard.writeText(email))
            .then(() => {
                address.textContent = "copied ✓";
                status.textContent = translations[currentLanguage].emailCopied;
                resetTimer = setTimeout(() => {
                    address.textContent = obfuscated;
                    status.textContent = "";
                }, 1500);
            })
            .catch(() => {
                // Without clipboard access, reveal the address so it can be copied by hand.
                address.textContent = email;
                status.textContent = translations[currentLanguage].emailCopyFailed;
            });
    });
}
