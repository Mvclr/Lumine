// PRELOAD

const preloader = document.getElementById("preloader");

requestAnimationFrame(() => {
  preloader.classList.add("visible");
});

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.remove("visible");
    preloader.classList.add("hidden");

    preloader.addEventListener(
      "transitionend",
      () => {
        preloader.style.display = "none";
      },
      { once: true }
    );
  }, 1500);
});

// POP-UP PERFIL

function openProfilePopup() {
  document.getElementById("profile-overlay").classList.remove("hidden");
}

function closeProfilePopup() {
  document.getElementById("profile-overlay").classList.add("hidden");
}

// UPLOAD IMAGE

const profileImg = document.getElementById('profile-img');
const fileInput = document.getElementById('file-input');

profileImg.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('profileImage', file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        profileImg.src = data.imageUrl + '?t=' + new Date().getTime();
      })
      .catch(err => console.error(err));
  }
});

