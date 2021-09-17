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

test('setOpenCoords sets state.open_coords to an array containing arrays of all unoccupied coordinates', () => {
  let newGameboard = gameboard();
  newGameboard.createShip([0,1,2,3,4], 'Carrier');
  newGameboard.setOpenCoords(0);

  const result = newGameboard.state.open_coords;
  const expected = [...Array(95).keys()].map(x => x + 5);

  expect(result).toEqual(expected);
})

test('possibleHorizontalPlacements returns array containing array of possible moves when board is open', () => {
  let newGameboard = gameboard();
  newGameboard.setOpenCoords(0)

  const result = newGameboard.possibleHorizontalPlacements(5);
  const expected = [[0, 1, 2, 3, 4], [1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 7], [4, 5, 6, 7, 8], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [11, 12, 13, 14, 15], [12, 13, 14, 15, 16], [13, 14, 15, 16, 17], [14, 15, 16, 17, 18], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], [21, 22, 23, 24, 25], [22, 23, 24, 25, 26], [23, 24, 25, 26, 27], [24, 25, 26, 27, 28], [25, 26, 27, 28, 29], [30, 31, 32, 33, 34], [31, 32, 33, 34, 35], [32, 33, 34, 35, 36], [33, 34, 35, 36, 37], [34, 35, 36, 37, 38], [35, 36, 37, 38, 39], [40, 41, 42, 43, 44], [41, 42, 43, 44, 45], [42, 43, 44, 45, 46], [43, 44, 45, 46, 47], [44, 45, 46, 47, 48], [45, 46, 47, 48, 49], [50, 51, 52, 53, 54], [51, 52, 53, 54, 55], [52, 53, 54, 55, 56], [53, 54, 55, 56, 57], [54, 55, 56, 57, 58], [55, 56, 57, 58, 59], [60, 61, 62, 63, 64], [61, 62, 63, 64, 65], [62, 63, 64, 65, 66], [63, 64, 65, 66, 67], [64, 65, 66, 67, 68], [65, 66, 67, 68, 69], [70, 71, 72, 73, 74], [71, 72, 73, 74, 75], [72, 73, 74, 75, 76], [73, 74, 75, 76, 77], [74, 75, 76, 77, 78], [75, 76, 77, 78, 79], [80, 81, 82, 83, 84], [81, 82, 83, 84, 85], [82, 83, 84, 85, 86], [83, 84, 85, 86, 87], [84, 85, 86, 87, 88], [85, 86, 87, 88, 89], [90, 91, 92, 93, 94], [91, 92, 93, 94, 95], [92, 93, 94, 95, 96], [93, 94, 95, 96, 97], [94, 95, 96, 97, 98], [95, 96, 97, 98, 99]];
  expect(result).toEqual(expected);
})

test('possibleVerticalPlacements returns array containing all possible vertical placements when board is open', () => {
  let newGameboard = gameboard();
  newGameboard.setOpenCoords(0);

  const result = newGameboard.possibleVerticalPlacements(5);
  const expected = [[0, 10, 20, 30, 40], [10, 20, 30, 40, 50], [20, 30, 40, 50, 60], [30, 40, 50, 60, 70], [40, 50, 60, 70, 80], [50, 60, 70, 80, 90], [1, 11, 21, 31, 41], [11, 21, 31, 41, 51], [21, 31, 41, 51, 61], [31, 41, 51, 61, 71], [41, 51, 61, 71, 81], [51, 61, 71, 81, 91], [2, 12, 22, 32, 42], [12, 22, 32, 42, 52], [22, 32, 42, 52, 62], [32, 42, 52, 62, 72], [42, 52, 62, 72, 82], [52, 62, 72, 82, 92], [3, 13, 23, 33, 43], [13, 23, 33, 43, 53], [23, 33, 43, 53, 63], [33, 43, 53, 63, 73], [43, 53, 63, 73, 83], [53, 63, 73, 83, 93], [4, 14, 24, 34, 44], [14, 24, 34, 44, 54], [24, 34, 44, 54, 64], [34, 44, 54, 64, 74], [44, 54, 64, 74, 84], [54, 64, 74, 84, 94], [5, 15, 25, 35, 45], [15, 25, 35, 45, 55], [25, 35, 45, 55, 65], [35, 45, 55, 65, 75], [45, 55, 65, 75, 85], [55, 65, 75, 85, 95], [6, 16, 26, 36, 46], [16, 26, 36, 46, 56], [26, 36, 46, 56, 66], [36, 46, 56, 66, 76], [46, 56, 66, 76, 86], [56, 66, 76, 86, 96], [7, 17, 27, 37, 47], [17, 27, 37, 47, 57], [27, 37, 47, 57, 67], [37, 47, 57, 67, 77], [47, 57, 67, 77, 87], [57, 67, 77, 87, 97], [8, 18, 28, 38, 48], [18, 28, 38, 48, 58], [28, 38, 48, 58, 68], [38, 48, 58, 68, 78], [48, 58, 68, 78, 88], [58, 68, 78, 88, 98], [9, 19, 29, 39, 49], [19, 29, 39, 49, 59], [29, 39, 49, 59, 69], [39, 49, 59, 69, 79], [49, 59, 69, 79, 89], [59, 69, 79, 89, 99]];
  expect(result).toEqual(expected);
})