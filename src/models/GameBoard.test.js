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

  test("Should place ships horizontally", () => {
    gameBoard.placeShip(x, y, ship);

    expect(gameBoard.board[x].slice(y, y + ship.length)).toEqual([
      ship,
      ship,
      ship,
    ]);
  });

  test("Should place ships vertically", () => {
    ship.isHorizontal = false;
    gameBoard.placeShip(x, y, ship);

    expect(
      gameBoard.board.slice(x, x + ship.length).map((row) => row[y])
    ).toEqual([ship, ship, ship]);
  });
});

describe("receiveHit() -> registering hits", () => {
  let gameBoard;
  let ship1;
  let ship2;

  beforeEach(() => {
    ship1 = new Ship("Destroyer", 3, true);
    ship2 = new Ship("Carrier", 4, true);
    gameBoard = new GameBoard();
    gameBoard.board = [
      [null, null, null, null],
      [ship1, ship1, ship1, null],
      [null, null, null, null],
      [ship2, ship2, ship2, ship2],
    ];
  });

  test("Should detect hits  and return true", () => {
    expect(gameBoard.receiveAttack(1, 0)).toBe(true);
  });

  test("Should hit the detected ship", () => {
    gameBoard.receiveAttack(1, 0);
    expect(ship1.hits).toBe(1);
  });

  test("Should hit the correct ship", () => {
    gameBoard.receiveAttack(3, 0);
    expect(ship1.hits).not.toBe(1);
    expect(ship2.hits).toBe(1);
  });

  test("Should be able to handle multiple same-ship hits", () => {
    Array.from({ length: 3 }, (_, i) =>
      gameBoard.receiveAttack(3, 0 + i)
    ).forEach((fn) => fn);
    expect(ship2.hits).toBe(3);
  });

  test("Should be able to sink ships", () => {
    Array.from({ length: 4 }, (_, i) =>
      gameBoard.receiveAttack(3, 0 + i)
    ).forEach((fn) => fn);
    expect(ship2.hits).toBe(4);
    expect(ship2.isSunk()).toBe(true);
  });

  test("Should detect misses and return false", () => {
    expect(gameBoard.receiveAttack(2, 3)).toBe(false);
  });

  test("Should record missed hits", () => {
    gameBoard.receiveAttack(2, 3);
    expect(gameBoard.board[2][3]).toBe(false);
  });
});

describe("getShipById() -> fetching nested ships by Id", () => {
  let gameBoard;
  let ship1;
  let ship2;

  beforeEach(() => {
    ship1 = new Ship("Destroyer", 3, true);
    ship2 = new Ship("Carrier", 4, true);
    gameBoard = new GameBoard();
    gameBoard.board = [
      [null, null, null, null],
      [[[ship1, ship1]], null, null, null],
      [null, null, null, null],
      [ship2, ship2, ship2, ship2],
    ];
  });

  test("Should get correct ship", () => {
    expect(gameBoard.getShipById("Carrier")).toEqual(ship2);
  });

  test("Should get nested ship", () => {
    expect(gameBoard.getShipById("Destroyer")).toEqual(ship1);
  });
});
