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