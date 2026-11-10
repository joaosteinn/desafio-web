// Backend da página de consultas

var listaAgendadas = document.getElementById('lista-agendadas');
var listaRealizadas = document.getElementById('lista-realizadas');
var mensagem = document.getElementById('mensagem');

function montarConsulta(c, realizada) {
  var html = '<div class="consulta' + (realizada ? ' realizada' : '') + '">';
  html += '<h3>' + escapar(c.especialidade) + ' (' + (realizada ? 'Realizada' : 'Agendada') + ')</h3>';
  html += '<p>Data: ' + formatarData(c.data) + ' às ' + c.horario + '</p>';
  html += '<p>Contato: ' + escapar(c.contato) + '</p>';
  if (c.observacoes != '') {
    html += '<p>Observações: ' + escapar(c.observacoes) + '</p>';
  }
  if (!realizada) {
    html += '<button class="botao-cancelar" onclick="cancelar(\'' + c.id + '\')">Cancelar consulta</button>';
  }
  html += '</div>';
  return html;
}

function ordenar(lista) {
  lista.sort(function (a, b) {
    if (a.data + a.horario > b.data + b.horario) {
      return 1;
    }
    return -1;
  });
}

function mostrarConsultas() {
  var todas = consultasDoUsuario(usuario.id);
  var agendadas = [];
  var realizadas = [];

  for (var i = 0; i < todas.length; i++) {
    if (jaRealizada(todas[i])) {
      realizadas.push(todas[i]);
    } else {
      agendadas.push(todas[i]);
    }
  }
  ordenar(agendadas);
  ordenar(realizadas);

  listaAgendadas.innerHTML = '';
  for (var j = 0; j < agendadas.length; j++) {
    listaAgendadas.innerHTML += montarConsulta(agendadas[j], false);
  }
  if (agendadas.length == 0) {
    listaAgendadas.innerHTML = '<p>Nenhuma consulta agendada. <a href="agendar.html">Agendar agora</a></p>';
  }

  listaRealizadas.innerHTML = '';
  for (var k = 0; k < realizadas.length; k++) {
    listaRealizadas.innerHTML += montarConsulta(realizadas[k], true);
  }
  if (realizadas.length == 0) {
    listaRealizadas.innerHTML = '<p>Nenhuma consulta realizada ainda.</p>';
  }
}

function cancelar(id) {
  if (confirm('Deseja realmente cancelar esta consulta?')) {
    cancelarConsulta(id);
    mostrarConsultas();
    mensagem.textContent = 'Consulta cancelada.';
  }
}

if (usuario != null) {
  mostrarConsultas();
}
