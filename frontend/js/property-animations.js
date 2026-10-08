document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* =========================
       PROPERTY GALLERY ANIMATIONS
    ========================= */

    const galleryElements = [
        { selector: "#property-main-image", delay: 100 },
        { selector: "#property-top-right-image", delay: 250 },
        { selector: "#property-bottom-left-image", delay: 400 },
        { selector: "#property-bottom-right-image", delay: 550 },
        { selector: "#open-gallery", delay: 700 }
    ];

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const galleryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.2
    });

    const animateGallery = () => {
        galleryElements.forEach(({ selector, delay }) => {
            const element = document.querySelector(selector);

            if (!element) return;

            if (reducedMotion) {
                element.classList.add("is-visible");
                return;
            }

            if (mobileQuery.matches) {
                galleryObserver.observe(element);
            } else {
                element.style.transitionDelay = `${delay}ms`;
                element.classList.add("is-visible");
            }
        });
    };

    document.addEventListener("property:loaded", () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(animateGallery);
        });
    });

    /* =========================
   PROPERTY OVERVIEW ANIMATIONS
========================= */

const overviewElements = [
    { selector: ".property-title", delay: 0 },
    { selector: ".property-location", delay: 120 },
    { selector: ".property-viewing-button", delay: 240 },
    { selector: ".property-stats", delay: 0 },
    { selector: ".property-view-types", delay: 150 },
    { selector: ".property-description", delay: 300 }
];

const overviewObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        if (getComputedStyle(element).display === "none") {
            observer.unobserve(element);
            element.classList.add("is-visible");
            return;
        }

        const config = overviewElements.find(({ selector }) => {
            return element.matches(selector);
        });

        if (config && !reducedMotion) {
            element.style.transitionDelay = `${config.delay}ms`;
        }

        element.classList.add("is-visible");
        observer.unobserve(element);
    });
}, {
    threshold: 0.2
});

const observeOverview = () => {
    overviewElements.forEach(({ selector }) => {
        const element = document.querySelector(selector);

        if (element) {
            overviewObserver.observe(element);
        }
    });
};

document.addEventListener("property:loaded", observeOverview);

/* =========================
   FEATURES ANIMATIONS
========================= */

const featuresHeading = document.querySelector(
    ".property-features-wrapper > .property-section-heading"
);

const featuresGrid = document.querySelector("#property-features");

const featuresObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        element.classList.add("is-visible");
        observer.unobserve(element);
    });
}, {
    threshold: 0.2
});

if (featuresHeading) {
    featuresObserver.observe(featuresHeading);
}

const observeFeatures = () => {
    if (!featuresGrid) return;

    const features = [...featuresGrid.querySelectorAll(".property-feature")];

    features.forEach((feature, index) => {
        if (!reducedMotion) {
            const columns = window.matchMedia("(max-width: 767px)").matches ? 2 : 4;
            const delay = (index % columns) * 120;

            feature.style.transitionDelay = `${delay}ms`;
        }

        featuresObserver.observe(feature);
    });
};

document.addEventListener("property:loaded", observeFeatures);

/* =========================
   FLOOR PLAN + DETAILS ANIMATIONS
========================= */

const detailsElements = [
    { selector: ".floor-plan-button", delay: 150 },
    { selector: ".property-details-content > .property-section-heading", delay: 0 }
];

const detailsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        element.classList.add("is-visible");
        observer.unobserve(element);
    });
}, {
    threshold: 0.2
});

/* Floor Plan Image */

const floorPlanWrapper = document.querySelector(".floor-plan-image-wrapper");
const floorPlanSection = document.querySelector(".floor-plan-wrapper");

if (floorPlanWrapper && floorPlanSection) {
    const floorPlanObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            floorPlanSection.classList.add("is-visible");
            floorPlanWrapper.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.2
    });

    floorPlanObserver.observe(floorPlanSection);
}

/* Heading + Button */

detailsElements.forEach(({ selector, delay }) => {
    const element = document.querySelector(selector);

    if (!element) return;

    if (!reducedMotion) {
        element.style.transitionDelay = `${delay}ms`;
    }

    detailsObserver.observe(element);
});

/* Property Details Rows */

const detailsList = document.querySelector("#property-details-list");

const observeDetailsRows = () => {
    if (!detailsList) return;

    const rows = [...detailsList.querySelectorAll(".property-detail-row")];

    rows.forEach((row, index) => {
        if (!reducedMotion) {
            row.style.transitionDelay = `${(index % 4) * 120}ms`;
        }

        detailsObserver.observe(row);
    });
};

document.addEventListener("property:loaded", observeDetailsRows);

/* =========================
   SIMILAR RESIDENCES ANIMATIONS
========================= */

const similarHeading = document.querySelector(
    ".similar-residences-section .property-section-heading"
);

const similarGrid = document.querySelector("#similar-residences-grid");

const similarObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.1
});

if (similarHeading) {
    similarObserver.observe(similarHeading);
}

const observeSimilarCards = () => {
    if (!similarGrid) return;

    const cards = similarGrid.querySelectorAll(".similar-property-card");

    cards.forEach((card, index) => {
        if (card.dataset.animationObserved === "true") return;

        card.dataset.animationObserved = "true";

        if (!reducedMotion) {
            const isMobile = window.matchMedia("(max-width: 767px)").matches;

            card.style.transitionDelay = isMobile
                ? "0ms"
                : `${index * 150}ms`;
        }

        similarObserver.observe(card);
    });
};

if (similarGrid) {
    const similarMutationObserver = new MutationObserver(observeSimilarCards);

    similarMutationObserver.observe(similarGrid, {
        childList: true
    });

    observeSimilarCards();
}

});

