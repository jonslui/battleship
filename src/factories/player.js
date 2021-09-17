const player = (isHuman) => {
  let state = {
    is_human: isHuman,
    available_moves: [],
  }
  
  return Object.assign(
    { state: state },
    launchAttack(state),
    randomCoord(state),
    populateAvailableMoves(state),
  )
}

/*
  if state.available_moves contains the coordinate, it is spliced from the array and returned
  if state.available_moves does not contain the coordinate, it returns false; 
*/
const launchAttack = (state) => ({
  launchAttack: (coord) => {
    return state.available_moves.includes(coord) ? state.available_moves.splice(state.available_moves.indexOf(coord), 1)[0] : false;
  }
});


/*
  returns a random coord from the state.available_moves array
*/
const randomCoord = (state) => ({
  randomCoord: () => {    
    return state.available_moves[~~(Math.random() * state.available_moves.length)];
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