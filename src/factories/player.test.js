import player from './player';

test('player.is_human === true for human players', () => {
  let humanPlayer = player(true);

  expect(humanPlayer.state.is_human).toBe(true);
})

test('player.is_human === false for computer players', () => {
  let computerPlayer = player(false);

  expect(computerPlayer.state.is_human).toBe(false);
})

test('human players can launch attacks', () => {
  let humanPlayer = player(true);
  humanPlayer.populateAvailableMoves(0);

  const result = humanPlayer.launchAttack(1);

  expect(result).toBe(1);
})

test('attacked coords are removed from state.available_moves', () => {
  let humanPlayer = player(true);
  humanPlayer.populateAvailableMoves(0);

  const coord = humanPlayer.launchAttack(1);
  const result = humanPlayer.state.available_moves.includes(coord);

  expect(result).toBe(false);
})

test('returns false if the same coord is attacked twice', () => {
  let humanPlayer = player(true);
  humanPlayer.populateAvailableMoves(0);


  humanPlayer.launchAttack(1);
  const result = humanPlayer.launchAttack(1);

  expect(result).toBe(false);
})

test('computer player can choose a random valid coordinate', () => {
  let computerPlayer = player(false);
  computerPlayer.populateAvailableMoves(100);

  const randomCoord = computerPlayer.randomCoord();

  expect(randomCoord).toBeGreaterThanOrEqual(100);
  expect(randomCoord).toBeLessThanOrEqual(199);
})

test('computer player can launch attacks', () => {
  let computerPlayer = player(false);
  computerPlayer.populateAvailableMoves(100);

  const randomCoord = computerPlayer.randomCoord();
  
  const result = computerPlayer.launchAttack(randomCoord);

  expect(result).toBeGreaterThanOrEqual(100);
  expect(randomCoord).toBeLessThanOrEqual(199);
})
