document.addEventListener("DOMContentLoaded", () => {
    const heroElements = [
        { selector: ".hero-heading", delay: 100 },
        { selector: ".hero-image", delay: 250 },
        { selector: ".hero-paragraph", delay: 400 },
        { selector: ".hero-cta-button", delay: 550 }
    ];

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    heroElements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);

        if (!element) return;

        if (reducedMotion) {
            element.classList.add("is-visible");
            return;
        }

        element.style.transitionDelay = `${delay}ms`;
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            heroElements.forEach(({ selector }) => {
                document.querySelector(selector)?.classList.add("is-visible");
            });
        });
    });


    /* =========================
   ABOUT ANIMATIONS
========================= */

const aboutElements = [
    { selector: ".about-left .label", delay: 0 },
    { selector: ".about-heading", delay: 120 },
    { selector: ".about-center", delay: 200 },
    { selector: ".about-paragraph:nth-child(1)", delay: 300 },
    { selector: ".about-paragraph:nth-child(2)", delay: 420 },
    { selector: ".about-link-wrapper", delay: 540 }
];

const aboutSection = document.querySelector(".about-section");

if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            aboutElements.forEach(({ selector, delay }) => {
                const element = document.querySelector(selector);

                if (!element) return;

                if (!reducedMotion) {
                    element.style.transitionDelay = `${delay}ms`;
                }

                element.classList.add("is-visible");
            });

            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.5
    });

    aboutObserver.observe(aboutSection);
}

/* =========================
   PROPERTY ANIMATIONS
========================= */

const propertyHeading = document.querySelector(".property-heading-lg");
const propertyParagraph = document.querySelector(".property-paragraph");

const propertyContentObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target === propertyHeading) {
            propertyHeading.classList.add("is-visible");
        }

        if (entry.target === propertyParagraph) {
            if (!reducedMotion) {
                propertyParagraph.style.transitionDelay = "150ms";
            }

            propertyParagraph.classList.add("is-visible");
        }

        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.5
});

if (propertyHeading) {
    propertyContentObserver.observe(propertyHeading);
}

if (propertyParagraph) {
    propertyContentObserver.observe(propertyParagraph);
}


/* Property Cards */

const propertyGrid = document.querySelector("#property-grid");

if (propertyGrid) {
    const propertyCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const card = entry.target;
            const cards = [...propertyGrid.querySelectorAll(".property-card")];
            const index = cards.indexOf(card);

            if (!reducedMotion) {
                card.style.transitionDelay = `${(index % 2) * 150}ms`;
            }

            card.classList.add("is-visible");
            observer.unobserve(card);
        });
    }, {
        threshold: 0.2
    });

    const observePropertyCards = () => {
        propertyGrid.querySelectorAll(".property-card:not(.is-visible)").forEach((card) => {
            propertyCardObserver.observe(card);
        });
    };

    const propertyMutationObserver = new MutationObserver(observePropertyCards);

    propertyMutationObserver.observe(propertyGrid, {
        childList: true
    });

    observePropertyCards();
}

/* =========================
   JOURNAL ANIMATIONS
========================= */

const journalElements = [
    { selector: ".blog-content .second-heading-lg", delay: 0 },
    { selector: ".blog-paragraph", delay: 150 },
    { selector: ".blog-link-wrapper", delay: 300 },
    { selector: ".blog-imgage-wrapper", delay: 350 }
];

const journalSection = document.querySelector(".blog-section");

if (journalSection) {
    const journalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            journalElements.forEach(({ selector, delay }) => {
                const element = journalSection.querySelector(selector);

                if (!element) return;

                if (!reducedMotion) {
                    element.style.transitionDelay = `${delay}ms`;
                }

                element.classList.add("is-visible");
            });

            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.3
    });

    journalObserver.observe(journalSection);
}

/* =========================
   CTA ANIMATIONS
========================= */

const ctaElements = [
    { selector: ".cta-heading", delay: 0 },
    { selector: ".cta-paragraph", delay: 150 },
    { selector: ".contact-form", delay: 300 }
];

const ctaSection = document.querySelector(".cta-section");

if (ctaSection) {
    const ctaObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            ctaElements.forEach(({ selector, delay }) => {
                const element = ctaSection.querySelector(selector);

                if (!element) return;

                if (!reducedMotion) {
                    element.style.transitionDelay = `${delay}ms`;
                }

                element.classList.add("is-visible");
            });

            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.3
    });



    ctaObserver.observe(ctaSection);
}

});

