// PRELOAD
const preloader = document.getElementById("preloader");


// Verificação de login + gerador de header

let header = document.querySelector("header");
requestAnimationFrame(() => {
  preloader.classList.add("visible");
});

const isLoggedIn = () => {  fetch('/api/IsLoggedIn')
  .then(response => response.json())
    .then(data => {
      if (data.loggedIn === true) {
        const username = data.user.username; 
        header.innerHTML = `
            <div class="input">
              <i class="bi bi-search"></i>
              <input
                type="text"
                name="pesquisa"
                placeholder="Search orders"
                id="input"
              />
            </div>

            <div class="header-right">
              <div class="buttons">
                <div class="btn1">
                  <a href="#">
                    <button class="lumines-coin">
                      <img src="images/lumines.png" />
                    </button>
                  </a>
                </div>

                <div class="btn2">
                  <a href="#">
                    <button class="notifications">
                      <i class="bi bi-bell"></i>
                    </button>
                  </a>
                </div>

                <div class="btn3">
                  <a href="#">
                    <button class="carrinho">
                      <i class="bi bi-basket3"></i>
                    </button>
                  </a>
                </div>
                <div class="profile">
                  <img
                    src="/uploads/${username}.png?t=${Date.now()}"
                    alt="profile"
                    onclick="openProfilePopup()"
                    class="profileIMG"
                    onerror="this.onerror=null;this.src='/uploads/profile.png';"
                  />
                </div>
              </div>

            </div>
        
        
        `;
        const profileImgPopup = document.getElementById('profile-img');
          if (profileImgPopup) {
            profileImgPopup.src = `/uploads/${username}.png?t=${Date.now()}`;
            profileImgPopup.onerror = function() {
              this.onerror = null;
              this.src = '/uploads/profile-account.png';
            };
}
      } else {
        console.log("Usuário não logado");
      }
    })
    .catch(error => {
      console.error('Erro ao conferir login:', error);
    });
}

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


        const headerImg = document.querySelector('.profileIMG');
        if (headerImg) {
          headerImg.src = data.imageUrl + '?t=' + new Date().getTime();
        }
      })
      .catch(err => console.error(err));
  }
});


// Chamado para gerar os posters na tela principal

const postersContainer = document.getElementById('moviesContainer');
const fetchPosters = () => {
  fetch('/api/mainMovies')
    .then(response => response.json())
    .then(data => {
      postersContainer.innerHTML = '';
      data.forEach(poster => {
        const posterElement = document.createElement('div');
        posterElement.className = 'poster';
        posterElement.innerHTML = `
          <img src="${poster.posterUrl}" alt="${poster.title}" />
          <h3>${poster.title}</h3>
        `;
        postersContainer.appendChild(posterElement);
      });
    })
    .catch(error => console.error('Erro ao carregar posters:', error));
};


window.addEventListener("load", () => {
  isLoggedIn();
  fetchPosters();
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

