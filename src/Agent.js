import { Environment } from './Environment.js';
import { State } from './State.js';
import { No } from './No.js';
import { Player } from './Player.js';

class Agent {
  constructor(initialState) {
    this.actionSeq = [];
    this.currentState = initialState;
    this.goal = null;
    this.problem = null;
    this.HOPELESS = -1;
    this.TERMINATED = -2;
  }

  simpleProblemSolvingAgent(percept) {
    console.log(this.actionSeq);
    this.currentState = this.updateState(this.currentState, percept);
    if (this.actionSeq.length === 0) {
      this.goal = this.formulateGoal(this.currentState);
      this.problem = this.formulateProblem(this.currentState, this.goal);

      this.actionSeq = this.breadthFirstSearch(this.problem);

      if (!this.actionSeq) {
        return this.HOPELESS;
      }
    }
    let action = this.actionSeq.shift();
    if (!action) return this.TERMINATED;

    this.actionSeq = this.actionSeq;
    return action;
  }

  updateState(currentState, percept) {
    currentState.playerPos = percept.playerPos;

    return currentState;
  }

  formulateGoal(state) {
    
    return new Player(
      state.enviroment.endPos.x,
      state.enviroment.endPos.y
    );
  }

  formulateProblem(currentState, goal) {
    const actions = function (state) {
      return ["l", "u", "r", "d"];
    };

    //teste se
    let testGoal = function (state) {
      return state.playerPos.x === goal.x && state.playerPos.y === goal.y;
    };

    //possibilidades de movimentação
    const transitionModel = function (node, action) {
      let coordinates = node.estado.playerPos;
      let maze = node.estado.enviroment;

      switch (action) {
        case "u":
          if (
            coordinates.y == 0 ||
            maze.mazeMap[coordinates.y - 1][coordinates.x] == 1
          ) {
            return node.estado;
          }
          return new State(
            new Player(coordinates.x, coordinates.y - 1),
            maze
          );
        case "r":
          if (
            coordinates.x == maze.mazeMap[0].length ||
            maze.mazeMap[coordinates.y][coordinates.x + 1] == 1
          ) {
            return node.estado;
          }
          return new State(
            new Player(coordinates.x + 1, coordinates.y),
            maze
          );
        case "d":
          if (
            coordinates.y == maze.mazeMap.length ||
            maze.mazeMap[coordinates.y + 1][coordinates.x] == 1
          ) {
            return node.estado;
          }
          return new State(
            new Player(coordinates.x, coordinates.y + 1),
            maze
          );
        case "l":
          if (
            coordinates.x == 0 ||
            maze.mazeMap[coordinates.y][coordinates.x - 1] == 1
          ) {
            return node.estado;
          }
          return new State(
            new Player(coordinates.x - 1, coordinates.y),
            maze
          );
        default:
          return node.estado;
      }
    };

    return {
      initialState: currentState,
      actions,
      transitionModel,
      testGoal,
    };
  }

  breadthFirstSearch(problem) {
    const node = new No(problem.initialState, null, null, 0);
    const edge = [node];

    const reached = new Set([
      `${problem.initialState.playerPos.x}${problem.initialState.playerPos.y}`,
    ]);

    while (edge.length > 0) {
      let node = edge.shift();

      if (problem.testGoal(node.estado)) {
        return this.getActionSequence(node);
      }

      for (let action of problem.actions(node?.estado)) {
        let child = this.childNode(problem, node, action);
        if (
          !reached.has(`${child.estado.playerPos.x}${child.estado.playerPos.y}`)
        ) {
          reached.add(`${node.estado.playerPos.x}${node.estado.playerPos.y}`);

          edge.push(child);
        }
      }
    }
    return null;
  }

  childNode(problem, parent, action) {
    let no = new No(problem.transitionModel(parent, action), parent, action, 1);
    return no;
  }

  getActionSequence(node) {
    const actions = [];
    while (node.pai !== null) {
      actions.unshift(node.acao);
      node = node.pai;
    }
    return actions;
  }
}

const environment = new Environment();
const state = new State(
  new Player(environment.startPos.x, environment.startPos.y),
  environment
);
const agent = new Agent(state);
const playerPos = new Player(1, 1);

//atuador
function handleAction(action) {
  let event;
  switch (action) {
    case "r":
      console.log("DIREITA");

      playerPos.x = playerPos.x + 1;

      event = new KeyboardEvent("keydown", {
        key: "ArrowRight",
        code: "ArrowRight",
      });
      document.dispatchEvent(event);

      break;

    case "l":
      console.log("ESQUERDA");

      playerPos.x = playerPos.x - 1;

      event = new KeyboardEvent("keydown", {
        key: "ArrowLeft",
        code: "ArrowLeft",
      });
      document.dispatchEvent(event);

      break;
    case "d":
      console.log("BAIXO");

      playerPos.y = playerPos.y + 1;

      event = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        code: "ArrowDown",
      });
      document.dispatchEvent(event);

      break;
    case "u":
      console.log("CIMA");

      playerPos.y = playerPos.y - 1;

      event = new KeyboardEvent("keydown", {
        key: "ArrowUp",
        code: "ArrowUp",
      });
      document.dispatchEvent(event);

      break;
  }
}

//sensor
let solution = setInterval(() => {
  let action = agent.simpleProblemSolvingAgent({
    maze: environment.mazeMap,
    playerPos,
  });

  if (action == -1) {
    clearInterval(solution);
    alert("Sem solução");
  }

  if (action == -2) {
    clearInterval(solution);
  }

  if (action && action.length > 0) handleAction(action);
}, 1000);
