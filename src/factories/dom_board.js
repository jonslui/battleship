// This factory is in charge of creating and manipulating the DOM element of the game
const DOMboard = () => {
  let state = {
    board: null,
    tiles: {},
  }

  return Object.assign(
    { state: state },
    createBoard(state),
    createTiles(state),
    createShips(),
    changeTileDisplay(state),
  )
}

/*
  1. Create the board add gameboard class and id (either player1_board or player2_board)
  2. Append to the div with id gameboards_container
  3. Set state.board equal to gameboard
*/
const createBoard = (state) => ({
  createBoard: (id) => {
    const container = document.getElementById('gameboards_container');
    const gameboard = document.createElement('div');
    gameboard.setAttribute('class', 'gameboard')
    gameboard.setAttribute('id', id);
    container.appendChild(gameboard);
  
    state.board = gameboard;
  }
})

/*
  1. Create 100 tile with individual ids, offset by 0 or 100 (according to whether it is player 1 or 2)
  2. if the hover variable passed into the function is true, add class player2_tile which has the hover attribute. Otherwise, add class player1_tile.
  3. Set id and append to board
*/
  const createTiles = (state) => ({
  createTiles: (hover, startingId) => {
    for(let i = startingId; i < startingId + 100; i += 1){
      const tile = document.createElement('div');
      
      hover ? tile.setAttribute('class', 'player2_tile') : tile.setAttribute('class', 'player1_tile');
      
      tile.setAttribute('id', i);

      state.tiles[i] = tile;

      state.board.appendChild(tile);
    }
  }
})

/*
  renders ships on the board by removing player1_tile class from a tile and adding the ship class
*/
const createShips = () => ({
  createShips: (gameboardData) => {
    gameboardData.state.ships.forEach((ship) => {
      ship.state.coords.forEach((coord) => {
        const tile = document.getElementById(coord);
        tile.removeAttribute('class', 'player1_tile');
        tile.setAttribute('class', 'ship');
      })
    });
  }
})


/*
  changes the tile after an attack has been launched by changing it's class to hit or miss
*/
const changeTileDisplay = (state) => ({
  changeTileDisplay: (id, bool, contact) => {
    let tile = state.tiles[id];

    if (bool && contact != undefined) {
      tile.setAttribute('class', 'hit');
    } else {
      tile.setAttribute('class', 'miss');
    } 
  }
})

export default DOMboard;