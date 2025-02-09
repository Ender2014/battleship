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

  receiveAttack(x, y) {
    if (!this.#isShip(x, y)) {
      this.board[x][y] = false;
      return false;
    }
    this.board[x][y].hit(1);
    return true;
  }
}
