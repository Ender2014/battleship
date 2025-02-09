export default class Ship {
  #hits = 0;

  constructor(id, length, isHorizontal) {
    this.id = id;
    this.length = length;
    this.isHorizontal = isHorizontal;
  }

  get hits() {
    return this.#hits;
  }

  hit(num) {
    this.#hits += num;
  }

  isSunk() {
    return !(this.#hits < this.length);
  }
}
