import { describe } from "@jest/globals";
import GameBoard from "./GameBoard";
import Ship from "./Ship";

describe("place() -> placing ships", () => {
  let gameBoard;
  let ship;
  let x;
  let y;

  beforeEach(() => {
    gameBoard = new GameBoard(10);
    ship = new Ship("Destroyer", 3, true);
    x = 1;
    y = 4;
  });

  test("place() should place ships horizontally", () => {
    gameBoard.place(x, y, ship);

    expect(gameBoard.board[x].slice(y, y + ship.length)).toEqual([
      ship,
      ship,
      ship,
    ]);
  });

  test("place() should place ships vertically", () => {
    ship.isHorizontal = false;
    gameBoard.place(x, y, ship);

    expect(
      gameBoard.board.slice(x, x + ship.length).map((row) => row[y])
    ).toEqual([ship, ship, ship]);
  });
});
