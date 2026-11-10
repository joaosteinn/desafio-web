// common.js - código usado em todas as páginas

// Usuário logado (ou null se ninguém estiver logado)
var usuario = usuarioAtual();

var acesso = document.body.getAttribute('data-acesso');

if (acesso == 'login' && usuario == null) {
  window.location.href = 'login.html';
}
if (acesso == 'visitante' && usuario != null) {
  window.location.href = 'consultas.html';
}

// Esconde os links do menu que não servem para o momento (troca entre logado ou visitante):
var itens = document.querySelectorAll('[data-mostrar]');
for (var i = 0; i < itens.length; i++) {
  var tipo = itens[i].getAttribute('data-mostrar');
  if (tipo == 'logado' && usuario == null) {
    itens[i].style.display = 'none';
  }
  if (tipo == 'visitante' && usuario != null) {
    itens[i].style.display = 'none';
  }
}

// Botão "Sair" escondido para visitantes, e funcionando para logados
var botaoSair = document.getElementById('botao-sair');
botaoSair.addEventListener('click', function () {
  sair();
  window.location.href = 'index.html';
});

// Evita que um texto digitado vire HTML (segurança básica)
function escapar(texto) {
  var div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Troca o formato da data de AAAA-MM-DD para DD/MM/AAAA
function formatarData(data) {
  var partes = data.split('-');
  return partes[2] + '/' + partes[1] + '/' + partes[0];
}

// Junta data e horário em um objeto Date
function criarData(data, horario) {
  return new Date(data + 'T' + horario + ':00');
}

// A consulta é "realizada" quando a data e o horário já passaram
function jaRealizada(consulta) {
  return criarData(consulta.data, consulta.horario) < new Date();
}
