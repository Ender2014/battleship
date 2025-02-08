import Cell from "./Cell";

describe("Cell properties", () => {
  let ship;
  beforeEach(() => {
    ship = new Cell();
  });

  test("Should get name", () => {
    expect(ship.name).toBe("Carrier");
  });
});
