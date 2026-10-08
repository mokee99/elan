document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ABOUT HERO ANIMATIONS
    ========================= */

    const heroElements = [
        { selector: ".about-hero-bg img", delay: 100 },
        { selector: ".about-hero-heading", delay: 300 },
        { selector: ".about-hero-pagragraph", delay: 550 }
    ];

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    heroElements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);

        if (!element) return;

        if (!reducedMotion) {
            element.style.transitionDelay = `${delay}ms`;
        }
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            heroElements.forEach(({ selector }) => {
                document.querySelector(selector)?.classList.add("is-visible");
            });
        });
    });


    /* =========================
   CURATED ANIMATIONS
========================= */

const curatedElements = [
    { selector: ".curated-heading", delay: 0 },
    { selector: ".curated-paragraph", delay: 150 },
    { selector: ".curated-image-lg", delay: 0 },
    { selector: ".curated-image-sm", delay: 350 }
];

const curatedObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const config = curatedElements.find(({ selector }) => element.matches(selector));

        if (!config) return;

        if (!reducedMotion) {
            element.style.transitionDelay = `${config.delay}ms`;
        }

        element.classList.add("is-visible");
        observer.unobserve(element);
    });
}, {
    threshold: 0.25
});

curatedElements.forEach(({ selector }) => {
    const element = document.querySelector(selector);

    if (!element) return;

    if (selector === ".curated-image-lg") {
        const imageWrapper = document.querySelector(".curated-images");

        if (!imageWrapper) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                element.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.25
        });

        imageObserver.observe(imageWrapper);
        return;
    }

    curatedObserver.observe(element);
});



/* =========================
   CINEMATIC ANIMATIONS
========================= */

const cinematicSection = document.querySelector(".about-cinematic-section");
const cinematicImage = document.querySelector(".cinematic-wrapper img");

if (cinematicSection && cinematicImage && !reducedMotion) {
    let ticking = false;

    const updateCinematic = () => {
        const rect = cinematicSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const progress = Math.min(
            Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0),
            1
        );

        const scale = 1.12 - progress * 0.12;
        const translateY = -20 + progress * 40;

        cinematicImage.style.transform = `scale(${scale}) translateY(${translateY}px)`;

        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateCinematic);
        }
    }, { passive: true });

    window.addEventListener("resize", updateCinematic);

    updateCinematic();
}


/* =========================
   PHILOSOPHY ANIMATIONS
========================= */

const philosophyElements = [
    { selector: ".phil-content-wrapper .label-md", delay: 0 },
    { selector: ".phil-heading", delay: 150 },
    { selector: ".phil-paragraph:nth-of-type(1)", delay: 300 },
    { selector: ".phil-paragraph:nth-of-type(2)", delay: 450 },
    { selector: ".phil-img", delay: 200 }
];

const philosophyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        const config = philosophyElements.find(({ selector }) => {
            return element.matches(selector);
        });

        if (!config) return;

        if (!reducedMotion) {
            element.style.transitionDelay = `${config.delay}ms`;
        }

        element.classList.add("is-visible");
        observer.unobserve(element);
    });
}, {
    threshold: 0.2
});

philosophyElements.forEach(({ selector }) => {
    const element = document.querySelector(selector);

    if (!element) return;

    if (selector === ".phil-img") {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                element.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.2
        });

        imageObserver.observe(document.querySelector(".philosophy-main-wrapper"));
        return;
    }

    philosophyObserver.observe(element);
});

});