class Estado {
    constructor(posP, posWin, status) {
        this.player = posP;
        this.posWin = posWin;
        this.status = status;
    }
}
class Timer {
    timerElement;
    startTime;
    elapsedTime;
    minutes;
    seconds;

    constructor() {
        this.timerElement = document.getElementById('timer');
        this.startTime = Date.now();
    }

    updateTimer() {
        this.elapsedTime = Date.now() - this.startTime;
        this.minutes = Math.floor(this.elapsedTime / 60000);
        this.seconds = Math.floor((this.elapsedTime % 60000) / 1000);
        this.timerElement.textContent = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
    }
}

class Player {
    playerPosition;
    startPosition;
    finishPosition;

    constructor() {
        this.startPosition = { x: 1, y: 1 };
        this.playerPosition = { x: 1, y: 1 };
        this.finishPosition = { x: 8, y: 1 };

    }

}
class Ambiente {
    mazeWidth;
    mazeHeight;
    mazeMap;
    maze;
    player;

    constructor() {
        this.mazeMap = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        this.mazeHeight = 10;
        this.mazeWidth = 10;
        this.maze = document.getElementById('maze');
        this.player = document.createElement('div');
        this.player.className = 'player';
        this.maze.appendChild(this.player);
    }

    movePlayer(playerPosition, newY, newX) {
        this.player.style.left = playerPosition.x * 40 + 'px';
        this.player.style.top = playerPosition.y * 40 + 'px';
        this.mazeMap[newY][newX] = 2;
    }
}

class No{
    constructor(estado, pai){
        this.estado = estado;
        this.pai = pai;
        this.custo = 1;
    }
}
class Agente {
    seq_acoes;
    acao;
    estado_atual;
    objetivo;
    problema;

    constructor(estado) {
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

        this.estado_atual = this.atualizar_estado(this.estado_atual, percepcao);

        if (this.seq_acoes.length === 0) {
            //console.log(this.estado_atual)
            this.objetivo = this.formular_objetivo(this.estado_atual);
            this.problema = this.formular_problema(this.estado_atual, this.objetivo);

            this.seq_acoes = this.busca(this.problema);

            if (!this.seq_acoes) {
                return null;
            }

            this.acao = this.primeira_acao(this.seq_acoes);
            this.seq_acoes = this.retirar_primeira_acao(this.acao, this.seq_acoes);
        }

        return this.acao;

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
        return { x: estado.estado.posWin.x, y: estado.estado.posWin.y }
    }

    formular_problema(estado_atual, objetivo) {
        //console.log(objetivo)
        //verificar as posicoes -1 do estado atual
        //estado_atual.percepcao[player+1][] | enfim testar os visinhos
        const conjunto_acoes = [1, 2, 3, 4] //definir o conjunto de acoes no livro acoes(s) 

        const estadoAtual = estado_atual.estado //aqui por definição tambem tem a posicao atual do player
        let testeOBJ = function (estado) {
            console.log(estado)
            return estado.estado.x === objetivo.x && estado.y === objetivo.y;
        }

        const resultado_acao = function (estado, acao) {
            let result = { x: estado.x, y: estado.y };

            switch (acao) {
                case 1:
                    result.y -= 1;
                    break;
                case 2:
                    result.y += 1;
                    break;
                case 3:
                    result.x -= 1;
                    break;
                case 4:
                    result.x += 1;
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

    busca(problema) {
        const no = new No(problema.estadoAtual, null);

        if(this.testeOBJ(no.estado)){
            //return a solucao 
        } 

        const edge = { estado: problema.estadoAtual }
        const nos_visitados = new Set();
         //sera sempre a posicao do player
        //pegar ramificações para onde posso ir
        
        console.log(edge.estado);
        //console.log(edge.estado);
        while (edge.length > 0) {
            if(edge.length === 0){
                return -1
            }
            let no_atual = edge.pop();
            nos_visitados.add(no_atual.estado);

            

            //params.testeOBJ(no_atual.estadoAtual)
        }
        //retorna falha
        return -1

    }

    primeira_acao() {
        return this.seq_acoes[0];
    }

    retirar_primeira_acao() {
        this.seq_acoes.pop();
    }
}

const ambiente = new Ambiente();
const player = new Player();
const estado = new Estado(player.startPosition, player.finishPosition, '');
ambiente.movePlayer(player.playerPosition, 1, 1);

const timer = new Timer();
setInterval(() => timer.updateTimer(), 1000);

var agente = new Agente(estado);
agente.agente_de_resolucao_problema_simples(ambiente)
//chamar o agente a cada 0.5s

// Criação do labirinto visualmente
for (let y = 0; y < ambiente.mazeHeight; y++) {
    for (let x = 0; x < ambiente.mazeWidth; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (ambiente.mazeMap[y][x] === 1) {
            cell.classList.add('wall');
        }
        if (x === player.finishPosition.x && y === player.finishPosition.y) {
            cell.classList.add('finish');
        }
        if (x === player.startPosition.x && y === player.startPosition.y) {
            cell.classList.add('start');
        }
        ambiente.maze.appendChild(cell);
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    let newX = player.playerPosition.x;
    let newY = player.playerPosition.y;
    //retira do local anterior
    ambiente.mazeMap[newY][newX] = 0;

    if (key === 'ArrowUp') {
        newY--;
    } else if (key === 'ArrowDown') {
        newY++;
    } else if (key === 'ArrowLeft') {
        newX--;
    } else if (key === 'ArrowRight') {
        newX++;
    }

    // Verifica se a nova posição é válida (não colide com paredes)
    if (ambiente.mazeMap[newY][newX] === 0) {
        player.playerPosition.x = newX;
        player.playerPosition.y = newY;
        ambiente.movePlayer(player.playerPosition, newY, newX);
    }

    // Verifica se o jogador chegou ao final
    if (player.playerPosition.x === player.finishPosition.x && player.playerPosition.y === player.finishPosition.y) {
        setTimeout(function () {
            alert('Parabéns! Você completou a primeira fase do labirinto!');
            // Aqui você pode redirecionar para a próxima fase
            window.location.href = 'labirinto-fase-2.html'; // Substitua pelo nome do próximo arquivo HTML
        }, 100);
    }
});




