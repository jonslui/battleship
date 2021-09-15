const ship = (length, name) => {
  let state = {
    name: name,
    length: length,
    hits: [],
    sunk: false,
  }
  
  return Object.assign(
    {state: state},
    hit(state),
    isSunk(state),
  )
}

const hit = (state) => ({
  hit: (location) => { 
    state.hits.push(location);
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