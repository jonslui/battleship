import gameboard from './factories/gameboard';
import player from './factories/player';
import renderBoards from './dom_interaction/render_board';

function gameController(){
  let player1 = player(true);
  let player1Board = gameboard();
  player1Board.createShip([0,1,2,3,4], 'Carrier');

  let player2 = player(true);
  let player2Board = gameboard();
  player2Board.createShip([100,101,102,103,104], 'Carrier');

  renderBoards(player1Board, player2Board);
}

export default gameController;