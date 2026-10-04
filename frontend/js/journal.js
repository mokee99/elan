import { sanityFetch } from "./sanity-client.js";

const journalGrid = document.querySelector("#journal-grid");

const query = `
    *[_type == "journal"] | order(date desc) {
        title,
        "slug": slug.current,
        label,
        date,
        "thumbnail": thumbnailImage.asset->url
    }
`;


async function loadArticles() {
    if (!journalGrid) return;

    try {
        const articles = await sanityFetch(query);

        journalGrid.innerHTML = articles.map((article) => {
            return `
                <a
                    class="journal-card"
                    href="./article.html?slug=${article.slug}"
                >
                    <img
                        class="journal-card-image"
                        src="${article.thumbnail}"
                        alt="${article.title}"
                    >

                    <div class="journal-card-overlay"></div>

                    <div class="journal-card-content">
                        <h3 class="journal-card-title">
                            ${article.title}
                        </h3>

                        <div class="journal-card-meta">
                            <span>${article.label}</span>
                            <span>•</span>
                            <span>${article.date}</span>
                        </div>
                    </div>
                </a>
            `;
        }).join("");

    } catch (error) {
        console.error("Error loading journal articles:", error);
    }
}

loadArticles();