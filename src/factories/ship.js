const ship = (coords, name) => {
  let state = {
    name: name,
    length: coords.length,
    coords: coords,
    hits: [],
    sunk: false,
  }
  
  return Object.assign(
    { state: state },
    hit(state),
    isSunk(state),
  )
}

/* 
  All values coming into here have already been verified by 
  it's gameboard as hits, so they are just added to state.hit
*/
const hit = (state) => ({
  hit: (coord) => { 
    state.hits.push(coord);
  }
})

/*
  if the length of the hits array is as long as the length of the ship that means
  its been destoryed
*/
const isSunk = (state) => ({
  isSunk: () => { 
    if(state.hits.length >= state.length){
      state.sunk = true;
    }
  }
})

export default ship;
