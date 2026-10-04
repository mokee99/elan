async function loadComponent(selector, path) {
    const container = document.querySelector(selector);

    if (!container) return;

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load ${path}`);
        }

        container.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}


function initNavbar() {
    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".menu-button");
    const mobileLinks = navbar?.querySelectorAll(".mobile-menu-links a");

    if (!navbar || !menuButton) return;

    function closeMenu() {
        navbar.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");

        document.body.style.overflow = "";
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("is-open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
}

async function initComponents() {
    await Promise.all([
        loadComponent("#navbar", "./components/navbar.html"),
        loadComponent("#footer", "./components/footer.html")
    ]);

    initNavbar();
}


initComponents();