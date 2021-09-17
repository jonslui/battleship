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

// Creates the board and appends it to the content container
const createBoard = (state) => ({
  createBoard: (id) => {
    const contentContainer = document.getElementById('content');
    const gameboard = document.createElement('div');
    gameboard.setAttribute('class', 'gameboard')
    gameboard.setAttribute('id', id);
    contentContainer.appendChild(gameboard);
  
    state.board = gameboard;
  }
})

// Creates tiles with id corresponding to moves in the player's available moves
const createTiles = (state) => ({
  createTiles: (hover, startingId) => {
    for(let i = startingId; i < startingId + 100; i += 1){
      const tile = document.createElement('div');
      
      hover ? tile.setAttribute('class', 'player2_tile') : tile.setAttribute('class', 'player1_tile');
      
      tile.setAttribute('id', i);

      // Add tile to state.tiles so it can be changed easily later
      state.tiles[i] = tile;

      // add child to board
      state.board.appendChild(tile);
    }
  }
})

// renders ships on the board
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

// changes the tile after an attack has been launched
const changeTileDisplay = (state) => ({
  changeTileDisplay: (id, bool, contact) => {
    let tile = state.tiles[id]

    if (bool && contact != undefined) {
      tile.setAttribute('class', 'hit');
    } else {
      tile.setAttribute('class', 'miss');
    } 
  }
})


export default DOMboard;