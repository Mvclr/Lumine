// ===================== PRELOAD =====================
const preloader = document.getElementById("preloader");

requestAnimationFrame(() => {
  preloader.classList.add("visible");
});


// ===================== HEADER + VERIFICAÇÃO DE LOGIN =====================
let header = document.querySelector("header");

const isLoggedIn = () => {
  fetch('/api/IsLoggedIn')
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn === true) {
        const username = data.user.username;

        header.innerHTML = `
          
          <div class="input">
  <i class="bi bi-search"></i>
  <input type="text" name="pesquisa" placeholder="Search movies" id="search-input" />
  <button id="search-button">Search</button>
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
                  onerror="this.onerror=null;this.src='/uploads/profileAccount.png';"
                />
              </div>
            </div>
          </div>
        `;

        const profileImgPopup = document.getElementById('profile-img');
        if (profileImgPopup) {
          profileImgPopup.src = `/uploads/${username}.png?t=${Date.now()}`;
          profileImgPopup.onerror = function () {
            this.onerror = null;
            this.src = '/uploads/profileAccount.png';
          };
        }
      } else {
        console.log("Usuário não logado");
      }
    })
    .catch(error => {
      console.error('Erro ao conferir login:', error);
    });
};


// ===================== POP-UP PERFIL =====================
function openProfilePopup() {
  document.getElementById("profile-overlay").classList.remove("hidden");
}

function closeProfilePopup() {
  document.getElementById("profile-overlay").classList.add("hidden");
}


// ===================== UPLOAD DE IMAGEM =====================
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


// ===================== POSTERS NA TELA PRINCIPAL ====================

const postersContainer = document.getElementById('moviesContainer');

const fetchPosters = () => {
  fetch('/api/mainMovies')
    .then(response => response.json())
    .then(data => {
      postersContainer.innerHTML = '';

      data.forEach(poster => {
        const posterElement = document.createElement('div');
        posterElement.className = 'poster';
        posterElement.id = poster.imdbID;
        posterElement.style.cursor = 'pointer';
        posterElement.innerHTML = `
         <a href="/movie/${poster.imdbID}">
          <img src="${poster.poster_url}" alt="${poster.title}" />
          <h3>${poster.title}</h3>
          </a>
        `;
        postersContainer.appendChild(posterElement);
      });
    })
    .catch(error => console.error('Erro ao carregar posters:', error));
};


// ===================== PESQUISA DE FILMES =====================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const postersContainer = document.getElementById('moviesContainer');

  if (!searchInput || !searchButton || !postersContainer) {
    console.error('Elementos de pesquisa ou container de posters não encontrados.');
    return;
  }

  const performSearch = async () => {
    const query = searchInput.value.trim();
    if (query) {
      try {
        const response = await fetch(`/pesquisa/${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();

        postersContainer.innerHTML = ''; // Limpa os resultados anteriores

        if (data.error || !data.name) {
          postersContainer.innerHTML = '<p>Nenhum filme encontrado.</p>';
        } else {
          const posterElement = document.createElement('div');
          posterElement.className = 'poster';
          posterElement.innerHTML = `
            <img src="${data.posterUrl}" alt="${data.name}" />
            <h3>${data.name}</h3>
            <p>${data.synopsis}</p>
            <p><strong>Ano:</strong> ${data.year}</p>
            <p><strong>Duração:</strong> ${data.runtime}</p>
            <p><strong>Nota IMDb:</strong> ${data.imdbRating}</p>
          `;
          postersContainer.appendChild(posterElement);
        }
      } catch (error) {
        console.error('Erro ao buscar filme:', error);
        alert('Ocorreu um erro ao buscar o filme. Tente novamente mais tarde.');
      }
    }
  };

  // Evento ao pressionar Enter no input
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      performSearch();
    }
  });

  // Evento ao clicar no botão
  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    performSearch();
  });
});


// ===================== EVENTO DE LOAD =====================
window.addEventListener("DOMContentLoaded", () => {
  isLoggedIn();
  fetchPosters();
});



// SINOPSE

function openSynopsisPopup(title, synopsis) {
  document.getElementById('synopsis-title').textContent = title;
  document.getElementById('synopsis-text').textContent = synopsis;
  document.getElementById('synopsis-overlay').classList.remove('hidden');
}

function closeSynopsisPopup() {
  document.getElementById('synopsis-overlay').classList.add('hidden');
}



// ===================== EVENTO DE LOAD =====================
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
