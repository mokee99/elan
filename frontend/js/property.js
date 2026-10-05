import { sanityFetch } from "./sanity-client.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const query = `
    *[_type == "property" && slug.current == "${slug}"][0] {
        title,
        location,
        "thumbnailImage": thumbnailImage.asset->url,
        thumbnailBedrooms,
        thumbnailBathrooms,

        "mainImage": mainImage.asset->url,
        "topRightImage": topRightImage.asset->url,
        "bottomLeftImage": bottomLeftImage.asset->url,
        "bottomRightImage": bottomRightImage.asset->url,
        "gallery": gallery[].asset->url,

        indoorArea,
        floors,
        bedrooms,
        bathrooms,

        viewTypes[] {
            title,
            "icon": icon.asset->url
        },

        descriptionParagraphOne,
        descriptionParagraphTwo,
        descriptionParagraphThree,

        features[] {
            title,
            "icon": icon.asset->url
        },

        "floorPlanImage": floorPlanImage.asset->url,
        "floorPlanFile": floorPlanFile.asset->url,

        propertyDetails[] {
            label,
            value
        }
    }
`;

const similarQuery = `
    *[
        _type == "property" &&
        slug.current != "${slug}"
    ][0...2] {
        title,
        location,
        "slug": slug.current,
        "thumbnailImage": thumbnailImage.asset->url,
        similarBedrooms,
        similarBathrooms,
        similarIndoorArea
    }
`;

let galleryImages = [];
let currentGalleryIndex = 0;

async function loadProperty() {
    if (!slug) {
        console.error("No property slug found");
        return;
    }

    try {
        const property = await sanityFetch(query);

        if (!property) {
            console.error("Property not found");
            return;
        }

        // PAGE TITLE
        document.title = `${property.title} | ELAN Luxury Real Estate`;

        // HERO GALLERY
        const mainImage = document.querySelector("#property-main-image");
        const topRightImage = document.querySelector("#property-top-right-image");
        const bottomLeftImage = document.querySelector("#property-bottom-left-image");
        const bottomRightImage = document.querySelector("#property-bottom-right-image");

        mainImage.src = property.mainImage;
        mainImage.alt = property.title;

        topRightImage.src = property.topRightImage;
        topRightImage.alt = property.title;

        bottomLeftImage.src = property.bottomLeftImage;
        bottomLeftImage.alt = property.title;

        bottomRightImage.src = property.bottomRightImage;
        bottomRightImage.alt = property.title;

        galleryImages = property.gallery || [];

        // PROPERTY INTRO
        document.querySelector("#property-title").textContent = property.title;
        document.querySelector("#property-location").textContent = property.location;

        // STATS
        document.querySelector("#property-area").textContent = property.indoorArea;
        document.querySelector("#property-floors").textContent = property.floors;
        document.querySelector("#property-bedrooms").textContent = property.bedrooms;
        document.querySelector("#property-bathrooms").textContent = property.bathrooms;

        // VIEW TYPES
        const viewTypes = document.querySelector("#property-view-types");

        viewTypes.innerHTML = (property.viewTypes || []).map((view) => {
            return `
                <div class="property-view-type">
                    <img src="${view.icon}" alt="">
                    <span>${view.title}</span>
                </div>
            `;
        }).join("");

        // DESCRIPTION
        document.querySelector("#description-one").textContent = property.descriptionParagraphOne || "";
        document.querySelector("#description-two").textContent = property.descriptionParagraphTwo || "";
        document.querySelector("#description-three").textContent = property.descriptionParagraphThree || "";

        // FEATURES
        const features = document.querySelector("#property-features");

        features.innerHTML = (property.features || []).map((feature) => {
            return `
                <div class="property-feature">
                    <img src="${feature.icon}" alt="">
                    <span>${feature.title}</span>
                </div>
            `;
        }).join("");

        // FLOOR PLAN
        const floorPlanImage = document.querySelector("#floor-plan-image");
        const floorPlanButton = document.querySelector("#floor-plan-button");

        floorPlanImage.src = property.floorPlanImage;
        floorPlanImage.alt = `${property.title} floor plan`;

        if (property.floorPlanFile) {
            floorPlanButton.href = property.floorPlanFile;
        } else {
            floorPlanButton.removeAttribute("href");
        }

        // PROPERTY DETAILS
        const detailsList = document.querySelector("#property-details-list");

        detailsList.innerHTML = (property.propertyDetails || []).map((detail) => {
            return `
                <div class="property-detail-row">
                    <span>${detail.label}</span>
                    <span>${detail.value}</span>
                </div>
            `;
        }).join("");

        // GALLERY
        setupGallery(property.title);

        // SIMILAR RESIDENCES
        await loadSimilarProperties();

    } catch (error) {
        console.error("Error loading property:", error);
    }
}

async function loadSimilarProperties() {
    try {
        const properties = await sanityFetch(similarQuery);
        const grid = document.querySelector("#similar-residences-grid");

        grid.innerHTML = properties.map((property) => {
            return `
                <a class="similar-property-card" href="./property.html?slug=${property.slug}">
                    <img class="similar-property-image" src="${property.thumbnailImage}" alt="${property.title}">

                    <div class="similar-property-content">
                        <h3 class="similar-property-title">${property.title}</h3>
                        <p class="similar-property-location">${property.location}</p>

                        <div class="similar-property-info">
                            <div class="similar-property-stat">
                                <img src="./assets/icons/bed-icon.svg" alt="">
                                <span>${property.similarBedrooms}</span>
                            </div>

                            <div class="similar-property-stat">
                                <img src="./assets/icons/bath-icon.svg" alt="">
                                <span>${property.similarBathrooms}</span>
                            </div>

                            <div class="similar-property-stat">
                                <img src="./assets/icons/area-icon.svg" alt="">
                                <span>${property.similarIndoorArea}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        }).join("");

    } catch (error) {
        console.error("Error loading similar properties:", error);
    }
}

// GALLERY
function setupGallery(title) {
    const modal = document.querySelector("#gallery-modal");
    const openButton = document.querySelector("#open-gallery");
    const closeButton = document.querySelector("#gallery-close");
    const previousButton = document.querySelector("#gallery-prev");
    const nextButton = document.querySelector("#gallery-next");

    openButton.addEventListener("click", () => {
        if (!galleryImages.length) return;

        currentGalleryIndex = 0;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        renderGallery(title);
    });

    closeButton.addEventListener("click", closeGallery);

    previousButton.addEventListener("click", () => {
        currentGalleryIndex--;

        if (currentGalleryIndex < 0) {
            currentGalleryIndex = galleryImages.length - 1;
        }

        renderGallery(title);
    });

    nextButton.addEventListener("click", () => {
        currentGalleryIndex++;

        if (currentGalleryIndex >= galleryImages.length) {
            currentGalleryIndex = 0;
        }

        renderGallery(title);
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeGallery();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeGallery();
        }

        if (event.key === "ArrowLeft" && window.innerWidth > 767) {
            previousButton.click();
        }

        if (event.key === "ArrowRight" && window.innerWidth > 767) {
            nextButton.click();
        }
    });
}

function renderGallery(title) {
    const content = document.querySelector("#gallery-modal-content");

    if (window.innerWidth <= 767) {
        content.innerHTML = galleryImages.map((image, index) => {
            return `
                <img class="gallery-modal-image" src="${image}" alt="${title} gallery image ${index + 1}">
            `;
        }).join("");

        return;
    }

    content.innerHTML = `
        <img class="gallery-modal-image" src="${galleryImages[currentGalleryIndex]}" alt="${title} gallery image ${currentGalleryIndex + 1}">
    `;
}

function closeGallery() {
    const modal = document.querySelector("#gallery-modal");

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

loadProperty();


const descriptionToggle = document.querySelector("#description-toggle");
const descriptionExtra = document.querySelector("#description-extra");

if (descriptionToggle && descriptionExtra) {
    descriptionToggle.addEventListener("click", () => {
        const isOpen = descriptionExtra.classList.toggle("is-open");

        descriptionToggle.innerHTML = isOpen
            ? "SHOW LESS <span>↑</span>"
            : "SHOW MORE <span>↓</span>";

        descriptionToggle.setAttribute("aria-expanded", isOpen);
    });
}


