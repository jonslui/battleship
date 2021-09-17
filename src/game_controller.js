import gameboard from './factories/gameboard';
import player from './factories/player';
import DOMboard from './factories/dom_board';

const gameController = () => {
  let state = {
    player1: null,
    player2: null,
    player1Board: null,
    player2Board: null,
    player1DOMBoard: null,
    player2DOMBoard: null,
  }

  return Object.assign(
    {state: state},
    initializeGame(state),
    gameLoop(state),
  )
}

const initializeGame = (state) => ({
  initializeGame: () => {
     // Player 1 Data initialization
    state.player1 = player(true, true);
    state.player1.populateAvailableMoves(100);
    state.player1Board = gameboard();
    state.player1Board.createShip([0,1,2,3,4], 'Carrier');

    // Player 2 Data initialization
    state.player2 = player(true, false);
    state.player2.populateAvailableMoves(0);
    state.player2Board = gameboard();
    state.player2Board.createShip([100,101,102,103,104], 'Carrier');

    // Create and Render Board 1 DOM elements 
    state.player1DOMBoard = DOMboard();
    state.player1DOMBoard.createBoard('player1_board');
    state.player1DOMBoard.createTiles(false, 0);
    state.player1DOMBoard.createShips(state.player1Board);

    // Create and Render Board 2 DOM elements 
    state.player2DOMBoard = DOMboard();
    state.player2DOMBoard.createBoard('player2_board');
    state.player2DOMBoard.createTiles(true, 100);
    state.player2DOMBoard.createShips(state.player2Board);
  }
})

const gameLoop = (state) => ({
  gameLoop: () => {
    for(let i = 100; i < 200; i ++ ){
      const tile = document.getElementById(i);
      tile.addEventListener('click', () => {
        // if this coord == false, it's an invalid coord (aka called before) and the function does nothing;
        const coord = state.player1.launchAttack(i);

        if (coord != false) {
          const p1Contact = state.player2Board.receiveAttack(coord);
          state.player2DOMBoard.changeTileDisplay(coord, true, p1Contact);
          
          if(state.player2Board.shipsRemaining() === false){
            events.emit('gameover')
            return;
          };

          // player2's attacks
          const player2Coord = state.player2.randomCoord();
          const p2Contact = state.player1Board.receiveAttack(state.player2.launchAttack(player2Coord));
          state.player1DOMBoard.changeTileDisplay(player2Coord, true, p2Contact);
        }
      })
    }
  }
})

export default gameController;
