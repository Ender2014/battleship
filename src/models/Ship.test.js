import { beforeEach } from "@jest/globals";
import Ship from "./Ship";

describe("Ship methods", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship("Carrier", 5);
  });

  test("hit(num) increases hits by input", () => {
    ship.hit(1);
    expect(ship.hits).toBe(1);

    ship.hit(2);
    expect(ship.hits).toBe(3);
  });

  test("isSunk() returns", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk() WON'T sink ship when hits < length", () => {
    ship.hit(3);
    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk() WILL sink ship when length === hits", () => {
    ship.hit(5);
    expect(ship.isSunk()).toBe(true);
  });
});

/* describe("Ship properties", () => {
  let ship;
  beforeEach(() => {
    const id = "Destroyer";
    const length = 3;
    ship = new Ship(id, length, true);
  });

  test("Should get id", () => {
    expect(ship.id).toBe("Destroyer");
  });

  test("Should set id", () => {
    ship.id = "Destroyer";
    expect(ship.id).toBe("Destroyer");
  });

  test("Should get length", () => {
    expect(ship.length).toBe(3);
  });

  test("Should set length", () => {
    ship.length = 5;
    expect(ship.length).toBe(5);
  });

  test("Should get hits", () => {
    expect(ship.hits).toBe(0);
  });

  test("Should get isHorizontal", () => {
    expect(ship.isHorizontal).toBe(true);
  });

  test("Should set isHorizontal", () => {
    ship.isHorizontal = false;
    expect(ship.isHorizontal).toBe(false);
  });
}); */
