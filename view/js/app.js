// PRELOAD

const preloader = document.getElementById("preloader");

requestAnimationFrame(() => {
    preloader.classList.add("visible");
});

window.addEventListener("load", () => {
    setTimeout(() => {
        preloader.classList.remove("visible");
        preloader.classList.add("hidden");

        preloader.addEventListener("transitionend", () => {
            preloader.style.display = "none";
        }, { once: true });
    }, 1500);
});
