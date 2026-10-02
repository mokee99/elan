import {sanityFetch} from './sanity-client.js'

const propertyGrid = document.querySelector('#property-grid')

const query = `
    *[_type == "property"] {
        title,
        "slug": slug.current,
        location,
        thumbnailBedrooms,
        thumbnailBathrooms,
        "thumbnailImage": thumbnailImage.asset->url
    }
`

async function loadProperties() {
    try {
        const properties = await sanityFetch(query)

        propertyGrid.innerHTML = properties.map((property) => {
            return `
                <a
                    class="property-card"
                    href="./property.html?slug=${property.slug}"
                >
                    <img
                        class="property-card-image"
                        src="${property.thumbnailImage}"
                        alt="${property.title}"
                    >

                    <div class="property-card-content">

                        <h3 class="property-card-title">
                            ${property.title}
                        </h3>

                        <div class="property-card-info">

                            <div class="property-card-stats">
                                <span>${property.thumbnailBathrooms}</span>
                                <span>${property.thumbnailBedrooms}</span>
                            </div>

                            <p class="property-card-location">
                                ${property.location}
                            </p>

                        </div>

                    </div>
                </a>
            `
        }).join('')

    } catch (error) {
        console.error('Error loading properties:', error)
    }
}

loadProperties()

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    const submitButton = contactForm.querySelector(".form-submit");
    const defaultButtonText = submitButton.textContent;

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        contactForm.classList.remove("is-error");

        submitButton.disabled = true;
        submitButton.textContent = "SENDING...";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            contactForm.reset();
            contactForm.classList.add("is-success");
        } catch (error) {
            console.error("Contact form error:", error);

            contactForm.classList.add("is-error");

            submitButton.disabled = false;
            submitButton.textContent = defaultButtonText;
        }
    });
}