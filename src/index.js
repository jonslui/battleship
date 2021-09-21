import gameController from './game_controller';
import shipPlacement from './ship_placement';

const game = () => {
  let state = {
    controller: gameController(),
    shipPlacement: shipPlacement(),
  }


  /*
    This function gets ship placement data and ends when all 5 player 1 ships have been placed.
    Upon ending it sends a pubsub emit containing ship data for both players which is passed to/triggers game.beginGame.

    1. Create two instances of gameboard, one for player 1 and one for player 2, and render board 1 in the DOM
    2. Randomize ship placement for gameboard 2 (CPU player)
    3. Create 5 ships, and add dragstart and dragend event listeners to them.
    4. Add dragenter, dragleave, dragover, and dragdrop event listeners to all tiles to register which tile was selected.
    5. Add an orientation button that allows player to flip unplaced ships from horizontal to vertical and back
   */
  function newGame(){
    state.shipPlacement.initialize();
    state.shipPlacement.random();
    state.shipPlacement.createDraggableShips();
    state.shipPlacement.addTileListeners();
    state.shipPlacement.addOrientationButton();
  }


  /*
    Recieve ship data from the pubsub emit 'ships placed' (called after all ships have been placed)
    Remove previous gameboards from the screen by clearing child nodes from parent container
    Then initalize game and begin the loop
  */
  function beginGame(ships){
    const gameboardContainer = document.getElementById('gameboards_container');

    if (gameboardContainer.firstChild != null ){
      while (gameboardContainer.firstChild){
        gameboardContainer.removeChild(gameboardContainer.firstChild);
      }
    }
  
    let newGame = game();
    newGame.controller.initializeGame(ships[0], ships[1]);
    newGame.controller.gameLoop();
  }


  /*
    gameOver is triggered by a pubsub call from game_controller.js when one of the gameboards ships have been destroyed,
    It gets the container for the ending screen which has a congratulations for the winner and a button to play again.
  */
  function endGame(){
    let gameoverContainer = document.getElementById('gameover_container');
    gameoverContainer.style.display = 'inline-block';
  }

  return Object.assign(
    {
      controller: state.controller,
      endGame,
      newGame,
      beginGame,
    },
  )
}

// Driver
let battleship = game();
battleship.newGame();

// Event listeners
events.on('get ship placement', battleship.newGame);
events.on('ships placed', battleship.beginGame);
events.on('end game', battleship.endGame);
