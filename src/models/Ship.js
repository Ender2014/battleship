export default class Ship {
  #hits = 0;

  constructor(id, length) {
    this.id = id;
    this.length = length;
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
