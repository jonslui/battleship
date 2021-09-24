import gameboard from './factories/gameboard';
import player from './factories/player';
import boardDOM from './factories/gameboard_dom';

const gameController = () => {
  let state = {
    player1: null,
    player2: null,
    player1Board: null,
    player2Board: null,
    player1BoardDOM: null,
    player2BoardDOM: null,
    player1turn: true,
  }

  return Object.assign(
    {state: state},
    initializeGame(state),
    gameLoop(state),
  )
}


/* 
  Initialize game controller state data, 
  create players, gameboards, and dom elements
*/
const initializeGame = (state) => ({
  initializeGame: (player1_ships, player2_ships) => {
     // Player 1 Data initialization
    state.player1 = player(true);
    state.player1.populateAvailableMoves(100);
    state.player1Board = gameboard();
    state.player1Board.state.ships = player1_ships;

    // Player 2 Data initialization
    state.player2 = player(true);
    state.player2.populateAvailableMoves(0);
    state.player2Board = gameboard();
    state.player2Board.state.ships = player2_ships;

    // Create and Render Board 1 DOM elements 
    state.player1BoardDOM = boardDOM();
    state.player1BoardDOM.createBoard('player1_board');
    state.player1BoardDOM.createTiles(false, 0);
    state.player1BoardDOM.createShips(state.player1Board);

    // Create and Render Board 2 DOM elements 
    state.player2BoardDOM = boardDOM();
    state.player2BoardDOM.createBoard('player2_board');
    state.player2BoardDOM.createTiles(true, 100);
  }
})


/*
  1. Add an event listener to each tile on player 2's board (ids between 100 and 200).
  
  2. Human player: On click, check if the player is selecting a valid tile to attack by calling gameboard.launchAttack
  3. If it's valid, call changeTileDisplay to reflect whether it was a hit or miss.
  4. Check to see if other player still has ships left -- If no, emit a pubsub signal to trigger the endGame function from index.js.

  5. Computer player: select a random coordinate to attack by calling gameboard.randomCoord
  6. Repeat steps 3 and 4 for Computer player.
*/
const gameLoop = (state) => ({
  gameLoop: () => {
    for(let i = 100; i < 200; i ++ ){
      const tile = document.getElementById(i);
      tile.addEventListener('click', () => {
        if ( state.player1turn == true ) {  
        // if this coord == false, it's an invalid coord (aka called before) and the function does nothing;
          const coord = state.player1.launchAttack(i);

          if (coord != false) {
            state.player1turn = false;

            const p1Contact = state.player2Board.receiveAttack(coord);
            state.player2BoardDOM.changeTileDisplay(coord, true, p1Contact);
            
            // check for win
            if(state.player2Board.shipsRemaining() === false){
              events.emit('end game', 'Player 1');
              return;
            };
            
            // player2's attacks
            setTimeout( () => {
              let player2Coord;
              
              state.player2.state.surrounding_tiles.length > 0 ? player2Coord = state.player2.checkSurroundings(): player2Coord = state.player2.randomCoord();
              const p2Contact = state.player1Board.receiveAttack(state.player2.launchAttack(player2Coord));
              p2Contact != undefined ? state.player2.populateSurroundingTiles(player2Coord): '';
              state.player1BoardDOM.changeTileDisplay(player2Coord, true, p2Contact);

              // check for win
              if(state.player1Board.shipsRemaining() === false){
                events.emit('end game', 'Player 2');
                return;
              };
              
              state.player1turn = true;
            }, 1000);
          }
        }
      })
    }
  }
})

export default gameController;
