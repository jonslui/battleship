import gameboard from './gameboard';

test('createShip creates a ship and adds it to state.ships', () => {
  let newGameboard = gameboard();
  newGameboard.createShip([1,2,3,4,5], 'Carrier');

  expect(newGameboard.state.ships.length).toBe(1);
})

test('missed attacks are added to state.missed_attacks', () => {
  let newGameboard = gameboard();
  newGameboard.createShip([1,2,3,4,5], 'Carrier');

  newGameboard.receiveAttack(6);

  expect(newGameboard.state.missed_attacks).toContain(6);
  expect(newGameboard.state.missed_attacks.length).toBe(1);
})

test('hits are not added to state.missed_attacks', () => {
  let newGameboard = gameboard();
  newGameboard.createShip([1,2,3,4,5], 'Carrier');

  newGameboard.receiveAttack(1);

  expect(newGameboard.state.missed_attacks.length).toBe(0);
})

test('sunk ships are removed from state.ships', () => {
  let newGameboard = gameboard();
  newGameboard.createShip([1,2,3,4,5], 'Carrier');
  newGameboard.createShip([6,7], 'Patrol Boat');

  newGameboard.receiveAttack(1);
  newGameboard.receiveAttack(2);
  newGameboard.receiveAttack(3);
  newGameboard.receiveAttack(4);
  newGameboard.receiveAttack(5);

  expect(newGameboard.state.ships.length).toBe(1);
})

test('shipsRemaining returns true if there are ships remaining', () => {
  let newGameboard = gameboard();
  newGameboard.createShip([1,2,3,4,5], 'Carrier');

  const result = newGameboard.shipsRemaining();
  expect(result).toBe(true);
})


test('shipsRemaining returns false if there are no ships remaining', () => {
  let newGameboard = gameboard();
  newGameboard.createShip([1,2], 'Patrol Boat');

  newGameboard.receiveAttack(1);
  newGameboard.receiveAttack(2);

  const result = newGameboard.shipsRemaining();
  expect(result).toBe(false);
})