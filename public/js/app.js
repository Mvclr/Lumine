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

// POP-UP PERFIL

function openProfilePopup() {
  document.getElementById('profile-overlay').classList.remove('hidden');
}

function closeProfilePopup() {
  document.getElementById('profile-overlay').classList.add('hidden');
}
