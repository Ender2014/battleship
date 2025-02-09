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

  placeShip(ship) {
    ship.positions.forEach(([x, y]) => {
      this.board[x][y] = ship.id;
      this.#ships.set(ship.id, ship);
    });
  }

  #isShip(x, y) {
    return this.board[x][y] !== null;
  }

  getShipById(id) {
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

  receiveAttack(x, y) {
    if (!this.#isShip(x, y)) {
      this.board[x][y] = false;
      return false;
    }
    this.board[x][y].hit(1);
    return true;
  }

  isAllSunk() {
    return this.board.reduce(
      (prev, curr, index) =>
        prev &&
        curr
          .filter((cell) => this.#isShip(index, curr.indexOf(cell)))[0]
          .isSunk(),
      true
    );
  }
}
