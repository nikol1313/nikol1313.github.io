const modeButton = document.getElementById("mode");
const languageButton = document.getElementById("language");
const menuToggle = document.getElementById("menu-toggle");
const scrollTopButton = document.getElementById("scroll-top");
const nav = document.querySelector("nav");
const pageSections = Array.from(document.querySelectorAll("main > section"));
const pageLinks = Array.from(document.querySelectorAll(".navigation a"));
const introTitle = document.getElementById("intro-title");

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
        introTitle: "<span class=\"intro-role intro-role-accent\">QA Automation Engineer</span><span class=\"intro-separator\" aria-hidden=\"true\">·</span><span class=\"intro-role intro-role-accent\">Full-Stack Background</span>",
        introLead: "I started as a full-stack developer, so I know how code works and where it breaks. Now I write automated tests that catch problems before users do.",
        portraitAlt: "Portrait of Nikusha Avsajanishvili",
        introCta: "Interested in an internship or junior role —",
        cvDownload: "download my CV",
        emailCopyLabel: "Copy email address",
        emailCopied: "Email address copied",
        emailCopyFailed: "Could not copy the email address",
        experienceTitle: "Experience & Education",
        expHelpoDate: "May 2026 — Oct 2026",
        expHelpoTitle: "Full Stack Developer at Helpo",
        expHelpoPoints: "<li>Implemented nearest-driver assignment using PostgreSQL/PostGIS spatial queries.</li><li>Implemented real-time driver location updates using WebSockets.</li><li>Developed Playwright E2E tests covering the complete dispatch lifecycle.</li><li>Created Postman API tests validating nearest-driver selection against predefined coordinates and expected results.</li>",
        expRentoDate: "Dec 2025 — Jun 2026",
        expRentoTitle: "Junior SDET (Software Development Engineer in Test) at Rento Group",
        expRentoPoints: "<li>Built automated tests for the driver GPS navigation system, using simulated location feeds to check route calculation, real-time position updates and ETA accuracy.</li><li>Helped develop and maintain backend services for the navigation platform, including APIs for vehicle tracking and trip data.</li><li>Added the test suite to the CI/CD pipeline so every change to the navigation services is checked before deployment.</li><li>Established website availability and reliability monitoring with automated alerts to promptly address issues.</li><li>Worked with drivers to reproduce and fix navigation and tracking issues reported in the field.</li>",
        expAlteDate: "Sep 2024 — Expected 2028",
        expAlteTitle: "ALTE University, Tbilisi",
        expAltePoints: "<li>Bachelor’s degree in Computer Science, 3rd year.</li><li>Classes in Data Structures &amp; Algorithms, Python, HTML/CSS/JavaScript, C++, Calculus I/II, Linear &amp; Discrete Math, Physics, Object-Oriented Programming, Relational &amp; Non-Relational Databases, Networking...</li>",
        aboutTitle: "About Me",
        aboutIntro: "Hi, I’m Nikusha Avsajanishvili, a 19-year-old third-year Computer Science student from Tbilisi. I build programs to solve problems I run into myself, and I test them myself too. For example:",
        aboutProjects: "The <a href=\"#project-iphone\">iPhone price tracker</a>, because I got tired of checking five stores by hand. The <a href=\"#project-video\">video downloader</a>, because free online services were overloaded with ads and malware. And <a href=\"#project-altex\">AlteX</a>, because my university’s student portal was frustrating to use every day.",
        aboutStack: "I have experience with both the backend and the frontend, mostly with <strong>Python</strong> and <strong>TypeScript</strong>. What interests me most, though, is how to verify that a program works correctly and find bugs before users do. In the price tracker I write unit tests with <strong>pytest</strong> and integration tests with <strong>Testcontainers</strong>, while <strong>Playwright</strong> checks the main user flows.",
        aboutGoal: "I’m looking for QA Automation, Software Engineer, or similar roles where I can test real products and use my developer experience to catch bugs early.",
        skillsBackendTitle: "Backend",
        skillsFrontendTitle: "Frontend",
        skillsTestingTitle: "Testing",
        skillsToolsTitle: "CI/CD &amp; Tools",
        projectsTitle: "Projects",
        projectIphoneTitle: 'iPhone Tracker<span class="project-brand-tld">.ge</span>',
        projectIphoneDescription: "Compare iPhone prices across Georgian stores, see price history, and get notified when a price drops.",
        projectIphoneProblem: "When buying an iPhone, the same model costs different amounts at different stores, and prices change often. Checking every site by hand took a lot of time, and I still didn’t know whether it was a good moment to buy. So I built an app that collects prices automatically, keeps their history, and notifies me when a price drops to my target.",
        projectIphoneHighlight1: "Retailer-specific scrapers refresh the catalogs of 8 stores (Zoommer, Alta, iSpace, Elit Electronics, Megatechnica, Extra.ge, PCShop, Metromart) every 12 hours, and a parser recognizes differently worded titles, such as “Apple iPhone 17 (8GB/256GB) - Sage” and “iPhone 17, 256 GB, Sage”, as the same model, storage, and color.",
        projectIphoneHighlight2: "A Python, FastAPI, and async SQLAlchemy backend stores every price change in PostgreSQL and, based on 90 days of history, decides: “Buy now or wait?”",
        projectIphoneHighlight3: "Registered users can track phones and set a target-price or back-in-stock alert, delivered to their verified email.",
        projectIphoneHighlight4: "Authentication is protected by per-IP rate limiting. After 5 wrong passwords the account is locked for 15 minutes, and password reset links are single-use and expire in one hour.",
        projectIphoneHighlight5: "A responsive vanilla JavaScript interface offers filters, a side-by-side comparison of two phones, and recommendations based on intended use. Docker Compose and Nginx run the whole system, and pytest and HTTPX test the API.",
        projectVideoTitle: "Video Downloader",
        projectVideoDescription: "Paste a link, pick a quality or MP3, and watch it download live.",
        projectVideoProblem: "Growing up, I downloaded songs to my device from the “YouTube to MP3” sites that come up on Google, but they were full of ads and sometimes viruses. So I built my own clean downloader that fits my preferences and runs long downloads in the background.",
        projectVideoHighlight1: "yt-dlp downloads videos from YouTube and other supported sites in 360p, 720p, or 1080p, or as audio-only MP3, and FFmpeg merges video and audio.",
        projectVideoHighlight2: "A Node.js, Express, and TypeScript backend runs yt-dlp as background processes, two at a time, while PostgreSQL stores every download job.",
        projectVideoHighlight3: "A one-page React and TypeScript interface starts downloads, shows live progress, and saves finished files.",
        projectVideoHighlight4: "Prometheus collects app metrics at /metrics, and Docker Compose runs the whole stack.",
        projectVideoHighlight5: "GitHub Actions CI builds the app and runs integration tests against PostgreSQL on every push, including checks that invalid input is rejected.",
        projectStackLabel: "Stack",
        projectMore: "Read more",
        projectLess: "Show less",
        projectProblemLabel: "The problem",
        projectBuiltLabel: "What I built",
        projectGithubLink: "Explore on GitHub",
        projectIphoneFact1: "10+ Georgian retailers tracked automatically: prices are scraped and compared every 12 hours, so no manual checking",
        projectIphoneFact2: "90 days of price history in PostgreSQL powers a “buy now or wait” verdict based on real price trends",
        projectIphoneFact3: "110+ automated tests, including Playwright end-to-end browser tests. Every push goes through a CI pipeline before it ships",
        projectVideoFact1: "Runs yt-dlp jobs in the background, two at a time, with live progress",
        projectVideoFact2: "CI builds the app and runs integration tests against a real PostgreSQL on every push",
        projectAltexDescription: "A redesign of my university’s student portal, as a Chrome extension and an Android app.",
        projectAltexFact1: "25+ Playwright tests run on a desktop and a phone viewport against a mocked portal, in GitHub Actions on every push",
        projectAltexFact2: "Manual QA passes on desktop Chrome and Android caught dark-theme, small-screen, touch-target and performance bugs before release",
        projectAltexFact3: "Published on the Chrome Web Store and released as a signed Android APK, both built from one codebase",
        projectAltexProblem: "The Alte University student portal works, but it is hard to use: a dated design, cluttered pages, confusing navigation, and a timetable that is difficult to read. I open it every day, so I redesigned it.",
        projectAltexHighlight1: "Before each release I went through the portal’s pages by hand on desktop Chrome and on Android phones. One QA pass alone found search placeholders that were invisible on the dark theme, tables cut off on narrow screens, links smaller than a 44px touch target, low-contrast captions, and an Android back button that stopped working after the app was sent to the background.",
        projectAltexHighlight2: "I measured a freeze on the programme page and cut it from 2.5 s to 1.5 s by skipping layout for off-screen modules, and added an offline screen and a notice for outdated WebViews.",
        projectAltexHighlight3: "A Manifest V3 extension injects CSS and content scripts that restyle the dashboard, timetable, grades, finances, registration and login pages. It only reads what the portal already shows and sends nothing anywhere else.",
        projectAltexHighlight4: "The Android app loads the portal in a WebView and injects the same extension code, built straight from manifest.json, so there is one codebase to test. GitHub Actions builds an APK on every push and publishes a signed one to GitHub Releases on a version tag.",
        projectAltexHighlight5: "Playwright tests inject the extension into fake portal pages, so no real student account is needed. They check the login page, grade and counter tagging, labels for icon-only buttons, the exam countdown with a frozen clock (before, during and after an exam period), and that no request leaves the portal’s host.",
        mediaEnlargeLabel: "Enlarge demo video",
        mediaEnlargeImageLabel: "Enlarge screenshot",
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
        introTitle: "<span class=\"intro-role intro-role-accent\">QA ავტომატიზაციის ინჟინერი</span><span class=\"intro-separator\" aria-hidden=\"true\">·</span><span class=\"intro-role intro-role-accent\">Full-Stack გამოცდილებით</span>",
        introLead: "პროგრამირება full-stack დეველოპმენტით დავიწყე, ამიტომ ვიცი, როგორ მუშაობს კოდი და სად შეიძლება გაფუჭდეს. ახლა ვწერ ავტომატიზებულ ტესტებს, რომლებიც პრობლემებს მომხმარებლამდე ავლენს.",
        portraitAlt: "ჩემი პორტრეტი",
        introCta: "დაინტერესებული ვარ სტაჟირებით ან Junior პოზიციით —",
        cvDownload: "ჩამოტვირთე ჩემი CV",
        emailCopyLabel: "ელფოსტის მისამართის კოპირება",
        emailCopied: "ელფოსტის მისამართი დაკოპირდა",
        emailCopyFailed: "ელფოსტის მისამართის კოპირება ვერ მოხერხდა",
        experienceTitle: "გამოცდილება და განათლება",
        expHelpoDate: "მაისი 2026 — ოქტომბერი 2026",
        expHelpoTitle: "Full Stack Developer · Helpo",
        expHelpoPoints: "<li>PostgreSQL/PostGIS-ის სივრცითი მოთხოვნებით დავნერგე უახლოესი მძღოლის მინიჭება.</li><li>WebSockets-ით დავნერგე მძღოლის მდებარეობის რეალურ დროში განახლება.</li><li>Playwright-ით შევქმენი E2E ტესტები, რომლებიც დისპეტჩერიზაციის სრულ ციკლს ფარავს.</li><li>შევქმენი Postman API ტესტები, რომლებიც უახლოესი მძღოლის შერჩევას წინასწარ განსაზღვრული კოორდინატებითა და მოსალოდნელი შედეგებით ამოწმებს.</li>",
        expRentoDate: "დეკემბერი 2025 — ივნისი 2026",
        expRentoTitle: "Junior SDET (Software Development Engineer in Test) · Rento Group",
        expRentoPoints: "<li>შევქმენი ავტომატური ტესტები მძღოლების GPS ნავიგაციის სისტემისთვის: მდებარეობის სიმულირებული მონაცემებით მოწმდება მარშრუტის გამოთვლა, პოზიციის რეალურ დროში განახლება და მისვლის სავარაუდო დროის სიზუსტე.</li><li>ვმონაწილეობდი ნავიგაციის პლატფორმის ბექენდ სერვისების შემუშავებასა და მხარდაჭერაში, მათ შორის ავტომობილების თვალთვალისა და მგზავრობის მონაცემების API-ებში.</li><li>ტესტები CI/CD პროცესში ჩავრთე, ამიტომ ნავიგაციის სერვისების ყოველი ცვლილება გაშვებამდე მოწმდება.</li><li>დავნერგე ვებსაიტის ხელმისაწვდომობისა და საიმედოობის მონიტორინგი ავტომატური შეტყობინებებით, რათა პრობლემებზე რეაგირება დროულად მოხდეს.</li><li>ვმუშაობდი მძღოლებთან, რათა გამემეორებინა და გამომესწორებინა ნავიგაციისა და თვალთვალის ხარვეზები, რომლებიც მათ მუშაობისას შენიშნეს.</li>",
        expAlteDate: "სექტემბერი 2024 — 2028",
        expAlteTitle: "ALTE University, თბილისი",
        expAltePoints: "<li>კომპიუტერული მეცნიერების ბაკალავრიატი, მე-3 კურსი.</li><li>გავლილი საგნები: მონაცემთა სტრუქტურები და ალგორითმები, Python, HTML/CSS/JavaScript, C++, კალკულუსი I/II, წრფივი და დისკრეტული მათემატიკა, ფიზიკა, ობიექტზე ორიენტირებული პროგრამირება, რელაციური და არარელაციური მონაცემთა ბაზები, ქსელები...</li>",
        aboutTitle: "ჩემ შესახებ",
        aboutIntro: "გამარჯობა, მე ვარ ნიკუშა ავსაჯანიშვილი, 19 წლის, კომპიუტერული მეცნიერების მესამე კურსის სტუდენტი, თბილისიდან. ვქმნი პროგრამებს იმ პრობლემების გადასაჭრელად, რომლებსაც თავად ვაწყდები, და თავადვე ვტესტავ მათ. მაგალითად:",
        aboutProjects: "<a href=\"#project-iphone\">iPhone-ის ფასების ტრეკერი</a>, რადგან მომბეზრდა ხუთი მაღაზიის ხელით შემოწმება. <a href=\"#project-video\">ვიდეოების ჩამომტვირთავი</a>, რადგან უფასო ონლაინ სერვისები რეკლამებითა და ვირუსებით იყო გადატვირთული. და <a href=\"#project-altex\">AlteX</a>, რადგან ჩემი უნივერსიტეტის სტუდენტური პორტალით ყოველდღიური სარგებლობა მოუხერხებელი იყო.",
        aboutStack: "გამოცდილება მაქვს როგორც ბექენდის, ისე ფრონტენდის, ძირითადად <strong>Python</strong>-ითა და <strong>TypeScript</strong>-ით. ყველაზე მეტად კი მაინტერესებს, როგორ შევამოწმო პროგრამის გამართულობა და ვიპოვო ხარვეზები, სანამ მომხმარებელი იპოვის მათ. ფასების ტრეკერში unit ტესტებს <strong>pytest</strong>-ით ვწერ, ინტეგრაციულს <strong>Testcontainers</strong>-ით, ხოლო მომხმარებლის ძირითად სცენარებს <strong>Playwright</strong> ამოწმებს.",
        aboutGoal: "ვეძებ  QA Automation, Software engineer ან მსგავსს პოზიციებს, სადაც რეალურ პროდუქტებს გავტესტავ და დეველოპერის გამოცდილებით ხარვეზებს ადრეულ ეტაპზევე აღმოვაჩენ.",
        skillsBackendTitle: "ბექენდი",
        skillsFrontendTitle: "ფრონტენდი",
        skillsTestingTitle: "ტესტირება",
        skillsToolsTitle: "CI/CD და ხელსაწყოები",
        projectsTitle: "პროექტები",
        projectIphoneTitle: 'iPhone Tracker<span class="project-brand-tld">.ge</span>',
        projectIphoneDescription: "შეადარე iPhone-ის ფასები ქართულ მაღაზიებში, ნახე ფასის ისტორია და მიიღე შეტყობინება, როცა ფასი დაიკლებს.",
        projectIphoneProblem: "iPhone-ის ყიდვისას ერთსა და იმავე მოდელს სხვადასხვა მაღაზიაში განსხვავებული ფასი აქვს და ფასები ხშირად იცვლება. ყველა საიტის ხელით შემოწმებას ბევრი დრო მიჰქონდა, და მაინც არ ვიცოდი, ყიდვისთვის კარგი მომენტი იყო თუ არა. ამიტომ შევქმენი აპლიკაცია, რომელიც ფასებს ავტომატურად აგროვებს, ისტორიას ინახავს და მატყობინებს, როცა ფასი სასურველ ნიშნულამდე ჩამოდის.",
        projectIphoneHighlight1: "თითოეული მაღაზიისთვის ცალკე დაწერილი სკრეიპერები 8 მაღაზიის (Zoommer, Alta, iSpace, Elit Electronics, Megatechnica, Extra.ge, PCShop, Metromart) კატალოგს ყოველ 12 საათში აახლებენ. პარსერი კი სხვადასხვანაირ სათაურებს, მაგალითად „Apple iPhone 17 (8GB/256GB) - Sage“ და „iPhone 17, 256 GB, Sage“, ერთსა და იმავე მოდელად, მეხსიერებად და ფერად ცნობს.",
        projectIphoneHighlight2: "Python-ის, FastAPI-სა და async SQLAlchemy-ის ბექენდი ფასის ყველა ცვლილებას PostgreSQL-ში ინახავს. 90 დღის ისტორიაზე დაყრდნობით კი წყვეტს: „იყიდე ახლა თუ მოიცადე?“",
        projectIphoneHighlight3: "რეგისტრირებულ მომხმარებლებს შეუძლიათ ტელეფონებს თვალი ადევნონ და დააყენონ სამიზნე ფასის ან მარაგში დაბრუნების შეტყობინება, რომელიც დადასტურებულ ელფოსტაზე მოდის.",
        projectIphoneHighlight4: "ავტორიზაცია დაცულია IP-ის მიხედვით rate limiting-ით. 5 არასწორი პაროლის შემდეგ ანგარიში 15 წუთით იბლოკება, პაროლის აღდგენის ბმული კი ერთჯერადია და ერთ საათში იწურება.",
        projectIphoneHighlight5: "Vanilla JavaScript-ის რესპონსიულ ინტერფეისში არის ფილტრები, ორი ტელეფონის შედარება და რეკომენდაცია გამოყენების მიზნის მიხედვით. მთელ სისტემას Docker Compose და Nginx უშვებს, API-ს კი pytest და HTTPX ტესტავს.",
        projectVideoTitle: "Video Downloader",
        projectVideoDescription: "ჩასვი ბმული, აირჩიე ხარისხი ან MP3 და ადევნე თვალი ჩამოტვირთვას რეალურ დროში.",
        projectVideoProblem: "ბავშვობაში სიმღერებს ჩემს მოწყობილობაზე Google-ში ნაპოვნი „YouTube to MP3“ საიტებიდან ვტვირთავდი, მაგრამ ისინი რეკლამებითა და ზოგჯერ ვირუსებით იყო სავსე. ამიტომ შევქმენი საკუთარი, სუფთა ჩამომტვირთავი, რომელიც ერგება ჩემს მოთხოვნებს და ხანგრძლივ ჩამოტვირთვებს ფონურ რეჟიმში ამუშავებს.",
        projectVideoHighlight1: "yt-dlp ვიდეოებს YouTube-იდან და სხვა მხარდაჭერილი საიტებიდან 360p, 720p ან 1080p ხარისხით ან მხოლოდ MP3 აუდიოდ ტვირთავს, FFmpeg კი ვიდეოსა და აუდიოს აერთიანებს.",
        projectVideoHighlight2: "Node.js-ის, Express-ისა და TypeScript-ის ბექენდი yt-dlp-ს ფონურ პროცესებად, ერთდროულად ორს უშვებს, PostgreSQL კი ჩამოტვირთვის ყველა ამოცანას ინახავს.",
        projectVideoHighlight3: "React-ითა და TypeScript-ით აწყობილი ერთგვერდიანი ინტერფეისი ჩამოტვირთვას იწყებს, პროგრესს რეალურ დროში აჩვენებს და მზა ფაილებს ინახავს.",
        projectVideoHighlight4: "Prometheus აპლიკაციის მეტრიკებს /metrics მისამართზე აგროვებს, Docker Compose კი მთელ სისტემას უშვებს.",
        projectVideoHighlight5: "GitHub Actions CI ყოველ push-ზე აპლიკაციას აწყობს და PostgreSQL-ზე ინტეგრაციულ ტესტებს უშვებს, მათ შორის ამოწმებს, რომ არასწორი შეყვანა უარყოფილია.",
        projectStackLabel: "ტექნოლოგიები",
        projectMore: "მეტის ნახვა",
        projectLess: "ნაკლების ჩვენება",
        projectProblemLabel: "პრობლემა",
        projectBuiltLabel: "რა შევქმენი",
        projectGithubLink: "GitHub-ზე ნახვა",
        projectIphoneFact1: "10+ ქართული მაღაზია ავტომატურად: ფასები ყოველ 12 საათში გროვდება და შედარდება, ხელით შემოწმება აღარ არის საჭირო",
        projectIphoneFact2: "90 დღის ფასების ისტორია PostgreSQL-ში „იყიდე ახლა თუ მოიცადე?“ რჩევას ფასების რეალურ ტენდენციებზე აფუძნებს",
        projectIphoneFact3: "110+ ავტომატური ტესტი, მათ შორის Playwright-ის end-to-end ბრაუზერის ტესტები. ყოველი push გამოშვებამდე CI pipeline-ს გადის",
        projectVideoFact1: "yt-dlp ამოცანები ფონურად, ერთდროულად ორი, პროგრესით რეალურ დროში",
        projectVideoFact2: "CI ყოველ push-ზე აწყობს აპლიკაციას და რეალურ PostgreSQL-ზე ინტეგრაციულ ტესტებს უშვებს",
        projectAltexDescription: "ჩემი უნივერსიტეტის სტუდენტური პორტალის ახალი დიზაინი, Chrome-ის გაფართოებისა და Android აპლიკაციის სახით.",
        projectAltexFact1: "Playwright-ის 25+ ტესტი კომპიუტერისა და ტელეფონის ეკრანის ზომაზე, პორტალის იმიტაციაზე, GitHub Actions-ში ყოველ push-ზე ეშვება",
        projectAltexFact2: "კომპიუტერის Chrome-სა და Android-ზე ხელით ჩატარებულმა QA შემოწმებებმა გამოშვებამდე აღმოაჩინა მუქი თემის, პატარა ეკრანების, შეხების ზონებისა და სისწრაფის ხარვეზები",
        projectAltexFact3: "გამოქვეყნებულია Chrome Web Store-ში და გამოშვებულია ხელმოწერილ Android APK-ად, ორივე ერთი კოდიდან იწყობა",
        projectAltexProblem: "ალტე უნივერსიტეტის სტუდენტური პორტალი მუშაობს, მაგრამ მისი გამოყენება რთულია: მოძველებული დიზაინი, გადატვირთული გვერდები, დამაბნეველი ნავიგაცია და ცხრილი, რომლის წაკითხვაც ძნელია. მას ყოველდღე ვხსნი, ამიტომ დიზაინი თავიდან გავაკეთე.",
        projectAltexHighlight1: "ყოველი გამოშვების წინ პორტალის გვერდებს ხელით ვამოწმებდი კომპიუტერის Chrome-სა და Android ტელეფონებზე. მხოლოდ ერთმა QA შემოწმებამ აღმოაჩინა ძებნის ველის მინიშნებები, რომლებიც მუქ თემაზე არ ჩანდა, ვიწრო ეკრანებზე მოჭრილი ცხრილები, 44px-ზე პატარა შეხების ზონის მქონე ბმულები, დაბალი კონტრასტის წარწერები და Android-ის „უკან“ ღილაკი, რომელიც აპლიკაციის ფონში გადაყვანის შემდეგ აღარ მუშაობდა.",
        projectAltexHighlight2: "გავზომე პროგრამის გვერდის გაჭედვა და 2.5 წამიდან 1.5 წამამდე შევამცირე, რადგან ეკრანს მიღმა დარჩენილი მოდულებისთვის განლაგება აღარ ითვლება. დავამატე ოფლაინ ეკრანი და შეტყობინება მოძველებული WebView-ისთვის.",
        projectAltexHighlight3: "Manifest V3 გაფართოება ნერგავს CSS-სა და content script-ებს, რომლებიც ცვლის მთავარი გვერდის, ცხრილის, შეფასებების, ფინანსების, რეგისტრაციისა და ავტორიზაციის გვერდების იერს. ის მხოლოდ იმას კითხულობს, რასაც პორტალი ისედაც აჩვენებს, და არაფერს არსად აგზავნის.",
        projectAltexHighlight4: "Android აპლიკაცია პორტალს WebView-ში ხსნის და იმავე გაფართოების კოდს ნერგავს, რომელიც პირდაპირ manifest.json-იდან იწყობა, ამიტომ სატესტო კოდი ერთია. GitHub Actions ყოველ push-ზე APK-ს აწყობს, ვერსიის თეგზე კი ხელმოწერილს GitHub Releases-ზე აქვეყნებს.",
        projectAltexHighlight5: "Playwright-ის ტესტები გაფართოებას პორტალის იმიტირებულ გვერდებში ნერგავს, ამიტომ ნამდვილი სტუდენტის ანგარიში საჭირო არ არის. ისინი ამოწმებს ავტორიზაციის გვერდს, შეფასებებისა და მთვლელების მონიშვნას, მხოლოდ ხატულიანი ღილაკების წარწერებს, გამოცდების ათვლას გაჩერებული საათით (გამოცდების პერიოდამდე, მის დროს და მის შემდეგ) და იმას, რომ არც ერთი მოთხოვნა პორტალის ჰოსტს არ სცდება.",
        mediaEnlargeLabel: "დემო ვიდეოს გადიდება",
        mediaEnlargeImageLabel: "სქრინშოტის გადიდება",
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

// Text and theme are final now; reveal it, and re-enable transitions a frame later
// so the initial state doesn't animate in.
requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove("is-loading")));

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
    fitIntroTitle();
}

// Puts each role on its own line when the one-line title would be wider than the intro.
function fitIntroTitle() {
    introTitle.classList.remove("is-stacked");
    const available = introTitle.parentElement.clientWidth;
    introTitle.classList.toggle("is-stacked", introTitle.scrollWidth > available);
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
setupProjectDetails();

new ResizeObserver(fitIntroTitle).observe(introTitle.parentElement.parentElement);
document.fonts.ready.then(fitIntroTitle);
// fonts.ready can resolve before the web font is even requested; re-fit when it actually swaps in.
document.fonts.addEventListener("loadingdone", fitIntroTitle);

function setupMediaDialogs() {
    document.querySelectorAll("[data-media-dialog]").forEach((button) => {
        const dialog = document.getElementById(button.dataset.mediaDialog);
        const video = dialog.querySelector("video");
        const image = dialog.querySelector("img");

        button.addEventListener("click", () => {
            if (image) {
                const shown = button.querySelector("img");
                image.src = shown.src;
                image.alt = shown.alt;
            }

            dialog.showModal();

            if (video && !reducedMotion.matches) {
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
        dialog.addEventListener("close", () => video?.pause());
    });

    // Screenshot galleries: a thumbnail swaps the large image; the large image opens the dialog above.
    document.querySelectorAll(".project-gallery").forEach((gallery) => {
        const main = gallery.querySelector(".project-media");
        const thumbs = gallery.querySelectorAll(".project-thumb");

        thumbs.forEach((thumb) => {
            thumb.addEventListener("click", () => {
                main.src = thumb.dataset.src;
                main.alt = thumb.dataset.alt;
                thumbs.forEach((other) => other.setAttribute("aria-pressed", String(other === thumb)));
            });
        });
    });
}

// Opening "Read more" jumps the page so the opened section (the "Read more" row
// down to the end of its text) sits in the middle of the space below the nav,
// with equal room above and below. Taller than the screen: its top goes just
// under the nav instead, so the row stays visible. "Show less" jumps back to
// where the page was before "Read more" was opened.
function setupProjectDetails() {
    const topGap = 16;

    document.querySelectorAll(".project-details").forEach((details) => {
        let scrollBeforeOpen = null;

        details.addEventListener("toggle", () => {
            if (!details.open) {
                if (scrollBeforeOpen !== null) {
                    window.scrollTo({ top: scrollBeforeOpen, behavior: "instant" });
                    scrollBeforeOpen = null;
                }

                return;
            }

            scrollBeforeOpen = window.scrollY;

            const toggle = details.querySelector(".project-toggle").getBoundingClientRect();
            const body = details.querySelector(".project-details-body").getBoundingClientRect();
            const navBottom = nav.getBoundingClientRect().bottom;
            const available = window.innerHeight - navBottom;
            const height = body.bottom - toggle.top;
            const targetTop = height <= available - 2 * topGap
                ? navBottom + (available - height) / 2
                : navBottom + topGap;

            window.scrollBy({ top: toggle.top - targetTop, behavior: "instant" });
        });
    });
}
