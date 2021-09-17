import gameController from './game_controller.js';

const game = () => {
  let state = {
    controller: gameController(),
  }


  /*
    Removes previous gameboards from the screen by clearing child nodes from parent container
    Then initalizes game and begins the loop
  */
  function newGame(){
    const gameboardContainer = document.getElementById('content');

    if (gameboardContainer.firstChild != null ){
      while (gameboardContainer.firstChild){
        gameboardContainer.removeChild(gameboardContainer.firstChild);
      }
    }
  

    let newGame = game();
    newGame.controller.initializeGame();
    newGame.controller.gameLoop();
  }
  

  /*
    gameOver is triggered by a pubsub call from game_controller.js when one of the gameboards ships have been destroyed,
    It gets the container for the ending screen which has a congratulations for the winner and a button to play again.
  */
  function gameOver(){
    let gameoverContainer = document.getElementById('gameover_container');
    gameoverContainer.style.display = 'inline-block';
  }

  return Object.assign(
    {
      controller: state.controller,
      gameOver,
      newGame,
    },
  )
}

// Driver
let battleship = game();
battleship.newGame();

events.on('gameover', battleship.gameOver);



