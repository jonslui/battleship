import ship from './ship';

// Each player has their own gameboard
const gameboard = () => {
  let state = {
    missed_attacks: [],
    ships: [],
  }

  return Object.assign(
    { state: state },
    createShip(state),
    receiveAttack(state),
    shipsRemaining(state),
  )
}

// createShip, createShips, or createCarrier
const createShip = (state) => ({
  createShip: (coords, name) => {
    state.ships.push(ship(coords, name));
  }
})


const receiveAttack = (state) => ({
  receiveAttack: (coords) => {
    /* 
    for loop:
      1. check if any ship has the corresponding coordinate, 
      2. if one does run .hit()
      3. run .isSunk() to update state.ships[i].state.sunk
      4. exit function and remove ship from state.ships[i] if it was sunk
    */
    for (let i = 0; i < state.ships.length; i += 1) {
      if(state.ships[i].state.coords.includes(coords)){
        state.ships[i].hit(coords);
        state.ships[i].isSunk();

        return state.ships[i].state.sunk ? state.ships.splice(i, 1) : '';
      }
    }
    
    /*
    since function wasn't exited during for loop, a ship was not hit:
      add coord to state.missed_attacks
    */
    state.missed_attacks.push(coords);
  }
})

// returns true or false whether there are ships left or not
const shipsRemaining = (state) => ({
  shipsRemaining: () => {
    return state.ships.length > 0 ? true : false;
  }
})

export default gameboard;
