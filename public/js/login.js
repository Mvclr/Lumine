document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const msgElement = document.querySelector(".msg-js");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      const errorData = await response.json();
      msgElement.innerHTML = errorData.message;
      msgElement.style.opacity = 1;
    }
  } catch (error) {
    msgElement.innerHTML = "Erro ao tentar fazer login. Tente novamente.";
    msgElement.style.opacity = 1;
  }
});

// VER SENHA

const senhaInput = document.getElementById('password');
const iconeOlho = document.getElementById('iconeOlho');

iconeOlho.addEventListener('click', () => {
  if (senhaInput.type === 'password') {
    senhaInput.type = 'text';
    iconeOlho.classList.remove('bi-eye-fill');
    iconeOlho.classList.add('bi-eye-slash-fill');
  } else {
    senhaInput.type = 'password';
    iconeOlho.classList.remove('bi-eye-slash-fill');
    iconeOlho.classList.add('bi-eye-fill');
  }
});