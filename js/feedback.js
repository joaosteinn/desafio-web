// Backend da página de feedback

var formFeedback = document.getElementById('form-feedback');
var mensagem = document.getElementById('mensagem');
var listaFeedbacks = document.getElementById('lista-feedbacks');

function mostrarFeedbacks() {
  var lista = listarFeedbacks();
  listaFeedbacks.innerHTML = '';
  for (var i = 0; i < lista.length; i++) {
    listaFeedbacks.innerHTML +=
      '<div class="opiniao">' +
      '<p class="autor">' + escapar(lista[i].autor) + ' - nota ' + lista[i].nota + ' de 5</p>' +
      '<p>' + escapar(lista[i].comentario) + '</p>' +
      '</div>';
  }
}

formFeedback.addEventListener('submit', function (evento) {
  evento.preventDefault();

  var notaEscolhida = document.querySelector('input[name="nota"]:checked');
  var comentario = document.getElementById('comentario').value.trim();

  if (notaEscolhida == null) {
    mensagem.className = 'mensagem';
    mensagem.textContent = 'Escolha uma nota de 1 a 5.';
    return;
  }
  if (comentario.length < 10) {
    mensagem.className = 'mensagem';
    mensagem.textContent = 'Escreva um comentário com pelo menos 10 letras.';
    return;
  }

  salvarFeedback(usuario.nome, notaEscolhida.value, comentario);
  formFeedback.reset();
  mostrarFeedbacks();
  mensagem.className = 'mensagem ok';
  mensagem.textContent = 'Obrigado pelo seu feedback!';
});

if (usuario != null) {
  mostrarFeedbacks();
}
