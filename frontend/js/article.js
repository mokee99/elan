import { sanityFetch } from "./sanity-client.js";


const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");


const query = `
    *[_type == "journal" && slug.current == "${slug}"][0] {
        title,
        label,
        date,
        readingTime,

        "heroDesktop": heroImage.asset->url,
        "heroTablet": heroImageTablet.asset->url,
        "heroMobile": heroImageMobile.asset->url,

        introHeading,
        italicText,
        introParagraph,

        "sectionOneImage": sectionOneImage.asset->url,
        sectionOneHeading,
        sectionOneParagraph,

        "sectionTwoImage": sectionTwoImage.asset->url,
        sectionTwoHeading,
        sectionTwoParagraph,

        quote
    }
`;

const relatedQuery = `
    *[
        _type == "journal" &&
        slug.current != "${slug}"
    ] | order(date desc) [0] {
        title,
        label,
        date,
        "slug": slug.current,
        "thumbnail": thumbnailImage.asset->url
    }
`;


function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(new Date(date));
}


async function loadArticle() {
    if (!slug) {
        console.error("No article slug found");
        return;
    }

    try {
        const article = await sanityFetch(query);

        if (!article) {
            console.error("Article not found");
            return;
        }


        // HERO

        document.querySelector("#article-label").textContent =
            article.label;

        document.querySelector("#article-title").textContent =
            article.title;

        document.querySelector("#article-date").textContent =
            formatDate(article.date).toUpperCase();

        document.querySelector("#article-reading-time").textContent =
            article.readingTime;


        const heroDesktop =
            document.querySelector("#article-hero-desktop");

        const heroTablet =
            document.querySelector("#article-hero-tablet");

        const heroMobile =
            document.querySelector("#article-hero-mobile");



        heroDesktop.src =
            article.heroDesktop;

        heroDesktop.alt =
            article.title;

        heroTablet.srcset =
            article.heroTablet;

        heroMobile.srcset =
            article.heroMobile;



        // INTRO

        document.querySelector("#section-one-heading").textContent =
            article.introHeading;


        const italicText =
            document.querySelector("#section-one-intro");

        if (article.italicText) {
            italicText.textContent =
                article.italicText;
        } else {
            italicText.style.display =
                "none";
        }


        document.querySelector("#section-one-paragraph").textContent =
            article.introParagraph;



        // SECTION ONE IMAGE

        const sectionOneImage =
            document.querySelector("#section-one-image");

        sectionOneImage.src =
            article.sectionOneImage;

        sectionOneImage.alt =
            article.sectionOneHeading;



        // SECTION ONE

        document.querySelector("#section-two-heading").textContent =
            article.sectionOneHeading;

        document.querySelector("#section-two-paragraph").textContent =
            article.sectionOneParagraph;



        // SECTION TWO IMAGE

        const sectionTwoImage =
            document.querySelector("#section-two-image");

        sectionTwoImage.src =
            article.sectionTwoImage;

        sectionTwoImage.alt =
            article.sectionTwoHeading;



        // SECTION TWO

        document.querySelector("#section-three-heading").textContent =
            article.sectionTwoHeading;

        document.querySelector("#section-three-paragraph").textContent =
            article.sectionTwoParagraph;



        // QUOTE

        const articleQuote =
            document.querySelector("#article-quote");

        if (article.quote) {
            articleQuote.textContent =
                article.quote;
        } else {
            articleQuote.style.display =
                "none";
        }



        // PAGE TITLE

        document.title =
            `${article.title} | ELAN Journal`;
            document.dispatchEvent(new Event("article:loaded"));

    } catch (error) {
        console.error("Error loading article:", error);
    }
}



async function loadRelatedArticle() {
    try {
        const article = await sanityFetch(relatedQuery);
        const grid = document.querySelector("#related-articles-grid");

        if (!article || !grid) return;

        grid.innerHTML = `
            <a class="journal-card" href="./article.html?slug=${article.slug}">
                <img class="journal-card-image" src="${article.thumbnail}" alt="${article.title}">
                <div class="journal-card-overlay"></div>

                <div class="journal-card-content">
                    <h3 class="journal-card-title">${article.title}</h3>

                    <div class="journal-card-meta">
                        <span>${article.label}</span>
                        <span>•</span>
                        <span>${formatDate(article.date).toUpperCase()}</span>
                    </div>
                </div>
            </a>
        `;

    } catch (error) {
        console.error("Error loading related article:", error);
    }
}

loadArticle();
loadRelatedArticle();