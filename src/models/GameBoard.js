export default class GameBoard {
  #ships;

  constructor(size = 0) {
    this.size = size;
    this.board = this.#createBoard(this.size);
    this.#ships = new Map();
  }

  get ships() {
    return this.#ships;
  }

  #createBoard(size) {
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
    return this.board;
  }

  #isShip(x, y) {
    return this.board[x][y] !== null;
  }

  #getShipById(id) {
    const search = (node) => {
      if (Array.isArray(node)) {
        let result = null;
        node.forEach((item) => {
          if (!result) result = search(item);
        });
        return result;
      }
      if (node && node === id) {
        return this.#ships.get(node);
      }
      return null;
    };

    return search(this.board);
  }

  #getShipByCoor(x, y) {
    return this.#ships.get(this.board[x][y]);
  }

  placeShip(ship) {
    ship.positions.forEach(([x, y]) => {
      this.board[x][y] = ship.id;
      this.#ships.set(ship.id, ship);
    });
  }

  receiveAttack(x, y) {
    if (!this.#isShip(x, y)) {
      this.board[x][y] = false;
      return false;
    }
    this.#getShipByCoor(x, y).hit(1);
    return true;
  }

  isAllSunk() {
    return Array.from(this.#ships.values()).reduce(
      (acc, ship) => acc && ship.isSunk(),
      true
    );
  }
}
