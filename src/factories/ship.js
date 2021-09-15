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

const hit = (state) => ({
  hit: (coord) => { 
    state.hits.push(coord);
  }
})

const isSunk = (state) => ({
  isSunk: () => { 
    if(state.hits.length >= state.length){
      state.sunk = true;
    }
  }
})


export default ship;