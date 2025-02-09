export default class GameBoard {
  constructor(size) {
    this.board = this.#createBoard(size);
  }

  #createBoard(size) {
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
    return this.board;
  }

  place(x, y, ship) {
    const coordinates = Array.from({ length: ship.length }, (_, i) =>
      ship.isHorizontal ? [x, y + i] : [x + i, y]
    );
    coordinates.forEach(([nX, nY]) => {
      this.board[nX][nY] = ship;
    });
  }
}
