Demo: https://jonslui.github.io/battleship/dist/index.html

## Battleship

A turn-based strategy game where players take turns firing shots into enemy waters. The first one to destroy all enemy ships wins.

When planning this project, my goal was to gain experience using Jest and Test Driven Development while keeping my player, gameboard, and ship factories as pure as possible. This was my first time using TDD on something larger than small practice problems, and it was a great feeling how everything came together cleanly at the end.

To keep the game competitive, I added 'intelligent' decision-making to the AI. If the AI player hits a tile, it will search the 4 adjacent tiles before beginning to randomly search the waters again.

## Goals for completing this project

1. Practice using Jest (tests found in src/factories folder).
2. Gain experience using TDD.
3. Practice creating modular code and keeping functions pure.

## Usage

1. Click this link: https://jonslui.github.io/battleship/dist/index.html or download files and open index.html in a browser of your choice.


https://user-images.githubusercontent.com/34390833/134720993-76da14bc-5d6c-4736-9b97-c068306b2be8.mov

4. Drag and drop your ships.
5. Click a tile on the opponent's board to attack (red means hit, white means miss).


https://user-images.githubusercontent.com/34390833/134721013-3a9b99b8-d9c0-406c-a147-53b3ad84c4f4.mov

5. Hit all tiles of an opponent's ship to destroy it.



https://user-images.githubusercontent.com/34390833/134721083-8e7930f9-192b-4c30-a36a-89df0d113af0.mov

6. The first player to destroy all their opponent's ships wins
7. Click "New Game' to play again.

9. Enjoy!
