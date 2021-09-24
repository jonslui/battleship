## Battleship

A turn-based strategy game where players take turns firing shots into enemy waters. The first one to destroy all enemy ships wins.

When planning this project, my goal was to gain experience using Jest and Test Driven Development while keeping my player, gameboard, and ship factories as pure as possible. This was my first time using TDD on something larger than small practice problems, and it was a great feeling how everything came together cleanly at the end.

To keep the game competitive, I added 'intelligent' decision-making to the AI. If the AI player hits a tile, it will search the 4 adjacent tiles before beginning to randomly search the waters again.

## Goals for completing this project

1. Practice using Jest (tests found in src/factories folder).
2. Gain experience using TDD.
3. Practice creating modular code and keeping functions pure.

## Usage

1. Download repository and dependencies
2. Open index.html in a browser of your choice
3. Drag and drop your ships
 <!--Video  -->
4. Click a tile on the opponent's board to attack (red means hit, white means miss)
<!-- Video -->
5. Hit all tiles of an opponent's ship to destroy it
<!-- Video -->
6. The first player to destroy all their opponent's ships wins
<!-- Video -->
7. Enjoy!