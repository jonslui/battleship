const messages = () => {
  let state = {

  }

  function resetAnimation(new_message){
    let oldChild = document.getElementById('message_board');
    let newChild = document.getElementById('message_board').cloneNode(true);
    newChild.innerHTML = new_message;
    oldChild.parentNode.replaceChild(newChild, oldChild);
  }

  return Object.assign(
    {},
    placeShips(resetAnimation),
    attack(resetAnimation),
    hit(resetAnimation),
    miss(resetAnimation),
    winner(),
    sunk(),

  )
}

const placeShips = (resetAnimation) => ({
  placeShips: () => {
    resetAnimation('Ahoy, Captain! Drag your fleet onto the board!');
  }
})

const attack = (resetAnimation) => ({
  attack: () => {
    resetAnimation('Click a tile to attack, Captain!');
  }
})

const hit = (resetAnimation) => ({
  hit: () => {
    resetAnimation('Hit!');
  }
})

const miss = (resetAnimation) => ({
  miss: () => {
    resetAnimation('Miss!');
  }
})

const winner = (resetAnimation) => ({
  winner: (player) => {
    resetAnimation((player + ' won!'));
  }
})

const sunk = (resetAnimation) => ({
  sunk: (shipName) => {
    resetAnimation((shipName + ' sunk!'));
  }
})

export default messages;