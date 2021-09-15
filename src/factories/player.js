import gameboard from './gameboard';

const player = (isHuman) => {
  let state = {
    is_human: isHuman,
    available_moves: [ 
                    0, 1, 2, 3, 4, 5 , 6, 7, 8, 9,
                    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                    40, 41, 42, 43, 44, 45, 46, 47, 48, 49 
                  ],
  }


  return Object.assign(
    { state: state },
    launchAttack(state),
    randomCoord(state),
  )
}

const launchAttack = (state) => ({
  launchAttack: (coord) => {
    /*
      if state.available_moves contains the coordinate, it is spliced from the array and returned
      if state.available_moves does not contain the coordinate, it returns false; 
    */
    return state.available_moves.includes(coord) ? state.available_moves.splice(state.available_moves.indexOf(coord), 1)[0] : false;
  }
});

const randomCoord = (state) => ({
  randomCoord: () => {    
    /*
      returns a random coord from the state.available_moves array
    */
    return state.available_moves[~~(Math.random() * state.available_moves.length)];
  }
})

export default player;