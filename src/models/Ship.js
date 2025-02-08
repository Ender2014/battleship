export default class Ship {
  #hits = 0;

  constructor(name, length) {
    this.name = name;
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
