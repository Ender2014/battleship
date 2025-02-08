import { beforeEach } from "@jest/globals";
import Ship from "./Ship";

describe("Ship getter and setters", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship("Carrier", 0);
  });

  test("Should get name", () => {
    expect(ship.name).toBe("Carrier");
  });

  test("Should get length", () => {
    expect(ship.length).toBe(0);
  });

  test("Should get hits", () => {
    expect(ship.length).toBe(0);
  });

  test("Should set name", () => {
    ship.name = "Destroyer";
    expect(ship.name).toBe("Destroyer");
  });

  test("Should set length", () => {
    ship.length = 5;
    expect(ship.length).toBe(5);
  });
});

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

  test("isSunk() WON'T sink ship when hits < length", () => {
    ship.hit(3);
    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk() WILL sink ship when length === hits", () => {
    ship.hit(5);
    expect(ship.isSunk()).toBe(true);
  });
});
