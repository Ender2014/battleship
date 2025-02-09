import { describe } from "@jest/globals";
import GameBoard from "./GameBoard";
import Ship from "./Ship";

describe("place() -> placing ships", () => {
  let gameBoard;
  let ship1;
  let ship2;

  beforeEach(() => {
    gameBoard = new GameBoard(10);
    ship1 = new Ship("Destroyer", 3, true, [0, 0]);
    ship2 = new Ship("Carrier", 3, false, [0, 9]);
  });

  test("Should place ships horizontally", () => {
    gameBoard.placeShip(ship1);
    expect(gameBoard.board[0].slice(0, 0 + ship1.length)).toEqual([
      ship1.id,
      ship1.id,
      ship1.id,
    ]);
  });

  test("Should place ships vertically", () => {
    gameBoard.placeShip(ship2);
    expect(
      gameBoard.board.slice(0, 0 + ship2.length).map((row) => row[9])
    ).toEqual([ship2.id, ship2.id, ship2.id]);
  });

  test("Should record placed ships", () => {
    gameBoard.placeShip(ship1);
    expect(gameBoard.ships.get(ship1.id)).toEqual(ship1);
  });

  test("Should not record non placed ships", () => {
    expect(gameBoard.ships.get(ship1.id)).toBe(undefined);
  });
});

/*
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
}); */
