// Backend da página de agendamento

var formAgendar = document.getElementById('form-agendar');
var mensagem = document.getElementById('mensagem');
var confirmacao = document.getElementById('confirmacao');
var resumo = document.getElementById('resumo');

function prepararFormulario() {
  formAgendar.style.display = 'block';
  confirmacao.style.display = 'none';
  mensagem.textContent = '';

  document.getElementById('nome').value = usuario.nome;
  document.getElementById('contato').value = usuario.telefone;
  document.getElementById('data').min = dataDaqui(0);
}

formAgendar.addEventListener('submit', function (evento) {
  evento.preventDefault();

  var consulta = {
    idUsuario: usuario.id,
    nome: document.getElementById('nome').value.trim(),
    contato: document.getElementById('contato').value.trim(),
    especialidade: document.getElementById('especialidade').value,
    data: document.getElementById('data').value,
    horario: document.getElementById('horario').value,
    observacoes: document.getElementById('observacoes').value.trim()
  };

  if (consulta.nome == '' || consulta.contato == '' || consulta.especialidade == '' || consulta.data == '' || consulta.horario == '') {
    mensagem.textContent = 'Preencha todos os campos obrigatórios.';
    return;
  }
  if (criarData(consulta.data, consulta.horario) < new Date()) {
    mensagem.textContent = 'Escolha uma data e um horário que ainda não passaram.';
    return;
  }
  if (horarioOcupado(consulta.especialidade, consulta.data, consulta.horario)) {
    mensagem.textContent = 'Esse horário já está ocupado. Escolha outro.';
    return;
  }

  agendarConsulta(consulta);
  formAgendar.reset();

  resumo.innerHTML =
    '<p><b>Especialidade:</b> ' + escapar(consulta.especialidade) + '</p>' +
    '<p><b>Data:</b> ' + formatarData(consulta.data) + '</p>' +
    '<p><b>Horário:</b> ' + consulta.horario + '</p>' +
    '<p><b>Paciente:</b> ' + escapar(consulta.nome) + '</p>' +
    '<p><b>Contato:</b> ' + escapar(consulta.contato) + '</p>';
  formAgendar.style.display = 'none';
  confirmacao.style.display = 'block';
});

document.getElementById('botao-outra').addEventListener('click', prepararFormulario);

if (usuario != null) {
  prepararFormulario();
}
