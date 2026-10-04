/* =========================================================
   GOWTHAMI R PORTFOLIO - JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close menu after clicking a link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !subject || !message) {

            formMessage.textContent =
                "Please fill in all the fields.";

            return;

        }


        /*
         * GitHub Pages is a static website.
         * Therefore the form cannot directly send email
         * without a backend/form service.
         *
         * This creates an email draft using mailto.
         */

        const mailSubject =
            encodeURIComponent(
                subject + " - Portfolio Contact"
            );

        const mailBody =
            encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );


        window.location.href =
            `mailto:gowthamiragupathi790@gmail.com?subject=${mailSubject}&body=${mailBody}`;


        formMessage.textContent =
            "Opening your email application...";

    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 130;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.style.color = "#2563eb";

        }

    });

});


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.classList.add("image-error");

    });

});
/* =========================================================
   HERO ROLE AUTO ROTATION
   ========================================================= */

const roleText = document.getElementById("roleText");

const roles = [
    "AI & Data Science Student",
    "Full-Stack Web Developer",
    "Machine Learning Practitioner",
    "Data Analytics Developer",
    "Cybersecurity & GRC Learner",
    "Generative AI Developer"
];

let roleIndex = 0;

if (roleText) {

    setInterval(() => {

        roleText.style.opacity = "0";
        roleText.style.transform = "translateY(8px)";

        setTimeout(() => {

            roleIndex =
                (roleIndex + 1) % roles.length;

            roleText.textContent =
                roles[roleIndex];

            roleText.style.opacity = "1";
            roleText.style.transform = "translateY(0)";

        }, 350);

    }, 2500);

}
/* =========================================================
   DARK / LIGHT THEME
   ========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


/* Load saved theme */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    if (themeIcon) {

        themeIcon.className =
            "fa-solid fa-sun";

    }

}


/* Toggle theme */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            /* Save preference */

            localStorage.setItem(
                "portfolio-theme",
                isDark
                    ? "dark"
                    : "light"
            );


            /* Change icon */

            if (themeIcon) {

                themeIcon.className =
                    isDark
                        ? "fa-solid fa-sun"
                        : "fa-solid fa-moon";

            }

        }
    );

}
/* ==========================================
   LIGHT MODE ONLY
========================================== */

document.body.classList.remove("dark-mode");

localStorage.removeItem("gowthami-theme");


if (themeToggle) {

    const icon = themeToggle.querySelector("i");

    if (icon) {
        icon.className = "fa-solid fa-moon";
    }

    themeToggle.title = "Light Mode";
    themeToggle.setAttribute("aria-label", "Light Mode");

    /* Disable dark mode switching */
    themeToggle.addEventListener("click", function () {
        document.body.classList.remove("dark-mode");

        if (icon) {
            icon.className = "fa-solid fa-moon";
        }
    });
}