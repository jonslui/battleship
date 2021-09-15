function renderBoards(player1BoardData, player2BoardData){
  const gameboard1 = createBoard('gameboard1');
  createTiles(gameboard1, false, 0);
  createShips(player1BoardData);

  const gameboard2 = createBoard('gameboard1');
  createTiles(gameboard2, true, 100);
  // createShips(player2BoardData);
}

function createBoard(id){
  const contentContainer = document.getElementById('content');
  const gameboard = document.createElement('div');
  gameboard.setAttribute('class', 'gameboard')
  gameboard.setAttribute('id', id);
  contentContainer.appendChild(gameboard);

  return gameboard;
}

// startingId is included to offset player2s id #s
function createTiles(DOMboard, hover, startingId){
  for(let i = startingId; i < startingId + 100; i += 1){
    const tile = document.createElement('div');
    
    hover ? tile.setAttribute('class', 'player2_tile') : tile.setAttribute('class', 'player1_tile');

    tile.setAttribute('id', i);
    DOMboard.appendChild(tile);
  }
}


function createShips(gameboardData){
  gameboardData.state.ships.forEach((ship) => {
    ship.state.coords.forEach((coord) => {
      const tile = document.getElementById(coord.toString());
      tile.removeAttribute('class', 'player1_tile');
      tile.setAttribute('class', 'ship');
    })
  });
}


export default renderBoards;