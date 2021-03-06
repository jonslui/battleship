import ship from './ship';

// Each player has their own gameboard
const gameboard = () => {
  let state = {
    missed_attacks: [],
    ships: [],
    open_coords: [],
  }

  return Object.assign(
    { state: state },
    createShip(state),
    receiveAttack(state),
    shipsRemaining(state),
    setOpenCoords(state),
    possibleHorizontalPlacements(state),
    possibleVerticalPlacements(state),
  )
}

const createShip = (state) => ({
  createShip: (coords, name) => {
    state.ships.push(ship(coords, name));
  }
})


/* 
    for loop:
      1. check if any ship has the corresponding coordinate, 
      2. if one does, run .hit()
      3. run .isSunk() to update state.ships[i].state.sunk
      4. exit function and remove ship from state.ships[i] if it was sunk

    If function wasn't exited during for loop, a ship was not hit:
      emit 'miss' pubsub message to update message display and add coord to state.missed_attacks
*/
const receiveAttack = (state) => ({
  receiveAttack: (coords) => {
    for (let i = 0; i < state.ships.length; i += 1) {
      if(state.ships[i].state.coords.includes(coords)){
        state.ships[i].hit(coords);
        state.ships[i].isSunk();

        return state.ships[i].state.sunk ? state.ships.splice(i, 1) : '';
      }
    }
  
    events.emit('miss');
    state.missed_attacks.push(coords);
  }
})


/*
  returns true or false depending on if there are ships left or not
*/
const shipsRemaining = (state) => ({
  shipsRemaining: () => {
    return state.ships.length > 0 ? true : false;
  }
})


/*
  // 1. Create an array of 100 coords that are offset by 0 or 100 based on if its player 1 or 2
  // 2. Remove coords already taken by ships
  // 3. Update state.open_coords
*/
const setOpenCoords = (state) => ({
  setOpenCoords: (offset) => {
    let coords = [...Array(100).keys()].map(coord => coord + offset)
  
    state.ships.forEach((ship) => {
      coords = coords.filter( (coord) => {
        return ship.state.coords.indexOf(coord) < 0;
      })
    })

    state.open_coords = coords;
  }
})


/*
  Populate array with all possible placements determineded by consecutive horizontal coords by:
      1. Get an array of open coordinates from state.open_coords (previously generated by gameboard.setOpenCoords and organized from largest to smallest)
      2. Go through each coordinate and see if the coordinate at its index + ship length - 1 is the same as the value of that coordinate%10 + ship length - 1 
      3. If these coordinates match, create an array with the coordinates from index to (index + ship length - 1) and push it onto possiblePlacements
      4. Return array possiblePlacements, containing subArrays of all possible placements
*/
const possibleHorizontalPlacements = (state) => ({
  possibleHorizontalPlacements: (length) => {

    let coords = state.open_coords;

    let possiblePlacements = [];
    coords.forEach( (coord, index) => {
      if ( coords[index + length - 1] === coord + length - 1 && ((coord % 10) + length - 1) < 10 ) {
        let possiblePlacement = [...Array(length)].map((x,y) => coord + 1 * y);
        possiblePlacements.push(possiblePlacement);
      } 
    })

    return possiblePlacements;
  }
})


/*
  Populate array with all possible placements determineded by consecutive vertical coords by:
      1. Get an array of open coordinates from state.open_coords (previously generated by gameboard.setOpenCoords) 
      2. Sort coordinates so that integers ending in the same number line up (e.g 1, 11, 21, 31)
      3. Go through each coordinate and see if the coordinate at its index + ship length - 1 is the same as coordinate + (length - 1 * 10)
      4. If these coordinates match, create an array with the coordinates from index to (index + ship length - 1) and push it onto possiblePlacements
      5. Return array possiblePlacements, containing subArrays of all possible placements
*/
const possibleVerticalPlacements = (state) => ({
  possibleVerticalPlacements: (length) => {
    let coords = state.open_coords;

    coords.sort((a, b) => {
      if ( a.toString().slice(-1) > b.toString().slice(-1)){
        return 1;
      } else if (a.toString().slice(-1) < b.toString().slice(-1)) {
        return -1
      } else {
        return 0;
      }
    })

    const possiblePlacements = [];
    coords.forEach( (coord, index) => {
      if ( coords[index + length - 1] === coord + ((length - 1) * 10)) {
        let possiblePlacement = [...Array(length)].map((x,y) => coord + 10 * y);
        possiblePlacements.push(possiblePlacement);
      } 
    })

    return possiblePlacements;
  }
})

export default gameboard;
