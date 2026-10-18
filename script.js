/* ========================================
   HAMHPRHEY ELIA PORTFOLIO
   Navigation, animations and interactions
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    // MOBILE NAVIGATION

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navigationLinks = document.querySelectorAll(".nav-link");
    const navContact = document.querySelector(".nav-contact");


    function closeMenu() {

        if (!menuToggle || !navLinks) {
            return;
        }

        menuToggle.classList.remove("open");
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        document.body.classList.remove("menu-open");
    }


    function openMenu() {

        menuToggle.classList.add("open");
        navLinks.classList.add("open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        document.body.classList.add("menu-open");
    }


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        // Close menu after selecting a navigation link.

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });


        if (navContact) {

            navContact.addEventListener("click", function () {
                closeMenu();
            });

        }


        // Close menu when tapping outside it.

        document.addEventListener("click", function (event) {

            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (
                navLinks.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMenu();
            }

        });


        // Close the menu when the Escape key is pressed.

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        // Restore the desktop layout when the viewport grows.

        window.addEventListener("resize", function () {

            if (window.innerWidth > 760) {
                closeMenu();
            }

        });

    }



    // AUTOMATIC FOOTER YEAR

    const yearElement = document.getElementById("current-year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }



    // REVEAL ELEMENTS AS THEY ENTER THE VIEWPORT

    const revealElements = document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }

        );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        // Fallback for browsers without IntersectionObserver.

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }



    // ACTIVE NAVIGATION LINK

    const sections = document.querySelectorAll("main section[id]");


    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentSectionId = entry.target.id;

                    navigationLinks.forEach(function (link) {

                        const targetId = link.getAttribute("href");

                        if (targetId === "#" + currentSectionId) {

                            link.classList.add("active");

                        } else {

                            link.classList.remove("active");

                        }

                    });

                });

            },

            {
                rootMargin: "-25% 0px -65% 0px",
                threshold: 0
            }

        );


        sections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }



    // KEEP CONTACT LINKS AS NORMAL EXTERNAL ACTIONS.
    // Phone, WhatsApp and Gmail are opened through their HTML href links.

});