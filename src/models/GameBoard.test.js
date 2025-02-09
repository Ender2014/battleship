import { describe } from "@jest/globals";
import GameBoard from "./GameBoard";
import Ship from "./Ship";

let gameBoard;
let ship1;
let ship2;
let ship3;

beforeEach(() => {
  gameBoard = new GameBoard(10);
  ship1 = new Ship("Destroyer", 3, true, [0, 0]);
  ship2 = new Ship("Carrier", 3, false, [0, 9]);
  ship3 = new Ship("Boat", 1, true, [1, 1]);
});

describe("place() -> placing ships", () => {
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

describe("receiveHit() -> registering hits", () => {
  beforeEach(() => {
    gameBoard.placeShip(ship1); // [0,0]
    gameBoard.placeShip(ship2); // [0,9]
  });

  test("Should detect hits and return true", () => {
    expect(gameBoard.receiveAttack(0, 0)).toBe(true);
  });

  test("Should hit the detected ship", () => {
    gameBoard.receiveAttack(0, 0);
    expect(ship1.hits).toBe(1);
  });

  test("Should hit the correct ship", () => {
    gameBoard.receiveAttack(0, 9);
    expect(ship1.hits).not.toBe(1);
    expect(ship2.hits).toBe(1);
  });

  test("Should be able to handle multiple same-ship hits", () => {
    for (let i = 0; i <= 2; i += 1) {
      gameBoard.receiveAttack(0, 9);
    }

    expect(ship2.hits).toBe(3);
  });

  test("Should be able to sink ships", () => {
    for (let i = 0; i < ship2.length; i += 1) {
      gameBoard.receiveAttack(0, 9);
    }
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

describe("isAllSunk() -> detecting end game condition (is all ships sunken)", () => {
  beforeEach(() => {
    gameBoard.placeShip(ship1); // [0,0]
    gameBoard.placeShip(ship2); // [0,9]
    gameBoard.placeShip(ship3); // [1,1]
    ship1.hit(3);
    ship2.hit(3);
  });

  test("Should detect when all ships are not sunk", () => {
    expect(gameBoard.isAllSunk()).toBe(false);
  });

  test("Should detect when all ships are sunk", () => {
    ship3.hit(1);
    expect(gameBoard.isAllSunk()).toBe(true);
  });
});

/* describe("getShipById() -> fetching nested ships by Id", () => {
  beforeEach(() => {
    gameBoard.placeShip(ship1); // [0,0]
    gameBoard.placeShip(ship2); // [0,9]
  });
  test("Should get ship1 === 'Destroyer'", () => {
    expect(gameBoard.getShipById("Destroyer")).toEqual(ship1);
  });
  test("Should get ship2 === 'Carrier'", () => {
    expect(gameBoard.getShipById("Carrier")).toEqual(ship2);
  });
}); */
