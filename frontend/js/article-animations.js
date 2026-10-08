document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* =========================
       ARTICLE HERO ANIMATIONS
    ========================= */

    const heroElements = [
        { selector: ".article-hero-bg img", delay: 100 },
        { selector: ".article-hero-label", delay: 200 },
        { selector: ".article-hero-heading", delay: 350 },
        { selector: ".article-hero-meta", delay: 550 }
    ];

    const animateHero = () => {
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
    };

    document.addEventListener("article:loaded", animateHero);


    /* =========================
   CINEMATIC ANIMATIONS
========================= */

const cinematicWrappers = document.querySelectorAll(".cinematic-journal-wrapper");

if (cinematicWrappers.length && !reducedMotion) {
    let ticking = false;

    const updateCinematic = () => {
        const viewportHeight = window.innerHeight;

        cinematicWrappers.forEach((wrapper) => {
            const image = wrapper.querySelector(".cinematic-journal");
            if (!image) return;

            const rect = wrapper.getBoundingClientRect();

            if (rect.bottom < 0 || rect.top > viewportHeight) return;

            const progress = Math.min(
                Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0),
                1
            );

            const scale = 1.12 - progress * 0.12;
            const translateY = -20 + progress * 40;

            image.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        });

        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateCinematic);
        }
    }, { passive: true });

    window.addEventListener("resize", updateCinematic);
    window.addEventListener("load", updateCinematic);

    document.addEventListener("article:loaded", updateCinematic);

    updateCinematic();
}

/* =========================
   ARTICLE TEXT ANIMATIONS
========================= */

const articleTextBlocks = document.querySelectorAll(".article-text-block");

const textObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        if (!reducedMotion) {
            const siblings = [...element.parentElement.children]
                .filter((child) => getComputedStyle(child).display !== "none");

            const index = siblings.indexOf(element);

            element.style.transitionDelay = `${index * 150}ms`;
        }

        element.classList.add("is-visible");
        observer.unobserve(element);
    });
}, {
    threshold: 0.2
});

const observeArticleText = () => {
    articleTextBlocks.forEach((block) => {
        [...block.children].forEach((element) => {
            if (getComputedStyle(element).display === "none") return;

            textObserver.observe(element);
        });
    });
};

document.addEventListener("article:loaded", observeArticleText);

/* =========================
   RELATED ARTICLES ANIMATIONS
========================= */

const relatedHeading = document.querySelector(".related-articles-heading");
const relatedGrid = document.querySelector("#related-articles-grid");

const relatedObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        if (element.classList.contains("journal-card") && !reducedMotion) {
            element.style.transitionDelay = "150ms";
        }

        element.classList.add("is-visible");
        observer.unobserve(element);
    });
}, {
    threshold: 0.2
});

if (relatedHeading) {
    relatedObserver.observe(relatedHeading);
}

if (relatedGrid) {
    const observeRelatedCards = () => {
        relatedGrid.querySelectorAll(".journal-card:not(.is-visible)").forEach((card) => {
            relatedObserver.observe(card);
        });
    };

    const relatedMutationObserver = new MutationObserver(observeRelatedCards);

    relatedMutationObserver.observe(relatedGrid, {
        childList: true
    });

    observeRelatedCards();
}

});