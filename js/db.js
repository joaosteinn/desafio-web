// Mock do banco de dados

var CHAVE = 'cuidado_saude_banco';

var banco = {
  usuarios: [],    // cada usuário: { id, nome, email, telefone, senha }
  consultas: [],   // cada consulta: { id, idUsuario, nome, contato, especialidade, data, horario, observacoes }
  feedbacks: [],   // cada feedback: { id, autor, nota, comentario }
  mensagens: [],   // cada mensagem: { id, nome, email, assunto, texto }
  idLogado: null   // id do usuário que está logado
};

// Guarda o banco no navegador
function salvar() {
  localStorage.setItem(CHAVE, JSON.stringify(banco));
}

// Cria um id diferente para cada registro
function novoId() {
  return 'id' + Date.now() + Math.floor(Math.random() * 1000);
}

// Devolve a data de hoje mais N dias, no formato AAAA-MM-DD
function dataDaqui(dias) {
  var d = new Date();
  d.setDate(d.getDate() + dias);
  var mes = ('0' + (d.getMonth() + 1)).slice(-2);
  var dia = ('0' + d.getDate()).slice(-2);
  return d.getFullYear() + '-' + mes + '-' + dia;
}

// Dados de exemplo, criados só na primeira vez que o site abre
function criarDadosIniciais() {
  var ana = { id: novoId(), nome: 'Ana Souza', email: 'ana@exemplo.com', telefone: '(51) 99999-0000', senha: '123456' };
  banco.usuarios.push(ana);

  banco.consultas.push({
    id: novoId(), idUsuario: ana.id, nome: ana.nome, contato: ana.telefone,
    especialidade: 'Clínica geral', data: dataDaqui(-14), horario: '09:00', observacoes: 'Check-up de rotina'
  });
  banco.consultas.push({
    id: novoId(), idUsuario: ana.id, nome: ana.nome, contato: ana.telefone,
    especialidade: 'Psicologia', data: dataDaqui(7), horario: '15:00', observacoes: ''
  });

  banco.feedbacks.push({ id: novoId(), autor: 'Ana Souza', nota: 5, comentario: 'Fui bem recebida e o médico explicou tudo com calma.' });
  banco.feedbacks.push({ id: novoId(), autor: 'Carlos Lima', nota: 4, comentario: 'Atendimento atencioso e agendamento fácil.' });
}

// ---------- Usuários ----------

// Devolve '' se deu certo, ou o texto do erro
function cadastrarUsuario(nome, email, telefone, senha) {
  email = email.toLowerCase();
  for (var i = 0; i < banco.usuarios.length; i++) {
    if (banco.usuarios[i].email == email) {
      return 'Já existe uma conta com este e-mail.';
    }
  }
  banco.usuarios.push({ id: novoId(), nome: nome, email: email, telefone: telefone, senha: senha });
  salvar();
  return '';
}

// Devolve true se e-mail e senha estiverem certos
function fazerLogin(email, senha) {
  email = email.toLowerCase();
  for (var i = 0; i < banco.usuarios.length; i++) {
    var u = banco.usuarios[i];
    if (u.email == email && u.senha == senha) {
      banco.idLogado = u.id;
      salvar();
      return true;
    }
  }
  return false;
}

function sair() {
  banco.idLogado = null;
  salvar();
}

// Devolve o usuário logado, ou null se não houver
function usuarioAtual() {
  for (var i = 0; i < banco.usuarios.length; i++) {
    if (banco.usuarios[i].id == banco.idLogado) {
      return banco.usuarios[i];
    }
  }
  return null;
}

// ---------- Consultas ----------

function agendarConsulta(consulta) {
  consulta.id = novoId();
  banco.consultas.push(consulta);
  salvar();
}

// Devolve só as consultas do usuário informado
function consultasDoUsuario(idUsuario) {
  var lista = [];
  for (var i = 0; i < banco.consultas.length; i++) {
    if (banco.consultas[i].idUsuario == idUsuario) {
      lista.push(banco.consultas[i]);
    }
  }
  return lista;
}

// Verifica se já existe consulta na mesma especialidade, data e horário
function horarioOcupado(especialidade, data, horario) {
  for (var i = 0; i < banco.consultas.length; i++) {
    var c = banco.consultas[i];
    if (c.especialidade == especialidade && c.data == data && c.horario == horario) {
      return true;
    }
  }
  return false;
}

// Remove a consulta do array (some da tela e do "banco")
function cancelarConsulta(id) {
  for (var i = 0; i < banco.consultas.length; i++) {
    if (banco.consultas[i].id == id) {
      banco.consultas.splice(i, 1);
      salvar();
      return;
    }
  }
}

// ---------- Feedbacks ----------

function salvarFeedback(autor, nota, comentario) {
  banco.feedbacks.push({ id: novoId(), autor: autor, nota: nota, comentario: comentario });
  salvar();
}

// Devolve os feedbacks do mais novo para o mais antigo
function listarFeedbacks() {
  return banco.feedbacks.slice().reverse();
}

// ---------- Mensagens de contato ----------

function salvarMensagem(nome, email, assunto, texto) {
  banco.mensagens.push({ id: novoId(), nome: nome, email: email, assunto: assunto, texto: texto });
  salvar();
}

// ---------- Início ----------
// Carrega o que já estava salvo; se não tinha nada, cria os dados de exemplo
var salvo = localStorage.getItem(CHAVE);
if (salvo) {
  banco = JSON.parse(salvo);
} else {
  criarDadosIniciais();
  salvar();
}

// Se os dados salvos são antigos e não têm a lista de mensagens, cria ela vazia
if (banco.mensagens == undefined) {
  banco.mensagens = [];
}
