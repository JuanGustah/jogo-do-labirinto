
export class Agente {
  seq_acoes;
  acao;
  estado_atual;
  objetivo;
  problema;

  constructor() {
    //1 - up 2- down 3- left 4-right
    this.seq_acoes = [];
    this.acao = null;
    this.estado_atual = estado;
    this.objetivo = null;
    this.problema = null;
  }
  //pensar no atualizar o estado, mexer no ambiente e posteriormente setar um novo estado na nova chamada
  //mazeMap é a percepcao
  agente_de_resolucao_problema_simples(percepcao) {

    this.estado_atual = atualizar_estado(this.estado_atual, percepcao);

    if (seq_acoes.length === 0) {
      objetivo = formular_objetivo(estado_atual);
      problema = formular_problema(estado_atual, objetivo);

      seq_acoes = busca(problema);

      if (!seq_acoes) {
        return null;
      }

      acao = primeira_acao(seq_acoes);
      seq_acoes = retirar_primeira_acao(acao, seq_acoes);
    }

    return acao;
  
  }

  atualizar_estado(estado, percepcao) {
    if (estado.player === estado.saida) {
      estado.status = 'Vitoria';
      return estado
    }
    estado.status = 'Jogando';
    return { estado, percepcao };
  }

  formular_objetivo(estado) {
    return { x: estado.saida.x, y: estado.saida.y }
  }

  formular_problema(estado_atual, objetivo) {
    //verificar as posicoes -1 do estado atual
    //estado_atual.percepcao[player+1][] | enfim testar os visinhos
    const conjunto_acoes = [1, 2, 3, 4] //definir o conjunto de acoes no livro acoes(s) 
  
    const estadoAtual = estado_atual.estado //aqui por definição tambem tem a posicao atual do player
    const testeOBJ = function (estado) {
      return estado.x === objetivo.x && estado.y === objetivo.y;
    }

    const resultado_acao = function (estado, acao) {
      let result = { x: estado.x, y: estado.y };
  
      switch (acao) {
        case 1:
          result -= 1;
          break;
        case 2:
          result += 1;
          break;
        case 3:
          result -= 1;
          break;
        case 4:
          result += 1;
          break;
        default:
          break;
      }
      return result;
    }
    return {
      conjunto_acoes: conjunto_acoes,
      estadoAtual: estadoAtual,
      testeOBJ: testeOBJ,
      resultado_acao: resultado_acao
    }
  }

  busca(params) {
    const nos_visitados = new Set();
    const root = params.estadoAtual;
    const edge = [{ estado: params.estadoAtual }]
  
  
    while (edge.length > 0) {
      let no_atual = edge.pop();
  
      params.testeOBJ(no_atual.estadoAtual)
    }
  
  }

  primeira_acao() {
    return this.seq_acoes[0];
  }

  retirar_primeira_acao() {
    this.seq_acoes.pop();
  }
}

var agente = new Agente();
//chamar o agente a cada 0.5s
setTimeout(() => {
  let acao_do_agente = agente_de_resolucao_problema_simples()
}, 500);