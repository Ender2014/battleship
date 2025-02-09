export default class GameBoard {
  constructor(size = 0) {
    this.board = this.#createBoard(size);
  }

  #createBoard(size) {
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
    return this.board;
  }

  placeShip(x, y, ship) {
    const coordinates = Array.from({ length: ship.length }, (_, i) =>
      ship.isHorizontal ? [x, y + i] : [x + i, y]
    );
    coordinates.forEach(([nX, nY]) => {
      this.board[nX][nY] = ship;
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
      if (node && typeof node === "object" && node.id === id) {
        return node;
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
