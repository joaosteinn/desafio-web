// Backend da página de cadastro

var formCadastro = document.getElementById('form-cadastro');
var mensagem = document.getElementById('mensagem');

formCadastro.addEventListener('submit', function (evento) {
  evento.preventDefault();

  var nome = document.getElementById('nome').value.trim();
  var email = document.getElementById('email').value.trim();
  var telefone = document.getElementById('telefone').value.trim();
  var senha = document.getElementById('senha').value;
  var senha2 = document.getElementById('senha2').value;

  if (nome == '' || email == '' || telefone == '' || senha == '') {
    mensagem.textContent = 'Preencha todos os campos.';
    return;
  }
  if (email.indexOf('@') == -1) {
    mensagem.textContent = 'Digite um e-mail válido.';
    return;
  }
  if (senha.length < 6) {
    mensagem.textContent = 'A senha precisa ter pelo menos 6 caracteres.';
    return;
  }
  if (senha != senha2) {
    mensagem.textContent = 'As senhas não são iguais.';
    return;
  }

  var erro = cadastrarUsuario(nome, email, telefone, senha);
  if (erro != '') {
    mensagem.textContent = erro;
    return;
  }

  fazerLogin(email, senha);
  window.location.href = 'agendar.html';
});
