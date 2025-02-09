export default class Ship {
  #hits = 0;

  #positions;

  constructor(id, length, isHorizontal, coor = [0, 0]) {
    this.id = id;
    this.length = length;
    this.isHorizontal = isHorizontal;
    this.setPositions(coor[0], coor[1]);
  }

  get hits() {
    return this.#hits;
  }

  get positions() {
    return this.#positions;
  }

  setPositions(x, y) {
    this.#positions = Array.from({ length: this.length }, (_, i) =>
      this.isHorizontal ? [x, y + i] : [x + i, y]
    );
  }

  hit(num) {
    this.#hits += num;
  }

  isSunk() {
    return !(this.#hits < this.length);
  }
}
