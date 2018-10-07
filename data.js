const rockData = [
  [[0, 5], [0, 2], [-1, 5], [-5, 2], [-2, 0], [-5, -1], [-2, -5], [3, -5], [5, -3], [5, 1], [2, 5], [0, 5]],
  [[-3, -5], [-5, -3], [-3, -1], [-5, 2], [-2, 5], [-1, 3], [3, 5], [5, 0], [2, -2], [5, -3], [3, -5], [0, -4], [-3, -5]],
  [[-2, 5], [-5, 2], [-5, -2], [-3, -5], [0, -3], [3, -5], [5, -3], [3, -1], [5, 2], [1, 5], [-2, 5]],
  [[-5, -3], [-1, -3], [-2, -5], [2, -5], [5, -3], [5, -1], [1, 0], [5, 3], [3, 5], [1, 4], [-3, 5], [-5, 1], [-5, -3]],
  [[-2, -2], [-2, -5], [2, -5], [2, -2], [5, -2], [5, 2], [2, 2], [2, 5], [-2, 5], [-2, 2], [-5, 2], [-5, -2], [-2, -2]]
];

const shipData = [
  [[11, 0], [-6, -6], [-9, -7], [-6, -6], [-6, 6], [-9, 7], [-6, 6], [11, 0]],
  [[-6, -3], [-13, 0], [-6, 3]]
];

const numbers = [
  [[-8, -32], [8, -32], [8, 0], [-8, 0], [-8, -32]],
  [[0, -32], [0, 0]],
  [[-8, -32], [8, -32], [8, -16], [-8, -16], [-8, 0], [8, 0]],
  [[-8, -32], [8, -32], [8, -16], [-8, -16], [8, -16], [8, 0], [-8, 0]],
  [[-8, -32], [-8, -16], [8, -16], [8, -32], [8, 0]],
  [[8, -32], [-8, -32], [-8, -16], [8, -16], [8, 0], [-8, 0]],
  [[-8, -32], [-8, 0], [8, 0], [8, -16], [-8, -16]],
  [[-8, -32], [8, -32], [8, 0]],
  [[8, -16], [-8, -16], [-8, -32], [8, -32], [8, 0], [-8, 0], [-8, -16]],
  [[8, -16], [-8, -16], [-8, -32], [8, -32], [8, 0]]
];

const scalefactor = 3;
const collisionSize = 2;

const data = {
  rock: [],
  ship: [],

  preload: function () {

    const ship = new Object();
    ship.raw = [this.factor(shipData[0], 1)];
    ship.collision = [this.factor(shipData[0], 1, collisionSize)];
    ship.box = [this.boundbox(ship.collision[0])]
    ship.thrust = [shipData[1]];
    this.ship.push(ship);

    for (const row of rockData) {
      const entry = new Object();
      const _raw = []
      const _col = []
      const _box = []
      for (let i = 0; i < 3; i++) {
        _raw.push(this.factor(row, i * scalefactor));
        _col.push(this.factor(row, i * scalefactor, collisionSize));
        _box.push(this.boundbox(_col[i]));
      }
      entry.raw = _raw;
      entry.collision = _col;
      entry.box = _box;
      this.rock.push(entry);
    }
  },

  // Scales polygon data by factor  with optional offset
  // If no factor set then factor is 1 for original size
  factor: function (rawData, factor, offset) {
    const result = [];
    factor = factor || 1;
    offset = offset || 0;
    for (let item of rawData) {
      let offset0 = Math.sign(item[0]) * offset;
      let offset1 = Math.sign(item[1]) * offset;
      result.push([item[0] * factor + offset0, item[1] * factor + offset1]);
    }
    return result;
  },

  boundbox: function (polygon) {
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    for (let n = 0; n < polygon.length; n++) {
      let q = polygon[n];
      minX = Math.min(q[0], minX);
      maxX = Math.max(q[0], maxX);
      minY = Math.min(q[1], minY);
      maxY = Math.max(q[1], maxY);
    }
    const box = new Object();
    box.minX = minX;
    box.maxX = maxX;
    box.minY = minY;
    box.maxY = maxY;
    return box;
  }

}
