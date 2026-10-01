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