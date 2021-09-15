import ship from './ship';


test('new ship is created with specified length', () => {
  let newShip = ship(5, 'Carrier');
  
  const expected = 5;
  expect(newShip.state.length).toBe(expected);
});

test('hits are added to state.hits', () => {
  let newShip = ship(5, "Carrier");
  newShip.hit(1);

  const expected = 1;
  expect(newShip.state.hits.length).toBe(expected);
});

test('ship sinks', () => {
  let newShip = ship(5, "Carrier");
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  newShip.hit(4);
  newShip.hit(5);
  newShip.isSunk();

  const expected = true;
  expect(newShip.state.sunk).toBe(expected);
})

test("ship isn't sunk if it still has locations left", () => {
  let newShip = ship(5, "Carrier");
  newShip.hit(1);
  newShip.isSunk();

  const expected = false;
  expect(newShip.state.sunk).toBe(expected);
})

test("ship has name", () => {
  let newShip = ship(5, "Carrier");
  
  const expected = "Carrier";
  expect(newShip.state.name).toBe(expected)
})