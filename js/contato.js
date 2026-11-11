// Backend da página de contato

var formContato = document.getElementById('form-contato');
var mensagem = document.getElementById('mensagem');

// Se a pessoa estiver logada, já preenche o nome e o e-mail
function preencherDadosDoUsuario() {
  if (usuario != null) {
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;
  }
}

formContato.addEventListener('submit', function (evento) {
  evento.preventDefault();

  var nome = document.getElementById('nome').value.trim();
  var email = document.getElementById('email').value.trim();
  var assunto = document.getElementById('assunto').value.trim();
  var texto = document.getElementById('texto').value.trim();

  if (nome == '' || email == '' || assunto == '' || texto == '') {
    mensagem.className = 'mensagem';
    mensagem.textContent = 'Preencha todos os campos.';
    return;
  }
  if (texto.length < 10) {
    mensagem.className = 'mensagem';
    mensagem.textContent = 'Escreva uma mensagem com pelo menos 10 letras.';
    return;
  }

  salvarMensagem(nome, email, assunto, texto);
  formContato.reset();
  preencherDadosDoUsuario();
  mensagem.className = 'mensagem ok';
  mensagem.textContent = 'Mensagem enviada! Esta é uma simulação: ela fica salva apenas neste navegador.';
});

preencherDadosDoUsuario();
