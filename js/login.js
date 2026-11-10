// Backend da página de login

var formLogin = document.getElementById('form-login');
var mensagem = document.getElementById('mensagem');

formLogin.addEventListener('submit', function (evento) {
  evento.preventDefault();

  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  if (fazerLogin(email, senha)) {
    window.location.href = 'consultas.html';
  } else {
    mensagem.textContent = 'E-mail ou senha incorretos.';
  }
});
