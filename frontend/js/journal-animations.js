document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       JOURNAL HERO ANIMATIONS
    ========================= */

    const heroElements = [
        { selector: ".journal-hero-bg img", delay: 100 },
        { selector: ".journal-hero-content .hero-md", delay: 300 },
        { selector: ".journal-hero-paragraph", delay: 550 }
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
   JOURNAL LIST ANIMATIONS
========================= */

const journalHeading = document.querySelector(".journal-list-heading");

if (journalHeading) {
    const headingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.5
    });

    headingObserver.observe(journalHeading);
}


/* Journal Cards */

const journalGrid = document.querySelector("#journal-grid");

if (journalGrid) {
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const card = entry.target;
            const cards = [...journalGrid.querySelectorAll(".journal-card")];
            const index = cards.indexOf(card);

            if (!reducedMotion) {
                const columns = window.matchMedia("(max-width: 992px)").matches ? 1 : 2;
                card.style.transitionDelay = `${(index % columns) * 150}ms`;
            }

            card.classList.add("is-visible");
            observer.unobserve(card);
        });
    }, {
        threshold: 0.2
    });

    const observeJournalCards = () => {
        journalGrid.querySelectorAll(".journal-card:not(.is-visible)").forEach((card) => {
            cardObserver.observe(card);
        });
    };

    const journalMutationObserver = new MutationObserver(observeJournalCards);

    journalMutationObserver.observe(journalGrid, {
        childList: true
    });

    observeJournalCards();
}
});