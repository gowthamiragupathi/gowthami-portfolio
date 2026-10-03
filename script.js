document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. TYPING ANIMATION
    ===================================================== */

    const typingText = document.querySelector(".typing-text");

    const words = [
        "AI & Data Science Student",
        "Machine Learning Enthusiast",
        "NLP Developer",
        "Frontend Developer",
        "Data Analytics Enthusiast",
        "Cybersecurity Learner"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (!isDeleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex);

            charIndex++;

            if (charIndex > currentWord.length) {

                isDeleting = true;

                setTimeout(typeEffect, 1500);

                return;
            }

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex);

            charIndex--;

            if (charIndex < 0) {

                charIndex = 0;

                isDeleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }
            }
        }

        setTimeout(
            typeEffect,
            isDeleting ? 60 : 110
        );
    }

    typeEffect();


    /* =====================================================
       2. NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       3. MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-links");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("show");

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("show")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }


    /* =====================================================
       4. CLOSE MOBILE MENU AFTER CLICK
    ===================================================== */

    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                if (navMenu) {
                    navMenu.classList.remove("show");
                }

                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {

                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");
                    }
                }
            });
        });


    /* =====================================================
       5. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================================
       6. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealSections =
        document.querySelectorAll("section");

    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.08
                }
            );

        revealSections.forEach(
            function (section) {

                sectionObserver.observe(section);
            }
        );

    } else {

        revealSections.forEach(
            function (section) {

                section.classList.add("visible");
            }
        );
    }


    /* =====================================================
       7. ACHIEVEMENT CARD ANIMATION
    ===================================================== */

    const achievementCards =
        document.querySelectorAll(
            "#achievements .achievement-card"
        );

    if (
        achievementCards.length &&
        "IntersectionObserver" in window
    ) {

        achievementCards.forEach(
            function (card, index) {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(60px)";

                card.style.transition =
                    "opacity .7s ease " +
                    (index * 120) +
                    "ms, transform .7s ease " +
                    (index * 120) +
                    "ms";
            }
        );


        const achievementObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        achievementCards.forEach(
            function (card) {

                achievementObserver.observe(card);
            }
        );
    }


    /* =====================================================
       8. ACHIEVEMENT COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;

    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(function (counter) {

            const target =
                parseInt(
                    counter.getAttribute(
                        "data-target"
                    )
                );

            if (isNaN(target)) return;

            const duration = 1500;

            const startTime =
                performance.now();

            function animateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const value =
                    Math.floor(
                        progress * target
                    );

                counter.textContent = value;

                if (progress < 1) {

                    requestAnimationFrame(
                        animateCounter
                    );

                } else {

                    counter.textContent = target;
                }
            }

            requestAnimationFrame(
                animateCounter
            );
        });
    }


    const achievementStats =
        document.querySelector(
            ".achievement-stats"
        );

    if (
        achievementStats &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            startCounters();

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.3
                }
            );

        counterObserver.observe(
            achievementStats
        );

    } else {

        startCounters();
    }


    /* =====================================================
       9. DARK / LIGHT MODE
    ===================================================== */

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;

        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );

        if (isDark) {

            icon.classList.remove(
                "fa-moon"
            );

            icon.classList.add(
                "fa-sun"
            );

            themeToggle.title =
                "Switch to Light Mode";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to Light Mode"
            );

        } else {

            icon.classList.remove(
                "fa-sun"
            );

            icon.classList.add(
                "fa-moon"
            );

            themeToggle.title =
                "Switch to Dark Mode";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to Dark Mode"
            );
        }
    }


    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

        } else {

            document.body.classList.remove(
                "dark-mode"
            );
        }

        localStorage.setItem(
            "gowthami-theme",
            theme
        );

        updateThemeIcon();
    }


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem(
            "gowthami-theme"
        );

    if (savedTheme === "dark") {

        applyTheme("dark");

    } else {

        applyTheme("light");
    }


    /* Theme button */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );

                applyTheme(
                    isDark
                        ? "light"
                        : "dark"
                );


                /* Button animation */

                themeToggle.animate(
                    [
                        {
                            transform:
                                "rotate(0deg) scale(1)"
                        },
                        {
                            transform:
                                "rotate(180deg) scale(1.15)"
                        },
                        {
                            transform:
                                "rotate(360deg) scale(1)"
                        }
                    ],
                    {
                        duration: 500,
                        easing: "ease-in-out"
                    }
                );
            }
        );
    }


    /* =====================================================
       10. SCROLL PROGRESS BAR
    ===================================================== */

    const progressBar =
        document.getElementById(
            "progress-bar"
        );

    function updateProgressBar() {

        if (!progressBar) return;

        const documentHeight =
            document.documentElement.scrollHeight;

        const windowHeight =
            window.innerHeight;

        const scrollable =
            documentHeight - windowHeight;

        if (scrollable <= 0) return;

        const progress =
            (window.scrollY / scrollable) * 100;

        progressBar.style.width =
            progress + "%";
    }

    window.addEventListener(
        "scroll",
        updateProgressBar
    );

    updateProgressBar();


    /* =====================================================
       11. CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    if (cursor) {

        document.addEventListener(
            "mousemove",
            function (event) {

                cursor.style.left =
                    event.clientX + "px";

                cursor.style.top =
                    event.clientY + "px";
            }
        );


        /* Cursor hover effect */

        const interactiveElements =
            document.querySelectorAll(
                "a, button, .skill-card, .project-card, .achievement-card"
            );

        interactiveElements.forEach(
            function (element) {

                element.addEventListener(
                    "mouseenter",
                    function () {

                        cursor.classList.add(
                            "cursor-hover"
                        );
                    }
                );

                element.addEventListener(
                    "mouseleave",
                    function () {

                        cursor.classList.remove(
                            "cursor-hover"
                        );
                    }
                );
            }
        );
    }


    /* =====================================================
       12. SCROLL TO TOP
    ===================================================== */

    const scrollTop =
        document.getElementById(
            "scrollTop"
        );

    function updateScrollTop() {

        if (!scrollTop) return;

        if (window.scrollY > 500) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");
        }
    }

    window.addEventListener(
        "scroll",
        updateScrollTop
    );

    updateScrollTop();


    /* =====================================================
       13. SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const id =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(id);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }
            );
        });


    /* =====================================================
       14. PROJECT CARD TILT EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    projectCards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -3;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;

                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;
                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "";
                }
            );
        }
    );


    /* =====================================================
       15. SKILL CARD TILT EFFECT
    ===================================================== */

    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );

    skillCards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -4;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        4;

                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;
                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "";
                }
            );
        }
    );


    /* =====================================================
       16. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(
            "#contact form"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    contactForm
                        .querySelector(
                            'input[type="text"]'
                        );

                const email =
                    contactForm
                        .querySelector(
                            'input[type="email"]'
                        );

                const subject =
                    contactForm
                        .querySelectorAll(
                            'input[type="text"]'
                        )[1];

                const message =
                    contactForm
                        .querySelector(
                            "textarea"
                        );


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {
                    return;
                }


                const mailSubject =
                    encodeURIComponent(
                        subject.value
                    );

                const mailBody =
                    encodeURIComponent(
                        "Name: " +
                        name.value +
                        "\n\nEmail: " +
                        email.value +
                        "\n\nMessage:\n" +
                        message.value
                    );


                window.location.href =
                    "mailto:gowthamiragupathi790@gmail.com" +
                    "?subject=" +
                    mailSubject +
                    "&body=" +
                    mailBody;
            }
        );
    }


    /* =====================================================
       17. IMAGE LAZY LOADING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(function (image) {

            if (
                !image.hasAttribute(
                    "loading"
                )
            ) {

                image.setAttribute(
                    "loading",
                    "lazy"
                );
            }
        });


    /* =====================================================
       18. PARALLAX HERO
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );

    if (heroImage) {

        window.addEventListener(
            "scroll",
            function () {

                const scroll =
                    window.scrollY;

                if (scroll < window.innerHeight) {

                    heroImage.style.transform =
                        `translateY(${scroll * 0.08}px)`;
                }
            }
        );
    }


    /* =====================================================
       19. EXPERIENCE CARD ANIMATION
    ===================================================== */

    const experienceCards =
        document.querySelectorAll(
            ".experience-card"
        );

    if (
        experienceCards.length &&
        "IntersectionObserver" in window
    ) {

        const experienceObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        experienceCards.forEach(
            function (card) {

                experienceObserver.observe(
                    card
                );
            }
        );
    }


    /* =====================================================
       20. CERTIFICATE CARD ANIMATION
    ===================================================== */

    const certificateCards =
        document.querySelectorAll(
            ".certificate-card"
        );

    if (
        certificateCards.length &&
        "IntersectionObserver" in window
    ) {

        const certificateObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        certificateCards.forEach(
            function (card) {

                certificateObserver.observe(
                    card
                );
            }
        );
    }


    /* =====================================================
       21. PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "🚀 Gowthami Portfolio Loaded"
    );

    console.log(
        "✨ Premium animations enabled"
    );


    console.log(
        "🏆 Achievement counters enabled"
    );

});