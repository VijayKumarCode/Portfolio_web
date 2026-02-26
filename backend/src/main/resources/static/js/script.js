document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("hamburger-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        toggleBtn.classList.toggle("open");

        const expanded =
            toggleBtn.getAttribute("aria-expanded") === "true";
        toggleBtn.setAttribute("aria-expanded", !expanded);
    });

});