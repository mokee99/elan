const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector(".menu-button");

if (navbar && menuButton) {
    menuButton.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("is-open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";
    });
}