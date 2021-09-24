import gameController from './game_controller';
import shipPlacement from './ship_placement';
import messages from './messages';

const game = () => {
  let state = {
    controller: gameController(),
    shipPlacement: shipPlacement(),
    gameMessages: messages(),
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
    const gameboardContainer = document.getElementById('gameboards_container');
    const gameoverContainer = document.getElementById('gameover_container');
    const button = document.getElementById('new_game_button');


    gameoverContainer.style.display = 'inline-block';

    button.addEventListener('click', () => {
      if (gameboardContainer.firstChild != null ){
        while (gameboardContainer.firstChild){
          gameboardContainer.removeChild(gameboardContainer.firstChild);
        }
      }

      gameoverContainer.style.display = 'none';
      events.emit('get ship placement');
    });
  }

  return Object.assign(
    {
      controller: state.controller,
      gameMessages: state.gameMessages,
      endGame,
      newGame,
      beginGame,
    },
  )
}

// Driver
let battleship = game();
battleship.newGame();

// pubsub subscribers
// renders placement screen/instructions to place ships
events.on('get ship placement', battleship.newGame);
events.on('get ship placement', battleship.gameMessages.placeShips);

// begins game/instructions on how to attack
events.on('ships placed', battleship.beginGame);
events.on('ships placed', battleship.gameMessages.attack);

// reveals gameover screen/writes message congratulating winner
events.on('end game', battleship.endGame);
events.on('end game', battleship.gameMessages.winner);

// informs of a hit (publisher inside ship factory)
events.on('hit', battleship.gameMessages.hit);

// informs of a miss (publisher inside ship factory)
events.on('miss', battleship.gameMessages.miss);

// informs of a ship being destroyed (publisher inside gameboard factory)
events.on('sunk', battleship.gameMessages.sunk);
