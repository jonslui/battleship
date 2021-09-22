import gameboard from './factories/gameboard';
import gameboardDOM from './factories/dom_board';

const shipPlacement = () => {
  let state = {
    gameboard: null,
    gameboardDOM: null,
    selected_ship_length: null,
    selected_ship_div: null,
    selected_ship_name: null,
    selected_ship_coords: null,
    horizontal: true,
    vertical: false,
    possible_horizontal_placements: null,
    possible_vertical_placements: null,
    placed_successfully: null,
    computer_gameboard: null,
    clicked_ship_tile_number: null,
  }

  return Object.assign(
    {state:state},
    initialize(state),
    random(state),
    createDraggableShips(state),
    addTileListeners(state),
    addOrientationButton(state),
  )
}


/*
  Creates two instances of gameboard: one for player 1 and one for player 2. Renders board 1 in the DOM.
*/
const initialize = (state) => ({
  initialize: () => {    
    state.gameboard = gameboard();
    state.gameboardDOM = gameboardDOM();
    state.gameboardDOM.createBoard('player1_board');
    state.gameboardDOM.createTiles(false, 0);

    state.computer_gameboard = gameboard();
  }
});


/*
  Randomizes ship placement for gameboard 2 (CPU player) by:
  1. Updating all open coordinates on Board Two, 
  2. Randomly running the gameboard function possibleHorizontalPlacements or possibleVerticalPlacements and populating the possiblePlacements array.
  3. Choosing 1 coord array from the possiblePlacement array and running createShip to add a ship to player 2's gameboard.
*/
const random = (state) => ({
  random: () => {
    const fleet = [[5, 'Carrier'], [4, 'Battleship'], [3, 'Cruiser'], [3, 'Submarine'], [2, 'Destroyer']];
    let possiblePlacements;

    fleet.forEach( (ship) => {
      state.computer_gameboard.setOpenCoords(100);
      possiblePlacements = ~~((Math.random() * 100)/50) == 1 ? possiblePlacements = state.computer_gameboard.possibleHorizontalPlacements(ship[0]) : state.computer_gameboard.possibleVerticalPlacements(ship[0]);
      state.computer_gameboard.createShip(possiblePlacements[~~(Math.random() * possiblePlacements.length)], ship[1]);
    });
  }
})


/*
  Creates 5 ships, and adds dragstart and dragend event listeners to them.

  1. Create a container DOM element to place all 5 ships and later a button in. CSS id: ship_container.
  2. For each ship, create a corresponding div and add CSS classes/event listeners. CSS class: draggableShips.
      i. dragstart eventlistener: 
          - set/reset state data related to the currently selected ship.
          - Reset state.open_coords in the player 1 gameboard to allow addTileListeners function to accurately check possible placements later.
          - Add the CSS class: hide to the event target while it is being dragged (removes visual from the ship_container dom element)
      i. dragend eventlistener:
          - if the ship was placed successfully do nothing, otherwise remove the CSS class hide so it will become visible in the ship_container dom element for future placement.
  3. Populate each ship's div element with tiles corresponding to the length of the ship, and an event listener that sets which tile was clicked when dragging the ship. (recalled later in addTileListeners for determining if a valid location / placing a ship)
*/
const createDraggableShips = (state) => ({
  createDraggableShips: () => {
    const ships = [[5, 'Carrier'], [4, 'Battleship'], [3, 'Cruiser'], [3, 'Submarine'], [2, 'Destroyer']];

    const gameboard_container = document.getElementById('gameboards_container');
    const container = document.createElement('div');
    container.setAttribute('id', 'ship_container');
    gameboard_container.appendChild(container);
    
    ships.forEach( (ship) => {
      const shipDiv = document.createElement('div');
      shipDiv.className = 'draggableShips';
      shipDiv.draggable = 'true';
  
      shipDiv.addEventListener('dragstart', (event) => {
        state.selected_ship_coords = null;
        state.selected_ship_length = ship[0];
        state.placed_successfully = false;
        state.selected_ship_div = shipDiv;
        state.selected_ship_name = ship[1];
        state.gameboard.setOpenCoords(0);

        event.dataTransfer.setData('text/plain', event.target.id);
  
        setTimeout(() => {
          event.target.classList.add('hide');
        }, 0);
      })

      shipDiv.addEventListener('dragend', (event) => {
        state.placed_successfully == false ? event.target.classList.remove('hide') : '';
      })

      
      for(let i = 0; i < ship[0]; i++) {
        let tile = document.createElement('div');
        tile.setAttribute('class', 'ship');
        tile.classList.add(ship[1]);

        tile.addEventListener('mousedown', () => {
          state.clicked_ship_tile_number = i;
          console.log(state.clicked_ship_tile_number);
        })

        shipDiv.appendChild(tile);
      }

      container.appendChild(shipDiv);
    })
  }
})


/*
  Adds dragenter, dragleave, dragover, and dragdrop event listeners to all tiles to respond to draggable ships.

  1. dragenter: 
      i. checks if state.horizontal is true or not, 
      ii. runs the gameboard function possibleHorizontalPlacements or possibleVerticalPlacements and filters the results to
          for any possible placement arrays where the dragged ships clicked tile matches the event tile id.
      iii. If any match, highlight the tile green since it is a valid placement, otherwise highlight red.

  2. dragleave: remove possible valid_drop and invalid_drop classes from the tile after leaving to reset visual

  3. dragover: preventDefault action to allow drop to trigger

  4. drop: 
    1. Remove CSS valid_drop/invalid_drop classes.
    2. Check if its a valid placement and get an array of coords back if it is.
    3a. If coords has been populated, create a ship for the player 1 gameboard and then run createShip to update the DOM display.
    4a. Change placed_successfully to true so that the dragover event for the ship will not unhide the draggable ship.
    5a. Check if all ships have been placed, if so, emit a pubsub signal and pass the ship data for both player one and two. 

    3b. If coords hasn't been populated, it wasn't a valid placement. So, remove the 'hide' CSS class from that ship in order to re-reveal it in the ship_container DOM element for future dragging.
*/
const addTileListeners = (state) => ({
  addTileListeners: () => {
    const tiles = document.querySelectorAll('.player1_tile');
    
    tiles.forEach( tile => {
      tile.addEventListener('dragenter', (event) => {
        let coords;

        if(state.horizontal === true) {
          coords = state.gameboard.possibleHorizontalPlacements(state.selected_ship_length).filter(placement => (placement[state.clicked_ship_tile_number] == event.target.id));
        } else {
          coords = state.gameboard.possibleVerticalPlacements(state.selected_ship_length).filter(placement => (placement[state.clicked_ship_tile_number] == event.target.id));
        }
        
        coords.length == 0 ? event.target.classList.add('invalid_drop') : event.target.classList.add('valid_drop');
      })

      
      tile.addEventListener('dragleave', (event) => {
        event.target.classList.remove('valid_drop');
        event.target.classList.remove('invalid_drop');
      })


      tile.addEventListener('dragover', (event) => {
        event.preventDefault();
      })


      tile.addEventListener('drop', (event) =>{
        event.preventDefault();
        event.target.classList.remove('valid_drop');
        event.target.classList.remove('invalid_drop');

        let coords;
        if(state.horizontal === true) {
          coords = state.gameboard.possibleHorizontalPlacements(state.selected_ship_length).filter(placement => (placement[state.clicked_ship_tile_number] == event.target.id))[0];
        } else {
          coords = state.gameboard.possibleVerticalPlacements(state.selected_ship_length).filter(placement => (placement[state.clicked_ship_tile_number] == event.target.id))[0];
        }


        if (coords) {
          state.gameboard.createShip(coords, state.selected_ship_name);
          state.gameboardDOM.createShips(state.gameboard);
          state.placed_successfully = true;

          if (state.gameboard.state.ships.length == 5) {
            events.emit('ships placed', [state.gameboard.state.ships, state.computer_gameboard.state.ships]);
          }
        } else {
          state.selected_ship_div.classList.remove('hide');
        }
      })
    })
  }
})


/*
  Adds an orientation button that allows you to flip unplaced ships from horizontal to vertical and back by
  switching the state variables horizontal and vertical to true/false with each click and removing/adding the CSS vertical class
  to all divs with the draggableShips class
*/
const addOrientationButton = (state) => ({
  addOrientationButton: () => {
    let shipOrientationButton = document.createElement('button');
    shipOrientationButton.innerHTML = 'Rotate Ships';
    shipOrientationButton.setAttribute('id', 'ship_orientation_button');
    document.getElementById('ship_container').appendChild(shipOrientationButton);

    let ships = document.getElementsByClassName('draggableShips');
    shipOrientationButton.addEventListener('click', () => {
      if (state.horizontal == true) {
        state.horizontal = false;
        state.vertical = true;

        for(let i = 0; i < ships.length; i += 1){
          ships[i].classList.add('vertical');
        }

      } else {
        state.horizontal = true;
        state.vertical = false;

        for(let i = 0; i < ships.length; i += 1){
          ships[i].classList.remove('vertical');
        }
      }
    })
  }
})



export default shipPlacement;