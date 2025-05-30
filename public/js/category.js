
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


// ===================== POSTERS NA TELA DE CATEGORIAS ====================

    function carregarFilmesPorCategoria(genero) {
  const container = document.querySelector('.categoryContainer');
  container.innerHTML = `
    <h1>${genero}</h1>
    <div class="category-filmes-list">
      <ul></ul>
    </div>
    <div class="category-list">
      <ul>
        <li><a href="#" data-genero="Action">Action</a></li>
        <li><a href="#" data-genero="Adventure">Adventure</a></li>
        <li><a href="#" data-genero="Comedy">Comedy</a></li>
        <li><a href="#" data-genero="Drama">Drama</a></li>
        <li><a href="#" data-genero="Horror">Horror</a></li>
        <li><a href="#" data-genero="Sci-Fi">Sci-Fi</a></li>
        <li><a href="#" data-genero="Romance">Romance</a></li>
      </ul>
    </div>
  `;

  fetch(`/api/category/${encodeURIComponent(genero)}`)
    .then(res => res.json())
    .then(filmes => {
      const ul = container.querySelector('.category-filmes-list ul');
      if (!filmes.length) {
        ul.innerHTML = `<li>Nenhum filme encontrado para esta categoria.</li>`;
        return;
      }
      filmes.forEach(filme => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="category-movie-card">
            <img src="${filme.posterUrl || '/images/default-poster.png'}" alt="${filme.title}" />
            <h3>${filme.title} (${filme.year})</h3>
          </div>
        `;
        ul.appendChild(li);
        console.log(filme);
      });
    })
    .catch(() => {
      const ul = container.querySelector('.category-filmes-list ul');
      ul.innerHTML = `<li>Erro ao carregar filmes.</li>`;
    });

  // Reaplica os eventos nos links das categorias
  setTimeout(() => {
    document.querySelectorAll('.category-list a').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        carregarFilmesPorCategoria(link.dataset.genero);
      };
    });
  }, 100);
}

// Evento para os links das categorias ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.category-list a').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      carregarFilmesPorCategoria(link.textContent.trim());
    };
  });
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
  isLoggedIn();

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
