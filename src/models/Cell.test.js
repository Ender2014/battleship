import Cell from "./Cell";

describe("Cell properties", () => {
  let cell;
  beforeEach(() => {
    cell = new Cell();
  });

  test("Should get hit", () => {
    expect(cell.hit).toBe(false);
  });

  test("Should get isShip", () => {
    expect(cell.isShip).toBe(false);
  });

  test("Should set hit", () => {
    cell.hit = true;
    expect(cell.hit).not.toBe(false);
    expect(cell.hit).toBe(true);
  });

  test("Should set isShip", () => {
    cell.isShip = true;
    expect(cell.isShip).not.toBe(false);
    expect(cell.isShip).toBe(true);
  });
});
