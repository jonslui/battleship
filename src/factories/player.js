const player = (isHuman) => {
  let state = {
    is_human: isHuman,
    available_moves: [],
    surrounding_tiles: [],
  }
  
  return Object.assign(
    { state: state },
    launchAttack(state),
    randomCoord(state),
    populateAvailableMoves(state),
    populateSurroundingTiles(state),
    checkSurroundings(state),
  )
}


/*
  Recieves a coordinate and returns the coord if it's a valid move, or false if it's invalid.
  To prevent this tile from being selected again, it removes the coord from state.available_moves.
*/
const launchAttack = (state) => ({
  launchAttack: (coord) => {
    return state.available_moves.includes(coord) ? state.available_moves.splice(state.available_moves.indexOf(coord), 1)[0] : false;
  }
});


/*
  Returns a random coord from the state.available_moves array
*/
const randomCoord = (state) => ({
  randomCoord: () => {    
    return state.available_moves[~~(Math.random() * state.available_moves.length)];
  }
})


/*
  Adds surrounding tiles to state.surrounding_tiles after a hit, the AI checks these using checkSurroundings() before making random moves
*/
const populateSurroundingTiles = (state) => ({
  populateSurroundingTiles: (id) => {
    (id % 10) < 9  && state.available_moves.includes(id + 1) && state.surrounding_tiles.includes(id + 1) == false ? state.surrounding_tiles.push(id + 1) : '';
    (id % 10) > 0 && state.available_moves.includes(id - 1) && state.surrounding_tiles.includes(id - 1) == false ? state.surrounding_tiles.push(id - 1): '';
    (id + 10) <= 99 && state.available_moves.includes(id + 10) && state.surrounding_tiles.includes(id + 10) == false ? state.surrounding_tiles.push(id + 10) : '';
    (id - 10) >= 0 && state.available_moves.includes(id - 10) && state.surrounding_tiles.includes(id - 10) == false ? state.surrounding_tiles.push(id - 10) : '';
  }
})


/*
  AI players use this to check surrounding waters after a successful hit
*/
const checkSurroundings = (state) => ({
  checkSurroundings: () => {
   return state.surrounding_tiles.splice(0, 1)[0];
  }
})


/*
  This function is called when a player is created.
  Offset accounts for the tile id difference between player 1 and player 2
*/
const populateAvailableMoves = (state) => ({
  populateAvailableMoves: (offset) => {
    for (let i = 0 + offset; i < 100 + offset; i += 1) {
      state.available_moves.push(i);
    }
  }
})

export default player;